import type { SupportedLocale } from "./locales";

export type HomeCard = { title: string; description: string };
export type HomeBentoCard = HomeCard & { label: string };
export type HomeFaqItem = { question: string; answer: string };
/** `icon` is a provider key from lumno-extension/assets/data/site-search.json. */
export type HomeOverlayRow = {
  icon: string;
  title: string;
  detail: string;
  source: string;
  kind: "tab" | "bookmark" | "history";
};

/** Filter ids match the extension's wallpaper effect types (src/newtab/wallpaper-effects.js). */
export type HomeNewTabFilterId = "none" | "blur" | "grain" | "blocks" | "halftone" | "dither" | "ascii" | "crt";
export type HomeNewTabBookmarkView = "folder" | "list" | "top";
export type HomeNewTabFeature = HomeBentoCard & { alt: string };
/** Strings drawn inside the animated new tab illustrations; they follow lumno-extension/_locales. */
export type HomeNewTabScene = {
  searchPlaceholder: string;
  bookmarksHeading: string;
  sourceLabel: string;
  /** Built-in, local, Bing, curated: the order of the extension's source tabs. */
  sources: [string, string, string, string];
  lightLabel: string;
  darkLabel: string;
  systemLabel: string;
  /** Top-level folders; the first one is the folder every bookmark card opens. */
  folders: string[];
  /** A folder inside the expanded one, so the menu shows a second level. */
  subfolder: string;
  zenOn: string;
  zenOff: string;
  /** Chinese UIs only: the extension's quote line comes from Hitokoto, which serves Chinese text. */
  quotes?: string[];
};

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
    search: HomeBentoCard & {
      query: string;
      /** The part of each title the query matches (pinyin can match Chinese). */
      mark: string;
      switchLabel: string;
      openLabel: string;
      results: HomeOverlayRow[];
    };
    siteSearch: HomeBentoCard & {
      keyword: string;
      target: string;
      query: string;
      tabHint: string;
      resultTitle: string;
      actionLabel: string;
      fallbackTitle: string;
    };
    ai: HomeBentoCard & {
      prompt: string;
      groupLabel: string;
      navigateLabel: string;
      selectLabel: string;
      providers: Array<{ key: string; name: string }>;
      /** Index of the provider the demo settles on. */
      pick: number;
      resultTitle: string;
      actionLabel: string;
    };
  };
  aiIntent: { eyebrow: string; title: string; description: string };
  newTab: {
    eyebrow: string;
    title: string;
    description: string;
    screenshotAlt: string;
    filters: HomeNewTabFeature & {
      tablistLabel: string;
      /** Accessible name of the before/after divider. */
      compareLabel: string;
      /** The extension's own search placeholder (lumno-extension _locales search_placeholder). */
      searchPlaceholder: string;
      items: Record<HomeNewTabFilterId, { name: string; note: string }>;
    };
    wallpapers: HomeNewTabFeature;
    dark: HomeNewTabFeature;
    /** One card that steps through all three layouts; `views` names them on its tabs. */
    bookmarks: HomeNewTabFeature & { views: Record<HomeNewTabBookmarkView, string> };
    dock: HomeNewTabFeature;
    clock: HomeNewTabFeature;
    zen: HomeNewTabFeature;
    scene: HomeNewTabScene;
    /** Heading over the wallpaper cards (filters, daily wallpaper, dark mode). */
    wallpaperPart: { title: string; lead: string };
    /** Heading over the carousel of everyday tools. */
    toolsPart: { title: string; lead: string; previous: string; next: string };
  };
  utilities: {
    title: string;
    description: string;
    items: Record<HomeUtilityId, HomeCard>;
  };
  reviews: {
    title: string;
    /** `{rating}` and `{count}` are filled from the Chrome Web Store snapshot. */
    summary: string;
    ariaLabel: string;
    avatarLabel: string;
    storeLinkLabel: string;
  };
  openSource: {
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
      title: "一个快捷键，想去哪就去哪",
      description: "不用翻书签，不用挨个找标签页。敲几个字，回车直达。",
      search: {
        label: "统一搜索",
        title: "标签页、书签、历史，一搜全有",
        description: "支持拼音，常用的自动排前面。",
        query: "sheji",
        mark: "设计",
        switchLabel: "切换",
        openLabel: "新开",
        results: [
          { icon: "gh", title: "lumno-web · 官网设计稿", detail: "github.com/kubai087/lumno-web", source: "已打开", kind: "tab" },
          { icon: "zh", title: "如何做好产品设计？", detail: "知乎 / 设计 / 收藏", source: "书签", kind: "bookmark" },
          { icon: "bb", title: "交互设计入门 30 讲", detail: "bilibili.com/video", source: "历史", kind: "history" },
        ],
      },
      siteSearch: {
        label: "站内搜索",
        title: "跳过首页，直接站内搜",
        description: "知乎、B 站、GitHub 等\u00A046\u00A0个网站，敲简称按 Tab 就能直接搜。",
        keyword: "gh",
        target: "GitHub",
        query: "lumno",
        tabHint: "使用 GitHub 搜索",
        resultTitle: "在 GitHub 中搜索 \"lumno\"",
        actionLabel: "搜索",
        fallbackTitle: "搜索 \"lumno\"",
      },
      ai: {
        label: "AI 直达",
        title: "有问题，直接问 AI",
        description: "ChatGPT、DeepSeek、Kimi 随手切换，回车就发问。",
        prompt: "用三句话讲清楚量子纠缠",
        groupLabel: "AI 搜索",
        navigateLabel: "移动",
        selectLabel: "切换",
        providers: [
          { key: "gpt", name: "ChatGPT" },
          { key: "gm", name: "Gemini" },
          { key: "ds", name: "DeepSeek" },
          { key: "kimi", name: "Kimi" },
          { key: "dbai", name: "豆包" },
          { key: "qw", name: "千问" },
        ],
        pick: 2,
        resultTitle: "向 DeepSeek 提问 \"用三句话讲清楚量子纠缠\"",
        actionLabel: "打开 DeepSeek 网页版",
      },
    },
    aiIntent: {
      eyebrow: "划词 AI",
      title: "选中文字，随手问 AI",
      description:
        "问句给解答，术语给解释，外文给翻译。\n本地识别意图，AI 在后台作答，不打断阅读。",
    },
    newTab: {
      eyebrow: "新标签页",
      title: "每次打开，都是一幅画",
      description: "印象派与山水壁纸，搭配颗粒、抖色滤镜，书签和常用网站一点即达。\n极简还是丰富，由你决定。",
      screenshotAlt: "Lumno 新标签页截图：壁纸、搜索框与常用网站卡片",
      filters: {
        label: "壁纸滤镜",
        title: "同一张壁纸，八种质感",
        description: "换个滤镜，换种心情。拖动中线，和原图比一比。",
        alt: "Lumno 新标签页在同一张雪中村庄油画壁纸上应用不同滤镜的效果",
        tablistLabel: "切换壁纸滤镜预览",
        compareLabel: "拖动对比原图与滤镜效果",
        searchPlaceholder: "搜索或输入网址…",
        items: {
          none: { name: "原图", note: "不加滤镜，保留壁纸本来的样子" },
          blur: { name: "毛玻璃", note: "柔化背景，让内容更清楚" },
          grain: { name: "颗粒", note: "像胶片一样的细腻噪点" },
          blocks: { name: "积木", note: "把画面拼成一块块像素" },
          halftone: { name: "网点", note: "印刷品般的圆点网屏" },
          dither: { name: "抖色", note: "有限色阶的复古抖动" },
          ascii: { name: "ASCII", note: "用字符重绘暗部或亮部" },
          crt: { name: "CRT", note: "扫描线、光晕与屏幕曲率" },
        },
      },
      wallpapers: {
        label: "壁纸",
        title: "每天打开，都有新风景",
        description: "同一张壁纸看久了会腻。名画、Bing 每日一图、自然与城市摄影，每天自动换一张。",
        alt: "Lumno 外观设置面板：在内置壁纸之间切换",
      },
      dark: {
        label: "深色模式",
        title: "深夜打开，不再刺眼",
        description: "熬夜时一开新标签页就被白屏晃到？深色模式跟随系统切换，还配一张夜景壁纸。",
        alt: "深色模式下的 Lumno 新标签页，月夜山水壁纸",
      },
      bookmarks: {
        label: "书签",
        title: "书签再多，也不用翻找",
        description: "收藏了几百个网站，书签栏却放不下？按文件夹点进去、悬停展开，或排在页面顶部，一眼找到。",
        alt: "Lumno 新标签页的三种书签布局：多层文件夹、多级列表与顶部书签栏",
        views: { folder: "多层文件夹", list: "多级列表", top: "顶部书签栏" },
      },
      dock: {
        label: "快捷方式",
        title: "常用网站，一点就到",
        description: "每天必开的那几个网站，排成一行放在搜索框下。鼠标经过，像 Dock 一样放大。",
        alt: "悬停时放大的快捷方式图标",
      },
      clock: {
        label: "时间与名句",
        title: "抬眼看时间，顺便读句诗",
        description: "看时间不用再瞄屏幕角落。时钟就在搜索框上方，下面每天配一句诗词。",
        alt: "搜索框上方的时钟与下方的每日名句",
      },
      zen: {
        label: "Zen 模式",
        title: "想专注时，只留搜索框",
        description: "书签和卡片太多容易分心。输入 /zen 全部收起，再输一次就回来。",
        alt: "Zen 模式下只剩搜索框的新标签页",
      },
      scene: {
        searchPlaceholder: "搜索或输入网址…",
        bookmarksHeading: "书签",
        sourceLabel: "来源",
        sources: ["内置", "本地", "Bing", "精选"],
        lightLabel: "浅色",
        darkLabel: "深色",
        systemLabel: "跟随系统",
        folders: ["参考", "设计规范", "灵感", "竞品", "AI 调研", "设计系统"],
        subfolder: "图标",
        zenOn: "Zen：已开启",
        zenOff: "Zen：已关闭",
        quotes: ["无边落木萧萧下，不尽长江滚滚来。", "行到水穷处，坐看云起时。", "海内存知己，天涯若比邻。", "长风破浪会有时，直挂云帆济沧海。"],
      },
      wallpaperPart: {
        title: "一张好壁纸，看不腻",
        lead: "每天自动换新，深夜换夜景，同一幅画还能换出八种质感。",
      },
      toolsPart: {
        title: "该在的都在，不用的就收起",
        lead: "常用网站、书签和时间一眼可见；想专注时，只留一个搜索框。",
        previous: "上一张",
        next: "下一张",
      },
    },
    utilities: {
      title: "还有这些顺手的小功能",
      description: "每一项都能单独开关，只留你用得上的。",
      items: {
        clip: { title: "网页剪裁", description: "剪下网页的一角，悬浮在旁边，边看边对照。" },
        autoPip: {
          title: "视频自动画中画",
          description: "切走标签页，视频自动缩成小窗继续播放。YouTube、B 站、Netflix 都支持。",
        },
        progress: {
          title: "追剧追更卡片",
          description: "把在追的剧和小说钉在新标签页。看到哪一集，卡片就记到哪一集。",
        },
        sync: { title: "WebDAV 同步", description: "设置、图标和壁纸，也能通过坚果云或自建服务同步。" },
        pinned: { title: "固定标签页恢复", description: "浏览器重启后，固定的标签页自动回来。" },
        languages: { title: "多语言界面", description: "简体中文、繁體中文、English、日本語，也能跟随浏览器。" },
      },
    },
    reviews: {
      title: "被认真使用，也被认真回应",
      summary: "Chrome 应用商店 {rating} 分 · {count} 条评价\n不少新功能，正是来自用户的建议。",
      ariaLabel: "Chrome 应用商店的真实用户评价轮播",
      avatarLabel: "的头像",
      storeLinkLabel: "查看全部评价",
    },
    openSource: {
      title: "代码开源，数据归你",
      description: "以 GPL-3.0 协议开源，没有广告，也没有信息流。每一项联网功能，开不开都由你决定。",
      points: {
        local: { title: "本地检索", description: "标签页、书签和历史，都在本地检索，不会上传到 Lumno\u00A0服务器。" },
        source: { title: "代码公开", description: "每一行代码都在 GitHub 上，欢迎提\u00A0Issue，也欢迎提\u00A0PR。" },
        optional: { title: "同步与统计可选", description: "账号同步、WebDAV 和使用统计默认关闭，隐私政策里写得清清楚楚。" },
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
    finalTitle: "少些翻找，多些专注",
    finalDescription: "免费安装，然后在任意网页按下 ⌘\u00A0⇧\u00A0K。",
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
      title: "一個快捷鍵，想去哪就去哪",
      description: "不用翻書籤，不用逐一找分頁。打幾個字，按 Enter 直達。",
      search: {
        label: "統一搜尋",
        title: "分頁、書籤、瀏覽紀錄，一搜就有",
        description: "你越常選的，排得越前面。",
        query: "設計",
        mark: "設計",
        switchLabel: "切換",
        openLabel: "新開",
        results: [
          { icon: "gh", title: "lumno-web · 官網設計稿", detail: "github.com/kubai087/lumno-web", source: "已開啟", kind: "tab" },
          { icon: "yt", title: "設計系統入門：從零開始", detail: "YouTube / 設計 / 稍後觀看", source: "書籤", kind: "bookmark" },
          { icon: "zw", title: "使用者介面設計 - 維基百科", detail: "zh.wikipedia.org", source: "歷史", kind: "history" },
        ],
      },
      siteSearch: {
        label: "站內搜尋",
        title: "跳過首頁，直接站內搜",
        description: "YouTube、維基百科、GitHub 等\u00A046\u00A0個網站，輸入簡稱按 Tab 就能直接搜。",
        keyword: "gh",
        target: "GitHub",
        query: "lumno",
        tabHint: "使用 GitHub 搜尋",
        resultTitle: "在 GitHub 中搜尋「lumno」",
        actionLabel: "搜尋",
        fallbackTitle: "搜尋 \"lumno\"",
      },
      ai: {
        label: "AI 直達",
        title: "有問題，直接問 AI",
        description: "ChatGPT、Gemini、DeepSeek 隨手切換，按 Enter 就送出。",
        prompt: "用三句話解釋量子糾纏",
        groupLabel: "AI 搜尋",
        navigateLabel: "移動",
        selectLabel: "切換",
        providers: [
          { key: "gpt", name: "ChatGPT" },
          { key: "gm", name: "Gemini" },
          { key: "pplx", name: "Perplexity" },
          { key: "ds", name: "DeepSeek" },
          { key: "kimi", name: "Kimi" },
          { key: "mx", name: "MiniMax" },
        ],
        pick: 1,
        resultTitle: "向 Gemini 提問「用三句話解釋量子糾纏」",
        actionLabel: "開啟 Gemini 網頁版",
      },
    },
    aiIntent: {
      eyebrow: "劃詞 AI",
      title: "選取文字，順手問 AI",
      description:
        "問句給解答，術語給解釋，外文給翻譯。\n本機辨識意圖，AI 在背景作答，不打斷閱讀。",
    },
    newTab: {
      eyebrow: "新分頁",
      title: "每次開啟，都是一幅畫",
      description: "印象派與山水桌布，搭配顆粒、抖色濾鏡，書籤和常用網站一點就到。\n極簡或豐富，由你決定。",
      screenshotAlt: "Lumno 新分頁截圖：桌布、搜尋框與常用網站卡片",
      filters: {
        label: "桌布濾鏡",
        title: "同一張桌布，八種質感",
        description: "換個濾鏡，換種心情。拖曳中線，和原圖比一比。",
        alt: "Lumno 新分頁在同一張雪中村莊油畫桌布上套用不同濾鏡的效果",
        tablistLabel: "切換桌布濾鏡預覽",
        compareLabel: "拖曳比較原圖與濾鏡效果",
        searchPlaceholder: "搜尋或輸入網址…",
        items: {
          none: { name: "原圖", note: "不加濾鏡，保留桌布原本的樣子" },
          blur: { name: "毛玻璃", note: "柔化背景，讓內容更清楚" },
          grain: { name: "顆粒", note: "像底片一樣的細緻雜訊" },
          blocks: { name: "積木", note: "把畫面拼成一格格像素" },
          halftone: { name: "網點", note: "印刷品般的圓點網屏" },
          dither: { name: "抖色", note: "有限色階的復古抖動" },
          ascii: { name: "ASCII", note: "用字元重繪暗部或亮部" },
          crt: { name: "CRT", note: "掃描線、光暈與螢幕弧度" },
        },
      },
      wallpapers: {
        label: "桌布",
        title: "每天打開，都有新風景",
        description: "同一張桌布看久了會膩。名畫、Bing 每日一圖、自然與城市攝影，每天自動換一張。",
        alt: "Lumno 外觀設定面板：在內建桌布之間切換",
      },
      dark: {
        label: "深色模式",
        title: "深夜打開，不再刺眼",
        description: "熬夜時一開新分頁就被白畫面閃到？深色模式跟隨系統切換，還配一張夜景桌布。",
        alt: "深色模式下的 Lumno 新分頁，月夜山水桌布",
      },
      bookmarks: {
        label: "書籤",
        title: "書籤再多，也不用翻找",
        description: "收藏了幾百個網站，書籤列卻放不下？依資料夾點進去、停在上面展開，或排在頁面頂端，一眼就找到。",
        alt: "Lumno 新分頁的三種書籤版面：多層資料夾、多層選單與頂部書籤列",
        views: { folder: "多層資料夾", list: "多層選單", top: "頂部書籤列" },
      },
      dock: {
        label: "捷徑",
        title: "常用網站，一點就到",
        description: "每天必開的那幾個網站，排成一列放在搜尋框下。滑鼠經過時，像 Dock 一樣放大。",
        alt: "滑鼠停留時放大的捷徑圖示",
      },
      clock: {
        label: "時間與名句",
        title: "抬眼看時間，順便讀一句詩",
        description: "看時間不必再瞄螢幕角落。時鐘就在搜尋框上方，底下每天配一句詩詞。",
        alt: "搜尋框上方的時鐘與下方的每日名句",
      },
      zen: {
        label: "Zen 模式",
        title: "想專心時，只留搜尋框",
        description: "書籤和卡片太多容易分心。輸入 /zen 全部收起，再輸入一次就回來。",
        alt: "Zen 模式下只剩搜尋框的新分頁",
      },
      scene: {
        searchPlaceholder: "搜尋或輸入網址…",
        bookmarksHeading: "書籤",
        sourceLabel: "來源",
        sources: ["內建", "本機", "Bing", "精選"],
        lightLabel: "淺色",
        darkLabel: "深色",
        systemLabel: "跟隨系統",
        folders: ["參考", "設計規範", "靈感", "競品", "AI 調研", "設計系統"],
        subfolder: "圖示",
        zenOn: "Zen：已開啟",
        zenOff: "Zen：已關閉",
        quotes: ["無邊落木蕭蕭下，不盡長江滾滾來。", "行到水窮處，坐看雲起時。", "海內存知己，天涯若比鄰。", "長風破浪會有時，直掛雲帆濟滄海。"],
      },
      wallpaperPart: {
        title: "一張好桌布，看不膩",
        lead: "每天自動換新，深夜換夜景，同一幅畫還能換出八種質感。",
      },
      toolsPart: {
        title: "該在的都在，用不到的就收起",
        lead: "常用網站、書籤和時間一眼可見；想專心時，只留一個搜尋框。",
        previous: "上一張",
        next: "下一張",
      },
    },
    utilities: {
      title: "還有這些貼心的小功能",
      description: "每一項都能單獨開關，只留你用得到的。",
      items: {
        clip: { title: "網頁擷取", description: "擷取網頁的一角，浮在一旁，邊看邊對照。" },
        autoPip: {
          title: "影片自動子母畫面",
          description: "切到別的分頁，影片自動縮成小視窗繼續播。YouTube、Netflix、Twitch 都支援。",
        },
        progress: {
          title: "追劇追更卡片",
          description: "把在追的劇和小說釘在新分頁。看到哪一集，卡片就記到哪一集。",
        },
        sync: { title: "WebDAV 同步", description: "設定、圖示和桌布，也能透過堅果雲或自架服務同步。" },
        pinned: { title: "釘選分頁復原", description: "瀏覽器重新啟動後，釘選的分頁自動回來。" },
        languages: { title: "多語系介面", description: "繁體中文、简体中文、English、日本語，也能跟隨瀏覽器。" },
      },
    },
    reviews: {
      title: "被認真使用，也被認真回應",
      summary: "Chrome 線上應用程式商店 {rating} 分 · {count} 則評價\n許多新功能，正是來自使用者的建議。",
      ariaLabel: "Chrome 線上應用程式商店的真實使用者評價輪播",
      avatarLabel: "的頭像",
      storeLinkLabel: "查看所有評價",
    },
    openSource: {
      title: "程式碼開源，資料歸你",
      description: "以 GPL-3.0 授權開源，沒有廣告，也沒有資訊流。每一項連網功能，開不開都由你決定。",
      points: {
        local: { title: "本機檢索", description: "分頁、書籤和瀏覽紀錄，都在本機檢索，不會上傳到 Lumno\u00A0伺服器。" },
        source: { title: "程式碼公開", description: "每一行程式碼都在 GitHub 上，歡迎提\u00A0Issue，也歡迎發\u00A0PR。" },
        optional: { title: "同步與統計可選", description: "帳號同步、WebDAV 和使用統計預設關閉，隱私權政策裡寫得清清楚楚。" },
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
    finalTitle: "少些翻找，多些專注",
    finalDescription: "免費安裝，然後在任何網頁按下 ⌘\u00A0⇧\u00A0K。",
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
      title: "One shortcut to anywhere",
      description: "No bookmark digging, no tab hunting. Type a few letters and hit Return.",
      search: {
        label: "Unified search",
        title: "Tabs, bookmarks, history. One search.",
        description: "The results you pick most rise to the top.",
        query: "design",
        mark: "design",
        switchLabel: "Switch",
        openLabel: "New Tab",
        results: [
          { icon: "gh", title: "lumno-web · Website design", detail: "github.com/kubai087/lumno-web", source: "Opened", kind: "tab" },
          { icon: "yt", title: "Design systems in 10 minutes", detail: "YouTube / Design / Watch later", source: "Bookmark", kind: "bookmark" },
          { icon: "wk", title: "User interface design - Wikipedia", detail: "en.wikipedia.org", source: "History", kind: "history" },
        ],
      },
      siteSearch: {
        label: "Site search",
        title: "Skip the homepage. Search the site.",
        description: "YouTube, Wikipedia, GitHub, and 43 more. Type a keyword, press Tab, and search.",
        keyword: "gh",
        target: "GitHub",
        query: "lumno",
        tabHint: "Search GitHub",
        resultTitle: "Search in GitHub \"lumno\"",
        actionLabel: "Search",
        fallbackTitle: "Search \"lumno\"",
      },
      ai: {
        label: "Ask AI",
        title: "Your question, straight to AI",
        description: "Switch between ChatGPT, Gemini, and Perplexity. Hit Return to ask.",
        prompt: "Explain entanglement simply",
        groupLabel: "AI search",
        navigateLabel: "Move",
        selectLabel: "Switch",
        providers: [
          { key: "gpt", name: "ChatGPT" },
          { key: "gm", name: "Gemini" },
          { key: "pplx", name: "Perplexity" },
          { key: "ds", name: "DeepSeek" },
          { key: "kimi", name: "Kimi" },
          { key: "mx", name: "MiniMax" },
        ],
        pick: 2,
        resultTitle: "Ask Perplexity \"Explain entanglement simply\"",
        actionLabel: "Open Perplexity web app",
      },
    },
    aiIntent: {
      eyebrow: "Selection AI",
      title: "Select text. Ask AI.",
      description:
        "Questions get answers, jargon gets explained, foreign text gets translated. Lumno reads the intent on-device and lets AI reply in a background tab.",
    },
    newTab: {
      eyebrow: "New tab",
      title: "Open to a work of art.",
      description:
        "Impressionist and ink-wash wallpapers, grain and dither filters, and your bookmarks one click away. Keep it minimal, or make it yours.",
      screenshotAlt: "Lumno new tab with a wallpaper, search box, and site cards",
      filters: {
        label: "Wallpaper filters",
        title: "One wallpaper, eight textures",
        description: "A new filter, a new mood. Drag the line to compare it with the original.",
        alt: "The Lumno new tab with different filters applied to the same snowy village painting",
        tablistLabel: "Preview wallpaper filters",
        compareLabel: "Drag to compare the original with the filter",
        searchPlaceholder: "Search or type a URL…",
        items: {
          none: { name: "Original", note: "The wallpaper as it is" },
          blur: { name: "Glass blur", note: "Soft focus behind your content" },
          grain: { name: "Grain", note: "Fine, film-like noise" },
          blocks: { name: "Blocks", note: "Rebuilt from pixel tiles" },
          halftone: { name: "Halftone", note: "Print-style dot screen" },
          dither: { name: "Dither", note: "Retro, limited-palette dither" },
          ascii: { name: "ASCII", note: "Shadows or highlights, in type" },
          crt: { name: "CRT", note: "Scanlines, bloom, and curve" },
        },
      },
      wallpapers: {
        label: "Wallpapers",
        title: "Something new to look at, every day",
        description: "The same background gets old fast. Classic paintings, Bing's photo of the day, and nature and city shots rotate in on their own.",
        alt: "The Lumno appearance panel switching between built-in wallpapers",
      },
      dark: {
        label: "Dark mode",
        title: "Easy on the eyes at midnight",
        description: "No more blinding white tabs late at night. Dark mode follows your system and brings its own night wallpaper.",
        alt: "The Lumno new tab in dark mode with a moonlit ink-wash wallpaper",
      },
      bookmarks: {
        label: "Bookmarks",
        title: "Hundreds of bookmarks, zero digging",
        description: "When the bookmarks bar can't hold them all, click into folders, hover to expand, or line them up along the top.",
        alt: "Three bookmark layouts on the Lumno new tab: folders, nested menus, and a top bar",
        views: { folder: "Folders", list: "Nested menus", top: "Top bar" },
      },
      dock: {
        label: "Shortcuts",
        title: "Your go-to sites, one click away",
        description: "The sites you open every day sit right under the search box and magnify under your pointer, like the Dock.",
        alt: "Shortcut icons magnifying under the pointer",
      },
      clock: {
        label: "Clock",
        title: "The time, right where you look",
        description: "Stop glancing at the corner of your screen. A clock sits right above the search box, seconds optional.",
        alt: "A clock with seconds above the search box",
      },
      zen: {
        label: "Zen mode",
        title: "Just the search box, when you need to focus",
        description: "A busy page pulls you away. Type /zen to tuck everything aside, and type it again to bring it back.",
        alt: "The new tab in Zen mode, with only the search box",
      },
      scene: {
        searchPlaceholder: "Search or type a URL…",
        bookmarksHeading: "Bookmarks",
        sourceLabel: "Source",
        sources: ["Built-in", "Local", "Bing", "Curated"],
        lightLabel: "Light",
        darkLabel: "Dark",
        systemLabel: "Follow system",
        folders: ["Reference", "Guidelines", "Inspiration", "Competitors", "AI research", "Design systems"],
        subfolder: "Icons",
        zenOn: "Zen: On",
        zenOff: "Zen: Off",
      },
      wallpaperPart: {
        title: "Wallpapers that never get old",
        lead: "A new one every day, a night version after dark, and eight textures for the one you love.",
      },
      toolsPart: {
        title: "Everything at hand, nothing in the way",
        lead: "Your sites, bookmarks, and the time at a glance, and just a search box when you need to focus.",
        previous: "Previous",
        next: "Next",
      },
    },
    utilities: {
      title: "Small things that add up",
      description: "Each one has its own switch in Settings. Keep what you use, turn off the rest.",
      items: {
        clip: { title: "Web Clip", description: "Clip any part of a page and keep it floating beside you." },
        autoPip: {
          title: "Auto Picture-in-Picture",
          description: "Switch tabs and the playing video keeps going in a floating window—on YouTube, Netflix, Twitch, and more.",
        },
        progress: {
          title: "Progress cards",
          description: "Pin a show or a novel on your new tab. The card follows you to the next episode or chapter.",
        },
        sync: { title: "WebDAV sync", description: "Sync settings, icons, and wallpapers through your own WebDAV server, too." },
        pinned: { title: "Pinned tab recovery", description: "Pinned web tabs come back automatically after the browser restarts." },
        languages: { title: "Your language", description: "English, 日本語, 简体中文, and 繁體中文—or follow your browser." },
      },
    },
    reviews: {
      title: "Loved by the people who use it",
      summary: "Rated {rating} from {count} reviews on the Chrome Web Store.\nMany features started as user requests.",
      ariaLabel: "Real user reviews from the Chrome Web Store",
      avatarLabel: "avatar",
      storeLinkLabel: "Read all reviews",
    },
    openSource: {
      title: "Open source, private by default.",
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
    finalDescription: "Install Lumno for free, then press ⌘\u00A0⇧\u00A0K on any page.",
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
