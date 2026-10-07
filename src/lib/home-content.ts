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
  zenOff: string;
  /** The suggestion row /zen brings up (mode-commands.js zen_enable_title). */
  zenEnter: string;
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
  installChromeRecommendationNote: string;

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
    /** The filter lab sits under the wallpaper part heading, so it has no title of its own. */
    filters: {
      alt: string;
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
    /** Store name in the eyebrow; the live rating renders beside it. */
    eyebrow: string;
    title: string;
    ariaLabel: string;
    avatarLabel: string;
    storeLinkLabel: string;
  };
  openSource: {
    title: string;
    /* Card titles only: each card's illustration carries the detail. */
    points: Record<HomeTrustId, string>;
    /* Labels inside the card illustrations. */
    art: {
      /* A data checklist with every item crossed out. */
      privacy: {
        title: string;
        status: string;
        items: Record<"history" | "bookmarks" | "searches" | "usage" | "location", string>;
      };
      /* A settings file and the three places it can go: tab label + where it ends up. */
      sync: Record<"browser" | "webdav" | "file", { label: string; destination: string }>;
    };
    browsersLabel: string;
    browserNames: string[];
    githubLabel: string;
  };
  faqTitle: string;
  faqAskLabel: string;
  faqItems: HomeFaqItem[];
  /** Under the hero title where the closing CTA repeats it. */
  finalDescription: string;

  footerTagline: string;
  footerProduct: string;
  footerSupport: string;
  footerFeatures: string;
  footerRelease: string;
  footerReportIssue: string;
  footerPrivacy: string;
  footerFeedback: string;
  footerSocialAria: string;
  footerGithub: string;
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
    installChromeRecommendation: "推荐",
    installChromeRecommendationNote: "更新更快",

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
      description: "在任意网页按下快捷键，命令栏就地浮现，不用切走当前页面。\n敲几个字，回车直达标签页、书签和网站。",
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
        description: "知乎、B 站、GitHub 等\u00A046\u00A0个网站，敲简称按 Tab 直接搜。",
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
        "自研算法判断需求，只在合适时出现。\n点一下，AI 在后台标签页回答。",
    },
    newTab: {
      eyebrow: "新标签页",
      title: "每次打开，都是一幅画",
      description: "名画与山水壁纸、多种滤镜，书签和常用网站一点即达。\n极简或丰富，由你决定。",
      screenshotAlt: "Lumno 新标签页截图：壁纸、搜索框与常用网站卡片",
      filters: {
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
        description: "名画、Bing 每日一图与风光摄影，每天自动换新。",
        alt: "Lumno 外观设置面板：在内置壁纸之间切换",
      },
      dark: {
        label: "深色模式",
        title: "深夜打开，不再刺眼",
        description: "跟随系统切换深色，并换上一张夜景壁纸。",
        alt: "深色模式下的 Lumno 新标签页，月夜山水壁纸",
      },
      bookmarks: {
        label: "书签",
        title: "书签再多，也不用翻找",
        description: "三种书签布局任选，几百个书签也能一眼找到。",
        alt: "Lumno 新标签页的三种书签布局：多层文件夹、多级列表与顶部书签栏",
        views: { folder: "多层文件夹", list: "多级列表", top: "顶部书签栏" },
      },
      dock: {
        label: "快捷方式",
        title: "常用网站，一点就到",
        description: "常用网站排在搜索框下，悬停时像 Dock 一样放大。",
        alt: "悬停时放大的快捷方式图标",
      },
      clock: {
        label: "时间与名句",
        title: "抬眼看时间，顺便读句诗",
        description: "时钟就在搜索框上方，下方每天换一句诗词。",
        alt: "搜索框上方的时钟与下方的每日名句",
      },
      zen: {
        label: "Zen 模式",
        title: "想专注时，只留搜索框",
        description: "输入 /zen 一键收起其他内容，再输一次即可恢复。",
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
        zenOff: "Zen：已关闭",
        zenEnter: "Lumno：进入 Zen 模式",
        quotes: ["无边落木萧萧下，不尽长江滚滚来。", "行到水穷处，坐看云起时。", "海内存知己，天涯若比邻。", "长风破浪会有时，直挂云帆济沧海。"],
      },
      wallpaperPart: {
        title: "一张好壁纸，看不腻",
        lead: "每天自动换新，深夜换夜景，同一幅画还能玩出八种质感。",
      },
      toolsPart: {
        title: "功能强大，也能极简",
        lead: "常用网站、书签、时钟与诗词一应俱全；想专注时，一键只留搜索框。",
        previous: "上一张",
        next: "下一张",
      },
    },
    utilities: {
      title: "还有这些顺手的小功能",
      description: "每一项都能单独开关，只留你用得上的。",
      items: {
        clip: { title: "网页剪裁", description: "剪下网页一角，悬浮窗实时更新。" },
        autoPip: {
          title: "视频自动画中画",
          description: "切走标签页，视频自动小窗续播。",
        },
        progress: {
          title: "追剧追更卡片",
          description: "钉在新标签页，自动记住看到哪集。",
        },
        sync: { title: "WebDAV 同步", description: "设置、图标和壁纸，跨浏览器同步。" },
        pinned: { title: "固定标签页恢复", description: "重启浏览器，固定标签页自动恢复。" },
        languages: { title: "多语言界面", description: "简繁中文、英文、日文随心切换。" },
      },
    },
    reviews: {
      eyebrow: "Chrome 应用商店",
      title: "与用户共创，打磨每一处体验",
      ariaLabel: "Chrome 应用商店的真实用户评价轮播",
      avatarLabel: "的头像",
      storeLinkLabel: "查看全部评价",
    },
    openSource: {
      title: "隐私与安全，放在首位",
      points: {
        local: "不收集任何使用数据",
        source: "基于 GPL-3.0 协议开源",
        optional: "支持多种配置同步方式",
      },
      art: {
        privacy: {
          title: "Lumno 收集的数据",
          status: "不收集",
          items: { history: "浏览记录", bookmarks: "书签与标签页", searches: "搜索内容", usage: "使用统计", location: "位置信息" },
        },
        sync: {
          browser: { label: "浏览器同步", destination: "随浏览器账号同步到你的其他设备" },
          webdav: { label: "WebDAV", destination: "保存到你自己的 WebDAV 服务器" },
          file: { label: "导出文件", destination: "导出为文件，换台电脑直接导入" },
        },
      },
      browsersLabel: "适用于 Chrome、Edge 和大多数 Chromium 内核浏览器",
      browserNames: BROWSER_NAMES,
      githubLabel: "在 GitHub 查看源码",
    },
    faqTitle: "常见问题",
    faqAskLabel: "在 GitHub 提问",
    faqItems: [
      {
        question: "默认快捷键是什么？可以修改吗？",
        answer:
          "默认 ⌘ ⇧ K，Windows 上是 Ctrl + Shift + K，可在 `chrome://extensions/shortcuts` 修改。改成 ⌘ T，手感和 Arc 一样。",
      },
      {
        question: "支持哪些浏览器？",
        answer:
          "支持 Chrome、Edge、Dia、Brave、Vivaldi 等 Chromium 内核浏览器，暂不支持 Safari 和 Firefox。在 Dia 中可使用命令栏，新标签页暂不可用。",
      },
      {
        question: "从 Arc 迁移过来，能找回熟悉的命令栏吗？",
        answer: "可以。Lumno 受 Arc 式交互启发（与 Arc 无关联），在 Dia、Chrome、Edge 中提供随时唤起、统一搜索和快速切换。把快捷键改成 ⌘ T，用法和 Arc 一样。",
      },
      {
        question: "可以只用命令栏，保留原来的新标签页吗？",
        answer:
          "可以。保持 Lumno 开启，再重新安装原来的新标签页扩展即可，命令栏照常使用。",
      },
      {
        question: "新标签页的地址栏里，为什么是一串扩展网址？",
        answer:
          "这是「输入框自动聚焦」：光标直接落在 Lumno 的搜索框里。在新标签页的外观设置中关闭它，地址栏即恢复空白。",
      },
      {
        question: "命令栏的深浅色和系统不一致，怎么办？",
        answer:
          "「跟随系统」模式还会参考网页颜色。只想跟随系统，在设置的「外观」中关闭「基于网页色彩自动变更主题色」。",
      },
      {
        question: "为什么有些页面里唤不出命令栏？",
        answer:
          "`chrome://` 设置页、应用商店等受限页面不允许扩展运行，Lumno 会改在新标签页打开搜索。本地 PDF 和 HTML 文件需在扩展详情页开启「允许访问文件网址」。",
      },
      {
        question: "设置能在多台设备之间同步吗？",
        answer:
          "可以。默认随浏览器账号同步；开启 WebDAV（支持坚果云和自建服务器）后，还能跨浏览器同步图标和壁纸。",
      },
      {
        question: "Lumno 会上传我的浏览数据吗？",
        answer:
          "不会。标签页、书签和历史记录都在本地检索。只有网页搜索或 AI 搜索时，内容才会发给你选择的搜索引擎或 AI 网站。",
      },
      {
        question: "Lumno 免费吗？",
        answer: "完全免费，代码在 GitHub 以 GPL-3.0 协议开源。",
      },
    ],
    finalDescription: "开源浏览器命令栏与新标签页。",

    footerTagline: "开源的浏览器命令栏、聚焦搜索与极简新标签页。",
    footerProduct: "产品",
    footerSupport: "支持",
    footerFeatures: "全部功能",
    footerRelease: "更新日志",
    footerReportIssue: "报告问题",
    footerPrivacy: "隐私政策",
    footerFeedback: "反馈与提需",
    footerSocialAria: "关注 Lumno",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
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
    installChromeRecommendation: "推薦",
    installChromeRecommendationNote: "更新更快",

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
      description: "在任何網頁按下快捷鍵，命令列就地浮現，不必離開目前頁面。\n打幾個字，按 Enter 直達分頁、書籤和網站。",
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
        description: "YouTube、維基百科、GitHub 等\u00A046\u00A0個網站，輸入簡稱按 Tab 直接搜。",
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
        "自研演算法判斷需求，只在合適時出現。\n點一下，AI 在背景分頁回答。",
    },
    newTab: {
      eyebrow: "新分頁",
      title: "每次開啟，都是一幅畫",
      description: "名畫與山水桌布、多種濾鏡，書籤和常用網站一點就到。\n極簡或豐富，由你決定。",
      screenshotAlt: "Lumno 新分頁截圖：桌布、搜尋框與常用網站卡片",
      filters: {
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
        description: "名畫、Bing 每日一圖與風景攝影，每天自動換新。",
        alt: "Lumno 外觀設定面板：在內建桌布之間切換",
      },
      dark: {
        label: "深色模式",
        title: "深夜打開，不再刺眼",
        description: "跟隨系統切換深色，並換上一張夜景桌布。",
        alt: "深色模式下的 Lumno 新分頁，月夜山水桌布",
      },
      bookmarks: {
        label: "書籤",
        title: "書籤再多，也不用翻找",
        description: "三種書籤版面任選，幾百個書籤也能一眼找到。",
        alt: "Lumno 新分頁的三種書籤版面：多層資料夾、多層選單與頂部書籤列",
        views: { folder: "多層資料夾", list: "多層選單", top: "頂部書籤列" },
      },
      dock: {
        label: "捷徑",
        title: "常用網站，一點就到",
        description: "常用網站排在搜尋框下，滑過時像 Dock 一樣放大。",
        alt: "滑鼠停留時放大的捷徑圖示",
      },
      clock: {
        label: "時間與名句",
        title: "抬眼看時間，順便讀一句詩",
        description: "時鐘就在搜尋框上方，底下每天換一句詩詞。",
        alt: "搜尋框上方的時鐘與下方的每日名句",
      },
      zen: {
        label: "Zen 模式",
        title: "想專心時，只留搜尋框",
        description: "輸入 /zen 一鍵收起其他內容，再輸入一次即可恢復。",
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
        zenOff: "Zen：已關閉",
        zenEnter: "Lumno：進入 Zen 模式",
        quotes: ["無邊落木蕭蕭下，不盡長江滾滾來。", "行到水窮處，坐看雲起時。", "海內存知己，天涯若比鄰。", "長風破浪會有時，直掛雲帆濟滄海。"],
      },
      wallpaperPart: {
        title: "一張好桌布，看不膩",
        lead: "每天自動換新，深夜換夜景，同一幅畫還能玩出八種質感。",
      },
      toolsPart: {
        title: "功能強大，也能極簡",
        lead: "常用網站、書籤、時鐘與詩詞一應俱全；想專心時，一鍵只留搜尋框。",
        previous: "上一張",
        next: "下一張",
      },
    },
    utilities: {
      title: "還有這些貼心的小功能",
      description: "每一項都能單獨開關，只留你用得到的。",
      items: {
        clip: { title: "網頁擷取", description: "擷取網頁一角，懸浮視窗即時更新。" },
        autoPip: {
          title: "影片自動子母畫面",
          description: "切走分頁，影片自動轉小視窗續播。",
        },
        progress: {
          title: "追劇追更卡片",
          description: "釘在新分頁，自動記住看到哪一集。",
        },
        sync: { title: "WebDAV 同步", description: "設定、圖示和桌布，跨瀏覽器同步。" },
        pinned: { title: "釘選分頁復原", description: "重啟瀏覽器，釘選分頁自動復原。" },
        languages: { title: "多語系介面", description: "繁簡中文、英文、日文隨心切換。" },
      },
    },
    reviews: {
      eyebrow: "Chrome 線上應用程式商店",
      title: "與使用者共創，打磨每一處體驗",
      ariaLabel: "Chrome 線上應用程式商店的真實使用者評價輪播",
      avatarLabel: "的頭像",
      storeLinkLabel: "查看所有評價",
    },
    openSource: {
      title: "隱私與安全，放在首位",
      points: {
        local: "不蒐集任何使用資料",
        source: "基於 GPL-3.0 授權開源",
        optional: "支援多種設定同步方式",
      },
      art: {
        privacy: {
          title: "Lumno 蒐集的資料",
          status: "不蒐集",
          items: { history: "瀏覽紀錄", bookmarks: "書籤與分頁", searches: "搜尋內容", usage: "使用統計", location: "位置資訊" },
        },
        sync: {
          browser: { label: "瀏覽器同步", destination: "隨瀏覽器帳號同步到你的其他裝置" },
          webdav: { label: "WebDAV", destination: "存到你自己的 WebDAV 伺服器" },
          file: { label: "匯出檔案", destination: "匯出成檔案，換台電腦直接匯入" },
        },
      },
      browsersLabel: "適用於 Chrome、Edge 與大多數 Chromium 核心瀏覽器",
      browserNames: BROWSER_NAMES,
      githubLabel: "在 GitHub 查看原始碼",
    },
    faqTitle: "常見問題",
    faqAskLabel: "在 GitHub 提問",
    faqItems: [
      {
        question: "預設快捷鍵是什麼？可以修改嗎？",
        answer:
          "預設 ⌘ ⇧ K，Windows 上是 Ctrl + Shift + K，可在 `chrome://extensions/shortcuts` 修改。改成 ⌘ T，手感和 Arc 一樣。",
      },
      {
        question: "支援哪些瀏覽器？",
        answer:
          "支援 Chrome、Edge、Dia、Brave、Vivaldi 等 Chromium 核心瀏覽器，目前不支援 Safari 與 Firefox。在 Dia 中可使用命令列，新分頁暫時無法使用。",
      },
      {
        question: "從 Arc 搬過來，能找回熟悉的命令列嗎？",
        answer: "可以。Lumno 受 Arc 式互動啟發（與 Arc 無關聯），在 Dia、Chrome、Edge 中提供隨時喚起、統一搜尋與快速切換。把快捷鍵改成 ⌘ T，用法和 Arc 一樣。",
      },
      {
        question: "可以只用命令列，保留原本的新分頁嗎？",
        answer:
          "可以。讓 Lumno 保持啟用，再重新安裝原本的新分頁擴充功能即可，命令列照常使用。",
      },
      {
        question: "新分頁的網址列裡，為什麼是一串擴充功能網址？",
        answer:
          "這是「輸入框自動聚焦」：游標直接停在 Lumno 的搜尋框。到新分頁的外觀設定中關閉它，網址列就會恢復空白。",
      },
      {
        question: "命令列的深淺色和系統不一致，怎麼辦？",
        answer:
          "「跟隨系統」模式也會參考網頁顏色。只想跟隨系統，到設定的「外觀」關閉「依網頁色彩自動變更主題色」。",
      },
      {
        question: "為什麼有些頁面叫不出命令列？",
        answer:
          "`chrome://` 設定頁、線上商店等受限頁面不允許擴充功能執行，Lumno 會改在新分頁開啟搜尋。本機 PDF 與 HTML 檔案需在擴充功能詳細資料頁開啟「允許存取檔案網址」。",
      },
      {
        question: "設定能在多台裝置之間同步嗎？",
        answer:
          "可以。預設隨瀏覽器帳號同步；開啟 WebDAV（支援堅果雲與自架伺服器）後，還能跨瀏覽器同步圖示與桌布。",
      },
      {
        question: "Lumno 會上傳我的瀏覽資料嗎？",
        answer:
          "不會。分頁、書籤與瀏覽紀錄都在本機檢索。只有網頁搜尋或 AI 搜尋時，內容才會傳給你選擇的搜尋引擎或 AI 網站。",
      },
      {
        question: "Lumno 免費嗎？",
        answer: "完全免費，程式碼在 GitHub 以 GPL-3.0 授權開源。",
      },
    ],
    finalDescription: "開源瀏覽器命令列與新分頁。",

    footerTagline: "開源的瀏覽器命令列、聚焦搜尋與極簡新分頁。",
    footerProduct: "產品",
    footerSupport: "支援",
    footerFeatures: "所有功能",
    footerRelease: "更新日誌",
    footerReportIssue: "回報問題",
    footerPrivacy: "隱私權政策",
    footerFeedback: "意見與需求",
    footerSocialAria: "追蹤 Lumno",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
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
    installChromeRecommendation: "Recommended",
    installChromeRecommendationNote: "Faster updates",

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
      description: "Press the shortcut on any page and the command bar appears right where you are.\nType a few letters and hit Return to reach any tab, bookmark, or site.",
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
        "Shows up only when it's useful. One click, and AI answers in a background tab.",
    },
    newTab: {
      eyebrow: "New tab",
      title: "Open to a work of art.",
      description:
        "Painted wallpapers, film-like filters, and your bookmarks one click away. Minimal or full, your call.",
      screenshotAlt: "Lumno new tab with a wallpaper, search box, and site cards",
      filters: {
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
        description: "Classic paintings, Bing's photo of the day, and landscape shots, refreshed daily.",
        alt: "The Lumno appearance panel switching between built-in wallpapers",
      },
      dark: {
        label: "Dark mode",
        title: "Easy on the eyes at midnight",
        description: "Follows your system, with a night wallpaper to match.",
        alt: "The Lumno new tab in dark mode with a moonlit ink-wash wallpaper",
      },
      bookmarks: {
        label: "Bookmarks",
        title: "Hundreds of bookmarks, zero digging",
        description: "Three layouts keep hundreds of bookmarks within reach.",
        alt: "Three bookmark layouts on the Lumno new tab: folders, nested menus, and a top bar",
        views: { folder: "Folders", list: "Nested menus", top: "Top bar" },
      },
      dock: {
        label: "Shortcuts",
        title: "Your go-to sites, one click away",
        description: "Daily sites sit under the search box and magnify like the Dock.",
        alt: "Shortcut icons magnifying under the pointer",
      },
      clock: {
        label: "Clock",
        title: "The time, right where you look",
        description: "A clock sits right above the search box, seconds optional.",
        alt: "A clock with seconds above the search box",
      },
      zen: {
        label: "Zen mode",
        title: "Just the search box, when you need to focus",
        description: "Type /zen to tuck everything else away. Type it again to restore.",
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
        zenOff: "Zen: Off",
        zenEnter: "Lumno: enter Zen mode",
      },
      wallpaperPart: {
        title: "Wallpapers that never get old",
        lead: "A new one every day, a night version after dark, and eight ways to play with the one you love.",
      },
      toolsPart: {
        title: "Full-featured, or as minimal as you like",
        lead: "Shortcuts, bookmarks, and a clock, all on hand. When it’s time to focus, one command leaves just the search box.",
        previous: "Previous",
        next: "Next",
      },
    },
    utilities: {
      title: "Small things that add up",
      description: "Each one has its own switch. Keep only what you use.",
      items: {
        clip: { title: "Web Clip", description: "Clip any part of a page into a floating window that stays live." },
        autoPip: {
          title: "Auto Picture-in-Picture",
          description: "Switch tabs and the video keeps playing in a floating window.",
        },
        progress: {
          title: "Progress cards",
          description: "Pin a show or novel to your new tab. It tracks your latest episode or chapter.",
        },
        sync: { title: "WebDAV sync", description: "Sync settings, icons, and wallpapers across browsers." },
        pinned: { title: "Pinned tab recovery", description: "Pinned web tabs come back automatically after the browser restarts." },
        languages: { title: "Your language", description: "English, 日本語, 简体中文, and 繁體中文—or follow your browser." },
      },
    },
    reviews: {
      eyebrow: "Chrome Web Store",
      title: "Built with our users, polished in every detail",
      ariaLabel: "Real user reviews from the Chrome Web Store",
      avatarLabel: "avatar",
      storeLinkLabel: "Read all reviews",
    },
    openSource: {
      title: "Private and secure by design.",
      points: {
        local: "Collects no usage data",
        source: "Open source under GPL-3.0",
        optional: "Several ways to sync settings",
      },
      art: {
        privacy: {
          title: "Data Lumno collects",
          status: "Not collected",
          items: { history: "Browsing history", bookmarks: "Bookmarks & tabs", searches: "Searches", usage: "Usage stats", location: "Location" },
        },
        sync: {
          browser: { label: "Browser sync", destination: "Follows your browser account to every device" },
          webdav: { label: "WebDAV", destination: "Saved to your own WebDAV server" },
          file: { label: "Export file", destination: "Export once, import on any computer" },
        },
      },
      browsersLabel: "Works in Chrome, Edge, and most Chromium-based browsers",
      browserNames: BROWSER_NAMES,
      githubLabel: "View source on GitHub",
    },
    faqTitle: "Questions, answered",
    faqAskLabel: "Ask on GitHub",
    faqItems: [
      {
        question: "What is the default shortcut? Can I change it?",
        answer:
          "⌘ ⇧ K by default, or Ctrl + Shift + K on Windows. Change it at `chrome://extensions/shortcuts`. Set it to ⌘ T and it feels just like Arc.",
      },
      {
        question: "Which browsers are supported?",
        answer:
          "Chromium browsers that install Chrome extensions, including Chrome, Edge, Dia, Brave, and Vivaldi. Safari and Firefox aren’t supported yet. In Dia, you get the command bar but not Lumno’s new tab.",
      },
      {
        question: "I’m moving from Arc. Will this feel familiar?",
        answer:
          "That’s the idea. Inspired by Arc-style interactions (and not affiliated with Arc), Lumno brings an always-ready command bar, unified search, and fast switching to Dia, Chrome, or Edge. Set the shortcut to ⌘ T and it opens right where Arc’s did.",
      },
      {
        question: "Can I keep my current new tab and just use the command bar?",
        answer:
          "Yes. Leave Lumno on and reinstall your other new tab extension. The command bar keeps working.",
      },
      {
        question: "Why does the address bar show an extension URL on a new tab?",
        answer:
          "That’s “Automatically focus input” putting your cursor in Lumno’s search box. Turn it off in the new tab’s appearance settings to keep the address bar empty.",
      },
      {
        question: "The command bar doesn’t match my system’s light or dark mode.",
        answer:
          "Follow system also takes cues from each page’s colors. To follow only your system, turn off “Adapt theme colors to each webpage” under Settings › Appearance.",
      },
      {
        question: "Why doesn’t the command bar open on some pages?",
        answer:
          "Browsers block extensions on restricted pages like `chrome://` settings and the Web Store, so Lumno opens search in a new tab. For local PDF and HTML files, turn on “Allow access to file URLs” on the extension’s details page.",
      },
      {
        question: "Can I sync my settings across devices?",
        answer:
          "Yes. Settings sync through your browser account by default. Turn on WebDAV (Nutstore or your own server) to sync across browsers, icons and wallpapers included.",
      },
      {
        question: "Does Lumno upload my browsing data?",
        answer:
          "No. Tabs, bookmarks, and history are searched locally. Only web and AI searches go out, to the engine or AI site you picked.",
      },
      {
        question: "Is Lumno free?",
        answer: "Completely, and it’s open source under GPL-3.0 on GitHub.",
      },
    ],
    finalDescription: "Open-source command bar and new tab for your browser.",

    footerTagline: "An open-source command bar and minimalist new tab for your browser.",
    footerProduct: "Product",
    footerSupport: "Support",
    footerFeatures: "All features",
    footerRelease: "Release notes",
    footerReportIssue: "Report an issue",
    footerPrivacy: "Privacy policy",
    footerFeedback: "Feedback & requests",
    footerSocialAria: "Follow Lumno",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
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
