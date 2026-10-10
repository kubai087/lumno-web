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
    privacyLabel: "Privacy Policy",
    searchPlaceholder: "Search help",
    searchLabel: "Search the help center",
    searchEmpty: "Nothing found",
    stuckText: "Still stuck? Ask on GitHub, or reach out on X.",
    stuckPrimary: "Ask on GitHub",
    stuckSecondary: "Reach out on X",
  },
  pages: {
    "what-is-lumno": {
      pageTitle: "What is Lumno? An open-source browser command bar and new tab | Lumno Help",
      pageDescription:
        "Lumno is a free, open-source browser extension. Press ⌘⇧K on any page to search your tabs, bookmarks and history, search inside sites or ask AI, and get a calm, customizable new tab. Works in Chrome, Edge, Dia and other Chromium browsers.",
      keywords: ["Lumno", "browser command bar", "Chrome command palette extension", "tab search", "new tab extension", "Arc command bar"],
      title: "What is Lumno?",
      navTitle: "What is Lumno?",
      faq: [
        { question: "Is Lumno free?", answer: "Yes. Lumno is open source under GPL-3.0, every feature is free, and there is no account to create." },
        {
          question: "Which browsers does it work in?",
          answer: "Chrome, Edge, Dia, Brave, Arc, Vivaldi and other Chromium browsers. Safari is not supported. See Browser compatibility.",
        },
      ],
    },
    limitations: {
      pageTitle: "What Lumno can't do: limits and known gaps | Lumno Help",
      pageDescription:
        "Lumno is an extension, not a browser: no command bar on chrome:// pages, no Safari, and no new tab in Dia. Here is what it can't do yet, and what to use instead.",
      keywords: ["Lumno limitations", "Chrome extension restricted pages", "Arc sidebar alternative", "Dia new tab"],
      title: "What Lumno can't do",
      navTitle: "What Lumno can't do",
    },
    "use-cases": {
      pageTitle: "Who Lumno is for: too many tabs, leaving Arc, developers and writers | Lumno Help",
      pageDescription:
        "Where Lumno helps most: dozens of open tabs, moving from Arc to Chrome or Dia, developers living in docs and GitHub, research and writing, asking AI, and a calm new tab.",
      keywords: ["Lumno use cases", "too many tabs", "Arc alternative", "developer browser extension", "ask AI shortcut"],
      title: "Use cases",
      navTitle: "Use cases",
    },
    install: {
      pageTitle: "Install Lumno from the Chrome Web Store or Edge Add-ons | Lumno Help",
      pageDescription:
        "Install Lumno from the Chrome Web Store in Chrome, Dia, Brave or Arc, or from Microsoft Edge Add-ons in Edge. A welcome page opens, and ⌘⇧K is ready to go.",
      keywords: ["install Lumno", "Lumno Chrome Web Store", "Lumno Edge Add-ons", "install Chrome extension"],
      title: "Install Lumno",
      navTitle: "Install Lumno",
      faq: [
        { question: "Do I need an account?", answer: "No. Lumno has no account system. Install it and it works." },
        {
          question: "How do I uninstall it?",
          answer: "Open chrome://extensions (edge://extensions in Edge), find Lumno and click Remove. This deletes the settings and images Lumno stored on your device.",
        },
      ],
    },
    "keyboard-shortcuts": {
      pageTitle: "Lumno keyboard shortcuts: defaults, changing them, and keys in the command bar | Lumno Help",
      pageDescription:
        "Lumno opens with ⌘⇧K (Ctrl+Shift+K on Windows) and its recent tab switcher with ⌥Q. Change them in chrome://extensions/shortcuts, even to ⌘T. Plus every key inside the command bar and switcher.",
      keywords: ["Lumno shortcuts", "change Chrome extension shortcut", "chrome://extensions/shortcuts", "Cmd T command bar"],
      title: "Keyboard shortcuts",
      navTitle: "Keyboard shortcuts",
      faq: [
        {
          question: "The shortcut does nothing. What now?",
          answer:
            "Make sure you're not on a restricted page such as chrome:// settings or the Web Store, then check chrome://extensions/shortcuts for a conflict with another extension. In Dia, set the scope to Global.",
        },
      ],
    },
    sync: {
      pageTitle: "Sync Lumno across computers with browser sync and WebDAV | Lumno Help",
      pageDescription:
        "Lumno's settings travel with your browser's own sync. Turn on WebDAV sync to bring custom shortcut icons and wallpapers too, using Nextcloud, a NAS or any WebDAV server you control.",
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
        "Lumno has 46 built-in search shortcuts. Type gh, yt or sf and press Tab to search GitHub, YouTube or Stack Overflow directly, or send a question straight to ChatGPT, Gemini or Perplexity.",
      keywords: ["Chrome site search", "Tab to search", "search shortcuts browser", "search GitHub fast", "ask ChatGPT shortcut", "custom search engine"],
      title: "Site search and asking AI",
      navTitle: "Site search & asking AI",
      faq: [
        {
          question: "Which sites are built in?",
          answer:
            "46 in all: 11 search engines, 11 AI chats and AI search engines (such as ChatGPT, Gemini, Perplexity and DeepSeek), and 24 sites including GitHub, YouTube, Stack Overflow and Reddit. You can add your own.",
        },
        { question: "Does site search go through Lumno's servers?", answer: "No. Lumno has no servers; pressing Return opens the site's own search page." },
      ],
    },
    "tab-switcher": {
      pageTitle: "Recent tab switcher: press ⌥Q to jump between recent tabs | Lumno Help",
      pageDescription:
        "Press ⌥Q (Alt+Q on Windows) to open Lumno's recent tab switcher, with your tabs in the order you used them and a preview of each. Hold ⌥, tap Q, let go.",
      keywords: ["Chrome tab switcher", "recent tabs", "Alt Tab for browser", "Arc Ctrl Tab"],
      title: "Switch between recent tabs",
      navTitle: "Switch between recent tabs",
    },
    "newtab-wallpaper": {
      pageTitle: "New tab wallpapers: classic paintings, Bing daily, your photos and filters | Lumno Help",
      pageDescription:
        "Change Lumno's new tab wallpaper in Appearance settings: built-in paintings, Bing's photo of the day, curated photos, your own images or an image link, with a mask, filters, and separate light and dark picks.",
      keywords: ["new tab wallpaper", "Chrome new tab background", "Bing daily wallpaper", "new tab extension"],
      title: "Change the wallpaper",
      navTitle: "Change the wallpaper",
    },
    "newtab-bookmarks-shortcuts": {
      pageTitle: "New tab shortcuts and bookmarks: add sites, three bookmark layouts | Lumno Help",
      pageDescription:
        "Add your go-to sites as shortcuts on Lumno's new tab, pick their icons, and browse your bookmarks as folders, a nested list or a top bar.",
      keywords: ["new tab shortcuts", "new tab bookmarks", "Chrome bookmarks bar", "bookmark folders"],
      title: "Shortcuts and bookmarks",
      navTitle: "Shortcuts & bookmarks",
    },
    "newtab-frequent-sites": {
      pageTitle: "Frequent sites and progress cards: pin sites, keep your place in a show | Lumno Help",
      pageDescription:
        "Lumno's new tab shows your most visited or recent sites. Pin up to three; pin a show or a serialized novel and the card follows you to the next episode or chapter.",
      keywords: ["new tab most visited", "track show progress", "web novel progress", "pin sites"],
      title: "Frequent sites and progress cards",
      navTitle: "Frequent sites & progress cards",
    },
    "newtab-clock-zen": {
      pageTitle: "Clock and Zen mode: a new tab with just the search box | Lumno Help",
      pageDescription: "Show a clock on Lumno's new tab, or type /zen to hide everything but the search box.",
      keywords: ["new tab clock", "minimal new tab", "Zen mode", "focus new tab"],
      title: "Clock and Zen mode",
      navTitle: "Clock & Zen mode",
    },
    "arc-command-bar": {
      pageTitle: "Moving from Arc to Chrome, Dia or Edge: the command bar and shortcuts | Lumno Help",
      pageDescription:
        "Left Arc for Chrome, Dia or Edge? Lumno brings back an Arc-style command bar: ⌘⇧K searches tabs, bookmarks and history (or make it ⌘T), and ⌥Q switches recent tabs. Includes an Arc shortcut map.",
      keywords: ["Arc command bar alternative", "Arc browser alternative", "move from Arc to Chrome", "Dia command bar", "Arc shortcuts"],
      title: "Moving from Arc",
      navTitle: "Moving from Arc",
      faq: [
        {
          question: "Is Lumno related to Arc?",
          answer: "No. Lumno is an independent open-source project inspired by Arc's command bar, not affiliated with Arc or The Browser Company.",
        },
      ],
    },
    "browser-compatibility": {
      pageTitle: "Browser compatibility: Chrome, Edge, Dia, Brave, Firefox and Safari | Lumno Help",
      pageDescription:
        "Lumno works fully in Chrome, Edge, Brave, Arc, Vivaldi and other Chromium browsers. Dia has no Lumno new tab, the Firefox version has a few gaps, and Safari and mobile browsers aren't supported.",
      keywords: ["Lumno compatibility", "Dia extension", "Edge extension", "Firefox version", "Chromium extension"],
      title: "Browser compatibility",
      navTitle: "Browser compatibility",
    },
    "privacy-data": {
      pageTitle: "Privacy and data: Lumno works on your device and collects nothing | Lumno Help",
      pageDescription:
        "Lumno has no accounts or servers. Your tabs, bookmarks and history stay on your device, and no usage data is collected. Here is what does leave your device, and how browser and WebDAV sync work.",
      keywords: ["Lumno privacy", "browser extension privacy", "Chrome extension data", "WebDAV sync"],
      title: "Privacy and data",
      navTitle: "Privacy and data",
    },
    "security-open-source": {
      pageTitle: "Security and open source: GPL-3.0 code, permissions, Manifest V3 | Lumno Help",
      pageDescription:
        "Lumno is open source under GPL-3.0 on GitHub, built on Manifest V3 with no remote code. Here is what each browser permission is used for.",
      keywords: ["Lumno open source", "Lumno security", "Chrome extension permissions", "Manifest V3"],
      title: "Security and open source",
      navTitle: "Security & open source",
    },
    "ratings-reviews": {
      pageTitle: "Ratings and press: Chrome Web Store reviews and coverage | Lumno Help",
      pageDescription: "Lumno's Chrome Web Store rating and reviews, and articles written about it.",
      keywords: ["Lumno reviews", "Lumno rating", "Chrome command bar extension review"],
      title: "Ratings and press",
      navTitle: "Ratings & press",
    },
  },
};

export default content;
