# Maprisma Website (`maprisma.com`)

**Live Website:** [https://maprisma.com](https://maprisma.com) · **GitHub Org:** [https://github.com/maprisma](https://github.com/maprisma)

Fast, privacy-first website showcasing all **14 Maprisma apps, applets, shell tools, and signed add-ons** with interactive screenshot galleries, EN/DE language switching, automatic server-cached GitHub release badges, and download/install instructions.

Hosted in Germany on **Netcup Webhosting 2000** (`hosting255642.a9820.netcup.net`, IP `159.195.152.32`):
- **Primary domain:** `https://maprisma.com` (`www.maprisma.com` and `maprisma.de` redirect via HTTP 301 preserving path and query string).
- **100% hosted in Germany (DSGVO-friendly):** Zero third-party fonts, zero cookies, zero third-party analytics (own cookieless counter, see below), and **zero visitor browser calls to GitHub** — latest release tags and stars are synced and cached server-side via `api/releases.php`.
- **Releases stay on GitHub:** All binaries (`.tar.gz`, `.AppImage`, `.pkg.tar.zst`) and source code remain in `https://github.com/maprisma/*`.
- **Bilingual (`EN` / `DE`):** Matches browser language automatically with an instant header toggle.

## Project Structure

- `index.html` — Main landing page, filter bar, install guide, lightbox & install modals.
- `legal.html` — Bilingual **Impressum (§ 5 DDG)** & **Datenschutzerklärung (DSGVO)** for Netcup hosting (`info@maprisma.com`).
- `robots.txt` & `sitemap.xml` — Search engine crawl rules (blocks `/api/`) and canonical sitemap for `https://maprisma.com/`.
- `.htaccess` — Canonical `maprisma.de` / `www` 301 redirects, security headers, and asset cache headers.
- `api/track.php` — Cookieless visit counter (daily-salted hash, no IPs stored) + install-click mail to `info@maprisma.com` (max 20/day).
- `api/stats.php` — Private stats page `https://maprisma.com/api/stats.php?key=…`; key only on the server in `api/cache/stats-key.txt`.
- `api/releases.php` — Server-side PHP GitHub Releases & Stars cache (15-min TTL + conditional ETags in `api/cache/`).
- `deploy.sh` — 1-second `rsync` deployment script over SSH to Netcup (`netcup-maprisma:httpdocs/`).
- `css/styles.css` — Prismatic dark & light theme styling, responsive 2-col / 3-col card grid.
- `js/i18n.js` — English & German UI strings.
- `js/apps.js` — **App catalog data**: edit EN/DE descriptions, fallback versions, GitHub URLs, install commands, and screenshot lists here.
- `js/main.js` — Filtering, search, language toggle, per-card screenshot slider, lightbox, and automatic server-cached release sync.
- `assets/icons/` — Official Maprisma SVG app icons.
- `assets/screenshots/` — Cropped `.webp`/`.gif` UI screenshots + `.svg` UI previews.

## Preview Locally

```bash
cd /mnt/Data/Projects/Netcup
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## Deploying Updates to Netcup

```bash
cd /mnt/Data/Projects/Netcup
./deploy.sh
```

Use `./deploy.sh --dry-run` to preview which files will be synced without changing remote files.
