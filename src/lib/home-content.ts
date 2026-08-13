import type { SupportedLocale } from "./locales";

export type HomeFeatureMessages = {
  searchTitle: string;
  searchDesc: string;
  siteSearchTitle: string;
  siteSearchDesc: string;
  newTabTitle: string;
  newTabDesc: string;
  labsTitle: string;
  labsTitleStrong: string;
  labsDesc: string;
  betaAlt: string;
};

type HomeContent = {
  navigationAria: string;
  navFeatures: string;
  navWorkflow: string;
  navTrust: string;
  navRelease: string;
  navRepository: string;
  navRepositoryMenuAria: string;
  navRepositoryHome: string;
  navRepositoryIssue: string;
  navRepositoryPullRequest: string;
  navCommunity: string;
  navContact: string;
  navContactMenuAria: string;
  navContactX: string;
  navContactXiaohongshu: string;
  navMoreMenuAria: string;
  installLabel: string;
  installAria: string;
  installChromeStoreLabel: string;
  installEdgeStoreLabel: string;
  installChromeRecommendation: string;
  githubAria: string;
  heroTitle: string;
  heroDescription: string;
  heroInstallLabel: string;
  heroInstallAria: string;
  heroBrowserTooltipLabel: string;
  heroCommunityLabel: string;
  heroCommunityAria: string;
  heroOpenSourceNote: string;
  heroLicenseLabel: string;
  heroLicenseAria: string;
  heroDemoAria: string;
  reviewsTitle: string;
  reviewsSummary: (averageRating: number, ratingCount: number) => string;
  reviewsSourceLabel: string;
  reviewsAriaLabel: string;
  reviewAvatarLabel: string;
  reviewRatingLabel: string;
  productShowcaseAria: string;
  featureSectionTitle: string;
  featureSectionDescription: string;
  featureMessages: HomeFeatureMessages;
  workflowTitle: string;
  workflowDescription: string;
  workflowSteps: Array<{ title: string; description: string }>;
  audienceTitle: string;
  audienceDescription: string;
  audiences: Array<{ title: string; description: string }>;
  trustTitle: string;
  trustDescription: string;
  trustPoints: Array<{ title: string; description: string }>;
  browsersTitle: string;
  browsersDescription: string;
  browserNames: string[];
  faqTitle: string;
  faqItems: Array<{ question: string; answer: string }>;
  finalTitle: string;
  finalDescription: string;
  viewSourceLabel: string;
  viewSourceAria: string;
  footerTagline: string;
  footerProduct: string;
  footerResources: string;
  footerCommunity: string;
  footerFeatures: string;
  footerQuickStart: string;
  footerRelease: string;
  footerPrivacy: string;
  footerGithub: string;
  footerFeedback: string;
  footerCopyright: string;
  languageLabel: string;
  languageSelectAria: string;
  qrcodeTitle: string;
  qrcodeImageAlt: string;
  qrcodeCloseAria: string;
};

export const HOME_CONTENT: Record<SupportedLocale, HomeContent> = {
  "zh-CN": {
    navigationAria: "主导航",
    navFeatures: "功能",
    navWorkflow: "工作方式",
    navTrust: "隐私与开源",
    navRelease: "更新日志",
    navRepository: "代码仓库",
    navRepositoryMenuAria: "打开代码仓库操作",
    navRepositoryHome: "访问仓库",
    navRepositoryIssue: "提 Issue",
    navRepositoryPullRequest: "提 PR",
    navCommunity: "反馈&功能许愿",
    navContact: "联系作者",
    navContactMenuAria: "打开作者主页",
    navContactX: "X",
    navContactXiaohongshu: "小红书",
    navMoreMenuAria: "打开更多导航",
    installLabel: "安装 Lumno",
    installAria: "打开 Lumno 安装选项",
    installChromeStoreLabel: "Chrome 应用商店",
    installEdgeStoreLabel: "Microsoft Edge 加载项",
    installChromeRecommendation: "推荐 · 更新更快",
    githubAria: "访问 Lumno GitHub 仓库",
    heroTitle: "让浏览器的一切，一搜即达",
    heroDescription:
      "Lumno 是一个开源的浏览器命令栏及新标签页插件，可从任何网页随时唤起。\n搜索标签页、书签、历史记录和常用网站，无需来回翻找。",
    heroInstallLabel: "通过 Chrome 商店安装",
    heroInstallAria: "通过 Chrome 应用商店安装 Lumno",
    heroBrowserTooltipLabel: "支持大部分 Chromium 内核浏览器",
    heroCommunityLabel: "反馈 & 功能许愿",
    heroCommunityAria: "打开 Lumno 反馈与功能许愿二维码",
    heroOpenSourceNote: "基于 GPL-3.0 开源",
    heroLicenseLabel: "GPL-3.0",
    heroLicenseAria: "在新标签页查看 Lumno 的 GPL-3.0 开源协议",
    heroDemoAria: "Lumno 聚焦搜索输入框与光标动画",
    reviewsTitle: "专注用户体验，与用户共创",
    reviewsSummary: (averageRating, ratingCount) =>
      `${averageRating.toFixed(1)} 分 · ${ratingCount} 个评分`,
    reviewsSourceLabel: "查看所有评价",
    reviewsAriaLabel: "Chrome 应用商店的真实用户评价轮播",
    reviewAvatarLabel: "的头像",
    reviewRatingLabel: "星评价",
    productShowcaseAria: "Lumno 的四项核心功能",
    featureSectionTitle: "极简强大，你的 100% 新标签页",
    featureSectionDescription:
      "书签、常用网站与快捷搜索，一个干净的新标签页全部装下（也可以隐藏）",
    featureMessages: {
      searchTitle: "一个命令栏，搜索所有浏览器资料",
      searchDesc: "同时查找标签页、书签、历史记录和常用页面",
      siteSearchTitle: "按 Tab，直接搜索常用网站",
      siteSearchDesc: "从搜索引擎、GitHub 与文档站继续查找",
      newTabTitle: "一个更安静的新标签页",
      newTabDesc: "保留书签与常用网页，不加入信息流",
      labsTitle: "轻量交互",
      labsTitleStrong: "& 精致界面",
      labsDesc: "键盘优先，让高频操作保持专注",
      betaAlt: "Beta",
    },
    workflowTitle: "一条自然的浏览路径",
    workflowDescription: "Lumno 不改变你正在做的事，只缩短找到下一步的距离。",
    workflowSteps: [
      { title: "随时唤起", description: "在任意网页打开 Lumno，保留当前上下文。" },
      { title: "统一搜索", description: "一次输入，查找标签页、书签、历史记录或常用页面。" },
      { title: "立即继续", description: "直接切换目标页面，或按 Tab 发起站内搜索。" },
    ],
    audienceTitle: "为需要保持思路连续的人设计",
    audienceDescription: "少一些窗口整理，多一点真正有价值的浏览与创造。",
    audiences: [
      { title: "研究与写作", description: "在资料、历史记录与参考页面之间快速往返，不打断当前思路。" },
      { title: "开发与设计", description: "把 GitHub、文档、设计资源和项目页面放进同一个搜索入口。" },
      { title: "浏览器迁移", description: "从 Arc 转向 Dia、Chrome 或 Edge 后，继续使用熟悉的命令栏工作流。" },
    ],
    trustTitle: "工具应该帮你专注，而不是制造新的负担",
    trustDescription:
      "Lumno 以本地优先和透明为基础。扩展的源代码公开，账号、同步与产品分析能力则按需启用。",
    trustPoints: [
      { title: "本地优先", description: "标签页、书签和历史记录的核心搜索尽可能在浏览器本地完成。" },
      { title: "开源透明", description: "核心扩展代码公开，可查看实现、提交问题或参与改进。" },
      { title: "选择权清晰", description: "需要联网的账户、同步与分析功能分别说明，并提供对应控制。" },
    ],
    browsersTitle: "为 Chromium 浏览器而生",
    browsersDescription: "可从 Chrome 应用商店或 Microsoft Edge 加载项安装。",
    browserNames: ["Chrome", "Edge", "Dia", "Comet", "Atlas", "Helium"],
    faqTitle: "常见问题",
    faqItems: [
      {
        question: "Lumno 可以搜索哪些内容？",
        answer: "可以搜索已打开的标签页、书签、浏览历史和常用页面，也可以通过站内搜索继续查找指定网站。",
      },
      {
        question: "它会替换浏览器的新标签页吗？",
        answer: "可以。启用新标签页功能后，Lumno 会提供以书签和常用网页为核心的极简页面；具体功能可以在扩展设置中调整。",
      },
      {
        question: "是否支持 Arc、Safari 或 Firefox？",
        answer: "目前主要支持可安装 Chromium 扩展的浏览器，包括 Chrome、Edge、Dia 等。Safari 与 Firefox 暂不在当前支持范围。",
      },
      {
        question: "Lumno 是免费和开源的吗？",
        answer: "核心扩展免费且开源。你可以在 GitHub 查看源代码、版本进展和已知问题。",
      },
    ],
    finalTitle: "少找一会儿，多做一点真正重要的事",
    finalDescription: "安装 Lumno，让聚焦搜索成为浏览器里随时可用的基础动作。",
    viewSourceLabel: "查看源代码",
    viewSourceAria: "在 GitHub 查看 Lumno 源代码",
    footerTagline: "开源的浏览器命令栏、聚焦搜索与极简新标签页。",
    footerProduct: "产品",
    footerResources: "资源",
    footerCommunity: "社区",
    footerFeatures: "全部功能",
    footerQuickStart: "安装后上手",
    footerRelease: "更新日志",
    footerPrivacy: "隐私政策",
    footerGithub: "GitHub",
    footerFeedback: "反馈与提需",
    footerCopyright: "Lumno. 开源浏览器扩展。",
    languageLabel: "简体中文",
    languageSelectAria: "选择语言",
    qrcodeTitle: "微信群二维码",
    qrcodeImageAlt: "Lumno 微信群二维码",
    qrcodeCloseAria: "关闭二维码弹窗",
  },
  "zh-TW": {
    navigationAria: "主導覽",
    navFeatures: "功能",
    navWorkflow: "運作方式",
    navTrust: "隱私與開源",
    navRelease: "更新日誌",
    navRepository: "程式碼",
    navRepositoryMenuAria: "開啟程式碼儲存庫操作",
    navRepositoryHome: "造訪程式碼庫",
    navRepositoryIssue: "提 Issue",
    navRepositoryPullRequest: "提 PR",
    navCommunity: "意見回饋&功能許願",
    navContact: "聯絡作者",
    navContactMenuAria: "開啟作者主頁",
    navContactX: "X",
    navContactXiaohongshu: "小紅書",
    navMoreMenuAria: "開啟更多導覽",
    installLabel: "安裝 Lumno",
    installAria: "開啟 Lumno 安裝選項",
    installChromeStoreLabel: "Chrome 線上應用程式商店",
    installEdgeStoreLabel: "Microsoft Edge 附加元件",
    installChromeRecommendation: "推薦 · 更新更快",
    githubAria: "造訪 Lumno GitHub 儲存庫",
    heroTitle: "從任何網頁，找回瀏覽器裡的任何內容",
    heroDescription:
      "Lumno 是一個開源的瀏覽器命令欄，可從任何網頁隨時喚起。\n搜尋分頁、書籤、瀏覽紀錄與常用網站，不用來回翻找。",
    heroInstallLabel: "透過 Chrome 線上商店安裝",
    heroInstallAria: "透過 Chrome 線上應用程式商店安裝 Lumno",
    heroBrowserTooltipLabel: "支援大部分 Chromium 核心瀏覽器",
    heroCommunityLabel: "意見回饋 & 功能許願",
    heroCommunityAria: "開啟 Lumno 意見回饋與功能許願二維碼",
    heroOpenSourceNote: "基於 GPL-3.0 開源",
    heroLicenseLabel: "GPL-3.0",
    heroLicenseAria: "在新分頁查看 Lumno 的 GPL-3.0 開源授權條款",
    heroDemoAria: "Lumno 聚焦搜尋輸入框與游標動畫",
    reviewsTitle: "深受使用者信賴，與使用者共創。",
    reviewsSummary: (averageRating, ratingCount) =>
      `${averageRating.toFixed(1)} 分 · ${ratingCount} 個評分`,
    reviewsSourceLabel: "查看所有評價",
    reviewsAriaLabel: "Chrome 線上應用程式商店的真實使用者評價輪播",
    reviewAvatarLabel: "的頭像",
    reviewRatingLabel: "星評價",
    productShowcaseAria: "Lumno 的四項核心功能",
    featureSectionTitle: "極簡而強大，你的 100% 新分頁。",
    featureSectionDescription:
      "書籤、常用網站與快速搜尋，一個乾淨的新分頁全部裝下（也可以隱藏）",
    featureMessages: {
      searchTitle: "一個命令欄，搜尋所有瀏覽器資料",
      searchDesc: "同時查找分頁、書籤、瀏覽紀錄與常用頁面",
      siteSearchTitle: "按 Tab，直接搜尋常用網站",
      siteSearchDesc: "從搜尋引擎、GitHub 與文件網站繼續查找",
      newTabTitle: "一個更安靜的新分頁",
      newTabDesc: "保留書籤與常用網站，不加入資訊流",
      labsTitle: "輕量互動",
      labsTitleStrong: "& 細緻介面",
      labsDesc: "鍵盤優先，讓高頻操作保持專注",
      betaAlt: "Beta",
    },
    workflowTitle: "一條自然的瀏覽路徑",
    workflowDescription: "Lumno 不改變你正在做的事，只縮短找到下一步的距離。",
    workflowSteps: [
      { title: "隨時喚起", description: "在任何網頁開啟 Lumno，保留目前情境。" },
      { title: "統一搜尋", description: "一次輸入，查找分頁、書籤、瀏覽紀錄或常用頁面。" },
      { title: "立即繼續", description: "直接切換到目標頁面，或按 Tab 發起站內搜尋。" },
    ],
    audienceTitle: "為需要保持思緒連續的人設計",
    audienceDescription: "少一點視窗整理，多一點真正有價值的瀏覽與創作。",
    audiences: [
      { title: "研究與寫作", description: "在資料、瀏覽紀錄與參考頁面之間快速往返，不打斷目前思路。" },
      { title: "開發與設計", description: "把 GitHub、文件、設計資源與專案頁面放進同一個搜尋入口。" },
      { title: "瀏覽器遷移", description: "從 Arc 轉向 Dia、Chrome 或 Edge 後，延續熟悉的命令欄工作流程。" },
    ],
    trustTitle: "工具應該幫你專注，而不是製造新的負擔",
    trustDescription:
      "Lumno 以本機優先與透明為基礎。擴充功能的原始碼公開，帳號、同步與產品分析能力則按需啟用。",
    trustPoints: [
      { title: "本機優先", description: "分頁、書籤與瀏覽紀錄的核心搜尋盡可能在瀏覽器本機完成。" },
      { title: "開源透明", description: "核心擴充功能程式碼公開，可查看實作、回報問題或參與改進。" },
      { title: "選擇權清晰", description: "需要連線的帳號、同步與分析功能分別說明，並提供相應控制。" },
    ],
    browsersTitle: "為 Chromium 瀏覽器而生",
    browsersDescription: "可從 Chrome 線上應用程式商店或 Microsoft Edge 附加元件安裝。",
    browserNames: ["Chrome", "Edge", "Dia", "Comet", "Atlas", "Helium"],
    faqTitle: "常見問題",
    faqItems: [
      {
        question: "Lumno 可以搜尋哪些內容？",
        answer: "可以搜尋已開啟的分頁、書籤、瀏覽紀錄與常用頁面，也可以透過站內搜尋繼續查找指定網站。",
      },
      {
        question: "它會取代瀏覽器的新分頁嗎？",
        answer: "可以。啟用新分頁功能後，Lumno 會提供以書籤與常用網站為核心的極簡頁面；具體功能可以在擴充功能設定中調整。",
      },
      {
        question: "是否支援 Arc、Safari 或 Firefox？",
        answer: "目前主要支援可安裝 Chromium 擴充功能的瀏覽器，包括 Chrome、Edge、Dia 等。Safari 與 Firefox 暫不在目前支援範圍。",
      },
      {
        question: "Lumno 是免費和開源的嗎？",
        answer: "核心擴充功能免費且開源。你可以在 GitHub 查看原始碼、版本進展與已知問題。",
      },
    ],
    finalTitle: "少找一會兒，多做一點真正重要的事",
    finalDescription: "安裝 Lumno，讓聚焦搜尋成為瀏覽器裡隨時可用的基礎動作。",
    viewSourceLabel: "查看原始碼",
    viewSourceAria: "在 GitHub 查看 Lumno 原始碼",
    footerTagline: "開源的瀏覽器命令欄、聚焦搜尋與極簡新分頁。",
    footerProduct: "產品",
    footerResources: "資源",
    footerCommunity: "社群",
    footerFeatures: "所有功能",
    footerQuickStart: "安裝後上手",
    footerRelease: "更新日誌",
    footerPrivacy: "隱私權政策",
    footerGithub: "GitHub",
    footerFeedback: "意見與需求",
    footerCopyright: "Lumno. 開源瀏覽器擴充功能。",
    languageLabel: "繁體中文",
    languageSelectAria: "選擇語言",
    qrcodeTitle: "微信群二維碼",
    qrcodeImageAlt: "Lumno 微信群二維碼",
    qrcodeCloseAria: "關閉二維碼彈窗",
  },
  en: {
    navigationAria: "Primary navigation",
    navFeatures: "Features",
    navWorkflow: "How it works",
    navTrust: "Privacy & open source",
    navRelease: "Release",
    navRepository: "Repository",
    navRepositoryMenuAria: "Open repository actions",
    navRepositoryHome: "Open repository",
    navRepositoryIssue: "Open an issue",
    navRepositoryPullRequest: "Open a pull request",
    navCommunity: "Feedback & feature requests",
    navContact: "Contact the author",
    navContactMenuAria: "Open the author's profiles",
    navContactX: "X",
    navContactXiaohongshu: "Xiaohongshu",
    navMoreMenuAria: "Open more navigation",
    installLabel: "Install Lumno",
    installAria: "Open Lumno install options",
    installChromeStoreLabel: "Chrome Web Store",
    installEdgeStoreLabel: "Microsoft Edge Add-ons",
    installChromeRecommendation: "Recommended · Faster updates",
    githubAria: "Open the Lumno repository on GitHub",
    heroTitle: "Find anything in your browser, from any page",
    heroDescription:
      "Lumno is an open-source command bar for your browser.\nFind tabs, bookmarks, history, and favorite sites in one search.",
    heroInstallLabel: "Install from the Chrome Web Store",
    heroInstallAria: "Install Lumno from the Chrome Web Store",
    heroBrowserTooltipLabel: "Works with most Chromium-based browsers",
    heroCommunityLabel: "Feedback & feature requests",
    heroCommunityAria: "Open the Lumno feedback and feature-request QR code",
    heroOpenSourceNote: "Open source under GPL-3.0",
    heroLicenseLabel: "GPL-3.0",
    heroLicenseAria: "View Lumno's GPL-3.0 license on GitHub in a new tab",
    heroDemoAria: "Animated Lumno focus-search input and pointer",
    reviewsTitle: "Trusted by users, built with users.",
    reviewsSummary: (averageRating, ratingCount) =>
      `${averageRating.toFixed(1)} · ${ratingCount} ${ratingCount === 1 ? "rating" : "ratings"}`,
    reviewsSourceLabel: "Read all reviews",
    reviewsAriaLabel: "Real user reviews from the Chrome Web Store",
    reviewAvatarLabel: "avatar",
    reviewRatingLabel: "star rating",
    productShowcaseAria: "Four core Lumno features",
    featureSectionTitle: "Minimal and powerful. A new tab that’s 100% yours.",
    featureSectionDescription:
      "Bookmarks, favorite sites, and quick search—all in one clean new tab, with the option to hide any of them.",
    featureMessages: {
      searchTitle: "One command bar for everything in your browser",
      searchDesc: "Find tabs, bookmarks, history, and frequently visited pages",
      siteSearchTitle: "Press Tab to search your favorite sites",
      siteSearchDesc: "Continue in search engines, GitHub, and documentation sites",
      newTabTitle: "A calmer new tab",
      newTabDesc: "Keep bookmarks and useful pages without adding a feed",
      labsTitle: "Lightweight interaction",
      labsTitleStrong: "& polished UI",
      labsDesc: "Keyboard-first controls keep frequent actions focused",
      betaAlt: "Beta",
    },
    workflowTitle: "A natural path through your browser",
    workflowDescription: "Lumno does not change what you are doing. It shortens the distance to what comes next.",
    workflowSteps: [
      { title: "Open anywhere", description: "Bring up Lumno on any page without losing your current context." },
      { title: "Search together", description: "Use one input for tabs, bookmarks, history, and frequently visited pages." },
      { title: "Keep moving", description: "Switch to the result or press Tab to continue with site search." },
    ],
    audienceTitle: "Made for people who need to keep a train of thought",
    audienceDescription: "Spend less time arranging windows and more time browsing, learning, and making.",
    audiences: [
      { title: "Research & writing", description: "Move between sources, history, and reference pages without breaking your train of thought." },
      { title: "Development & design", description: "Put GitHub, documentation, design resources, and project pages behind one search entry." },
      { title: "Browser migration", description: "Keep a familiar command-bar workflow after moving from Arc to Dia, Chrome, or Edge." },
    ],
    trustTitle: "A tool should protect your focus, not create a new burden",
    trustDescription:
      "Lumno is built around local-first behavior and transparency. The extension source is public, while account, sync, and product analytics features are enabled as needed.",
    trustPoints: [
      { title: "Local first", description: "Core search across tabs, bookmarks, and history runs in your browser wherever possible." },
      { title: "Open source", description: "Inspect the core extension, report an issue, or contribute an improvement on GitHub." },
      { title: "Clear choices", description: "Connected account, sync, and analytics features are explained separately with corresponding controls." },
    ],
    browsersTitle: "Made for Chromium browsers",
    browsersDescription: "Install from the Chrome Web Store or Microsoft Edge Add-ons.",
    browserNames: ["Chrome", "Edge", "Dia", "Comet", "Atlas", "Helium"],
    faqTitle: "Questions, answered",
    faqItems: [
      {
        question: "What can Lumno search?",
        answer: "Lumno searches open tabs, bookmarks, browsing history, and frequently visited pages. Site search can also continue your query on a selected website.",
      },
      {
        question: "Does it replace the browser new tab?",
        answer: "It can. When enabled, Lumno provides a minimalist new tab centered on bookmarks and useful pages. You can adjust the feature in the extension settings.",
      },
      {
        question: "Does Lumno support Arc, Safari, or Firefox?",
        answer: "Lumno currently focuses on browsers that support Chromium extensions, including Chrome, Edge, and Dia. Safari and Firefox are not currently supported.",
      },
      {
        question: "Is Lumno free and open source?",
        answer: "The core extension is free and open source. Visit GitHub to inspect the code, follow releases, and review known issues.",
      },
    ],
    finalTitle: "Spend less time finding and more time on what matters",
    finalDescription: "Install Lumno and make focus search a natural part of your browser.",
    viewSourceLabel: "View source",
    viewSourceAria: "View Lumno source code on GitHub",
    footerTagline: "An open-source browser command bar, focus search, and minimalist new tab.",
    footerProduct: "Product",
    footerResources: "Resources",
    footerCommunity: "Community",
    footerFeatures: "All features",
    footerQuickStart: "Getting started",
    footerRelease: "Release notes",
    footerPrivacy: "Privacy",
    footerGithub: "GitHub",
    footerFeedback: "Feedback & requests",
    footerCopyright: "Lumno. An open-source browser extension.",
    languageLabel: "English",
    languageSelectAria: "Choose language",
    qrcodeTitle: "WeChat group QR code",
    qrcodeImageAlt: "QR code for the Lumno WeChat group",
    qrcodeCloseAria: "Close the QR code dialog",
  },
};

export function getHomeContent(locale: SupportedLocale): HomeContent {
  return HOME_CONTENT[locale] || HOME_CONTENT["zh-CN"];
}
