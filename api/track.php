<?php
declare(strict_types=1);

// Must run on PHP 7.4 (Netcup web PHP), so no str_contains/never/match.

/**
 * Maprisma privacy-friendly visit & install-click counter
 * -------------------------------------------------------
 * POST {"e":"visit"}                         → counts a page view + unique visitor
 * POST {"e":"install","app":"<id>","lang":…} → counts an install click and mails info@maprisma.com
 *
 * No cookies, no browser storage, no IP addresses on disk. Unique visitors are
 * counted with a SHA-256 hash of IP + browser + a random salt that is replaced
 * every day; yesterday's salt and hashes are deleted, so visitors can't be
 * recognised across days.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const MAIL_TO          = 'info@maprisma.com';
const MAIL_FROM        = 'info@maprisma.com';
const MAIL_CAP_PER_DAY = 20;
const KEEP_DAYS        = 400;
const MAX_UNIQUE_PER_DAY = 20000;
const APP_IDS = [
    'maprisma', 'theme', 'wlan-monitor', 'llm-monitor', 'bluetooth-monitor',
    'settings', 'launcher', 'playground', 'mail', 'dictation', 'video-translator', 'narrator',
    'notifier', 'control', 'home', 'shell', 'tiling', 'icons', 'addons', 'price-watch',
];

function done(int $code): void
{
    http_response_code($code);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    done(405);
}

// Only accept beacons from our own pages (browsers always send Origin on POST)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !preg_match('#^https://(www\.)?maprisma\.(com|de)$#', $origin)) {
    done(403);
}

$ua = (string) ($_SERVER['HTTP_USER_AGENT'] ?? '');
if ($ua === '' || preg_match('/bot|crawl|spider|slurp|headless|preview|monitor|curl|wget|python|httpclient/i', $ua)) {
    done(204); // silently ignore bots
}

$raw = file_get_contents('php://input', false, null, 0, 1024);
$body = is_string($raw) ? json_decode($raw, true) : null;
if (!is_array($body)) {
    done(400);
}

$event = $body['e'] ?? '';
$app   = is_string($body['app'] ?? null) ? $body['app'] : '';
$lang  = ($body['lang'] ?? '') === 'de' ? 'de' : 'en';

if ($event === 'install') {
    if (!in_array($app, APP_IDS, true)) {
        done(400);
    }
} elseif ($event !== 'visit') {
    done(400);
}

date_default_timezone_set('Europe/Berlin');
$today    = date('Y-m-d');
$cacheDir = __DIR__ . '/cache';
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0750, true);
}

$fp = @fopen($cacheDir . '/stats.json', 'c+');
if ($fp === false || !flock($fp, LOCK_EX)) {
    done(503);
}

$json  = stream_get_contents($fp);
$stats = is_string($json) && $json !== '' ? json_decode($json, true) : null;
if (!is_array($stats) || !isset($stats['days']) || !is_array($stats['days'])) {
    $stats = ['since' => $today, 'days' => []];
}

$day = $stats['days'][$today] ?? ['views' => 0, 'visitors' => 0, 'installs' => [], 'mails' => 0];

$sendMail = false;
if ($event === 'visit') {
    $day['views']++;
    if (isUniqueVisitorToday($cacheDir, $today, $ua)) {
        $day['visitors']++;
    }
} else {
    $day['installs'][$app] = ($day['installs'][$app] ?? 0) + 1;
    if ($day['mails'] < MAIL_CAP_PER_DAY) {
        $day['mails']++;
        $sendMail = true;
    }
}

$stats['days'][$today] = $day;
ksort($stats['days']);
$stats['days'] = array_slice($stats['days'], -KEEP_DAYS, null, true);

ftruncate($fp, 0);
rewind($fp);
fwrite($fp, json_encode($stats, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

if ($sendMail) {
    sendInstallMail($app, $lang, $day);
}

done(204);

/**
 * True the first time this browser shows up today. Uses a daily random salt;
 * files from earlier days are deleted, so nothing links visits across days.
 */
function isUniqueVisitorToday(string $cacheDir, string $today, string $ua): bool
{
    $stamp     = str_replace('-', '', $today);
    $saltFile  = "$cacheDir/visitor-salt-$stamp.txt";
    $seenFile  = "$cacheDir/visitor-seen-$stamp.txt";

    foreach (glob("$cacheDir/visitor-*.txt") ?: [] as $old) {
        if (strpos($old, $stamp) === false) {
            @unlink($old);
        }
    }

    $salt = is_file($saltFile) ? (string) file_get_contents($saltFile) : '';
    if (strlen($salt) < 32) {
        $salt = bin2hex(random_bytes(32));
        file_put_contents($saltFile, $salt, LOCK_EX);
    }

    $ip   = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
    $hash = substr(hash('sha256', $salt . '|' . $ip . '|' . $ua), 0, 20);

    $seen = is_file($seenFile) ? (string) file_get_contents($seenFile) : '';
    if (strpos($seen, $hash) !== false || substr_count($seen, "\n") >= MAX_UNIQUE_PER_DAY) {
        return false;
    }
    file_put_contents($seenFile, $hash . "\n", FILE_APPEND | LOCK_EX);
    return true;
}

function sendInstallMail(string $app, string $lang, array $day): void
{
    $todayClicks = array_sum($day['installs']);
    $capNote = $day['mails'] >= MAIL_CAP_PER_DAY
        ? "\nThis was the last mail for today (limit " . MAIL_CAP_PER_DAY . "). Further clicks are still counted on the stats page.\n"
        : '';

    $subject = "Maprisma: install click on $app";
    $text = "Someone clicked \"Download & Install\" on maprisma.com.\n\n"
        . "App:       $app\n"
        . "Language:  " . strtoupper($lang) . "\n"
        . "Time:      " . date('Y-m-d H:i:s T') . "\n\n"
        . "Today so far: $todayClicks install click(s), {$day['visitors']} visitor(s), {$day['views']} page view(s).\n"
        . $capNote;

    $headers = implode("\r\n", [
        'From: Maprisma Website <' . MAIL_FROM . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Auto-Response-Suppress: All',
    ]);

    @mail(MAIL_TO, mb_encode_mimeheader($subject, 'UTF-8'), $text, $headers, '-f' . MAIL_FROM);
}
