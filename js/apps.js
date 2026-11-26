/**
 * Maprisma App Catalog & Layout Config (Managed by Netcup Control · sha256:9d49075397fa)
 * -----------------------------------------------------------------------------------
 * Source of truth: /mnt/Data/Projects/netcup-control/state/site-control.json
 * Regenerate via: netcup-control-core apply
 */
window.MAPRISMA_SITE = {
  "defaultCols": 2,
  "layoutStyle": "bento",
  "motion": "lively",
  "heroAppId": "maprisma",
  "heroScreenshot": "assets/screenshots/maprisma-map.webp",
  "categories": [
    {
      "id": "all",
      "label": "All Apps",
      "label_de": "Alle Apps",
      "enabled": true
    },
    {
      "id": "ai",
      "label": "AI & Voice",
      "label_de": "KI & Sprache",
      "enabled": true
    },
    {
      "id": "desktop",
      "label": "Desktop Apps",
      "label_de": "Desktop-Apps",
      "enabled": true
    },
    {
      "id": "monitors",
      "label": "Panel Monitors",
      "label_de": "Panel-Monitore",
      "enabled": true
    },
    {
      "id": "shell",
      "label": "Shell & Windowing",
      "label_de": "Shell & Fenster",
      "enabled": true
    }
  ]
};

window.MAPRISMA_APPS = [
  {
    "id": "maprisma",
    "name": "Maprisma",
    "version": "v2.1.5",
    "repoSlug": "maprisma/maprisma",
    "tagline": "Your AI agents, local LLMs, models & MCP tools on one visual map",
    "tagline_de": "Deine KI-Agenten, lokalen LLMs, Modelle & MCP-Tools auf einer Karte",
    "description": "See, connect and put to work your entire local and cloud AI setup. Draw a line to wire coding agents (Claude Code, Codex, Copilot, Gemini, Antigravity, OpenCode, Pi) to local LLMs (llama.cpp, Ollama, LM Studio, vLLM), MCP servers, and skill folders — and plan and run whole projects with a team of agents on the Projects tab, the AI Project Center: a lead, implementers and a read-only reviewer, with your approval before anything runs. Live agent activity reporting, an opt-in local activity log, SHA-256 verified installs, security checks, and full Undo.",
    "description_de": "Sieh, verbinde und nutze dein gesamtes lokales und Cloud-KI-Setup. Ziehe eine Linie, um Coding-Agenten (Claude Code, Codex, Copilot, Gemini, Antigravity, OpenCode, Pi) mit lokalen LLMs (llama.cpp, Ollama, LM Studio, vLLM), MCP-Servern und Skill-Ordnern zu verknüpfen — und plane und führe ganze Projekte mit einem Team aus Agenten im Projekte-Tab aus, dem AI Project Center: Leitung, Umsetzung und ein Prüfer nur mit Lesezugriff, und nichts läuft ohne deine Freigabe. Dazu Live-Aktivitätsberichte, ein optionales lokales Aktivitätsprotokoll, SHA-256-geprüfte Installationen, Sicherheitscheck und Rückgängig-Funktion.",
    "category": "ai",
    "categoryLabel": "AI & Voice",
    "categoryLabel_de": "KI & Sprache",
    "featured": true,
    "tech": "Flutter · Dart",
    "desktops": [
      "COSMIC",
      "KDE Plasma",
      "Hyprland",
      "Linux",
      "macOS"
    ],
    "icon": "assets/icons/maprisma.svg",
    "github": "https://github.com/maprisma/maprisma",
    "releases": "https://github.com/maprisma/maprisma/releases",
    "installCmd": "# Download the latest release archive from GitHub Releases, verify & install:\nsha256sum -c maprisma-*-x86_64.tar.gz.sha256\ntar -xzf maprisma-*-x86_64.tar.gz && cd maprisma-*\n./install.sh",
    "highlights": [
      "New in 2.1.5: run projects on a schedule — daily, on chosen weekdays or every few hours, even while Maprisma is closed",
      "New in 2.1.5: drag and drop to move cards and boxes, Ctrl+Up/Down, and a list of every keyboard shortcut",
      "AI Project Center: plan & run projects with a team of agents, approved by you",
      "Draw-to-connect 2D/3D map with live preview & Undo",
      "Live agent activity reports & opt-in local activity log (TXT/JSON/MCP)",
      "SHA-256 verified local LLM downloads & per-agent security check",
      "Also available for macOS (Apple Silicon)"
    ],
    "highlights_de": [
      "Neu in 2.1.5: Projekte nach Zeitplan ausführen — täglich, an gewählten Wochentagen oder alle paar Stunden, auch wenn Maprisma geschlossen ist",
      "Neu in 2.1.5: Karten und Boxen per Drag & Drop verschieben, Strg+Hoch/Runter und eine Liste aller Tastenkürzel",
      "AI Project Center: Projekte mit einem Agenten-Team planen & ausführen, mit deiner Freigabe",
      "Verbinden per Linie auf der 2D-/3D-Karte mit Vorschau & Undo",
      "Live-Aktivitätsberichte & optionales lokales Aktivitätsprotokoll (TXT/JSON/MCP)",
      "SHA-256-geprüfte lokale LLM-Downloads & Sicherheitscheck pro Agent",
      "Auch für macOS (Apple Silicon) verfügbar"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/maprisma-projects-tab.webp",
        "caption": "The Projects tab with a project open, next to the AI Map",
        "caption_de": "Der Projekte-Tab mit einem geöffneten Projekt, neben der KI-Karte"
      },
      {
        "src": "assets/screenshots/maprisma-project-center.webp",
        "caption": "AI Project Center: a project's goal, its plan and its team of agents",
        "caption_de": "AI Project Center: Ziel, Plan und Agenten-Team eines Projekts"
      },
      {
        "src": "assets/screenshots/maprisma-map.webp",
        "caption": "Visual map connecting MCP servers, coding agents, providers, and local models",
        "caption_de": "Visuelle Karte für MCP-Server, Coding-Agenten, Anbieter und lokale Modelle"
      },
      {
        "src": "assets/screenshots/maprisma-demo.gif",
        "caption": "Animated demo: wire an agent to a local LLM, model, MCP server, and skill folder",
        "caption_de": "Animierte Demo: Agent per Linie mit lokalem LLM, Modell, MCP-Server und Skills verbinden"
      },
      {
        "src": "assets/screenshots/maprisma-connect.webp",
        "caption": "Preview every connection before applying, with one-click Undo",
        "caption_de": "Jede Änderung vorab prüfen und jederzeit mit einem Klick rückgängig machen"
      },
      {
        "src": "assets/screenshots/maprisma-ask-ai.webp",
        "caption": "Ask AI assistant: configure MCP servers and skills through reviewed proposals",
        "caption_de": "Ask-AI-Assistent: MCP-Server und Skills über geprüfte Vorschläge einrichten"
      }
    ]
  },
  {
    "id": "theme",
    "name": "Maprisma Theme",
    "version": "v0.6.2",
    "repoSlug": "maprisma/theme",
    "tagline": "Unified theme manager, custom palette builder & workspace presets",
    "tagline_de": "Theme-Manager, eigener Farbpaletten-Editor & Workspace-Layouts",
    "description": "Every desktop theme in one keyboard-first gallery for COSMIC, KDE Plasma, and Hyprland. Create themes from any wallpaper, assign day/night schedules or per-workspace themes, configure fonts and blur, or ask a coding agent / local model to design a new palette.",
    "description_de": "Alle Desktop-Themes an einem Ort für COSMIC, KDE Plasma und Hyprland. Erstelle eigene Themes aus jedem Hintergrundbild, nutze Tag-/Nacht-Automatik oder Themes pro Arbeitsfläche, passe Schriften und Unschärfe an oder lass dir per Ask AI ein neues Theme entwerfen.",
    "category": "desktop",
    "categoryLabel": "Desktop Apps",
    "categoryLabel_de": "Desktop-Apps",
    "featured": true,
    "tech": "Flutter · Rust",
    "desktops": [
      "COSMIC",
      "KDE Plasma",
      "Hyprland"
    ],
    "icon": "assets/icons/theme.svg",
    "github": "https://github.com/maprisma/theme",
    "releases": "https://github.com/maprisma/theme/releases",
    "installCmd": "# AppImage from GitHub Releases (github.com/maprisma/theme/releases):\nsha256sum -c Maprisma-Theme-*-x86_64.AppImage.sha256\nchmod +x Maprisma-Theme-*-x86_64.AppImage\n./Maprisma-Theme-*-x86_64.AppImage\n# Or from source, with bar icon and desktop integration:\ngit clone https://github.com/maprisma/theme.git maprisma-theme\ncd maprisma-theme\n./tools/install-local",
    "highlights": [
      "Syncs desktop, terminal & editor colors (colors.toml)",
      "Generate themes from pictures or via Ask AI",
      "Drag-and-drop workspace layout presets"
    ],
    "highlights_de": [
      "Synchronisiert Desktop-, Terminal- & Editor-Farben (colors.toml)",
      "Themes aus Bildern oder per Ask AI generieren",
      "Workspace-Layouts bequem per Drag & Drop festlegen"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/theme-gallery.webp",
        "caption": "Keyboard-first theme gallery with live desktop previews and favorites",
        "caption_de": "Schnelle Theme-Galerie mit Live-Desktopvorschau und Favoriten"
      },
      {
        "src": "assets/screenshots/theme-ask-ai.webp",
        "caption": "Ask AI theme designer using local models or coding agents",
        "caption_de": "Ask-AI-Theme-Designer mit lokalen Modellen oder Coding-Agenten"
      },
      {
        "src": "assets/screenshots/theme-presets.webp",
        "caption": "Per-workspace window limits and tiling layout presets",
        "caption_de": "Fensterlimits und Tiling-Layouts pro Arbeitsfläche"
      },
      {
        "src": "assets/screenshots/theme-tokyo-night.webp",
        "caption": "Sample coordinated Tokyo Night desktop theme preview",
        "caption_de": "Beispielvorschau des abgestimmten Tokyo-Night-Themes"
      }
    ]
  },
  {
    "id": "wlan-monitor",
    "name": "Maprisma WLAN Monitor",
    "version": "v0.2.0",
    "repoSlug": "maprisma/wlan-monitor",
    "tagline": "See who is on your Wi-Fi in plain words, right from the panel",
    "tagline_de": "Im Klartext sehen, wer in deinem WLAN ist — direkt aus der Leiste",
    "description": "A radar icon in your panel that shows Wi-Fi signal quality in plain words, live throughput, VPN reachability warnings, and every device on your network grouped by Wi-Fi band or platform — with instant alerts when an unknown device joins.",
    "description_de": "Ein Radar-Icon in deiner Leiste zeigt Signalqualität in klaren Worten, Live-Durchsatz, VPN-Hinweise für dein Heimnetz und alle verbundenen Geräte gruppiert nach Frequenzband oder Hersteller — samt Warnpunkt bei neuen Geräten.",
    "category": "monitors",
    "categoryLabel": "Panel Monitors",
    "categoryLabel_de": "Panel-Monitore",
    "featured": false,
    "tech": "Rust (libcosmic) · Python",
    "desktops": [
      "COSMIC",
      "KDE Plasma",
      "Hyprland"
    ],
    "icon": "assets/icons/wlan.svg",
    "github": "https://github.com/maprisma/wlan-monitor",
    "releases": null,
    "installCmd": "git clone https://github.com/maprisma/wlan-monitor.git maprisma-wlan-monitor\ncd maprisma-wlan-monitor\n./install.sh",
    "highlights": [
      "Device list & interactive Wi-Fi band tree map",
      "VPN local-network block detection & FRITZ!Box mesh info",
      "Red badge alert when a new device joins"
    ],
    "highlights_de": [
      "Geräteliste & Netzwerkkarte nach WLAN-Bändern",
      "VPN-Heimnetz-Prüfung & FRITZ!Box-Mesh-Details",
      "Sofort-Hinweis, wenn ein neues Gerät beitritt"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/wlan-devices.webp",
        "caption": "Connected devices grouped by platform with signal quality and VPN check",
        "caption_de": "Verbundene Geräte nach Plattform gruppiert inklusive Signalstärke & VPN-Check"
      },
      {
        "src": "assets/screenshots/wlan-map.webp",
        "caption": "Network topology map organized by 6 GHz, 5 GHz, 2.4 GHz, and LAN",
        "caption_de": "Netzwerkkarte aufgeteilt nach 6 GHz, 5 GHz, 2,4 GHz und LAN"
      }
    ]
  },
  {
    "id": "llm-monitor",
    "name": "Maprisma LLM Monitor",
    "version": "v0.2.0",
    "repoSlug": "maprisma/llm-monitor",
    "tagline": "Live GPU/unified memory, context fill & tok/s monitor for local LLMs",
    "tagline_de": "GPU-/Unified-Memory, Kontext-Füllstand & Tok/s lokaler LLMs in Leiste & Menüleiste",
    "description": "See at a glance from your Linux panel or macOS menu bar when llama.cpp, Ollama, LM Studio, or vLLM is holding GPU/unified memory, how full its context window is (green-to-red bar), live tokens/sec, which agent is using it, and free memory with a single click.",
    "description_de": "Sieh auf einen Blick in deiner Linux-Leiste oder macOS-Menüleiste, wann llama.cpp, Ollama, LM Studio oder vLLM GPU- bzw. Unified-Memory belegen, wie voll das Kontextfenster ist (Grün-bis-Rot-Balken), wie schnell Tokens generiert werden, welcher Agent das Modell nutzt — plus 1-Klick-Speicherfreigabe.",
    "category": "monitors",
    "categoryLabel": "Panel Monitors",
    "categoryLabel_de": "Panel-Monitore",
    "featured": false,
    "tech": "Rust (libcosmic) · SwiftUI · Python",
    "desktops": [
      "COSMIC",
      "KDE Plasma",
      "Hyprland",
      "macOS"
    ],
    "icon": "assets/icons/llm.svg",
    "github": "https://github.com/maprisma/llm-monitor",
    "releases": null,
    "installCmd": "git clone https://github.com/maprisma/llm-monitor.git maprisma-llm-monitor\ncd maprisma-llm-monitor\n./install.sh",
    "highlights": [
      "Live VRAM / unified memory split: LLM vs. desktop vs. free memory",
      "Context & output buffer fill + live tok/s + one-click memory unload",
      "Available for Linux panels & native macOS (Apple Silicon) menu bar"
    ],
    "highlights_de": [
      "VRAM- & Unified-Memory-Aufteilung: Modelle vs. System vs. frei",
      "Kontext-Füllstand, Live-Tok/s & 1-Klick-Speicherfreigabe",
      "Für Linux-Panels & native macOS-Menüleiste (Apple Silicon)"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/llm-monitor.webp",
        "caption": "Detailed GPU VRAM, context buffer fill, tokens/sec, and active runtime breakdown",
        "caption_de": "Detailansicht zu GPU-Speicher, Kontextpuffer, Tok/s und aktiven LLM-Diensten"
      }
    ]
  },
  {
    "id": "bluetooth-monitor",
    "name": "Maprisma Bluetooth Monitor",
    "version": "v0.2.0",
    "repoSlug": "maprisma/bluetooth-monitor",
    "tagline": "Every wireless device, dongle & battery level mapped in your panel",
    "tagline_de": "Alle Funkgeräte, USB-Dongles & Akkustände übersichtlich im Panel",
    "description": "Tracks batteries and connections across Bluetooth adapters and Logitech Unifying, Bolt, Nano, and Lightspeed dongles. The panel icon shifts color or morphs into the device needing a charge, and the popup includes full Bluetooth scanning and pairing.",
    "description_de": "Überwacht Akkustände und Verbindungen über Bluetooth-Adapter sowie Logitech Unifying-, Bolt-, Nano- und Lightspeed-Empfänger hinweg. Das Leisten-Icon warnt farblich bei schwachem Akku, und das Popup bietet direktes Bluetooth-Koppeln.",
    "category": "monitors",
    "categoryLabel": "Panel Monitors",
    "categoryLabel_de": "Panel-Monitore",
    "featured": false,
    "tech": "Rust (libcosmic) · Python",
    "desktops": [
      "COSMIC",
      "KDE Plasma",
      "Hyprland"
    ],
    "icon": "assets/icons/bluetooth.svg",
    "github": "https://github.com/maprisma/bluetooth-monitor",
    "releases": null,
    "installCmd": "git clone https://github.com/maprisma/bluetooth-monitor.git maprisma-bluetooth-monitor\ncd maprisma-bluetooth-monitor\n./install.sh",
    "highlights": [
      "Visual map of PC, USB receivers & Bluetooth adapters",
      "Low/critical battery warnings right on the bar icon",
      "Built-in Bluetooth scan, pair, connect & audio switch"
    ],
    "highlights_de": [
      "Verbindungskarte für PC, USB-Dongles & Bluetooth-Adapter",
      "Akku-Warnfarben direkt am Leisten-Icon",
      "Integriertes Suchen, Koppeln & Verbinden von Geräten"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/bluetooth-map.webp",
        "caption": "Connection map of USB Bolt/Unifying dongles, adapters, and device batteries",
        "caption_de": "Verbindungskarte aller Bolt-/Unifying-Empfänger, Adapter und Akkustände"
      },
      {
        "src": "assets/screenshots/bluetooth-pair.webp",
        "caption": "Integrated Bluetooth pairing and connection management",
        "caption_de": "Direkte Bluetooth-Kopplung und Verbindungsverwaltung im Panel"
      }
    ]
  },
  {
    "id": "hue-lights",
    "name": "Maprisma Lights",
    "version": "v0.5.0",
    "repoSlug": "maprisma/hue-lights",
    "tagline": "Multi-brand local smart lighting, Floorplan Studio v2, schedules, wired rules & Audio Light Synth",
    "tagline_de": "Markenübergreifende lokale Lichtsteuerung, Grundriss-Studio v2, Zeitpläne, Regeln & Audio-Licht-Synth",
    "description": "Control Philips Hue Bridges alongside local Home Assistant, WLED, WiZ, LIFX, Govee LAN, Nanoleaf, Shelly, and IKEA DIRIGERA lights in one local-first studio — 100% free and open source on Linux and macOS. Design multi-floor 2D Floorplan Studio layouts with polygon rooms, 12 lamp icons, lighting planner, typed dependency wires, 1-click Bridge sync, schedules, visual rules, Audio-Reactive Light Synthesizer, and 8 languages.",
    "description_de": "Steuere Philips Hue Bridges zusammen mit lokalem Home Assistant, WLED, WiZ, LIFX, Govee LAN, Nanoleaf, Shelly und IKEA DIRIGERA in einem lokalen Studio — 100 % kostenlos und Open Source für Linux und macOS. Gestalte mehrstöckige 2D-Grundrisse mit Polygon-Räumen, 12 Lampen-Icons, Lichtplaner, Abhängigkeits-Leitungen, 1-Klick-Bridge-Sync, Zeitplänen, visuellen Regeln, Echtzeit-Audio-Licht-Synthesizer und 8 Sprachen.",
    "category": "monitors",
    "categoryLabel": "Panel Monitors",
    "categoryLabel_de": "Panel-Monitore",
    "featured": false,
    "tech": "Rust (libcosmic) · SwiftUI · Python",
    "desktops": [
      "COSMIC",
      "KDE Plasma",
      "Hyprland",
      "macOS"
    ],
    "icon": "assets/icons/hue.svg",
    "github": "https://github.com/maprisma/hue-lights",
    "releases": "https://github.com/maprisma/hue-lights/releases",
    "installCmd": "git clone https://github.com/maprisma/hue-lights.git maprisma-hue-lights\ncd maprisma-hue-lights\n./install.sh",
    "highlights": [
      "Multi-brand local control: Philips Hue, Home Assistant, WLED, WiZ, LIFX, Govee LAN, Nanoleaf, Shelly & IKEA DIRIGERA",
      "Floorplan Studio v2: polygon rooms, multi-floor layouts, lighting planner, dependency wires & 1-click Bridge sync",
      "Native Linux panel/tray app & SwiftUI macOS (Apple Silicon) app — 100% local & free in 8 languages"
    ],
    "highlights_de": [
      "Markenübergreifend lokal: Philips Hue, Home Assistant, WLED, WiZ, LIFX, Govee LAN, Nanoleaf, Shelly & IKEA DIRIGERA",
      "Grundriss-Studio v2: Polygon-Räume, mehrere Etagen, Lichtplaner, Abhängigkeits-Linien & 1-Klick-Bridge-Sync",
      "Native Linux-Panel-/Tray-App & SwiftUI-App für macOS (Apple Silicon) — 100 % lokal & kostenlos in 8 Sprachen"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/hue-map.webp",
        "caption": "Interactive Floorplan Studio with polygon rooms, 12 lamp icons, typed dependency wires, and 1-click Bridge sync",
        "caption_de": "Interaktives Grundriss-Studio mit Polygon-Räumen, 12 Lampen-Icons, Abhängigkeits-Linien und 1-Klick-Bridge-Sync"
      },
      {
        "src": "assets/screenshots/hue-rooms.webp",
        "caption": "Rooms, Favorites, filters, and 5 studio tabs (Lights, Map, Schedules, Rules, Synth)",
        "caption_de": "Räume, Favoriten, Filter und 5 Studio-Tabs (Lichter, Karte, Zeitpläne, Regeln, Synth)"
      },
      {
        "src": "assets/screenshots/hue-scenes.webp",
        "caption": "Maprisma Lights overview pairing the Floorplan Studio and Rooms view",
        "caption_de": "Maprisma Lights im Überblick mit Grundriss-Studio und Raumansicht"
      }
    ]
  },
  {
    "id": "settings",
    "name": "Maprisma Settings",
    "version": "v0.9.0",
    "repoSlug": "maprisma/settings",
    "tagline": "Install, update, remove Maprisma & system apps and place bar icons",
    "tagline_de": "Maprisma- & System-Apps installieren, aktualisieren, entfernen & Leisten-Icons platzieren",
    "description": "The central app manager and control hub for the Maprisma family and your installed Linux apps. Manage all installed non-Maprisma apps on the top Apps page, install, update, and cleanly remove any Maprisma app (including Maprisma Clipboard and Maprisma Lights), place or reorder panel/tray icons on COSMIC, KDE Plasma, and Maprisma Shell, and configure shared Ask AI permissions, Voice, and Notifications. The Optimize page ranks the CachyOS download mirrors, tunes DNS, TCP (BBR) and Wi-Fi power saving, and sets Bluetooth options; the sidebar can be dragged into your own order with movable separators.",
    "description_de": "Die zentrale Verwaltung für alle Maprisma-Apps und deine installierten Linux-Programme. Verwalte alle installierten Nicht-Maprisma-Apps auf der Apps-Seite ganz oben, installiere, aktualisiere und entferne jede Maprisma-App (inkl. Maprisma Clipboard und Maprisma Lights) per Klick, platziere Leisten- und Tray-Symbole unter COSMIC, KDE Plasma und Maprisma Shell und steuere gemeinsame Ask-AI-Regeln, Spracheingabe und Benachrichtigungen. Die Seite „Optimieren“ bewertet die CachyOS-Spiegelserver, stimmt DNS, TCP (BBR) und WLAN-Energiesparen ab und setzt Bluetooth-Optionen; die Seitenleiste lässt sich samt verschiebbarer Trennlinien in deine eigene Reihenfolge ziehen.",
    "category": "desktop",
    "categoryLabel": "Desktop Apps",
    "categoryLabel_de": "Desktop-Apps",
    "featured": true,
    "tech": "Flutter · Dart · Rust",
    "desktops": [
      "COSMIC",
      "KDE Plasma",
      "Hyprland",
      "Linux"
    ],
    "icon": "assets/icons/settings.svg",
    "github": "https://github.com/maprisma/settings",
    "releases": "https://github.com/maprisma/settings/releases",
    "installCmd": "# AppImage from GitHub Releases (github.com/maprisma/settings/releases):\nsha256sum -c Maprisma-Settings-*-x86_64.AppImage.sha256\nchmod +x Maprisma-Settings-*-x86_64.AppImage\n./Maprisma-Settings-*-x86_64.AppImage\n# Or from source, with bar icon and desktop integration:\ngit clone https://github.com/maprisma/settings.git maprisma-settings\ncd maprisma-settings\n./tools/install-local",
    "highlights": [
      "New in 0.9.0: Optimize page – rank CachyOS mirrors, tune DNS, BBR, Wi-Fi & Bluetooth",
      "Drag the sidebar entries and separators into your own order",
      "Top Apps page to launch, update, and remove installed non-Maprisma apps",
      "One-click install, atomic updates, panel/tray icon placement & shared Ask AI rules"
    ],
    "highlights_de": [
      "Neu in 0.9.0: Seite „Optimieren“ – CachyOS-Spiegelserver bewerten, DNS, BBR, WLAN & Bluetooth abstimmen",
      "Seitenleisten-Einträge und Trennlinien per Drag & Drop selbst anordnen",
      "Apps-Seite ganz oben zum Starten, Aktualisieren & Entfernen installierter Nicht-Maprisma-Apps",
      "1-Klick-Installation, atomare Updates, Leisten-/Tray-Icons & gemeinsame Ask-AI-Regeln"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/settings-apps.webp",
        "caption": "Manage installed Maprisma apps, updates, bar icons, and Ask AI rules",
        "caption_de": "Installierte Maprisma-Apps, Updates, Leisten-Icons und Ask-AI-Regeln verwalten"
      },
      {
        "src": "assets/screenshots/settings-optimize.webp",
        "caption": "Optimize: rank the CachyOS mirrors now or automatically, with the fastest mirrors listed",
        "caption_de": "Optimieren: CachyOS-Spiegelserver jetzt oder automatisch bewerten, mit den schnellsten Servern"
      },
      {
        "src": "assets/screenshots/settings-optimize-network.webp",
        "caption": "Optimize: DNS speed test and servers, TCP BBR, Wi-Fi power saving and Bluetooth options",
        "caption_de": "Optimieren: DNS-Geschwindigkeitstest und -Server, TCP BBR, WLAN-Energiesparen und Bluetooth-Optionen"
      }
    ]
  },
  {
    "id": "launcher",
    "name": "Maprisma Launcher",
    "version": "v0.4.1",
    "repoSlug": "maprisma/launcher",
    "tagline": "Theme-aware app launcher, AI package advisor, live shortcut map & dock",
    "tagline_de": "Theme-passender App-Starter, KI-Paketberater, Live-Tastenkarte & Dock",
    "description": "Launch apps, switch windows, organize custom groups, and bind global shortcuts with an owner-colored live keyboard map. Includes an optional layer-shell dock, 3D workspace cube view, and Ask AI package recommendations powered by cloud agents or local LLMs.",
    "description_de": "Starte Apps, wechsle Fenster, organisiere eigene Gruppen und vergib globale Tastenkürzel auf einer farbcodierten Live-Tastaturkarte. Mit optionalem Wayland-Dock, 3D-Würfelansicht und Ask-AI-Paketempfehlungen über lokale LLMs oder Coding-Agenten.",
    "category": "desktop",
    "categoryLabel": "Desktop Apps",
    "categoryLabel_de": "Desktop-Apps",
    "featured": true,
    "tech": "Flutter · Rust",
    "desktops": [
      "COSMIC",
      "KDE Plasma",
      "Hyprland"
    ],
    "icon": "assets/icons/launcher.svg",
    "github": "https://github.com/maprisma/launcher",
    "releases": "https://github.com/maprisma/launcher/releases",
    "installCmd": "# AppImage from GitHub Releases (github.com/maprisma/launcher/releases):\nsha256sum -c Maprisma-Launcher-*-x86_64.AppImage.sha256\nchmod +x Maprisma-Launcher-*-x86_64.AppImage\n./Maprisma-Launcher-*-x86_64.AppImage\n# Or from source, with bar icon and desktop integration:\ngit clone https://github.com/maprisma/launcher.git maprisma-launcher\ncd maprisma-launcher\n./tools/install-local",
    "highlights": [
      "App groups, window switcher & optional dock",
      "Live owner-colored global shortcut keyboard map",
      "Ask AI package advisor in 8 languages"
    ],
    "highlights_de": [
      "App-Gruppen, Fensterwechsler & optionales Dock",
      "Farbcodierte Live-Tastaturkarte für globale Shortcuts",
      "Ask-AI-Softwareberater in 8 Sprachen"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/launcher-grid.webp",
        "caption": "Grouped app cards with rich window actions, floating launch, and shortcut menu",
        "caption_de": "Gruppierte App-Karten mit Fensteraktionen, Floating-Start und Shortcut-Menü"
      },
      {
        "src": "assets/screenshots/launcher-ask-ai.webp",
        "caption": "Ask AI software advisor running locally on Ollama / llama.cpp or cloud agents",
        "caption_de": "Ask-AI-Paketberater lokal mit Ollama / llama.cpp oder Cloud-Agenten"
      },
      {
        "src": "assets/screenshots/launcher-keys.webp",
        "caption": "Owner-colored live keyboard shortcut map with conflict-free rebinding",
        "caption_de": "Farbcodierte Live-Tastenkarte für konfliktfreies Umbelegen von Shortcuts"
      },
      {
        "src": "assets/screenshots/launcher-cube.webp",
        "caption": "3D cube view and optional Wayland layer-shell dock",
        "caption_de": "3D-Würfelansicht und optionales Wayland-Layer-Shell-Dock"
      },
      {
        "src": "assets/screenshots/launcher-dock.webp",
        "caption": "Minimal bottom dock with pinned apps and quick desktop actions",
        "caption_de": "Schlankes Dock mit angehefteten Apps und Desktop-Schnellaktionen"
      }
    ]
  },
  {
    "id": "playground",
    "name": "Maprisma Playground",
    "version": "v0.3.1",
    "repoSlug": "maprisma/playground",
    "tagline": "Benchmark, pit head-to-head, and play chess with your AI agents & LLMs",
    "tagline_de": "KI-Agenten & lokale LLMs testen, blind vergleichen und im Schach fordern",
    "description": "Test what the AI agents and local models on your PC can really do — one experiment per tab. Compare speed and token cost side-by-side, judge blind head-to-head answers, play chess against agents, test vision models, or generate images locally via Vulkan.",
    "description_de": "Probiere aus, was die KI-Agenten und lokalen Modelle auf deinem PC leisten — ein Experiment pro Tab. Vergleiche Geschwindigkeit und Kosten direkt nebeneinander, bewerte Antworten im Blindvergleich, spiele Schach gegen Agenten, teste Bilderkennung oder generiere Bilder lokal per Vulkan.",
    "category": "ai",
    "categoryLabel": "AI & Voice",
    "categoryLabel_de": "KI & Sprache",
    "featured": true,
    "tech": "Flutter · Rust",
    "desktops": [
      "COSMIC",
      "KDE Plasma",
      "Linux"
    ],
    "icon": "assets/icons/playground.svg",
    "github": "https://github.com/maprisma/playground",
    "releases": "https://github.com/maprisma/playground/releases",
    "installCmd": "# AppImage from GitHub Releases (github.com/maprisma/playground/releases):\nsha256sum -c Maprisma-Playground-*-x86_64.AppImage.sha256\nchmod +x Maprisma-Playground-*-x86_64.AppImage\n./Maprisma-Playground-*-x86_64.AppImage\n# Or from source, with bar icon and desktop integration:\ngit clone https://github.com/maprisma/playground.git maprisma-playground\ncd maprisma-playground\n./tools/install-local",
    "highlights": [
      "Speed, token & cost benchmarks across agents",
      "Blind head-to-head judging & agent Chess",
      "Local Vulkan image generation (stable-diffusion.cpp)"
    ],
    "highlights_de": [
      "Geschwindigkeits-, Token- & Kostenvergleich",
      "Blind-Duell-Bewertung & Agenten-Schach",
      "Lokale Vulkan-Bildgenerierung (stable-diffusion.cpp)"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/playground-chess.webp",
        "caption": "Play chess against local LLMs or coding agents, or watch two agents play",
        "caption_de": "Schach gegen lokale LLMs oder Coding-Agenten — oder Agent gegen Agent"
      },
      {
        "src": "assets/screenshots/playground-speed.webp",
        "caption": "Run identical prompts across multiple agents and local models to compare speed & cost",
        "caption_de": "Gleiche Aufgabe an mehrere Agenten & lokale Modelle senden: Tempo & Kosten im Vergleich"
      },
      {
        "src": "assets/screenshots/playground-automaton.webp",
        "caption": "Interactive cellular automaton playground tab",
        "caption_de": "Interaktiver Zellulärer-Automat-Tab"
      },
      {
        "src": "assets/screenshots/playground-generate.webp",
        "caption": "100% local text-to-image generation on your GPU with SHA-256 verified weights",
        "caption_de": "100 % lokale Bildgenerierung auf deiner Grafikkarte mit SHA-256-geprüften Modellen"
      }
    ]
  },
  {
    "id": "dictation",
    "name": "Maprisma Dictation",
    "version": "v0.1.0",
    "repoSlug": "maprisma/dictation",
    "tagline": "Local Whisper voice dictation & top-center AI voice overlay for Linux & macOS",
    "tagline_de": "Lokale Whisper-Spracheingabe & KI-Sprach-Overlay für Linux & macOS",
    "description": "Local GPU-accelerated voice dictation and a sleek top-center aura pill overlay. On Linux it provides one shared D-Bus voice service (`com.maprisma.Voice1`) via whisper.cpp + Vulkan; on macOS (Apple Silicon) it ships as a native SwiftUI menu bar app with whisper.cpp Metal, Option+Space hotkey, auto-paste, and safe desktop commands in 8 languages.",
    "description_de": "Lokale GPU-beschleunigte Spracheingabe mit schwebendem Aura-Overlay am oberen Bildschirmrand. Unter Linux als gemeinsamer D-Bus-Sprachdienst (`com.maprisma.Voice1`) mit whisper.cpp + Vulkan; unter macOS (Apple Silicon) als native SwiftUI-Menüleisten-App mit whisper.cpp Metal, Option+Leertaste-Kürzel, Auto-Einfügen und sicheren Sprachbefehlen in 8 Sprachen.",
    "category": "ai",
    "categoryLabel": "AI & Voice",
    "categoryLabel_de": "KI & Sprache",
    "featured": false,
    "tech": "Rust · SwiftUI · whisper.cpp",
    "desktops": [
      "COSMIC",
      "KDE Plasma",
      "Hyprland",
      "macOS"
    ],
    "icon": "assets/icons/dictation.svg",
    "github": "https://github.com/maprisma/dictation",
    "releases": null,
    "installCmd": "git clone https://github.com/maprisma/dictation.git maprisma-dictation\ncd maprisma-dictation\n./install.sh",
    "highlights": [
      "Offline GPU speech-to-text via whisper.cpp (Vulkan on Linux, Metal on macOS)",
      "Floating aura overlay with global shortcut, VAD auto-stop & AI helper answers",
      "Native macOS (Apple Silicon) menu bar app & 8 UI languages"
    ],
    "highlights_de": [
      "Offline-Spracherkennung auf der GPU via whisper.cpp (Vulkan unter Linux, Metal auf macOS)",
      "Schwebendes Aura-Overlay mit globalem Kürzel, VAD-Auto-Stopp & KI-Antworten",
      "Native macOS-Menüleisten-App (Apple Silicon) & 8 Oberflächensprachen"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/dictation-preview.svg",
        "caption": "Top-center aura voice pill and session D-Bus voice service",
        "caption_de": "Schwebendes Sprach-Overlay mit Aura-Ring und lokalem D-Bus-Sprachdienst"
      }
    ]
  },
  {
    "id": "notifier",
    "name": "Maprisma Notifier",
    "version": "v0.1.0",
    "repoSlug": "maprisma/notifier",
    "tagline": "Persistent notification history, unread badge & scheduled Do Not Disturb",
    "tagline_de": "Benachrichtigungsverlauf, Ungelesen-Zähler & zeitgesteuertes Nicht stören",
    "description": "A lightweight notification center for COSMIC, KDE Plasma, and Hyprland. Keeps your desktop's native popups intact while recording a searchable, per-app grouped notification history with unread counts and manual or scheduled Do Not Disturb.",
    "description_de": "Eine schlanke Benachrichtigungszentrale für COSMIC, KDE Plasma und Hyprland. Die nativen Desktop-Popups bleiben erhalten, während Maprisma Notifier alle Meldungen nach App gruppiert speichert — inklusive Ungelesen-Zähler und Nicht-stören-Zeitplan.",
    "category": "monitors",
    "categoryLabel": "Panel Monitors",
    "categoryLabel_de": "Panel-Monitore",
    "featured": false,
    "tech": "Rust (libcosmic)",
    "desktops": [
      "COSMIC",
      "KDE Plasma",
      "Hyprland"
    ],
    "icon": "assets/icons/notifier.svg",
    "github": "https://github.com/maprisma/notifier",
    "releases": null,
    "installCmd": "git clone https://github.com/maprisma/notifier.git maprisma-notifier\ncd maprisma-notifier\n./install.sh",
    "highlights": [
      "History grouped by app with critical/unread markers",
      "Works alongside native COSMIC, Plasma & Shell popups",
      "One-click or scheduled Do Not Disturb"
    ],
    "highlights_de": [
      "Verlauf übersichtlich nach Apps gruppiert",
      "Ergänzt native Popups von COSMIC, Plasma & Shell",
      "Nicht stören per Schalter oder festem Zeitplan"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/notifier-history.webp",
        "caption": "Notification history grouped by app, with unread markers",
        "caption_de": "Benachrichtigungsverlauf nach App gruppiert, mit Ungelesen-Markierung"
      }
    ]
  },
  {
    "id": "clipboard",
    "name": "Maprisma Clipboard",
    "version": "v0.1.0",
    "repoSlug": "maprisma/clipboard",
    "tagline": "Fast Wayland clipboard manager with bar icon, image previews, color swatches & pinning",
    "tagline_de": "Schneller Wayland-Zwischenablage-Manager mit Leisten-Icon, Bildvorschau, Farbfeldern & Anheften",
    "description": "A fast, 100% local Rust clipboard manager and bar icon for COSMIC, KDE Plasma, and Hyprland. Captures text, code, links, CSS colors, emails, and images over Wayland with live thumbnails, color swatches, instant search, category filters, pinned favorites, keyboard shortcuts (Ctrl+1–9), pause mode, and automatic password-manager secret filtering in 8 languages.",
    "description_de": "Ein schneller, 100 % lokaler Zwischenablage-Manager in Rust mit Leisten-Icon für COSMIC, KDE Plasma und Hyprland. Erfasst Text, Code, Links, CSS-Farben, E-Mails und Bilder unter Wayland mit Live-Vorschaubildern, Farbfeldern, Sofortsuche, Kategoriefiltern, angehefteten Favoriten, Tastenkürzeln (Strg+1–9), Pause-Modus und automatischem Passwortmanager-Filter in 8 Sprachen.",
    "category": "monitors",
    "categoryLabel": "Panel Monitors",
    "categoryLabel_de": "Panel-Monitore",
    "featured": false,
    "tech": "Rust (libcosmic) · Wayland",
    "desktops": [
      "COSMIC",
      "KDE Plasma",
      "Hyprland"
    ],
    "icon": "assets/icons/clipboard.svg",
    "github": "https://github.com/maprisma/clipboard",
    "releases": "https://github.com/maprisma/clipboard/releases",
    "installCmd": "git clone https://github.com/maprisma/clipboard.git maprisma-clipboard\ncd maprisma-clipboard\n./install.sh",
    "highlights": [
      "Live image thumbnails, CSS color swatches, monospace code cards, URL domain badges & bottom inspector",
      "Keyboard-first speed (↑/↓, Enter, Ctrl+1–9, Ctrl+P pin, Esc) + tray icon with top 5 recent clips",
      "100% local private storage (0600), pause toggle, password-manager secret filter & 8 languages"
    ],
    "highlights_de": [
      "Live-Bildvorschauen, CSS-Farbfelder, Monospace-Codekarten, Link-Badges & Detail-Vorschau",
      "Tastatur-Schnellzugriff (↑/↓, Enter, Strg+1–9, Strg+P Anheften, Esc) + Tray-Icon mit den letzten 5 Einträgen",
      "100 % lokal & privat gespeichert (0600), Pause-Schalter, Passwortmanager-Filter & 8 Sprachen"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/clipboard-main.webp",
        "caption": "Searchable clipboard history with category filters, live color swatches, image thumbnails, code snippets, and bottom inspector",
        "caption_de": "Durchsuchbarer Zwischenablage-Verlauf mit Filtern, Live-Farbfeldern, Bildvorschau, Code-Snippets und Detail-Ansicht"
      },
      {
        "src": "assets/screenshots/clipboard-settings.webp",
        "caption": "Maprisma Clipboard settings: 8 languages, corners, history limit, image capture & password-manager filtering",
        "caption_de": "Maprisma-Clipboard-Einstellungen: 8 Sprachen, Ecken, Verlaufslimit, Bilderfassung & Passwortmanager-Filter"
      }
    ]
  },
  {
    "id": "shell",
    "name": "Maprisma Shell",
    "version": "v1.0",
    "repoSlug": "maprisma/shell",
    "tagline": "Complete theme-synced Hyprland desktop shell in one Quickshell config",
    "tagline_de": "Komplette, farbsynchronisierte Hyprland-Desktop-Shell auf Quickshell-Basis",
    "description": "Turns a bare Hyprland session into a cohesive Maprisma desktop using Quickshell: multi-monitor top bar, notification server with actions and DND, wallpaper daemon, PAM lock screen, volume/brightness OSD, and screenshot/recording/clipboard helpers.",
    "description_de": "Verwandelt eine Hyprland-Sitzung mit einer einzigen Quickshell-Konfiguration in einen kompletten Maprisma-Desktop: Leiste auf allen Monitoren, Benachrichtigungsserver, Wallpaper, PAM-Sperrbildschirm, Lautstärke-/Helligkeits-OSD sowie Screenshot- und Clipboard-Helfer.",
    "category": "shell",
    "categoryLabel": "Shell & Windowing",
    "categoryLabel_de": "Shell & Fenster",
    "featured": false,
    "tech": "QML (Quickshell) · Shell",
    "desktops": [
      "Hyprland"
    ],
    "icon": "assets/icons/shell.svg",
    "github": "https://github.com/maprisma/shell",
    "releases": null,
    "installCmd": "git clone https://github.com/maprisma/shell.git maprisma-shell\ncd maprisma-shell\n./install.sh",
    "highlights": [
      "Live colors synced automatically by Maprisma Theme",
      "Built-in notification server, OSD & PAM lock screen",
      "Includes screenshot, screen-record, clipboard & emoji tools"
    ],
    "highlights_de": [
      "Farben folgen automatisch dem aktiven Maprisma Theme",
      "Integrierter Notification-Server, OSD & PAM-Lockscreen",
      "Inklusive Screenshot-, Aufnahme-, Clipboard- & Emoji-Tools"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/shell-desktop.webp",
        "caption": "Theme-synced Hyprland bar and wallpaper from one Quickshell config",
        "caption_de": "Farbsynchrone Hyprland-Leiste und Hintergrundbild aus einer Quickshell-Konfiguration"
      }
    ]
  },
  {
    "id": "icons",
    "name": "Maprisma Icons",
    "version": "v1.0",
    "repoSlug": "maprisma/icons",
    "tagline": "Drag-to-reorder KDE Plasma 6 panel widget for all Maprisma tray icons",
    "tagline_de": "KDE-Plasma-6-Leistenwidget zum freien Sortieren aller Maprisma-Icons",
    "description": "KDE Plasma's default system tray sorts icons on its own; Maprisma Icons puts all your Maprisma apps in a dedicated Plasma 6 panel row where you can click, hold, and drag them into your preferred permanent order — with attention dots and native menus.",
    "description_de": "Da KDE Plasmas Systemabschnitt Symbole selbst sortiert, bündelt Maprisma Icons alle Maprisma-Apps in einer eigenen Leistenreihe: einfach anklicken, halten und dauerhaft in deine Wunschreihenfolge ziehen.",
    "category": "shell",
    "categoryLabel": "Shell & Windowing",
    "categoryLabel_de": "Shell & Fenster",
    "featured": false,
    "tech": "KDE Plasma 6 QML · Python",
    "desktops": [
      "KDE Plasma"
    ],
    "icon": "assets/icons/icons.svg",
    "github": "https://github.com/maprisma/icons",
    "releases": null,
    "installCmd": "# KDE Plasma 6, no root needed:\ngit clone https://github.com/maprisma/icons.git maprisma-icons\ncd maprisma-icons && ./install.sh\nsystemctl --user restart plasma-plasmashell\n# Then: right-click the panel → Add Widgets… → \"Maprisma Icons\"\n# Optional: Maprisma Settings arranges zones & hidden icons; the built-in\n# Launcher button needs Maprisma Launcher.",
    "highlights": [
      "Click-and-drag custom icon ordering that sticks",
      "Preserves left, middle & right-click tray menus",
      "Includes maprisma-panel-color Plasma theme helper"
    ],
    "highlights_de": [
      "Eigene Reihenfolge einfach per Halten & Ziehen festlegen",
      "Volle Links-, Mittel- & Rechtsklick-Menüfunktionen",
      "Inklusive maprisma-panel-color für passende Leistenfarben"
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/icons-kde-panel.webp",
        "caption": "Maprisma Icons in the KDE Plasma 6 panel: your Maprisma apps in one row, in your own order",
        "caption_de": "Maprisma Icons in der KDE-Plasma-6-Leiste: alle Maprisma-Apps in einer Reihe, in deiner Reihenfolge"
      }
    ]
  },
  {
    "id": "addons",
    "name": "Maprisma Add-ons",
    "version": "v2.1.5",
    "repoSlug": "maprisma/maprisma-addons",
    "tagline": "Cryptographically signed, data-only agent & LLM adapters for Maprisma",
    "tagline_de": "Kryptografisch signierte, reine Daten-Adapter für Agenten & lokale LLMs",
    "description": "The public catalog of agent adapters, local LLM definitions, and online provider specs fetched by Maprisma. Every catalog and zip is Ed25519 SSH-signed and verified against the built-in author key — pure declarative data with zero add-on code execution.",
    "description_de": "Der öffentliche Katalog der Agenten-Adapter, lokalen LLM-Definitionen und Online-Anbieter für Maprisma. Jedes Paket ist per Ed25519-SSH-Schlüssel signiert und wird von Maprisma geprüft — reine Daten ohne fremden Programmcode.",
    "category": "ai",
    "categoryLabel": "AI & Voice",
    "categoryLabel_de": "KI & Sprache",
    "featured": false,
    "tech": "JSON · Ed25519 SSH Signatures",
    "desktops": [
      "Linux"
    ],
    "icon": "assets/icons/addons.svg",
    "github": "https://github.com/maprisma/maprisma-addons",
    "releases": null,
    "installCmd": "# Verified & fetched automatically inside Maprisma (Setup → Add-ons).\n# Inspect or verify the signed catalog repository directly:\ngit clone https://github.com/maprisma/maprisma-addons.git",
    "highlights": [
      "Ed25519 signature verification built into Maprisma",
      "Pure data definitions — no arbitrary plugin code",
      "Adapters for Claude, Codex, Gemini, Ollama, llama.cpp & more"
    ],
    "highlights_de": [
      "Fest eingebaute Ed25519-Signaturprüfung in Maprisma",
      "Reine Datendefinitionen — kein ausführbarer Add-on-Code",
      "Adapter für Claude, Codex, Gemini, Ollama, llama.cpp u. v. m."
    ],
    "screenshots": [
      {
        "src": "assets/screenshots/addons-catalog.webp",
        "caption": "Install, update and switch off signed add-ons for agents and local LLM providers",
        "caption_de": "Signierte Add-ons für Agenten und lokale LLM-Anbieter installieren, aktualisieren und abschalten"
      }
    ]
  }
];
