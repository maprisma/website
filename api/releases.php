<?php
declare(strict_types=1);

/**
 * Maprisma Server-Side GitHub Releases & Stars Cache
 * --------------------------------------------------
 * Fetches and caches public release versions and star counts for the
 * `maprisma` GitHub organization on the Netcup web server so visitors:
 *   1. Always see current release versions automatically on page load.
 *   2. Never make browser requests to api.github.com (100% GDPR/DSGVO-friendly).
 *   3. Never hit per-visitor GitHub API rate limits (uses 15-min cache + ETags).
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'HEAD') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$cacheDir  = __DIR__ . '/cache';
$cacheFile = $cacheDir . '/gh-releases-cache.json';
$etagFile  = $cacheDir . '/gh-etags.json';
$lockFile  = $cacheDir . '/gh-sync.lock';
$tokenFile = $cacheDir . '/github-token.txt';

$ttlSeconds             = 900; // 15 minutes automatic cache lifetime
$manualRefreshCooldown  = 60;  // Minimum seconds between ?refresh=1 revalidations
$wantRefresh            = isset($_GET['refresh']) && $_GET['refresh'] === '1';

if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0750, true);
}

$cachedData = null;
if (is_file($cacheFile)) {
    $raw = @file_get_contents($cacheFile);
    if (is_string($raw) && $raw !== '') {
        $decoded = json_decode($raw, true);
        if (is_array($decoded) && isset($decoded['repos']) && is_array($decoded['repos'])) {
            $cachedData = $decoded;
        }
    }
}

$now = time();
$cacheAge = ($cachedData !== null && isset($cachedData['timestamp']))
    ? ($now - (int) $cachedData['timestamp'])
    : PHP_INT_MAX;

// Serve fresh cache immediately unless an allowed manual refresh was requested
if ($cachedData !== null && $cacheAge < $ttlSeconds) {
    if (!$wantRefresh || $cacheAge < $manualRefreshCooldown) {
        header('Cache-Control: public, max-age=120');
        echo json_encode([
            'ok'        => true,
            'cached'    => true,
            'updatedAt' => $cachedData['updatedAt'] ?? gmdate('c'),
            'repos'     => $cachedData['repos'],
        ], JSON_UNESCAPED_SLASHES);
        exit;
    }
}

header('Cache-Control: no-store');

// Acquire non-stampede lock
$lockFp = @fopen($lockFile, 'c+');
if ($lockFp !== false) {
    if (!flock($lockFp, LOCK_EX | LOCK_NB)) {
        // Another request is refreshing right now; return existing cache if available
        if ($cachedData !== null) {
            fclose($lockFp);
            echo json_encode([
                'ok'        => true,
                'cached'    => true,
                'stale'     => true,
                'updatedAt' => $cachedData['updatedAt'] ?? gmdate('c'),
                'repos'     => $cachedData['repos'],
            ], JSON_UNESCAPED_SLASHES);
            exit;
        }
        flock($lockFp, LOCK_EX);
    }
}

// Known Maprisma catalog repositories (fallback & release check targets)
$defaultSlugs = [
    'maprisma/maprisma',
    'maprisma/theme',
    'maprisma/wlan-monitor',
    'maprisma/llm-monitor',
    'maprisma/bluetooth-monitor',
    'maprisma/hue-lights',
    'maprisma/macos-hue-lights',
    'maprisma/settings',
    'maprisma/launcher',
    'maprisma/playground',
    'maprisma/dictation',
    'maprisma/notifier',
    'maprisma/clipboard',
    'maprisma/shell',
    'maprisma/icons',
    'maprisma/maprisma-addons',
];

$etags = [];
if (is_file($etagFile)) {
    $rawEtags = @file_get_contents($etagFile);
    if (is_string($rawEtags) && $rawEtags !== '') {
        $parsed = json_decode($rawEtags, true);
        if (is_array($parsed)) {
            $etags = $parsed;
        }
    }
}

$ghToken = '';
if (is_file($tokenFile)) {
    $ghToken = trim((string) @file_get_contents($tokenFile));
}

/**
 * Execute multiple GitHub GET requests in parallel with ETag conditional caching.
 * 304 Not Modified responses do not count against GitHub's rate limit.
 *
 * @param array<string, string> $urls key => url
 * @param array<string, array{etag?: string, status?: int, body?: mixed}> $etags
 * @return array<string, array{status: int, data: mixed}>
 */
function fetchGithubBatch(array $urls, array &$etags, string $token): array
{
    $results = [];
    if (empty($urls)) {
        return $results;
    }

    if (function_exists('curl_multi_init')) {
        $mh = curl_multi_init();
        $handles = [];
        $respHeaders = [];

        foreach ($urls as $key => $url) {
            $ch = curl_init($url);
            $headers = [
                'Accept: application/vnd.github+json',
                'User-Agent: Maprisma-Website-Sync/1.0 (+https://maprisma.com)',
                'X-GitHub-Api-Version: 2022-11-28',
            ];
            if ($token !== '') {
                $headers[] = 'Authorization: Bearer ' . $token;
            }
            if (!empty($etags[$url]['etag'])) {
                $headers[] = 'If-None-Match: ' . $etags[$url]['etag'];
            }

            $respHeaders[$key] = [];
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_MAXREDIRS      => 3,
                CURLOPT_CONNECTTIMEOUT => 4,
                CURLOPT_TIMEOUT        => 7,
                CURLOPT_HTTPHEADER     => $headers,
                CURLOPT_HEADERFUNCTION => static function ($curl, string $headerLine) use (&$respHeaders, $key): int {
                    $parts = explode(':', $headerLine, 2);
                    if (count($parts) === 2) {
                        $respHeaders[$key][strtolower(trim($parts[0]))] = trim($parts[1]);
                    }
                    return strlen($headerLine);
                },
            ]);
            curl_multi_add_handle($mh, $ch);
            $handles[$key] = ['ch' => $ch, 'url' => $url];
        }

        $active = null;
        do {
            $mrc = curl_multi_exec($mh, $active);
            if ($active) {
                curl_multi_select($mh, 1.0);
            }
        } while ($active && $mrc === CURLM_OK);

        foreach ($handles as $key => $meta) {
            $ch = $meta['ch'];
            $url = $meta['url'];
            $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $body = curl_multi_getcontent($ch);
            curl_multi_remove_handle($mh, $ch);
            curl_close($ch);

            if ($status === 304 && isset($etags[$url]['body'])) {
                $results[$key] = [
                    'status' => (int) ($etags[$url]['status'] ?? 200),
                    'data'   => $etags[$url]['body'],
                ];
                continue;
            }

            $decoded = is_string($body) && $body !== '' ? json_decode($body, true) : null;
            if (($status === 200 || $status === 404) && !empty($respHeaders[$key]['etag'])) {
                $etags[$url] = [
                    'etag'   => $respHeaders[$key]['etag'],
                    'status' => $status,
                    'body'   => $decoded,
                ];
            }
            $results[$key] = [
                'status' => $status,
                'data'   => $decoded,
            ];
        }

        curl_multi_close($mh);
        return $results;
    }

    // Fallback when curl extension is unavailable
    foreach ($urls as $key => $url) {
        $hdr = "Accept: application/vnd.github+json\r\nUser-Agent: Maprisma-Website-Sync/1.0\r\n";
        if ($token !== '') {
            $hdr .= "Authorization: Bearer {$token}\r\n";
        }
        $ctx = stream_context_create([
            'http' => [
                'method'        => 'GET',
                'header'        => $hdr,
                'timeout'       => 6,
                'ignore_errors' => true,
            ],
        ]);
        $body = @file_get_contents($url, false, $ctx);
        $status = 0;
        if (isset($http_response_header[0]) && preg_match('#HTTP/\S+\s+(\d{3})#', $http_response_header[0], $m)) {
            $status = (int) $m[1];
        }
        $results[$key] = [
            'status' => $status,
            'data'   => is_string($body) && $body !== '' ? json_decode($body, true) : null,
        ];
    }

    return $results;
}

$reposMeta = $cachedData['repos'] ?? [];
$rateLimited = false;

// 1. Fetch organization repositories (stars + dynamic repo discovery)
$orgUrl = 'https://api.github.com/orgs/maprisma/repos?per_page=100';
$orgBatch = fetchGithubBatch(['org' => $orgUrl], $etags, $ghToken);
$orgRes = $orgBatch['org'] ?? ['status' => 0, 'data' => null];

$slugsToCheck = $defaultSlugs;

if ($orgRes['status'] === 403 || $orgRes['status'] === 429) {
    $rateLimited = true;
} elseif ($orgRes['status'] === 200 && is_array($orgRes['data'])) {
    foreach ($orgRes['data'] as $repo) {
        if (!empty($repo['private'])) {
            continue;
        }
        if (!is_array($repo) || empty($repo['full_name'])) {
            continue;
        }
        $slug = (string) $repo['full_name'];
        if (!isset($reposMeta[$slug])) {
            $reposMeta[$slug] = [];
        }
        $reposMeta[$slug]['stars'] = isset($repo['stargazers_count']) ? (int) $repo['stargazers_count'] : 0;

        if (empty($repo['archived']) && !in_array($slug, $slugsToCheck, true) && count($slugsToCheck) < 35) {
            $slugsToCheck[] = $slug;
        }
    }
}

// 2. Fetch latest release tag for each repository in parallel
if (!$rateLimited) {
    $releaseUrls = [];
    foreach ($slugsToCheck as $slug) {
        if (preg_match('#^maprisma/[A-Za-z0-9._-]+$#', $slug)) {
            $releaseUrls[$slug] = "https://api.github.com/repos/{$slug}/releases/latest";
        }
    }

    $relBatch = fetchGithubBatch($releaseUrls, $etags, $ghToken);
    foreach ($relBatch as $slug => $res) {
        if ($res['status'] === 403 || $res['status'] === 429) {
            $rateLimited = true;
            break;
        }
        if ($res['status'] === 200 && is_array($res['data']) && !empty($res['data']['tag_name'])) {
            $tag = (string) $res['data']['tag_name'];
            if (!isset($reposMeta[$slug])) {
                $reposMeta[$slug] = [];
            }
            if (strncmp($tag, 'v', 1) === 0) {
                $reposMeta[$slug]['version'] = $tag;
            } elseif (preg_match('/^\d/', $tag) === 1) {
                $reposMeta[$slug]['version'] = 'v' . $tag;
            } elseif (preg_match('/-(\d+\.\d+(?:\.\d+)?)$/', $tag, $m) === 1) {
                $reposMeta[$slug]['version'] = 'v' . $m[1];
            } else {
                $reposMeta[$slug]['version'] = $tag;
            }
            if ($slug === 'maprisma/maprisma-addons') {
                $reposMeta[$slug]['releaseUrl'] = 'https://github.com/maprisma/maprisma-addons/releases';
            } elseif (!empty($res['data']['html_url'])) {
                $reposMeta[$slug]['releaseUrl'] = (string) $res['data']['html_url'];
            }
        }
    }
}

// Persist updated ETag store
@file_put_contents($etagFile, json_encode($etags, JSON_UNESCAPED_SLASHES), LOCK_EX);

if ($rateLimited && $cachedData !== null) {
    if ($lockFp !== false) {
        flock($lockFp, LOCK_UN);
        fclose($lockFp);
    }
    echo json_encode([
        'ok'          => true,
        'cached'      => true,
        'stale'       => true,
        'rateLimited' => true,
        'updatedAt'   => $cachedData['updatedAt'] ?? gmdate('c'),
        'repos'       => $cachedData['repos'],
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

if ($rateLimited && empty($reposMeta)) {
    if ($lockFp !== false) {
        flock($lockFp, LOCK_UN);
        fclose($lockFp);
    }
    http_response_code(503);
    echo json_encode([
        'ok'          => false,
        'rateLimited' => true,
        'error'       => 'GitHub API rate limit reached',
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

$updatedAt = gmdate('c');
$payloadToSave = [
    'timestamp' => $now,
    'updatedAt' => $updatedAt,
    'repos'     => $reposMeta,
];

@file_put_contents($cacheFile, json_encode($payloadToSave, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT), LOCK_EX);

if ($lockFp !== false) {
    flock($lockFp, LOCK_UN);
    fclose($lockFp);
}

echo json_encode([
    'ok'        => true,
    'cached'    => false,
    'updatedAt' => $updatedAt,
    'repos'     => $reposMeta,
], JSON_UNESCAPED_SLASHES);
