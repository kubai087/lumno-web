import { DEFAULT_LOCALE, type SupportedLocale } from "./locales";

export type FeaturesSeoContent = {
  pageTitle: string;
  pageDescription: string;
  breadcrumbLabel: string;
  navHome: string;
  navRelease: string;
  navLabel: string;
  navGithubAria: string;
  languageLabel: string;
  languageLinksLabel: string;
  installCta: string;
  backHomeCta: string;
  eyebrow: string;
  title: string;
  intro: string;
  featureSectionTitle: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  workflowsTitle: string;
  workflows: string[];
  faqTitle: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const FEATURES_SEO_CONTENT: Record<SupportedLocale, FeaturesSeoContent> = {
  "zh-CN": {
    pageTitle: "Lumno 功能｜浏览器命令栏、标签页搜索、书签搜索与站内搜索",
    pageDescription:
      "了解 Lumno 如何把标签页搜索、书签搜索、历史记录搜索、站内搜索和极简新标签页整合进一个开源浏览器命令栏，适用于 Chrome、Edge、Dia 与 Arc 迁移后的高效工作流。",
    breadcrumbLabel: "功能与场景",
    navHome: "首页",
    navRelease: "更新日志",
    navLabel: "主导航",
    navGithubAria: "访问 Lumno GitHub 仓库",
    languageLabel: "简体中文",
    languageLinksLabel: "切换功能页语言",
    installCta: "安装 Lumno",
    backHomeCta: "返回首页",
    eyebrow: "浏览器重度用户的轻量入口",
    title: "一条命令栏，连接标签页搜索、书签搜索和站内搜索",
    intro:
      "Lumno 是开源浏览器命令栏，在任意网页唤起聚焦搜索。它把标签页搜索、书签搜索、历史记录搜索、常用网站和站内搜索放在同一个轻量浮层里，适合 Chrome、Edge、Dia，也适合 Arc 迁移后想保留快速切换体验的用户。",
    featureSectionTitle: "核心功能",
    features: [
      {
        title: "统一搜索浏览器资料",
        description:
          "从一个输入框查找已打开标签页、书签、历史记录和最常访问页面，减少在浏览器侧边栏、地址栏和书签管理器之间来回切换。",
      },
      {
        title: "Tab 触发站内搜索",
        description:
          "Lumno 内置常用站点搜索引擎。输入站点关键词后按 Tab，即可把搜索意图转入目标网站，适合文档、社区、代码仓库和内容站。",
      },
      {
        title: "极简新标签页",
        description:
          "新标签页保留常用书签和网页卡片，不把注意力拉向信息流。打开新窗口时，下一步操作仍然围绕搜索、访问和切换。",
      },
      {
        title: "Arc 迁移友好",
        description:
          "如果你正在从 Arc 迁移到 Dia、Chrome 或 Edge，Lumno 保留的是高频的命令栏搜索体验，而不是要求你更换整个浏览器。",
      },
    ],
    workflowsTitle: "Lumno 适合哪些场景",
    workflows: [
      "资料查找：用聚焦搜索从书签、历史记录和打开的标签页里找回上下文。",
      "工作切换：在写作、代码、文档和搜索结果页之间快速跳转。",
      "站内检索：对 GitHub、文档站、社区或搜索引擎发起更精确的站内搜索。",
      "Arc migration：在 Dia 或 Chrome 中延续熟悉的 command bar 操作节奏。",
    ],
    faqTitle: "常见问题",
    faq: [
      {
        question: "Lumno 是 Arc 浏览器替代品吗？",
        answer:
          "Lumno 不是完整浏览器，也不隶属于 Arc。它聚焦在 Arc 风格的命令栏搜索体验：从任意页面快速查找标签页、书签、历史记录、站内内容，并在 Dia 或 Chrome 中延续这段高频工作流。",
      },
      {
        question: "Lumno 支持哪些浏览器？",
        answer:
          "Lumno 面向 Chrome、Edge、Dia 和其他 Chromium 系浏览器。安装后可以通过扩展快捷键唤起聚焦搜索，也可以使用极简新标签页管理常用入口。",
      },
      {
        question: "Lumno 和普通浏览器标签搜索有什么不同？",
        answer:
          "普通标签搜索通常只查打开的标签页。Lumno 把标签页、书签、历史记录、常用页面和站内搜索放进同一个命令栏，让搜索范围更完整，路径更短。",
      },
      {
        question: "Lumno 是否免费开源？",
        answer:
          "Lumno 是免费的开源浏览器扩展。你可以从 Chrome Web Store 安装，也可以在 GitHub 查看源码、提交问题或参与功能讨论。",
      },
    ],
  },
  "zh-TW": {
    pageTitle: "Lumno 功能｜瀏覽器命令欄、分頁搜尋、書籤搜尋與站內搜尋",
    pageDescription:
      "了解 Lumno 如何把分頁搜尋、書籤搜尋、歷史紀錄搜尋、站內搜尋與極簡新分頁整合進一個開源瀏覽器命令欄，適用於 Chrome、Edge、Dia 與 Arc 遷移後的高效率工作流。",
    breadcrumbLabel: "功能與場景",
    navHome: "首頁",
    navRelease: "更新日誌",
    navLabel: "主導覽",
    navGithubAria: "造訪 Lumno GitHub 倉庫",
    languageLabel: "繁體中文",
    languageLinksLabel: "切換功能頁語言",
    installCta: "安裝 Lumno",
    backHomeCta: "返回首頁",
    eyebrow: "瀏覽器重度使用者的輕量入口",
    title: "一條命令欄，串起分頁搜尋、書籤搜尋與站內搜尋",
    intro:
      "Lumno 是開源瀏覽器命令欄，可在任意網頁喚起聚焦搜尋。它把分頁搜尋、書籤搜尋、歷史紀錄搜尋、常用網站與站內搜尋放在同一個輕量浮層裡，適合 Chrome、Edge、Dia，也適合從 Arc 遷移後想保留快速切換體驗的使用者。",
    featureSectionTitle: "核心功能",
    features: [
      {
        title: "統一搜尋瀏覽器資料",
        description:
          "從一個輸入框查找已開啟分頁、書籤、歷史紀錄與最常造訪頁面，減少在瀏覽器側邊欄、網址列和書籤管理器之間來回切換。",
      },
      {
        title: "Tab 觸發站內搜尋",
        description:
          "Lumno 內建常用站點搜尋引擎。輸入站點關鍵字後按 Tab，即可把搜尋意圖轉入目標網站，適合文件、社群、程式碼倉庫與內容站。",
      },
      {
        title: "極簡新分頁",
        description:
          "新分頁保留常用書籤與網頁卡片，不把注意力拉向資訊流。開啟新視窗時，下一步操作仍然圍繞搜尋、造訪與切換。",
      },
      {
        title: "Arc 遷移友善",
        description:
          "如果你正在從 Arc 遷移到 Dia、Chrome 或 Edge，Lumno 保留的是高頻的命令欄搜尋體驗，而不是要求你更換整個瀏覽器。",
      },
    ],
    workflowsTitle: "Lumno 適合哪些場景",
    workflows: [
      "資料查找：用聚焦搜尋從書籤、歷史紀錄與開啟中的分頁找回上下文。",
      "工作切換：在寫作、程式碼、文件與搜尋結果頁之間快速跳轉。",
      "站內檢索：對 GitHub、文件站、社群或搜尋引擎發起更精準的站內搜尋。",
      "Arc migration：在 Dia 或 Chrome 中延續熟悉的 command bar 操作節奏。",
    ],
    faqTitle: "常見問題",
    faq: [
      {
        question: "Lumno 是 Arc 瀏覽器替代品嗎？",
        answer:
          "Lumno 不是完整瀏覽器，也不隸屬於 Arc。它聚焦在 Arc 風格的命令欄搜尋體驗：從任意頁面快速查找分頁、書籤、歷史紀錄、站內內容，並在 Dia 或 Chrome 中延續這段高頻工作流。",
      },
      {
        question: "Lumno 支援哪些瀏覽器？",
        answer:
          "Lumno 面向 Chrome、Edge、Dia 與其他 Chromium 系瀏覽器。安裝後可以透過擴充功能快捷鍵喚起聚焦搜尋，也可以使用極簡新分頁管理常用入口。",
      },
      {
        question: "Lumno 和普通瀏覽器分頁搜尋有什麼不同？",
        answer:
          "普通分頁搜尋通常只查已開啟的分頁。Lumno 把分頁、書籤、歷史紀錄、常用頁面與站內搜尋放進同一個命令欄，讓搜尋範圍更完整，路徑更短。",
      },
      {
        question: "Lumno 是否免費開源？",
        answer:
          "Lumno 是免費的開源瀏覽器擴充功能。你可以從 Chrome Web Store 安裝，也可以在 GitHub 查看原始碼、提交問題或參與功能討論。",
      },
    ],
  },
  en: {
    pageTitle: "Lumno Features | Browser Command Bar, Tab Search, Bookmark Search & Site Search",
    pageDescription:
      "Explore how Lumno combines tab search, bookmark search, history search, site search, and a minimalist new tab in an open-source browser command bar for Chrome, Edge, Dia, and Arc migration workflows.",
    breadcrumbLabel: "Features",
    navHome: "Home",
    navRelease: "Release Notes",
    navLabel: "Primary",
    navGithubAria: "Open the Lumno GitHub repository",
    languageLabel: "English",
    languageLinksLabel: "Switch feature page language",
    installCta: "Install Lumno",
    backHomeCta: "Back Home",
    eyebrow: "A lighter entry point for browser power users",
    title: "A browser command bar for tab search, bookmark search, and site search",
    intro:
      "Lumno is an open-source browser command bar that opens focus search from any page. It puts tab search, bookmark search, history search, frequently visited pages, and site search in one lightweight overlay for Chrome, Edge, and Dia, including Arc migration workflows.",
    featureSectionTitle: "Core Features",
    features: [
      {
        title: "Search browser context in one place",
        description:
          "Find open tabs, bookmarks, history, and frequently visited pages from one input instead of jumping between the address bar, bookmark manager, and browser side panels.",
      },
      {
        title: "Press Tab for site search",
        description:
          "Lumno includes common site engines. Type a site keyword, press Tab, and send the query into the right website for docs, communities, repositories, or search engines.",
      },
      {
        title: "Minimalist new tab",
        description:
          "The new tab keeps bookmarks and useful page cards close without pulling attention into a feed. Opening a new window still starts with search, visit, or switch.",
      },
      {
        title: "Arc migration friendly",
        description:
          "If you are moving from Arc to Dia, Chrome, or Edge, Lumno preserves the high-frequency command bar workflow without asking you to replace the whole browser.",
      },
    ],
    workflowsTitle: "Where Lumno fits",
    workflows: [
      "Research recovery: use focus search to bring back context from bookmarks, history, and open tabs.",
      "Work switching: jump between writing, code, docs, and search result pages with less browser friction.",
      "Site search: send precise queries to GitHub, docs, communities, or search engines.",
      "Arc migration: keep a familiar command bar rhythm inside Dia or Chrome.",
    ],
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "Is Lumno an Arc browser alternative?",
        answer:
          "Lumno is not a full browser and is not affiliated with Arc. It focuses on the Arc-style command bar search experience: quickly finding tabs, bookmarks, history, and site content from any page while using Dia or Chrome.",
      },
      {
        question: "Which browsers does Lumno support?",
        answer:
          "Lumno is built for Chrome, Edge, Dia, and other Chromium-based browsers. After installing it, you can open focus search with an extension shortcut and use the minimalist new tab for common destinations.",
      },
      {
        question: "How is Lumno different from regular tab search?",
        answer:
          "Regular browser tab search usually searches only open tabs. Lumno combines tabs, bookmarks, history, frequently visited pages, and site search in one command bar, so the search surface is broader and the path is shorter.",
      },
      {
        question: "Is Lumno free and open source?",
        answer:
          "Lumno is a free, open-source browser extension. You can install it from the Chrome Web Store, read the source on GitHub, report issues, or join feature discussions.",
      },
    ],
  },
};

export function getFeaturesSeoContent(locale: SupportedLocale): FeaturesSeoContent {
  return FEATURES_SEO_CONTENT[locale] || FEATURES_SEO_CONTENT[DEFAULT_LOCALE];
}
