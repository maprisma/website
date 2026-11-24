/**
 * Maprisma Showcase — Interactive UI, Bilingual (EN/DE) & Live GitHub Sync
 */
(function () {
  "use strict";

  const apps = window.MAPRISMA_APPS || [];
  const i18n = window.MAPRISMA_I18N || { en: {}, de: {} };

  const MACOS_RELEASES = {
    maprisma: {
      repoSlug: "maprisma/macos-maprisma",
      version: "v0.14.8",
      github: "https://github.com/maprisma/macos-maprisma",
      releases: "https://github.com/maprisma/macos-maprisma/releases",
      installCmd:
        "# Download Maprisma-macos-arm64.zip & .sha256 from GitHub Releases:\n" +
        "shasum -a 256 -c Maprisma-macos-arm64.zip.sha256\n" +
        "unzip Maprisma-macos-arm64.zip\n" +
        "xattr -cr Maprisma.app\n" +
        "mv Maprisma.app /Applications/\n" +
        "# Or build from source on Apple Silicon:\n" +
        "git clone https://github.com/maprisma/macos-maprisma.git\n" +
        "cd macos-maprisma && ./install-mac.sh"
    },
    dictation: {
      repoSlug: "maprisma/macos-dictation",
      version: "v0.1.0",
      github: "https://github.com/maprisma/macos-dictation",
      releases: "https://github.com/maprisma/macos-dictation/releases",
      installCmd:
        "# Download Maprisma-Dictation-macOS.zip & .sha256 from GitHub Releases:\n" +
        "shasum -a 256 -c Maprisma-Dictation-macOS.zip.sha256\n" +
        "unzip Maprisma-Dictation-macOS.zip\n" +
        'xattr -cr "Maprisma Dictation.app"\n' +
        'mv "Maprisma Dictation.app" /Applications/\n' +
        "# Optional local Metal Whisper server:\n" +
        "brew install whisper-cpp\n" +
        "# Or build from source on Apple Silicon:\n" +
        "git clone https://github.com/maprisma/macos-dictation.git\n" +
        "cd macos-dictation && ./install-mac.sh"
    },
    "llm-monitor": {
      repoSlug: "maprisma/macos-llm-monitor",
      version: "v0.2.0",
      github: "https://github.com/maprisma/macos-llm-monitor",
      releases: "https://github.com/maprisma/macos-llm-monitor/releases",
      installCmd:
        "# Download Maprisma-LLM-Monitor-macOS.zip & .sha256 from GitHub Releases:\n" +
        "shasum -a 256 -c Maprisma-LLM-Monitor-macOS.zip.sha256\n" +
        "unzip Maprisma-LLM-Monitor-macOS.zip\n" +
        'xattr -cr "Maprisma LLM Monitor.app"\n' +
        'mv "Maprisma LLM Monitor.app" /Applications/\n' +
        "# Or build from source on Apple Silicon:\n" +
        "git clone https://github.com/maprisma/macos-llm-monitor.git\n" +
        "cd macos-llm-monitor && ./install-mac.sh"
    }
  };

  function detectInitialLang() {
    const saved = localStorage.getItem("maprisma-site-lang");
    if (saved === "de" || saved === "en") return saved;
    const nav = (navigator.language || "").toLowerCase();
    return nav.startsWith("de") ? "de" : "en";
  }

  // Load cached GitHub live metadata from sessionStorage if previously requested
  let cachedGithubMeta = {};
  try {
    cachedGithubMeta = JSON.parse(sessionStorage.getItem("maprisma-gh-meta") || "{}");
  } catch (_) {
    cachedGithubMeta = {};
  }

  const state = {
    lang: detectInitialLang(),
    category: "all",
    desktop: "all",
    query: "",
    cols: (window.MAPRISMA_SITE && window.MAPRISMA_SITE.defaultCols) || 2,
    cardSlide: {}, // appId -> current screenshot index
    lightbox: { appId: null, index: 0 },
    ghMeta: cachedGithubMeta, // repoSlug -> { version, stars, releaseUrl }
    syncState: Object.keys(cachedGithubMeta).length > 0 ? "done" : "idle"
  };

  const gridEl = document.getElementById("apps-grid");
  const countEl = document.getElementById("results-count");
  const searchInput = document.getElementById("search-input");
  const desktopSelect = document.getElementById("desktop-filter");
  const filterChips = document.querySelectorAll(".filter-chip");
  const viewButtons = document.querySelectorAll("[data-cols]");
  const langButtons = document.querySelectorAll("[data-lang]");
  const themeSelect = document.getElementById("theme-select");
  const cornerButtons = document.querySelectorAll("button[data-corners]");
  const syncBtn = document.getElementById("sync-github-btn");

  // Lightbox elements
  const lightboxEl = document.getElementById("lightbox-modal");
  const lbTitle = document.getElementById("lb-title");
  const lbImg = document.getElementById("lb-image");
  const lbCaption = document.getElementById("lb-caption");
  const lbCounter = document.getElementById("lb-counter");
  const lbPrev = document.getElementById("lb-prev");
  const lbNext = document.getElementById("lb-next");

  // Install modal elements
  const installModalEl = document.getElementById("install-modal");
  const imTitle = document.getElementById("im-title");
  const imDesc = document.getElementById("im-desc");
  const imCode = document.getElementById("im-code");
  const imGithubBtn = document.getElementById("im-github");
  const imReleaseBtn = document.getElementById("im-releases");
  const imCopyBtn = document.getElementById("im-copy");
  const imPlatformTabs = document.getElementById("im-platform-tabs");
  const imPlatformButtons = imPlatformTabs ? imPlatformTabs.querySelectorAll("[data-platform]") : [];
  const installModalState = { appId: null, platform: "linux" };

  function t(key) {
    const dict = i18n[state.lang] || i18n.en || {};
    return dict[key] !== undefined ? dict[key] : (i18n.en && i18n.en[key]) || key;
  }

  function appText(app, field) {
    if (state.lang === "de" && app[`${field}_de`]) {
      return app[`${field}_de`];
    }
    return app[field];
  }

  function shotCaption(shot, app) {
    if (!shot) return app.name;
    if (state.lang === "de" && shot.caption_de) return shot.caption_de;
    return shot.caption || app.name;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function applyStaticTranslations() {
    document.documentElement.lang = state.lang;
    document.title = t("pageTitle");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    if (searchInput) {
      searchInput.placeholder = t("searchPlaceholder");
    }

    if (themeSelect) {
      const themeLabel = t("themeLabel");
      themeSelect.setAttribute("aria-label", themeLabel);
      themeSelect.setAttribute("title", themeLabel);
    }

    const cornerGroup = document.querySelector(".corner-switch");
    if (cornerGroup) cornerGroup.setAttribute("aria-label", t("cornersLabel"));
    cornerButtons.forEach((btn) => {
      const label = t(btn.dataset.corners === "square" ? "cornersSquare" : "cornersRound");
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    });

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === state.lang);
    });

    updateSyncButtonLabel();
  }

  function updateSyncButtonLabel() {
    if (!syncBtn) return;
    if (state.syncState === "loading") {
      syncBtn.textContent = t("syncVersionsLoading");
      syncBtn.disabled = true;
    } else if (state.syncState === "done") {
      syncBtn.textContent = t("syncVersionsDone");
      syncBtn.disabled = false;
      syncBtn.classList.add("synced");
    } else if (state.syncState === "ratelimit") {
      syncBtn.textContent = t("syncVersionsRateLimit");
      syncBtn.disabled = false;
    } else {
      syncBtn.textContent = t("syncVersionsBtn");
      syncBtn.disabled = false;
      syncBtn.classList.remove("synced");
    }
  }

  function getEffectiveVersion(app) {
    const live = app.repoSlug && state.ghMeta[app.repoSlug];
    return (live && live.version) || app.version || "";
  }

  function getEffectiveStars(app) {
    const live = app.repoSlug && state.ghMeta[app.repoSlug];
    return live && typeof live.stars === "number" ? live.stars : null;
  }

  function getEffectiveReleasesUrl(app) {
    const live = app.repoSlug && state.ghMeta[app.repoSlug];
    return (live && live.releaseUrl) || app.releases || null;
  }

  function getMacosInfo(appId) {
    return Object.prototype.hasOwnProperty.call(MACOS_RELEASES, appId) ? MACOS_RELEASES[appId] : null;
  }

  function getEffectiveMacosVersion(appId) {
    const mac = getMacosInfo(appId);
    if (!mac) return "";
    const live = mac.repoSlug && state.ghMeta[mac.repoSlug];
    return (live && live.version) || mac.version || "";
  }

  function getEffectiveMacosReleaseUrl(appId) {
    const mac = getMacosInfo(appId);
    if (!mac) return null;
    const live = mac.repoSlug && state.ghMeta[mac.repoSlug];
    return (live && live.releaseUrl) || mac.releases || null;
  }

  function getFilteredApps() {
    const q = state.query.trim().toLowerCase();
    return apps.filter((app) => {
      if (state.category !== "all" && app.category !== state.category) {
        return false;
      }
      if (state.desktop !== "all" && !app.desktops.includes(state.desktop)) {
        return false;
      }
      if (q) {
        const hay = [
          app.name,
          app.tagline,
          app.tagline_de,
          app.description,
          app.description_de,
          app.tech,
          app.categoryLabel,
          app.categoryLabel_de,
          ...(app.desktops || []),
          ...(app.highlights || []),
          ...(app.highlights_de || [])
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }

  let revealObserver = null;
  const reducedMotionQuery =
    typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

  function observeCardReveals() {
    if (!gridEl) return;
    const motion = document.documentElement.getAttribute("data-motion") || "subtle";
    const reduced = Boolean(reducedMotionQuery && reducedMotionQuery.matches);
    const cards = gridEl.querySelectorAll(".app-card");
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }
    if (motion === "off" || reduced || typeof IntersectionObserver !== "function") {
      document.documentElement.classList.remove("motion-ready");
      cards.forEach((c) => c.classList.add("is-revealed"));
      return;
    }
    document.documentElement.classList.add("motion-ready");
    const viewH = window.innerHeight || document.documentElement.clientHeight || 900;
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            if (revealObserver) revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < viewH * 0.96) {
        card.classList.add("is-revealed");
      } else {
        revealObserver.observe(card);
      }
    });
  }

  if (reducedMotionQuery && typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", observeCardReveals);
  }

  function renderCards() {
    if (!gridEl) return;
    const filtered = getFilteredApps();
    if (countEl) {
      countEl.textContent =
        filtered.length === apps.length
          ? t("showingAll").replace("{total}", apps.length)
          : t("showingFiltered")
              .replace("{count}", filtered.length)
              .replace("{total}", apps.length);
    }

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div class="empty-state">
          <p>${escapeHtml(t("emptyState"))}</p>
          <button class="btn btn-secondary" id="reset-filters-btn" type="button">${escapeHtml(t("resetFilters"))}</button>
        </div>
      `;
      const resetBtn = document.getElementById("reset-filters-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          state.category = "all";
          state.desktop = "all";
          state.query = "";
          searchInput.value = "";
          desktopSelect.value = "all";
          filterChips.forEach((c) => c.classList.toggle("active", c.dataset.category === "all"));
          renderCards();
        });
      }
      return;
    }

    gridEl.innerHTML = filtered
      .map((app, cardIdx) => {
        const shots = app.screenshots || [];
        const idx = state.cardSlide[app.id] || 0;
        const activeShot = shots[idx] || { src: "", caption: app.name };
        const multi = shots.length > 1;
        const ver = getEffectiveVersion(app);
        const stars = getEffectiveStars(app);
        const relUrl = getEffectiveReleasesUrl(app);
        const macRelUrl = getEffectiveMacosReleaseUrl(app.id);
        const highlights = appText(app, "highlights") || [];

        return `
        <article class="app-card" data-app-id="${escapeHtml(app.id)}"${app.featured ? ' data-featured="true"' : ""} data-category="${escapeHtml(app.category || "")}" style="--card-idx: ${cardIdx}">
          <div class="card-media">
            <img
              src="${escapeHtml(activeShot.src)}"
              alt="${escapeHtml(shotCaption(activeShot, app))}"
              loading="lazy"
              data-action="open-lightbox"
              data-app-id="${escapeHtml(app.id)}"
            />
            <div class="media-badge-top">
              ${
                multi
                  ? `<span class="shot-counter">${idx + 1} / ${shots.length}</span>`
                  : `<span></span>`
              }
              <button
                type="button"
                class="zoom-pill"
                data-action="open-lightbox"
                data-app-id="${escapeHtml(app.id)}"
              >${escapeHtml(t("enlargeBtn"))}</button>
            </div>
            ${
              multi
                ? `
              <button type="button" class="media-nav prev" data-action="slide-prev" data-app-id="${escapeHtml(app.id)}" aria-label="Previous screenshot">‹</button>
              <button type="button" class="media-nav next" data-action="slide-next" data-app-id="${escapeHtml(app.id)}" aria-label="Next screenshot">›</button>
              <div class="media-dots">
                ${shots
                  .map(
                    (_, i) =>
                      `<button type="button" class="media-dot ${
                        i === idx ? "active" : ""
                      }" data-action="slide-goto" data-app-id="${escapeHtml(
                        app.id
                      )}" data-index="${i}" aria-label="Screenshot ${i + 1}"></button>`
                  )
                  .join("")}
              </div>
            `
                : ""
            }
          </div>

          <div class="card-body">
            <div class="card-header">
              <img class="card-icon" src="${escapeHtml(app.icon)}" alt="${escapeHtml(app.name)} icon" loading="lazy" />
              <div class="card-title-wrap">
                <div class="card-title-row">
                  <h3 class="card-title">${escapeHtml(app.name)}</h3>
                  <div class="card-badges">
                    ${ver ? `<span class="version-pill">${escapeHtml(ver)}</span>` : ""}
                    ${stars !== null && stars > 0 ? `<span class="star-pill">★ ${stars}</span>` : ""}
                    <span class="category-tag">${escapeHtml(appText(app, "categoryLabel"))}</span>
                  </div>
                </div>
                <p class="card-tagline">${escapeHtml(appText(app, "tagline"))}</p>
              </div>
            </div>

            <p class="card-desc">${escapeHtml(appText(app, "description"))}</p>

            <ul class="card-highlights">
              ${highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
            </ul>

            <div class="card-meta-pills">
              ${(app.desktops || [])
                .map((d) => `<span class="desktop-pill${d === "macOS" ? " macos-pill" : ""}">${escapeHtml(d)}</span>`)
                .join("")}
              <span class="tech-pill">${escapeHtml(app.tech)}</span>
            </div>

            <div class="card-actions">
              <button
                type="button"
                class="btn btn-primary"
                data-action="open-install"
                data-app-id="${escapeHtml(app.id)}"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                ${escapeHtml(t("downloadInstallBtn"))}
              </button>
              ${
                relUrl
                  ? `<a class="btn btn-secondary" href="${escapeHtml(relUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("releasesBtn"))} ↗</a>`
                  : ""
              }
              ${
                macRelUrl
                  ? `<a class="btn btn-secondary btn-macos" href="${escapeHtml(macRelUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("macosBtn"))} ↗</a>`
                  : ""
              }
              <a
                class="btn btn-secondary"
                href="${escapeHtml(app.github)}"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.92.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.42.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
                ${escapeHtml(t("githubBtn"))}
              </a>
            </div>
          </div>
        </article>
      `;
      })
      .join("");
    observeCardReveals();
  }

  function updateCardSlide(appId, nextIdx) {
    const app = apps.find((a) => a.id === appId);
    if (!app || !app.screenshots || app.screenshots.length < 2) return;
    const total = app.screenshots.length;
    const normalized = ((nextIdx % total) + total) % total;
    state.cardSlide[appId] = normalized;

    const card = gridEl.querySelector(`.app-card[data-app-id="${CSS.escape(appId)}"]`);
    if (!card) return;
    const img = card.querySelector(".card-media img");
    const counter = card.querySelector(".shot-counter");
    const dots = card.querySelectorAll(".media-dot");
    const shot = app.screenshots[normalized];

    if (img && shot) {
      img.src = shot.src;
      img.alt = shotCaption(shot, app);
    }
    if (counter) {
      counter.textContent = `${normalized + 1} / ${total}`;
    }
    dots.forEach((d, i) => d.classList.toggle("active", i === normalized));
  }

  // Apply repository metadata map from server-side cache or fallback sync
  function applyRepoMetaMap(reposMap) {
    if (!reposMap || typeof reposMap !== "object") return;
    Object.keys(reposMap).forEach((slug) => {
      const entry = reposMap[slug];
      if (entry && typeof entry === "object") {
        state.ghMeta[slug] = Object.assign({}, state.ghMeta[slug], entry);
      }
    });
    try {
      sessionStorage.setItem("maprisma-gh-meta", JSON.stringify(state.ghMeta));
    } catch (_) {
      // Ignore storage quota errors
    }
  }

  // Automatic GDPR-clean server-side sync (via Netcup PHP endpoint `api/releases.php`)
  async function autoSyncServerReleases() {
    try {
      const res = await fetch("api/releases.php", {
        headers: { Accept: "application/json" }
      });
      const contentType = (res.headers.get("content-type") || "").toLowerCase();
      if (!contentType.includes("application/json")) {
        return; // Local static preview (e.g., python3 -m http.server) — keep bundled versions silently
      }
      const payload = await res.json();
      if (res.ok && payload && payload.ok && payload.repos) {
        applyRepoMetaMap(payload.repos);
        state.syncState = "done";
        updateSyncButtonLabel();
        renderCards();
        if (lightboxEl && lightboxEl.classList.contains("open")) {
          syncLightbox();
        }
      }
    } catch (_) {
      // Keep bundled versions silently on offline / local preview
    }
  }

  // Manual refresh button: uses Netcup server-side proxy first (zero browser calls to GitHub),
  // falling back to direct GitHub API only in local static dev mode without PHP.
  async function syncGithubReleases() {
    if (state.syncState === "loading") return;
    state.syncState = "loading";
    updateSyncButtonLabel();

    try {
      // 1. Try same-origin Netcup PHP cache endpoint first
      try {
        const srvResp = await fetch("api/releases.php?refresh=1", {
          headers: { Accept: "application/json" }
        });
        const srvType = (srvResp.headers.get("content-type") || "").toLowerCase();
        if (srvType.includes("application/json")) {
          const payload = await srvResp.json();
          if (srvResp.ok && payload && payload.ok && payload.repos) {
            applyRepoMetaMap(payload.repos);
            state.syncState = "done";
            updateSyncButtonLabel();
            renderCards();
            return;
          }
          if (payload && payload.rateLimited) {
            state.syncState = "ratelimit";
            updateSyncButtonLabel();
            return;
          }
        }
      } catch (_) {
        // Fall through to direct GitHub API fallback for local static dev preview
      }

      // 2. Fallback strictly for local non-PHP preview (`python3 -m http.server`), never on live domains (GDPR)
      const isLocalPreviewHost = location.protocol === "file:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";
      if (!isLocalPreviewHost) {
        state.syncState = "idle";
        updateSyncButtonLabel();
        return;
      }
      const orgResp = await fetch("https://api.github.com/orgs/maprisma/repos?per_page=100", {
        headers: { Accept: "application/vnd.github+json" }
      });

      if (orgResp.status === 403 || orgResp.status === 429) {
        state.syncState = "ratelimit";
        updateSyncButtonLabel();
        return;
      }

      if (orgResp.ok) {
        const repos = await orgResp.json();
        if (Array.isArray(repos)) {
          repos.forEach((r) => {
            const slug = r.full_name;
            state.ghMeta[slug] = Object.assign({}, state.ghMeta[slug], {
              stars: r.stargazers_count || 0
            });
          });
        }
      }

      const releaseTargets = apps.filter((a) => a.repoSlug && a.releases);
      await Promise.all(
        releaseTargets.map(async (app) => {
          try {
            const res = await fetch(`https://api.github.com/repos/${app.repoSlug}/releases/latest`, {
              headers: { Accept: "application/vnd.github+json" }
            });
            if (res.ok) {
              const rel = await res.json();
              if (rel && rel.tag_name) {
                state.ghMeta[app.repoSlug] = Object.assign({}, state.ghMeta[app.repoSlug], {
                  version: rel.tag_name.startsWith("v") ? rel.tag_name : `v${rel.tag_name}`,
                  releaseUrl: rel.html_url || app.releases
                });
              }
            }
          } catch (_) {
            // Keep bundled version on individual network failure
          }
        })
      );

      sessionStorage.setItem("maprisma-gh-meta", JSON.stringify(state.ghMeta));
      state.syncState = "done";
      updateSyncButtonLabel();
      renderCards();
    } catch (_) {
      state.syncState = "ratelimit";
      updateSyncButtonLabel();
    }
  }

  // Lightbox logic
  function openLightbox(appId, index) {
    const app = apps.find((a) => a.id === appId);
    if (!app || !app.screenshots || !app.screenshots.length) return;
    state.lightbox.appId = appId;
    state.lightbox.index = typeof index === "number" ? index : state.cardSlide[appId] || 0;
    syncLightbox();
    lightboxEl.classList.add("open");
    lightboxEl.setAttribute("aria-hidden", "false");
  }

  function syncLightbox() {
    const app = apps.find((a) => a.id === state.lightbox.appId);
    if (!app) return;
    const shots = app.screenshots;
    const idx = ((state.lightbox.index % shots.length) + shots.length) % shots.length;
    state.lightbox.index = idx;
    const shot = shots[idx];

    lbTitle.textContent = `${app.name} ${getEffectiveVersion(app)}`.trim();
    lbImg.src = shot.src;
    lbImg.alt = shotCaption(shot, app);
    lbCaption.textContent = shotCaption(shot, app);
    lbCounter.textContent = shots.length > 1 ? `${idx + 1} / ${shots.length}` : "";
    lbPrev.style.display = shots.length > 1 ? "flex" : "none";
    lbNext.style.display = shots.length > 1 ? "flex" : "none";
  }

  function closeModals() {
    if (lightboxEl) {
      lightboxEl.classList.remove("open");
      lightboxEl.setAttribute("aria-hidden", "true");
    }
    if (installModalEl) {
      installModalEl.classList.remove("open");
      installModalEl.setAttribute("aria-hidden", "true");
    }
  }

  // Privacy-friendly counter on our own server (no cookies, no storage, no third parties)
  function track(payload) {
    if (!/^(www\.)?maprisma\.(com|de)$/.test(location.hostname)) return;
    try {
      fetch("api/track.php", {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (_) {
      // Counting must never break the page
    }
  }

  function renderInstallModalContent() {
    const app = apps.find((a) => a.id === installModalState.appId);
    if (!app) return;
    const mac = getMacosInfo(app.id);
    const useMacos = Boolean(mac && installModalState.platform === "macos");

    if (imPlatformTabs) {
      imPlatformTabs.style.display = mac ? "inline-flex" : "none";
      imPlatformButtons.forEach((btn) => {
        const active = btn.dataset.platform === (useMacos ? "macos" : "linux");
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });
    }

    const ver = useMacos ? getEffectiveMacosVersion(app.id) : getEffectiveVersion(app);
    const relUrl = useMacos ? getEffectiveMacosReleaseUrl(app.id) : getEffectiveReleasesUrl(app);
    const githubUrl = useMacos ? mac.github : app.github;
    const installCmd = useMacos ? mac.installCmd : app.installCmd;
    const platformSuffix = useMacos ? " · macOS" : "";

    imTitle.textContent = `${t("modalInstallPrefix")} ${app.name}${platformSuffix} ${ver ? `(${ver})` : ""}`.trim();
    imDesc.textContent = appText(app, "tagline");
    imCode.textContent = installCmd;
    imCopyBtn.textContent = t("copyBtn");
    imGithubBtn.href = githubUrl;
    imGithubBtn.textContent = t("modalOpenRepo");

    if (relUrl) {
      imReleaseBtn.href = relUrl;
      imReleaseBtn.textContent = useMacos ? t("modalDownloadMacosRelease") : t("modalDownloadRelease");
      imReleaseBtn.style.display = "inline-flex";
    } else {
      imReleaseBtn.style.display = "none";
    }
  }

  function openInstallModal(appId) {
    const app = apps.find((a) => a.id === appId);
    if (!app) return;
    const mac = getMacosInfo(appId);
    installModalState.appId = appId;
    installModalState.platform = mac && state.desktop === "macOS" ? "macos" : "linux";
    renderInstallModalContent();
    installModalEl.classList.add("open");
    installModalEl.setAttribute("aria-hidden", "false");
  }

  async function copyText(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
      const orig = btn.textContent;
      btn.textContent = t("copiedBtn");
      setTimeout(() => {
        btn.textContent = orig;
      }, 1700);
    } catch (_) {
      // Clipboard fallback
    }
  }

  // Event listeners
  if (gridEl) {
    gridEl.addEventListener("click", (e) => {
      const target = e.target.closest("[data-action]");
      if (!target) return;
      const action = target.dataset.action;
      const appId = target.dataset.appId;

      if (action === "slide-prev") {
        updateCardSlide(appId, (state.cardSlide[appId] || 0) - 1);
      } else if (action === "slide-next") {
        updateCardSlide(appId, (state.cardSlide[appId] || 0) + 1);
      } else if (action === "slide-goto") {
        updateCardSlide(appId, Number(target.dataset.index || 0));
      } else if (action === "open-lightbox") {
        openLightbox(appId);
      } else if (action === "open-install") {
        openInstallModal(appId);
        track({ e: "install", app: appId, lang: state.lang });
      }
    });
  }

  const heroShowcase = document.getElementById("hero-showcase");
  if (heroShowcase) {
    heroShowcase.addEventListener("click", () => openLightbox((window.MAPRISMA_SITE && window.MAPRISMA_SITE.heroAppId) || "maprisma", 0));
  }

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      state.category = chip.dataset.category;
      filterChips.forEach((c) => c.classList.toggle("active", c === chip));
      renderCards();
    });
  });

  if (desktopSelect) {
    desktopSelect.addEventListener("change", () => {
      state.desktop = desktopSelect.value;
      renderCards();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.query = searchInput.value;
      renderCards();
    });
  }

  viewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cols = Number(btn.dataset.cols);
      state.cols = cols;
      gridEl.classList.toggle("cols-3", cols === 3);
      viewButtons.forEach((b) => b.classList.toggle("active", b === btn));
    });
  });

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.lang = btn.dataset.lang;
      localStorage.setItem("maprisma-site-lang", state.lang);
      applyStaticTranslations();
      renderCards();
      if (lightboxEl && lightboxEl.classList.contains("open")) {
        syncLightbox();
      }
      if (installModalEl && installModalEl.classList.contains("open")) {
        renderInstallModalContent();
      }
    });
  });

  if (syncBtn) {
    syncBtn.addEventListener("click", syncGithubReleases);
  }

  if (lbPrev && lbNext) {
    lbPrev.addEventListener("click", () => {
      state.lightbox.index -= 1;
      syncLightbox();
    });
    lbNext.addEventListener("click", () => {
      state.lightbox.index += 1;
      syncLightbox();
    });
  }

  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", closeModals);
  });

  [lightboxEl, installModalEl].filter(Boolean).forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModals();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModals();
    } else if (lightboxEl && lightboxEl.classList.contains("open")) {
      if (e.key === "ArrowLeft") {
        state.lightbox.index -= 1;
        syncLightbox();
      } else if (e.key === "ArrowRight") {
        state.lightbox.index += 1;
        syncLightbox();
      }
    }
  });

  if (imCopyBtn) {
    imCopyBtn.addEventListener("click", () => {
      copyText(imCode.textContent, imCopyBtn);
    });
  }

  imPlatformButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      installModalState.platform = btn.dataset.platform === "macos" ? "macos" : "linux";
      renderInstallModalContent();
    });
  });

  document.querySelectorAll("[data-copy-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pre = document.getElementById(btn.dataset.copyTarget);
      if (pre) copyText(pre.textContent, btn);
    });
  });

  // Theme switcher
  const THEMES = {
    dark: { mode: "dark", color: "#0a0e17" },
    light: { mode: "light", color: "#f4f7fb" },
    "tokyo-night": { mode: "dark", color: "#13141c" },
    catppuccin: { mode: "dark", color: "#161622" },
    nord: { mode: "dark", color: "#222730" },
    gruvbox: { mode: "dark", color: "#1e1e1e" },
    "flexoki-light": { mode: "light", color: "#f2efe4" }
  };

  function getSavedTheme() {
    try {
      const raw = localStorage.getItem("maprisma-site-theme");
      if (raw && Object.prototype.hasOwnProperty.call(THEMES, raw)) {
        return raw;
      }
    } catch (_) {
      // Ignore storage access errors
    }
    return "dark";
  }

  function applyTheme(slug, persist) {
    const valid = Object.prototype.hasOwnProperty.call(THEMES, slug) ? slug : "dark";
    const info = THEMES[valid];
    if (valid === "dark") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", valid);
    }
    document.documentElement.setAttribute("data-mode", info.mode);

    const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
    if (colorSchemeMeta) colorSchemeMeta.setAttribute("content", info.mode);
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) themeColorMeta.setAttribute("content", info.color);

    if (themeSelect && themeSelect.value !== valid) {
      themeSelect.value = valid;
    }
    if (persist) {
      try {
        localStorage.setItem("maprisma-site-theme", valid);
      } catch (_) {
        // Ignore storage quota or privacy mode errors
      }
    }
  }

  applyTheme(getSavedTheme(), false);

  // Corners: rounded (default) or square, remembered like the theme
  function applyCorners(value, persist) {
    const corners = value === "square" ? "square" : "round";
    if (corners === "square") {
      document.documentElement.setAttribute("data-corners", "square");
    } else {
      document.documentElement.removeAttribute("data-corners");
    }
    cornerButtons.forEach((btn) => {
      const on = btn.dataset.corners === corners;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (persist) {
      try {
        localStorage.setItem("maprisma-site-corners", corners);
      } catch (_) {
        // Ignore storage quota or privacy mode errors
      }
    }
  }

  let savedCorners = "round";
  try {
    savedCorners = localStorage.getItem("maprisma-site-corners") || "round";
  } catch (_) {
    // Ignore storage access errors
  }
  applyCorners(savedCorners, false);
  cornerButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyCorners(btn.dataset.corners, true));
  });
  if (themeSelect) {
    themeSelect.addEventListener("change", () => {
      applyTheme(themeSelect.value, true);
    });
  }

  if (gridEl) gridEl.classList.toggle("cols-3", state.cols === 3); viewButtons.forEach((b) => b.classList.toggle("active", Number(b.dataset.cols) === state.cols)); // init-cols
  applyStaticTranslations();
  renderCards();
  autoSyncServerReleases();
  track({ e: "visit" });
})();
