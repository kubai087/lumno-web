import type { SupportedLocale } from "./locales";

export type HomeCard = { title: string; description: string };
export type HomeBentoCard = HomeCard & { label: string };
export type HomeFaqItem = { question: string; answer: string };
export type HomeSearchResult = { source: string; title: string; url: string };
export type HomeCommand = { command: string; label: string };

/** Ids keep icons and visuals in markup while copy stays per-locale. */
export type HomeUtilityId = "clip" | "autoPip" | "progress" | "sync" | "pinned" | "languages";
export type HomeTrustId = "local" | "source" | "optional";

type HomeContent = {
  navigationAria: string;
  navFeatures: string;
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

  heroTitle: string;
  // Optional editorial two-line slogan: a roman lead line and an italic accent line.
  heroTitleSerif?: { lead: string; accent: string };
  heroDescription: string;
  heroInstallLabel: string;
  heroInstallAria: string;
  heroBrowserTooltipLabel: string;
  heroCommunityLabel: string;
  heroCommunityAria: string;
  heroDemoAria: string;

  commandBar: {
    eyebrow: string;
    title: string;
    description: string;
    search: HomeBentoCard & { query: string; hint: string; switchLabel: string; results: HomeSearchResult[] };
    siteSearch: HomeBentoCard & { keyword: string; target: string; hint: string };
    ai: HomeBentoCard & { prompt: string };
    aggregate: HomeBentoCard & { groupLabel: string; query: string; sources: string[] };
    commands: HomeBentoCard & { items: HomeCommand[] };
  };
  aiIntent: { eyebrow: string; title: string; description: string };
  newTab: {
    eyebrow: string;
    title: string;
    description: string;
    highlights: string[];
    screenshotAlt: string;
  };
  utilities: {
    eyebrow: string;
    title: string;
    description: string;
    items: Record<HomeUtilityId, HomeCard>;
  };
  reviews: {
    eyebrow: string;
    title: string;
    /** `{rating}` and `{count}` are filled from the Chrome Web Store snapshot. */
    summary: string;
    ariaLabel: string;
    avatarLabel: string;
    storeLinkLabel: string;
  };
  openSource: {
    eyebrow: string;
    title: string;
    description: string;
    points: Record<HomeTrustId, HomeCard>;
    browsersLabel: string;
    browserNames: string[];
    githubLabel: string;
    privacyLabel: string;
  };
  faqTitle: string;
  faqItems: HomeFaqItem[];
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

const BROWSER_NAMES = ["Chrome", "Edge", "Dia", "Brave", "Vivaldi", "Comet", "Atlas", "Helium"];

export const HOME_CONTENT: Record<SupportedLocale, HomeContent> = {
  "zh-CN": {
    navigationAria: "主导航",
    navFeatures: "功能",
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

    heroTitle: "让浏览器的一切，一搜即达",
    heroDescription:
      "Lumno 是开源的浏览器命令栏与新标签页。\n一个快捷键，搜遍标签页、书签、历史记录和常用网站。",
    heroInstallLabel: "免费添加到 Chrome",
    heroInstallAria: "通过 Chrome 应用商店免费安装 Lumno",
    heroBrowserTooltipLabel: "基于 GPL-3.0 开源，支持大部分 Chromium 内核浏览器",
    heroCommunityLabel: "反馈 & 功能许愿",
    heroCommunityAria: "打开 Lumno 反馈与功能许愿二维码",
    heroDemoAria: "Lumno 命令栏演示：搜索浏览器内容、站内搜索与指令",

    commandBar: {
      eyebrow: "聚焦搜索",
      title: "一个快捷键，接管浏览器里的高频动作",
      description: "不用再翻书签栏，也不用在几十个标签页里来回找。按下快捷键，输入几个字，回车就到。",
      search: {
        label: "统一搜索",
        title: "标签页、书签、历史，一处搜到",
        description:
          "已打开的标签页、书签、历史记录和常用网站合在同一个结果列表里。支持拼音匹配，你常选的结果会越排越靠前。",
        query: "sheji",
        hint: "拼音也能搜到「设计」",
        switchLabel: "切换",
        results: [
          { source: "标签页", title: "Lumno 设计稿 – Figma", url: "figma.com" },
          { source: "书签", title: "设计规范 · 团队知识库", url: "notion.so" },
          { source: "历史", title: "Material Design 3", url: "m3.material.io" },
        ],
      },
      siteSearch: {
        label: "站内搜索",
        title: "输入 gh，按 Tab 直接搜 GitHub",
        description:
          "内置 46 个常用站点与 AI 入口：YouTube、Bilibili、知乎、小红书、Google Scholar……也可以添加自定义模板和别名。",
        keyword: "gh",
        target: "GitHub",
        hint: "在 GitHub 中搜索",
      },
      ai: {
        label: "AI 直达",
        title: "问题，直接交给 AI",
        description:
          "输入问题，选择 ChatGPT、Gemini、DeepSeek、Kimi、豆包、千问或元宝，Lumno 会打开对应网页并替你发送。",
        prompt: "用三句话讲清楚量子纠缠",
      },
      aggregate: {
        label: "聚合搜索",
        title: "一次输入，多处同时搜",
        description:
          "把 2–10 个搜索源组成一组。一次查询同时打开全部结果，并自动归入以「名称：关键词」命名的标签页组。",
        groupLabel: "比价：降噪耳机",
        query: "降噪耳机",
        sources: ["淘宝", "京东", "小红书"],
      },
      commands: {
        label: "斜杠指令",
        title: "斜杠指令，手不离键盘",
        description: "输入 / 调出指令；也能直接打开浏览器的扩展、下载、历史等内部页面。",
        items: [
          { command: "/new", label: "新建标签页" },
          { command: "/tabs", label: "只搜已打开的标签页" },
          { command: "/copy", label: "复制当前页面链接" },
          { command: "/clip", label: "剪裁网页局部内容" },
        ],
      },
    },
    aiIntent: {
      eyebrow: "划词 AI",
      title: "选中文字，接着问 AI",
      description:
        "选中一段文字，Lumno 会按内容给出解答、翻译、解释、总结等操作，一键在你常用的 AI 网页中打开。意图识别在本地完成，没选中时不打扰。",
    },
    newTab: {
      eyebrow: "新标签页",
      title: "新标签页，也可以是一幅画",
      description: "印象派与山水壁纸、颗粒与抖色滤镜、书签与常用网站卡片。想极简就极简，想丰富就丰富。",
      highlights: ["内置艺术壁纸", "Bing 每日壁纸", "颗粒 · 半调 · 抖色 · ASCII 滤镜", "书签网格与文件夹", "常用网站卡片", "每日名句", "浅色 / 深色主题"],
      screenshotAlt: "Lumno 新标签页截图：壁纸、搜索框与常用网站卡片",
    },
    utilities: {
      eyebrow: "更多",
      title: "还有这些顺手的小功能",
      description: "每一项都能在设置里单独开关，用不到的关掉就好。",
      items: {
        clip: { title: "网页剪裁", description: "把网页里的一段内容剪下来，悬浮在一旁对照查看。" },
        autoPip: {
          title: "视频自动画中画",
          description: "切到别的标签页时，正在播放的视频自动变成小窗。支持 YouTube、Bilibili、Netflix 等站点。",
        },
        progress: {
          title: "追剧追更卡片",
          description: "在新标签页置顶剧集或小说，看到下一集、下一章时卡片自动更新，下次点开接着看。",
        },
        sync: { title: "WebDAV 同步", description: "除了浏览器自带同步，还能通过坚果云或自建服务同步设置、图标与壁纸。" },
        pinned: { title: "固定标签页恢复", description: "浏览器重启后，自动补回你置顶的网页标签页。" },
        languages: { title: "多语言界面", description: "简体中文、繁體中文、English 与日本語，也可以跟随浏览器语言。" },
      },
    },
    reviews: {
      eyebrow: "用户评价",
      title: "被认真使用，也被认真回应",
      summary: "Chrome 应用商店 {rating} 分 · {count} 条评价。不少新功能，正是来自用户的建议。",
      ariaLabel: "Chrome 应用商店的真实用户评价轮播",
      avatarLabel: "的头像",
      storeLinkLabel: "查看全部评价",
    },
    openSource: {
      eyebrow: "开源与隐私",
      title: "开源，并且尊重你的浏览数据",
      description: "Lumno 以 GPL-3.0 协议开源。没有广告，也不塞信息流；需要联网的功能都由你决定是否开启。",
      points: {
        local: { title: "本地检索", description: "标签页、书签和历史记录在浏览器本地检索，不会上传到 Lumno 服务器。" },
        source: { title: "代码公开", description: "所有实现都能在 GitHub 查看，也欢迎提 Issue 和 PR。" },
        optional: { title: "同步与统计可选", description: "账号同步、WebDAV 与使用统计默认关闭，每一项都在隐私政策中说明。" },
      },
      browsersLabel: "适用于 Chrome、Edge 和大多数 Chromium 内核浏览器",
      browserNames: BROWSER_NAMES,
      githubLabel: "在 GitHub 查看源码",
      privacyLabel: "阅读隐私政策",
    },
    faqTitle: "常见问题",
    faqItems: [
      {
        question: "默认快捷键是什么？可以修改吗？",
        answer:
          "默认按 ⌘ ⇧ K（Windows 为 Ctrl + Shift + K）唤起命令栏，⌘ ⇧ L 会预填当前页面链接。如果与其他软件冲突，可以在 chrome://extensions/shortcuts 中修改。",
      },
      {
        question: "支持哪些浏览器？",
        answer: "支持可以安装 Chrome 扩展的 Chromium 内核浏览器，包括 Chrome、Edge、Dia、Brave、Vivaldi 等。Safari 和 Firefox 暂不支持。",
      },
      {
        question: "从 Arc 迁移过来，能找回熟悉的命令栏吗？",
        answer: "可以。Lumno 受 Arc 式交互启发（与 Arc 无关联），在 Dia、Chrome 或 Edge 中保留随时唤起、统一搜索和快速切换的工作流。",
      },
      {
        question: "Lumno 会上传我的浏览数据吗？",
        answer:
          "不会。标签页、书签和历史记录在本地检索，不会发送到 Lumno 服务器。只有当你使用网页搜索、AI 搜索，或主动开启账号同步、使用统计时，才会产生对应的网络请求。",
      },
      {
        question: "为什么有些页面里唤不出命令栏？",
        answer:
          "浏览器不允许扩展在 chrome:// 设置页、应用商店等受限页面中运行，这时 Lumno 会改为在新标签页里打开搜索。本地 PDF 和 HTML 文件需要在扩展详情页开启「允许访问文件网址」。",
      },
      {
        question: "Lumno 免费吗？",
        answer: "完全免费。代码在 GitHub 以 GPL-3.0 协议开源，你可以查看实现、提交问题或参与改进。",
      },
    ],
    finalTitle: "少找一会儿，多做一点真正重要的事",
    finalDescription: "免费安装 Lumno，然后在任意网页按下 ⌘ ⇧ K 试试。",
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
    footerCopyright: "Lumno · 开源浏览器扩展",
    languageLabel: "简体中文",
    languageSelectAria: "选择语言",
    qrcodeTitle: "微信群二维码",
    qrcodeImageAlt: "Lumno 微信群二维码",
    qrcodeCloseAria: "关闭二维码弹窗",
  },
  "zh-TW": {
    navigationAria: "主導覽",
    navFeatures: "功能",
    navRelease: "更新日誌",
    navRepository: "程式碼",
    navRepositoryMenuAria: "開啟程式碼儲存庫操作",
    navRepositoryHome: "造訪儲存庫",
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

    heroTitle: "瀏覽器裡的一切，一搜就到",
    heroDescription:
      "Lumno 是開源的瀏覽器命令列與新分頁。\n一個快捷鍵，就能搜遍分頁、書籤、瀏覽紀錄與常用網站。",
    heroInstallLabel: "免費加到 Chrome",
    heroInstallAria: "透過 Chrome 線上應用程式商店免費安裝 Lumno",
    heroBrowserTooltipLabel: "以 GPL-3.0 授權開源，支援大部分 Chromium 核心瀏覽器",
    heroCommunityLabel: "意見回饋 & 功能許願",
    heroCommunityAria: "開啟 Lumno 意見回饋與功能許願二維碼",
    heroDemoAria: "Lumno 命令列示範：搜尋瀏覽器內容、站內搜尋與指令",

    commandBar: {
      eyebrow: "聚焦搜尋",
      title: "一個快捷鍵，接手瀏覽器裡的高頻動作",
      description: "不必再翻書籤列，也不用在幾十個分頁之間來回找。按下快捷鍵、打幾個字，按 Enter 就到。",
      search: {
        label: "統一搜尋",
        title: "分頁、書籤、瀏覽紀錄，一次搜到",
        description: "已開啟的分頁、書籤、瀏覽紀錄與常用網站整合在同一份結果裡。你越常選的結果，排序就越靠前。",
        query: "設計",
        hint: "越常選，排越前",
        switchLabel: "切換",
        results: [
          { source: "分頁", title: "Lumno 設計稿 – Figma", url: "figma.com" },
          { source: "書籤", title: "設計規範 · 團隊知識庫", url: "notion.so" },
          { source: "紀錄", title: "Material Design 3", url: "m3.material.io" },
        ],
      },
      siteSearch: {
        label: "站內搜尋",
        title: "輸入 gh，按 Tab 直接搜 GitHub",
        description:
          "內建 46 個常用網站與 AI 入口：YouTube、Bilibili、Reddit、Wikipedia、Google Scholar……也能加入自訂範本與別名。",
        keyword: "gh",
        target: "GitHub",
        hint: "在 GitHub 中搜尋",
      },
      ai: {
        label: "AI 直達",
        title: "問題，直接交給 AI",
        description: "輸入問題，選擇 ChatGPT、Gemini、DeepSeek、Kimi、Perplexity 等，Lumno 會開啟對應網頁並替你送出。",
        prompt: "用三句話解釋量子糾纏",
      },
      aggregate: {
        label: "聚合搜尋",
        title: "輸入一次，多處同時搜",
        description: "把 2–10 個搜尋來源組成一組，一次查詢同時開啟所有結果，並自動歸入以「名稱：關鍵字」命名的分頁群組。",
        groupLabel: "查資料：降噪耳機 評測",
        query: "降噪耳機 評測",
        sources: ["Google", "YouTube", "Reddit"],
      },
      commands: {
        label: "斜線指令",
        title: "斜線指令，手不離鍵盤",
        description: "輸入 / 叫出指令；也能直接開啟瀏覽器的擴充功能、下載、紀錄等內部頁面。",
        items: [
          { command: "/new", label: "開新分頁" },
          { command: "/tabs", label: "只搜尋已開啟的分頁" },
          { command: "/copy", label: "複製目前頁面連結" },
          { command: "/clip", label: "擷取網頁局部內容" },
        ],
      },
    },
    aiIntent: {
      eyebrow: "劃詞 AI",
      title: "選取文字，接著問 AI",
      description:
        "選取一段文字，Lumno 會依內容提供解答、翻譯、解釋、摘要等操作，一鍵在你常用的 AI 網頁開啟。意圖辨識在本機完成，沒選取時不打擾。",
    },
    newTab: {
      eyebrow: "新分頁",
      title: "新分頁，也可以是一幅畫",
      description: "印象派與山水桌布、顆粒與抖色濾鏡、書籤與常用網站卡片。要極簡或豐富，都由你決定。",
      highlights: ["內建藝術桌布", "Bing 每日桌布", "顆粒 · 半調 · 抖色 · ASCII 濾鏡", "書籤格狀檢視與資料夾", "常用網站卡片", "每日名句", "淺色 / 深色主題"],
      screenshotAlt: "Lumno 新分頁截圖：桌布、搜尋框與常用網站卡片",
    },
    utilities: {
      eyebrow: "更多",
      title: "還有這些貼心的小功能",
      description: "每一項都能在設定中單獨開關，用不到就關掉。",
      items: {
        clip: { title: "網頁擷取", description: "把網頁中的一段內容擷取出來，浮在一旁對照查看。" },
        autoPip: {
          title: "影片自動子母畫面",
          description: "切換到其他分頁時，播放中的影片自動縮成小視窗。支援 YouTube、Netflix、Twitch 等網站。",
        },
        progress: {
          title: "追劇追更卡片",
          description: "在新分頁釘選劇集或小說，看到下一集、下一章時卡片自動更新，下次點開接著看。",
        },
        sync: { title: "WebDAV 同步", description: "除了瀏覽器內建同步，也能透過堅果雲或自架服務同步設定、圖示與桌布。" },
        pinned: { title: "釘選分頁復原", description: "瀏覽器重新啟動後，自動補回你釘選的網頁分頁。" },
        languages: { title: "多語系介面", description: "繁體中文、简体中文、English 與日本語，也可以跟隨瀏覽器語言。" },
      },
    },
    reviews: {
      eyebrow: "使用者評價",
      title: "被認真使用，也被認真回應",
      summary: "Chrome 線上應用程式商店 {rating} 分 · {count} 則評價。許多新功能，正是來自使用者的建議。",
      ariaLabel: "Chrome 線上應用程式商店的真實使用者評價輪播",
      avatarLabel: "的頭像",
      storeLinkLabel: "查看所有評價",
    },
    openSource: {
      eyebrow: "開源與隱私",
      title: "開源，並且尊重你的瀏覽資料",
      description: "Lumno 以 GPL-3.0 授權開源。沒有廣告，也不塞資訊流；需要連網的功能都由你決定是否開啟。",
      points: {
        local: { title: "本機檢索", description: "分頁、書籤與瀏覽紀錄在瀏覽器本機檢索，不會上傳到 Lumno 伺服器。" },
        source: { title: "程式碼公開", description: "所有實作都能在 GitHub 查看，也歡迎提 Issue 與 PR。" },
        optional: { title: "同步與統計可選", description: "帳號同步、WebDAV 與使用統計預設關閉，每一項都在隱私權政策中說明。" },
      },
      browsersLabel: "適用於 Chrome、Edge 與大多數 Chromium 核心瀏覽器",
      browserNames: BROWSER_NAMES,
      githubLabel: "在 GitHub 查看原始碼",
      privacyLabel: "閱讀隱私權政策",
    },
    faqTitle: "常見問題",
    faqItems: [
      {
        question: "預設快捷鍵是什麼？可以修改嗎？",
        answer:
          "預設按 ⌘ ⇧ K（Windows 為 Ctrl + Shift + K）喚起命令列，⌘ ⇧ L 會預先填入目前頁面連結。若與其他軟體衝突，可在 chrome://extensions/shortcuts 修改。",
      },
      {
        question: "支援哪些瀏覽器？",
        answer: "支援可安裝 Chrome 擴充功能的 Chromium 核心瀏覽器，包括 Chrome、Edge、Dia、Brave、Vivaldi 等。目前不支援 Safari 與 Firefox。",
      },
      {
        question: "從 Arc 搬過來，能找回熟悉的命令列嗎？",
        answer: "可以。Lumno 受 Arc 式互動啟發（與 Arc 無關聯），在 Dia、Chrome 或 Edge 中延續隨時喚起、統一搜尋與快速切換的工作流程。",
      },
      {
        question: "Lumno 會上傳我的瀏覽資料嗎？",
        answer:
          "不會。分頁、書籤與瀏覽紀錄在本機檢索，不會傳送到 Lumno 伺服器。只有在你使用網頁搜尋、AI 搜尋，或主動開啟帳號同步、使用統計時，才會產生相應的網路請求。",
      },
      {
        question: "為什麼有些頁面叫不出命令列？",
        answer:
          "瀏覽器不允許擴充功能在 chrome:// 設定頁、線上商店等受限頁面執行，這時 Lumno 會改在新分頁開啟搜尋。本機 PDF 與 HTML 檔案需要在擴充功能詳細資料頁開啟「允許存取檔案網址」。",
      },
      {
        question: "Lumno 免費嗎？",
        answer: "完全免費。程式碼在 GitHub 以 GPL-3.0 授權開源，你可以查看實作、回報問題或參與改進。",
      },
    ],
    finalTitle: "少找一會兒，多做一點真正重要的事",
    finalDescription: "免費安裝 Lumno，然後在任何網頁按下 ⌘ ⇧ K 試試看。",
    viewSourceLabel: "查看原始碼",
    viewSourceAria: "在 GitHub 查看 Lumno 原始碼",

    footerTagline: "開源的瀏覽器命令列、聚焦搜尋與極簡新分頁。",
    footerProduct: "產品",
    footerResources: "資源",
    footerCommunity: "社群",
    footerFeatures: "所有功能",
    footerQuickStart: "安裝後上手",
    footerRelease: "更新日誌",
    footerPrivacy: "隱私權政策",
    footerGithub: "GitHub",
    footerFeedback: "意見與需求",
    footerCopyright: "Lumno · 開源瀏覽器擴充功能",
    languageLabel: "繁體中文",
    languageSelectAria: "選擇語言",
    qrcodeTitle: "微信群二維碼",
    qrcodeImageAlt: "Lumno 微信群二維碼",
    qrcodeCloseAria: "關閉二維碼彈窗",
  },
  en: {
    navigationAria: "Primary navigation",
    navFeatures: "Features",
    navRelease: "Release notes",
    navRepository: "Repository",
    navRepositoryMenuAria: "Open repository actions",
    navRepositoryHome: "Open repository",
    navRepositoryIssue: "Open an issue",
    navRepositoryPullRequest: "Open a pull request",
    navCommunity: "Feedback",
    navContact: "Contact",
    navContactMenuAria: "Open the author's profiles",
    navContactX: "X",
    navContactXiaohongshu: "Xiaohongshu",
    navMoreMenuAria: "Open more navigation",
    installLabel: "Install Lumno",
    installAria: "Open Lumno install options",
    installChromeStoreLabel: "Chrome Web Store",
    installEdgeStoreLabel: "Microsoft Edge Add-ons",
    installChromeRecommendation: "Recommended · Faster updates",

    heroTitle: "Your browser, at command.",
    heroTitleSerif: { lead: "Your browser,", accent: "at command." },
    heroDescription:
      "Lumno is an open-source command bar and new tab for your browser.\nOne shortcut to search tabs, bookmarks, history, and the sites you love.",
    heroInstallLabel: "Add to Chrome — it’s free",
    heroInstallAria: "Install Lumno for free from the Chrome Web Store",
    heroBrowserTooltipLabel: "Open source under GPL-3.0. Works in most Chromium-based browsers.",
    heroCommunityLabel: "Feedback & requests",
    heroCommunityAria: "Open Lumno feedback and feature requests",
    heroDemoAria: "Lumno command bar demo: browser search, site search, and commands",

    commandBar: {
      eyebrow: "Focus search",
      title: "One shortcut for everything you do most",
      description:
        "No more digging through the bookmarks bar or hunting across forty tabs. Press the shortcut, type a few letters, hit Return.",
      search: {
        label: "Unified search",
        title: "Tabs, bookmarks, and history in one list",
        description:
          "Open tabs, bookmarks, history, and top sites come back as one ranked list—and the results you pick most rise to the top.",
        query: "design",
        hint: "Learns what you pick",
        switchLabel: "Switch",
        results: [
          { source: "Tab", title: "Lumno design file – Figma", url: "figma.com" },
          { source: "Bookmark", title: "Design guidelines · Team wiki", url: "notion.so" },
          { source: "History", title: "Material Design 3", url: "m3.material.io" },
        ],
      },
      siteSearch: {
        label: "Site search",
        title: "Type gh, press Tab, search GitHub",
        description:
          "46 built-in sites and AI tools—YouTube, Reddit, Wikipedia, Stack Overflow, Google Scholar, and more. Add your own templates and aliases.",
        keyword: "gh",
        target: "GitHub",
        hint: "Search GitHub",
      },
      ai: {
        label: "Ask AI",
        title: "Hand the question to AI",
        description: "Type a question, pick ChatGPT, Gemini, Perplexity, DeepSeek, or Kimi, and Lumno opens it and sends the prompt for you.",
        prompt: "Explain quantum entanglement in three sentences",
      },
      aggregate: {
        label: "Aggregate search",
        title: "Search everywhere at once",
        description:
          "Bundle 2–10 sources into one scope. A single query opens every result and files them into a tab group named “Scope: query”.",
        groupLabel: "Research: vector databases",
        query: "vector databases",
        sources: ["Google Scholar", "GitHub", "Reddit"],
      },
      commands: {
        label: "Slash commands",
        title: "Slash commands, hands on the keys",
        description: "Type / for commands, or jump straight to built-in browser pages like Extensions, Downloads, and History.",
        items: [
          { command: "/new", label: "Open a new tab" },
          { command: "/tabs", label: "Search open tabs only" },
          { command: "/copy", label: "Copy the page link" },
          { command: "/clip", label: "Clip part of a page" },
        ],
      },
    },
    aiIntent: {
      eyebrow: "Selection AI",
      title: "Select text. Ask AI.",
      description:
        "Highlight any text and Lumno offers the right next step—answer, translate, explain, or summarize—in the AI you already use. Intent detection runs locally and stays out of the way until you need it.",
    },
    newTab: {
      eyebrow: "New tab",
      title: "A new tab worth opening",
      description:
        "Impressionist and ink-wash wallpapers, grain and dither filters, bookmarks and top-site cards. Keep it minimal or make it rich.",
      highlights: ["Curated art wallpapers", "Bing daily wallpaper", "Grain · halftone · dither · ASCII", "Bookmark grid & folders", "Top-site cards", "Light & dark themes"],
      screenshotAlt: "Lumno new tab with a wallpaper, search box, and site cards",
    },
    utilities: {
      eyebrow: "And more",
      title: "Small things that add up",
      description: "Each one has its own switch in Settings. Keep what you use, turn off the rest.",
      items: {
        clip: { title: "Web Clip", description: "Clip part of any page into a floating window for side-by-side reference." },
        autoPip: {
          title: "Auto Picture-in-Picture",
          description: "Switch tabs and the playing video keeps going in a floating window—on YouTube, Netflix, Twitch, and more.",
        },
        progress: {
          title: "Progress cards",
          description: "Pin a show or a novel on your new tab. The card follows you to the next episode or chapter.",
        },
        sync: { title: "WebDAV sync", description: "Beyond browser sync, sync settings, icons, and wallpapers through your own WebDAV server." },
        pinned: { title: "Pinned tab recovery", description: "Pinned web tabs come back automatically after the browser restarts." },
        languages: { title: "Your language", description: "English, 日本語, 简体中文, and 繁體中文—or follow your browser." },
      },
    },
    reviews: {
      eyebrow: "Reviews",
      title: "Loved by the people who use it",
      summary: "Rated {rating} on the Chrome Web Store from {count} reviews. Many features started as user requests.",
      ariaLabel: "Real user reviews from the Chrome Web Store",
      avatarLabel: "avatar",
      storeLinkLabel: "Read all reviews",
    },
    openSource: {
      eyebrow: "Open source & privacy",
      title: "Open source, and respectful of your data",
      description: "Lumno is GPL-3.0 licensed. No ads, no feeds, and every connected feature is yours to switch on.",
      points: {
        local: { title: "Searches stay local", description: "Tabs, bookmarks, and history are searched in your browser and never sent to Lumno servers." },
        source: { title: "Every line is public", description: "Read the code on GitHub, report an issue, or send a pull request." },
        optional: { title: "Sync is opt-in", description: "Account sync, WebDAV, and usage analytics are off by default and explained in the privacy policy." },
      },
      browsersLabel: "Works in Chrome, Edge, and most Chromium-based browsers",
      browserNames: BROWSER_NAMES,
      githubLabel: "View source on GitHub",
      privacyLabel: "Read the privacy policy",
    },
    faqTitle: "Questions, answered",
    faqItems: [
      {
        question: "What is the default shortcut? Can I change it?",
        answer:
          "Press ⌘ ⇧ K (Ctrl + Shift + K on Windows) to open the command bar, or ⌘ ⇧ L to open it with the current page link filled in. Change either one at chrome://extensions/shortcuts.",
      },
      {
        question: "Which browsers are supported?",
        answer: "Any Chromium-based browser that installs Chrome extensions, including Chrome, Edge, Dia, Brave, and Vivaldi. Safari and Firefox are not supported yet.",
      },
      {
        question: "I’m moving from Arc. Will this feel familiar?",
        answer:
          "That’s the idea. Lumno is inspired by Arc-style interactions (and not affiliated with Arc), bringing an always-ready command bar, unified search, and fast switching to Dia, Chrome, or Edge.",
      },
      {
        question: "Does Lumno upload my browsing data?",
        answer:
          "No. Tabs, bookmarks, and history are searched locally and never sent to Lumno servers. Network requests only happen when you run a web or AI search, or turn on account sync or usage analytics yourself.",
      },
      {
        question: "Why doesn’t the command bar open on some pages?",
        answer:
          "Browsers block extensions on restricted pages like chrome:// settings and the Web Store, so Lumno opens search in a new tab instead. For local PDF and HTML files, turn on “Allow access to file URLs” on the extension’s details page.",
      },
      {
        question: "Is Lumno free?",
        answer: "Completely. The code is open source under GPL-3.0 on GitHub, where you can read it, report issues, or contribute.",
      },
    ],
    finalTitle: "Less searching. More doing.",
    finalDescription: "Install Lumno for free, then press ⌘ ⇧ K on any page.",
    viewSourceLabel: "View source",
    viewSourceAria: "View Lumno source code on GitHub",

    footerTagline: "An open-source command bar and minimalist new tab for your browser.",
    footerProduct: "Product",
    footerResources: "Resources",
    footerCommunity: "Community",
    footerFeatures: "All features",
    footerQuickStart: "Getting started",
    footerRelease: "Release notes",
    footerPrivacy: "Privacy",
    footerGithub: "GitHub",
    footerFeedback: "Feedback & requests",
    footerCopyright: "Lumno · Open-source browser extension",
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
