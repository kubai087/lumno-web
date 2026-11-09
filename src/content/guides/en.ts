import type { GuideLocaleContent } from "../../lib/guides";

/** English help center: product copy, not a literal translation of zh-CN. */
const content: GuideLocaleContent = {
  ui: {
    navLabel: "Help Center",
    navTitle: "Lumno Help Center",
    groups: {
      about: "About Lumno",
      quickstart: "Quick start",
      trust: "Compatibility & trust",
    },
    sections: {
      setup: "Install & set up",
      "command-bar": "Command bar",
      "new-tab": "New tab",
      more: "More features",
      scenarios: "Scenarios",
    },
    navToggle: "Contents",
    updatedLabel: "Updated {date}",
    tocLabel: "On this page",
    faqTitle: "FAQ",
    previousLabel: "Previous",
    nextLabel: "Next",
    homeCardLabel: "Website",
    homeCardTitle: "Back to the Lumno homepage",
    zoomLabel: "View full size",
    closeLabel: "Close",
    copyLabel: "Copy",
    copiedLabel: "Copied",
    privacyLabel: "Privacy Policy",
    searchPlaceholder: "Search help",
    searchLabel: "Search the help center",
    searchEmpty: "Nothing found. Feel free to contact the developer.",
    searchRecommended: "Suggested reading",
    searchFeedbackGroup: "Join WeChat group",
    searchFeedbackIssue: "Create Issue",
    searchFeedbackAuthor: "Contact the author",
    stuckText: "Still need help? Ask on GitHub or contact us on X.",
    stuckPrimary: "Ask on GitHub",
    stuckSecondary: "Contact us on X",
  },
  pages: {
    "what-is-lumno": {
      pageTitle: "What is Lumno? An open-source browser command bar and new tab | Lumno Help",
      pageDescription:
        "Lumno is a free, open-source browser extension. Press ⌘⇧K on any page to search tabs, bookmarks and history or ask AI, plus a calm, customizable new tab.",
      keywords: ["Lumno", "browser command bar", "Chrome command palette extension", "tab search", "new tab extension", "Arc command bar"],
      title: "What is Lumno?",
      navTitle: "What is Lumno?",
      faq: [
        { question: "Is Lumno free?", answer: "Yes. Lumno is open source under GPL-3.0, every feature is free, and there is no account to create." },
        {
          question: "Which browsers does it work in?",
          answer: "Chrome, Edge, Dia, Brave, Arc, Vivaldi and other Chromium browsers, plus Firefox and Firefox-based browsers like Zen. Safari is not supported. See Browser compatibility.",
        },
      ],
    },
    limitations: {
      pageTitle: "What Lumno can't do: limits and known gaps | Lumno Help",
      pageDescription:
        "Lumno is an extension, not a browser: no command bar on chrome:// pages, no Safari, no new tab in Dia. What it can't do yet, and what to use instead.",
      keywords: ["Lumno limitations", "Chrome extension restricted pages", "Arc sidebar alternative", "Dia new tab"],
      title: "What Lumno can't do",
      navTitle: "What Lumno can't do",
    },
    "use-cases": {
      pageTitle: "Who Lumno is for: too many tabs, leaving Arc, developers and writers | Lumno Help",
      pageDescription:
        "Where Lumno helps most: dozens of open tabs, moving from Arc to Chrome or Dia, developers in docs and GitHub, research and writing, AI, and a calm new tab.",
      keywords: ["Lumno use cases", "too many tabs", "Arc alternative", "developer browser extension", "ask AI shortcut"],
      title: "Use cases",
      navTitle: "Use cases",
    },
    faq: {
      pageTitle: "Lumno FAQ: shortcuts, restricted pages, new tab and sync | Lumno Help",
      pageDescription:
        "Common questions about Lumno: changing the default shortcut, fixing it when it doesn't work, other new tab extensions, supported browsers, sync and privacy.",
      keywords: ["Lumno FAQ", "Lumno questions", "Chrome extension shortcut not working", "new tab extension conflict", "is Lumno free"],
      title: "Frequently asked questions",
      navTitle: "FAQ",
    },
    install: {
      pageTitle: "Install Lumno from the Chrome Web Store, Edge Add-ons or Firefox Add-ons | Lumno Help",
      pageDescription:
        "Install Lumno from the Chrome Web Store for Chrome, Dia, Brave or Arc, from Edge Add-ons for Edge, or from Firefox Add-ons for Firefox and Zen.",
      keywords: ["install Lumno", "Lumno Chrome Web Store", "Lumno Edge Add-ons", "Lumno Firefox Add-ons", "install Chrome extension"],
      title: "Install Lumno",
      navTitle: "Install Lumno",
      faq: [
        { question: "Do I need an account?", answer: "No. Lumno has no account system, so you can start using it as soon as you install it." },
        {
          question: "How do I uninstall it?",
          answer: "Open chrome://extensions (edge://extensions in Edge), find Lumno and click Remove; in Firefox, remove it from about:addons. This deletes the settings and images Lumno stored on your device.",
        },
      ],
    },
    "keyboard-shortcuts": {
      pageTitle: "Lumno keyboard shortcuts: defaults, how to change them, and every key | Lumno Help",
      pageDescription:
        "Lumno opens with ⌘⇧K (Ctrl+Shift+K on Windows) and its tab switcher with ⌥Q (Alt+Q). How to change them, plus every key in the command bar and new tab.",
      keywords: ["Lumno shortcuts", "change Chrome extension shortcut", "chrome://extensions/shortcuts", "Cmd T command bar", "open in background tab"],
      title: "Keyboard shortcuts",
      navTitle: "Keyboard shortcuts",
      faq: [
        {
          question: "What if the shortcut doesn't work?",
          answer:
            "First, make sure you're not on a restricted page such as chrome:// settings or the Chrome Web Store. Then check chrome://extensions/shortcuts for a conflict with another extension. In Dia, set the scope to Global.",
        },
      ],
    },
    sync: {
      pageTitle: "Sync Lumno across computers with browser sync and WebDAV | Lumno Help",
      pageDescription:
        "Lumno's settings travel with your browser's sync. Turn on WebDAV sync to bring shortcut icons, wallpapers and quotes too, using Nextcloud or a NAS.",
      keywords: ["Lumno sync", "WebDAV sync", "Nextcloud WebDAV", "sync Chrome extension settings", "new tab sync"],
      title: "Sync",
      navTitle: "Sync",
      faq: [
        {
          question: "Do I need a Lumno account to sync?",
          answer: "No. Lumno has no accounts or servers. Settings go through your browser's sync; icons and wallpapers can go through your own WebDAV.",
        },
        {
          question: "Can Chrome and Firefox sync with each other?",
          answer: "Yes, through WebDAV. Point both browsers at the same server and folder, even on the same computer.",
        },
      ],
    },
    "search-tabs-bookmarks-history": {
      pageTitle: "Search open tabs, bookmarks and history from one box | Lumno Help",
      pageDescription:
        "Press ⌘⇧K (Ctrl+Shift+K on Windows) on any page to search your open tabs, bookmarks, history and top sites in one box, or narrow it to open tabs only.",
      keywords: ["Chrome tab search", "bookmark search extension", "history search", "search open tabs", "Chrome command palette"],
      title: "Search tabs, bookmarks and history",
      navTitle: "Search tabs, bookmarks & history",
      faq: [
        {
          question: "Does Lumno upload my history or bookmarks?",
          answer:
            "No. Tabs, bookmarks and history are searched on your device, and Lumno doesn't collect them. What you type is sent to your search engine's suggestion service to show suggestions, just like typing in the address bar.",
        },
        {
          question: "Can results open in a new tab?",
          answer: "Yes. In Lumno's settings, choose to open results in the current tab, to its left or right, or at the end of the tab strip.",
        },
      ],
    },
    "site-search": {
      pageTitle: "Site search: type a shortcut, press Tab, search GitHub, YouTube or ChatGPT | Lumno Help",
      pageDescription:
        "Lumno has 47 built-in search shortcuts. Type gh, yt or sf and press Tab to search GitHub, YouTube or Stack Overflow, or ask ChatGPT, Gemini or Perplexity.",
      keywords: ["Chrome site search", "Tab to search", "search shortcuts browser", "search GitHub fast", "ask ChatGPT shortcut", "custom search engine"],
      title: "Site search and asking AI",
      navTitle: "Site search & asking AI",
      faq: [
        {
          question: "Which sites are built in?",
          answer:
            "47 in all: 11 search engines, 11 AI chats and AI search engines (such as ChatGPT, Gemini, Perplexity and DeepSeek), and 24 sites including GitHub, YouTube, Stack Overflow and Reddit, plus the Lumno Help Center. You can add your own.",
        },
        { question: "Does site search go through Lumno's servers?", answer: "No. Lumno has no servers; pressing Return opens the site's own search page." },
      ],
    },
    "tab-switcher": {
      pageTitle: "Recent tab switcher: press ⌥Q to jump between recent tabs | Lumno Help",
      pageDescription:
        "Press ⌥Q (Alt+Q on Windows) to open Lumno's recent tab switcher, with previews in the order you used your tabs. Hold ⌥, press Q to choose, release to switch.",
      keywords: ["Chrome tab switcher", "recent tabs", "Alt Tab for browser", "Arc Ctrl Tab"],
      title: "Switch between recent tabs",
      navTitle: "Switch between recent tabs",
    },
    "newtab-wallpaper": {
      pageTitle: "New tab wallpapers: classic paintings, Bing daily, your photos and filters | Lumno Help",
      pageDescription:
        "Change Lumno's new tab wallpaper: built-in paintings, Bing's photo of the day, curated photos or your own images, with a mask, filters and a glass finish.",
      keywords: ["new tab wallpaper", "Chrome new tab background", "Bing daily wallpaper", "new tab extension", "liquid glass new tab"],
      title: "Change the wallpaper",
      navTitle: "Change the wallpaper",
    },
    "newtab-bookmarks-shortcuts": {
      pageTitle: "New tab shortcuts and bookmarks: add and group sites, three bookmark layouts | Lumno Help",
      pageDescription:
        "Add sites as shortcuts on Lumno's new tab, pick icons, sort them into groups and folders, and browse bookmarks as folders, a nested list or a top bar.",
      keywords: ["new tab shortcuts", "shortcut groups", "new tab bookmarks", "Chrome bookmarks bar", "bookmark folders", "hide new tab bookmarks"],
      title: "Shortcuts and bookmarks",
      navTitle: "Shortcuts & bookmarks",
    },
    "newtab-frequent-sites": {
      pageTitle: "Frequent sites and progress cards: pin sites, keep your place in a show | Lumno Help",
      pageDescription:
        "Lumno's new tab shows your most visited or recent sites. Pin up to three; a pinned show or serialized novel follows you to the next episode or chapter.",
      keywords: ["new tab most visited", "track show progress", "web novel progress", "pin sites", "hide new tab site cards"],
      title: "Frequent sites and progress cards",
      navTitle: "Frequent sites & progress cards",
    },
    "newtab-clock-zen": {
      pageTitle: "Clock, daily quote and Zen mode: a new tab with just the search box | Lumno Help",
      pageDescription: "Add a clock and daily quotes from your own file to Lumno's new tab. Type /zen to leave only the search box, or /present to hide bookmarks when sharing.",
      keywords: ["new tab clock", "new tab daily quote", "minimal new tab", "Zen mode", "focus new tab", "presentation mode"],
      title: "Clock, quotes and Zen mode",
      navTitle: "Clock, quotes & Zen mode",
    },
    "newtab-other-extensions": {
      pageTitle: "Use another new tab extension with Lumno's command bar | Lumno Help",
      pageDescription:
        "Keep Momentum, Tabliss or another new tab extension and use only Lumno's command bar: turn the other extension on after Lumno, and keep the change when asked.",
      keywords: ["new tab extension conflict", "Chrome new tab changed by extension", "use only Lumno command bar", "Momentum", "Tabliss"],
      title: "Use another new tab extension",
      navTitle: "Use another new tab extension",
    },
    "selection-actions": {
      pageTitle: "Selection quick actions: select text to have AI explain, translate or summarize it | Lumno Help",
      pageDescription:
        "Select text and Lumno suggests AI actions such as Translate, Explain or Summarize. It checks on your device first, so it doesn't appear on every selection.",
      keywords: ["select text AI", "AI translate selection", "explain selected text", "Chrome selection AI extension", "summarize selection"],
      title: "Selection quick actions",
      navTitle: "Selection quick actions",
    },
    "auto-pip": {
      pageTitle: "Auto picture-in-picture: videos keep playing in a small window when you switch tabs | Lumno Help",
      pageDescription:
        "Switch tabs while a video plays and it moves into a picture-in-picture window, then closes when you come back. When it starts, and how to turn it off.",
      keywords: ["auto picture-in-picture", "Chrome picture in picture extension", "video floating window", "Arc auto PiP", "PiP when switching tabs"],
      title: "Auto picture-in-picture",
      navTitle: "Auto picture-in-picture",
    },
    "link-preview": {
      pageTitle: "Link preview: Shift-click a link to open it in a small window | Lumno Help",
      pageDescription:
        "Shift-click a link to open it in a small window over the page, then close it or move it to a new tab or split view. Buttons, limits and how to turn it off.",
      keywords: ["link preview", "preview links without opening a tab", "Shift click link", "link preview Chrome extension", "peek link", "Arc Peek alternative"],
      title: "Link preview",
      navTitle: "Link preview",
    },
    "web-clip": {
      pageTitle: "Web clip: keep part of a page in a floating window | Lumno Help",
      pageDescription:
        "Web clip puts a table, code block or chart from any page into a floating window that stays on top while you switch tabs. How to use it, and its limits.",
      keywords: ["web clip", "document picture-in-picture", "floating window Chrome extension", "pin part of a web page", "picture-in-picture any element"],
      title: "Web clip",
      navTitle: "Web clip",
    },
    "arc-command-bar": {
      pageTitle: "Arc is shutting down: how to move to Dia, Chrome or Edge | Lumno Help",
      pageDescription:
        "Arc shuts down on December 22, 2026. See the timeline, how to export your data, and how Lumno keeps an Arc-style command bar in Chrome, Dia and Edge.",
      keywords: ["Arc shutting down", "Arc browser shutdown", "Arc browser alternative", "export Arc data", "move from Arc to Chrome", "Arc command bar alternative", "Arc shortcuts"],
      title: "Moving from Arc",
      navTitle: "Moving from Arc",
      faq: [
        {
          question: "Can I still open Arc after December 22?",
          answer: "No. Arc for Mac and Windows stops working on December 22, 2026, and the Arc data on your computer can't be opened after that. Import into Dia or export your data before then.",
        },
        {
          question: "I use Lumno in Arc. Can I keep my settings?",
          answer: "Yes. Before Arc shuts down, export your settings in Lumno, then import them after installing Lumno in your new browser. Or turn on WebDAV sync.",
        },
        {
          question: "Is Lumno related to Arc?",
          answer: "No. Lumno is an independent open-source project inspired by Arc's command bar, not affiliated with Arc or The Browser Company.",
        },
      ],
    },
    "browser-compatibility": {
      pageTitle: "Browser compatibility: Chrome, Edge, Dia, Brave, Firefox and Safari | Lumno Help",
      pageDescription:
        "Lumno works fully in Chrome, Edge, Brave, Arc, Vivaldi and other Chromium browsers. Dia has no Lumno new tab, Firefox has a few gaps, no Safari or mobile.",
      keywords: ["Lumno compatibility", "Dia extension", "Edge extension", "Firefox version", "Chromium extension"],
      title: "Browser compatibility",
      navTitle: "Browser compatibility",
    },
    "security-open-source": {
      pageTitle: "Security and open source: GPL-3.0 code, permissions, Manifest V3 | Lumno Help",
      pageDescription:
        "Lumno is open source under GPL-3.0 on GitHub, built on Manifest V3 with no remote code. It requests only the browser permissions it needs.",
      keywords: ["Lumno open source", "Lumno security", "Chrome extension permissions", "Manifest V3"],
      title: "Security and open source",
      navTitle: "Security & open source",
    },
    "ratings-reviews": {
      pageTitle: "Ratings and press: Chrome Web Store reviews and coverage | Lumno Help",
      pageDescription: "Lumno's Chrome Web Store rating and reviews, its Firefox Add-ons reviews, and articles written about it.",
      keywords: ["Lumno reviews", "Lumno rating", "Chrome command bar extension review"],
      title: "Ratings and press",
      navTitle: "Ratings & press",
    },
  },
};

export default content;
