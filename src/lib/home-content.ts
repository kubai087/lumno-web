import type { SupportedLocale } from "./locales";
import type { InstallStore } from "./site-links";

export type HomeCard = { title: string; description: string };
export type HomeBentoCard = HomeCard & { label: string };
export type HomeFaqItem = {
  question: string;
  answer: string;
  /** Replaces `answer` once Firefox Add-ons lists Lumno. */
  firefoxAnswer?: string;
  /** Shown only once Firefox Add-ons lists Lumno. */
  firefoxOnly?: boolean;
};
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

/**
 * Where people talk to Lumno (lib/community-panel.ts). Chinese readers are led
 * to the WeChat group, with the author's Xiaohongshu and X as follow-ups and
 * GitHub for those who prefer it; everyone else gets GitHub and X.
 */
type HomeCommunityCopy = {
  /** The entry's name in the top bar, the phone menu and the footer. */
  label: string;
  /** The top bar's own entry for the author's profiles (Xiaohongshu and X in Chinese, X elsewhere). */
  contactLabel: string;
  contactMenuAria: string;
  /** The community panel every entry opens. */
  title: string;
  closeLabel: string;
} & (
  | {
      kind: "group";
      /** The hero's button. */
      cta: string;
      ctaAria: string;
      /** The FAQ's button. */
      askLabel: string;
      askAria: string;
      qrAlt: string;
      /** Under the QR on phones: WeChat's in-app browser can read it in place; elsewhere it goes through Photos. */
      qrWechatHint: string;
      qrPhoneHint: string;
      followLabel: string;
      xiaohongshuLabel: string;
      xLabel: string;
      /** The quiet way out for GitHub people. */
      issueNote: string;
    }
  | {
      kind: "open";
      github: { label: string; description: string };
      x: { label: string; description: string };
      /** The hero's button: the source on GitHub. */
      heroLabel: string;
      heroAria: string;
    }
);

type HomeContent = {
  navigationAria: string;
  navFeatures: string;
  navRelease: string;
  navMoreMenuAria: string;
  community: HomeCommunityCopy;
  installLabel: string;
  // A shorter header label for phones, where the full one would crowd the bar.
  installLabelShort?: string;
  installAria: string;
  installChromeStoreLabel: string;
  installEdgeStoreLabel: string;
  installFirefoxStoreLabel: string;
  installChromeRecommendation: string;
  installChromeRecommendationNote: string;

  heroTitle: string;
  // Optional editorial two-line slogan: a roman lead line and an italic accent line.
  heroTitleSerif?: { lead: string; accent: string };
  /** The pill above the hero title: the license, linking to the source. */
  heroOpenSource: {
    label: string;
    aria: string;
    /** Used instead of aria when the build read the star count; {count} is the full number. */
    ariaWithStars: string;
  };
  heroDescription: string;
  heroInstallLabel: string;
  /** One per store; the install button speaks the store it links to. */
  heroInstallAria: Record<InstallStore, string>;
  heroBrowserTooltipLabel: string;
  /** Replaces the Chromium-only browser wording once Firefox Add-ons lists Lumno. */
  firefoxCopy: { heroBrowserTooltipLabel: string; browsersLabel: string };
  heroDemoAria: string;

  commandBar: {
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
  aiIntent: { title: string; description: string };
  newTab: {
    eyebrow: string;
    title: string;
    description: string;
    screenshotAlt: string;
    /** Phones: a tap on a parallax screenshot opens it full size. */
    screenshotOpenLabel: string;
    screenshotCloseLabel: string;
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
    /** Alt text for a reviewer's photo; {name} is the reviewer. */
    avatarLabel: string;
    storeLinkLabel: string;
    /** A write-up about Lumno, shown beside the store eyebrow; only where readers know the outlet. */
    press?: { label: string; href: string; icon: string };
    /** Opening and closing quotation marks around each review, per the language's convention. */
    quotes: readonly [string, string];
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
      sync: Record<"browser" | "webdav" | "file", string>;
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
  footerRelease: string;
  footerReportIssue: string;
  footerPrivacy: string;
  footerSocialAria: string;
  footerGithub: string;
  footerCopyright: string;
  /** The website's own repository, beside the license. */
  footerWebsiteSource: string;
  languageSelectAria: string;
};

const BROWSER_NAMES = ["Chrome", "Edge", "Dia", "Brave", "Vivaldi", "Comet", "Atlas", "Helium"];

export const HOME_CONTENT: Record<SupportedLocale, HomeContent> = {
  "zh-CN": {
    navigationAria: "主导航",
    navFeatures: "功能",
    navRelease: "近期更新",
    navMoreMenuAria: "打开更多导航",
    community: {
      kind: "group",
      label: "反馈与功能许愿",
      contactLabel: "联系作者",
      contactMenuAria: "打开作者主页",
      title: "加入 Lumno 用户群",
      closeLabel: "关闭",
      cta: "反馈与功能许愿",
      ctaAria: "打开 Lumno 用户群二维码",
      askLabel: "直接问作者（秒回）",
      askAria: "打开用户群二维码，直接向作者提问",
      qrAlt: "Lumno 微信群二维码",
      qrWechatHint: "长按二维码，选择「识别图中的二维码」即可加入",
      qrPhoneHint: "长按图片存到相册，再用微信「扫一扫」从相册选取",
      followLabel: "关注作者",
      xiaohongshuLabel: "小红书",
      xLabel: "X",
      issueNote: "习惯用 GitHub？提交 Issue",
    },
    installLabel: "安装 Lumno",
    installAria: "打开 Lumno 安装选项",
    installChromeStoreLabel: "Chrome 应用商店",
    installEdgeStoreLabel: "Microsoft Edge 加载项",
    installFirefoxStoreLabel: "Firefox 附加组件",
    installChromeRecommendation: "推荐",
    installChromeRecommendationNote: "更新更快",

    heroTitle: "让浏览器的一切，一搜即达",
    heroOpenSource: {
      label: "开源 · GPL-3.0 协议",
      aria: "在 GitHub 查看 Lumno 的源代码",
      ariaWithStars: "在 GitHub 查看 Lumno 的源代码（{count} 个星标）",
    },
    heroDescription:
      "Lumno 是开源的浏览器命令栏与新标签页。\n一个快捷键，搜遍标签页、书签、历史记录和常用网站。",
    heroInstallLabel: "免费安装 Lumno",
    heroInstallAria: {
      chrome: "通过 Chrome 应用商店免费安装 Lumno",
      edge: "通过 Microsoft Edge 加载项免费安装 Lumno",
      firefox: "通过 Firefox 附加组件免费安装 Lumno",
    },
    heroBrowserTooltipLabel: "基于 GPL-3.0 开源，支持大多数 Chromium 内核浏览器",
    firefoxCopy: {
      heroBrowserTooltipLabel: "基于 GPL-3.0 开源，支持大多数 Chromium 内核浏览器和 Firefox",
      browsersLabel: "适用于 Chrome、Edge、Firefox 和大多数 Chromium 内核浏览器",
    },
    heroDemoAria: "Lumno 命令栏演示：搜索浏览器内容、站内搜索与指令",

    commandBar: {
      title: "在任意网页，一键唤出",
      description: "标签页、书签、历史记录和 AI，都在一个搜索框里。",
      search: {
        label: "统一搜索",
        title: "标签页、书签、历史，一搜全有",
        description: "拼音也能搜中文，越常用越靠前。",
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
        description: "输入简称按 Tab，即可在\u00A046\u00A0个网站内直接搜索。",
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
      title: "选中文字，随手问 AI",
      description:
        "只在需要时出现。\n点一下，AI 在后台标签页回答。",
    },
    newTab: {
      eyebrow: "新标签页",
      title: "每次打开，都是一幅画",
      description: "名画与山水壁纸、多种滤镜，书签和常用网站一点即达。\n极简或丰富，由你决定。",
      screenshotAlt: "Lumno 新标签页截图：壁纸、搜索框与常用网站卡片",
      screenshotOpenLabel: "查看大图",
      screenshotCloseLabel: "关闭大图",
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
        title: "日日都有新风景",
        description: "名画、Bing 每日一图与风光摄影，每天自动换新。",
        alt: "Lumno 外观设置面板：在内置壁纸之间切换",
      },
      dark: {
        label: "深色模式",
        title: "夜深了，页面也暗下来",
        description: "随系统进入深色模式，壁纸也换成夜景。",
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
      avatarLabel: "{name} 的头像",
      storeLinkLabel: "查看全部评价",
      press: { label: "少数派推荐", href: "https://sspai.com/post/113495", icon: "/assets/press/sspai.webp" },
      quotes: ["“", "”"],
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
          browser: "浏览器同步",
          webdav: "WebDAV",
          file: "导出文件",
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
          "Mac 上默认是 ⌘ ⇧ K，Windows 上是 Ctrl + Shift + K，可以在 `chrome://extensions/shortcuts` 中修改。",
        firefoxAnswer:
          "Mac 上默认是 ⌘ ⇧ K，Windows 上是 Ctrl + Shift + K，可以在 `chrome://extensions/shortcuts` 中修改。Firefox 中默认是 Mac 上 ⌃ ⇧ K、Windows 和 Linux 上 Alt + K，可以在 `about:addons` 右上角的齿轮菜单里管理扩展快捷键。",
      },
      {
        question: "支持哪些浏览器？",
        answer:
          "支持 Chrome、Edge、Dia、Brave、Vivaldi 等 Chromium 内核浏览器，暂不支持 Safari 和 Firefox。在 Dia 中可使用命令栏，新标签页暂不可用。",
        firefoxAnswer:
          "支持 Chrome、Edge、Dia、Brave、Vivaldi 等 Chromium 内核浏览器，以及 Firefox 140 及以上版本和 Zen 等基于 Firefox 的浏览器，暂不支持 Safari。在 Dia 中可使用命令栏，新标签页暂不可用。",
      },
      {
        question: "Firefox 版有什么不同？",
        answer:
          "主要功能和 Chrome 版相同，从 Firefox 附加组件安装，Zen、LibreWolf 等基于 Firefox 的浏览器也能使用。受 Firefox 限制，网页剪裁和视频自动画中画无法使用，`about:` 页面、附加组件网站和本地文件中也无法唤出命令栏。",
        firefoxOnly: true,
      },
      {
        question: "从 Arc 换过来，还能用上熟悉的命令栏吗？",
        answer: "可以。Lumno 的交互借鉴了 Arc（与 Arc 官方无关），在 Dia、Chrome、Edge 里同样能随时唤起命令栏，一处搜索、快速切换。把快捷键改成 ⌘ T，就是熟悉的 Arc 手感。",
      },
      {
        question: "能只用命令栏，继续用原来的新标签页吗？",
        answer:
          "可以。保持 Lumno 开启，再重新安装原来的新标签页扩展，让它重新接管新标签页即可，命令栏不受影响。",
      },
      {
        question: "为什么新标签页的地址栏里显示一串扩展网址？",
        answer:
          "这是开启了「输入框自动聚焦」的缘故：为了让光标直接落在 Lumno 的搜索框里，地址栏会显示扩展网址。在新标签页的外观设置中关闭这一项，地址栏就会恢复空白。",
      },
      {
        question: "命令栏的深浅色为什么和系统不一致？",
        answer:
          "在「跟随系统」模式下，命令栏还会参考当前网页的颜色。如果只想跟随系统，请在设置的「外观」中关闭「基于网页色彩自动变更主题色」。",
      },
      {
        question: "为什么在有些页面上打不开命令栏？",
        answer:
          "浏览器不允许扩展在 `chrome://` 设置页、扩展商店等受限页面上运行，这时 Lumno 会改为在新标签页中打开搜索。如需在本地 PDF 或 HTML 文件中使用，请在扩展详情页开启「允许访问文件网址」。",
      },
      {
        question: "设置能在多台设备之间同步吗？",
        answer:
          "可以。默认通过浏览器账号同步；开启 WebDAV（支持坚果云和自建服务器）后，还能在不同浏览器之间同步图标和壁纸。",
      },
      {
        question: "Lumno 会上传我的浏览数据吗？",
        answer:
          "不会。标签页、书签和历史记录都在本地检索。只有在网页搜索或 AI 搜索时，你输入的内容才会发送给你选择的搜索引擎或 AI 网站。",
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
    footerRelease: "近期更新",
    footerReportIssue: "报告问题",
    footerPrivacy: "隐私政策",
    footerSocialAria: "关注 Lumno",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
    footerWebsiteSource: "官网源码",
    languageSelectAria: "选择语言",
  },
  "zh-TW": {
    navigationAria: "主導覽",
    navFeatures: "功能",
    navRelease: "近期更新",
    navMoreMenuAria: "開啟更多導覽",
    community: {
      kind: "group",
      label: "意見回饋與功能許願",
      contactLabel: "聯絡作者",
      contactMenuAria: "開啟作者主頁",
      title: "加入 Lumno 使用者群組",
      closeLabel: "關閉",
      cta: "意見回饋與功能許願",
      ctaAria: "開啟 Lumno 使用者群組 QR Code",
      askLabel: "直接問作者（秒回）",
      askAria: "開啟群組 QR Code，直接向作者提問",
      qrAlt: "Lumno 微信群組 QR Code",
      qrWechatHint: "長按 QR Code，即可識別並加入群組",
      qrPhoneHint: "長按圖片儲存到相簿，再用微信「掃一掃」從相簿選取",
      followLabel: "追蹤作者",
      xiaohongshuLabel: "小紅書",
      xLabel: "X",
      issueNote: "習慣用 GitHub？提交 Issue",
    },
    installLabel: "安裝 Lumno",
    installAria: "開啟 Lumno 安裝選項",
    installChromeStoreLabel: "Chrome 線上應用程式商店",
    installEdgeStoreLabel: "Microsoft Edge 附加元件",
    installFirefoxStoreLabel: "Firefox 附加元件",
    installChromeRecommendation: "推薦",
    installChromeRecommendationNote: "更新更快",

    heroTitle: "瀏覽器裡的一切，一搜就到",
    heroOpenSource: {
      label: "開源 · GPL-3.0 授權",
      aria: "在 GitHub 查看 Lumno 的原始碼",
      ariaWithStars: "在 GitHub 查看 Lumno 的原始碼（{count} 顆星）",
    },
    heroDescription:
      "Lumno 是開源的瀏覽器命令列與新分頁。\n一組快速鍵，就能搜遍分頁、書籤、瀏覽紀錄與常用網站。",
    heroInstallLabel: "免費安裝 Lumno",
    heroInstallAria: {
      chrome: "透過 Chrome 線上應用程式商店免費安裝 Lumno",
      edge: "透過 Microsoft Edge 附加元件免費安裝 Lumno",
      firefox: "透過 Firefox 附加元件免費安裝 Lumno",
    },
    heroBrowserTooltipLabel: "以 GPL-3.0 授權開源，支援大多數 Chromium 核心瀏覽器",
    firefoxCopy: {
      heroBrowserTooltipLabel: "以 GPL-3.0 授權開源，支援大多數 Chromium 核心瀏覽器與 Firefox",
      browsersLabel: "適用於 Chrome、Edge、Firefox 與大多數 Chromium 核心瀏覽器",
    },
    heroDemoAria: "Lumno 命令列示範：搜尋瀏覽器內容、站內搜尋與指令",

    commandBar: {
      title: "在任何網頁，一鍵叫出",
      description: "分頁、書籤、瀏覽紀錄和 AI，都在同一個搜尋框裡。",
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
        description: "輸入簡稱按 Tab，即可在\u00A046\u00A0個網站內直接搜尋。",
        keyword: "gh",
        target: "GitHub",
        query: "lumno",
        tabHint: "使用 GitHub 搜尋",
        resultTitle: "在 GitHub 中搜尋「lumno」",
        actionLabel: "搜尋",
        fallbackTitle: "搜尋「lumno」",
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
      title: "反白文字，順手問 AI",
      description:
        "只在需要時出現。\n點一下，AI 在背景分頁回答。",
    },
    newTab: {
      eyebrow: "新分頁",
      title: "每次開啟，都是一幅畫",
      description: "名畫與山水桌布、多種濾鏡，書籤和常用網站一點就到。\n極簡或豐富，由你決定。",
      screenshotAlt: "Lumno 新分頁截圖：桌布、搜尋框與常用網站卡片",
      screenshotOpenLabel: "查看大圖",
      screenshotCloseLabel: "關閉大圖",
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
          dither: { name: "混色", note: "有限色階的復古混色" },
          ascii: { name: "ASCII", note: "用字元重繪暗部或亮部" },
          crt: { name: "CRT", note: "掃描線、光暈與螢幕弧度" },
        },
      },
      wallpapers: {
        label: "桌布",
        title: "日日都有新風景",
        description: "名畫、Bing 每日一圖與風景攝影，每天自動換新。",
        alt: "Lumno 外觀設定面板：在內建桌布之間切換",
      },
      dark: {
        label: "深色模式",
        title: "夜深了，頁面也暗下來",
        description: "隨系統進入深色模式，桌布也換成夜景。",
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
        folders: ["參考", "設計規範", "靈感", "競品", "AI 研究", "設計系統"],
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
      title: "還有這些順手的小功能",
      description: "每一項都能單獨開關，只留你用得到的。",
      items: {
        clip: { title: "網頁剪裁", description: "剪下網頁一角，浮動視窗即時更新。" },
        autoPip: {
          title: "影片自動子母畫面",
          description: "切走分頁，影片自動轉小視窗續播。",
        },
        progress: {
          title: "追劇進度卡片",
          description: "釘選在新分頁，自動記住看到哪一集。",
        },
        sync: { title: "WebDAV 同步", description: "設定、圖示和桌布，跨瀏覽器同步。" },
        pinned: { title: "釘選分頁復原", description: "重新啟動瀏覽器，釘選分頁自動回來。" },
        languages: { title: "多語系介面", description: "繁簡中文、英文、日文隨心切換。" },
      },
    },
    reviews: {
      eyebrow: "Chrome 線上應用程式商店",
      title: "和使用者一起，把每個細節做好",
      ariaLabel: "Chrome 線上應用程式商店的真實使用者評價輪播",
      avatarLabel: "{name} 的頭像",
      storeLinkLabel: "查看所有評價",
      press: { label: "少數派推薦", href: "https://sspai.com/post/113495", icon: "/assets/press/sspai.webp" },
      quotes: ["「", "」"],
    },
    openSource: {
      title: "隱私與安全，放在首位",
      points: {
        local: "不蒐集任何使用資料",
        source: "以 GPL-3.0 授權開源",
        optional: "支援多種設定同步方式",
      },
      art: {
        privacy: {
          title: "Lumno 蒐集的資料",
          status: "不蒐集",
          items: { history: "瀏覽紀錄", bookmarks: "書籤與分頁", searches: "搜尋內容", usage: "使用統計", location: "位置資訊" },
        },
        sync: {
          browser: "瀏覽器同步",
          webdav: "WebDAV",
          file: "匯出檔案",
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
        question: "預設快速鍵是什麼？可以修改嗎？",
        answer:
          "Mac 上預設是 ⌘ ⇧ K，Windows 上是 Ctrl + Shift + K，可以到 `chrome://extensions/shortcuts` 修改。",
        firefoxAnswer:
          "Mac 上預設是 ⌘ ⇧ K，Windows 上是 Ctrl + Shift + K，可以到 `chrome://extensions/shortcuts` 修改。在 Firefox 中，Mac 預設是 ⌃ ⇧ K，Windows 與 Linux 是 Alt + K，可以到 `about:addons` 右上角的齒輪選單管理擴充套件快速鍵。",
      },
      {
        question: "支援哪些瀏覽器？",
        answer:
          "支援 Chrome、Edge、Dia、Brave、Vivaldi 等 Chromium 核心瀏覽器，目前不支援 Safari 與 Firefox。在 Dia 中可使用命令列，新分頁暫時無法使用。",
        firefoxAnswer:
          "支援 Chrome、Edge、Dia、Brave、Vivaldi 等 Chromium 核心瀏覽器，以及 Firefox 140 以上版本與 Zen 等以 Firefox 為基礎的瀏覽器，目前不支援 Safari。在 Dia 中可使用命令列，新分頁暫時無法使用。",
      },
      {
        question: "Firefox 版有什麼不同？",
        answer:
          "主要功能和 Chrome 版相同，從 Firefox 附加元件安裝，Zen、LibreWolf 等以 Firefox 為基礎的瀏覽器也能使用。受 Firefox 限制，網頁剪裁與影片自動子母畫面無法使用，`about:` 頁面、附加元件網站和本機檔案中也無法叫出命令列。",
        firefoxOnly: true,
      },
      {
        question: "從 Arc 換過來，還能用到熟悉的命令列嗎？",
        answer: "可以。Lumno 的互動參考了 Arc（與 Arc 官方無關），在 Dia、Chrome、Edge 裡一樣能隨時叫出命令列，一處搜尋、快速切換。把快速鍵改成 ⌘ T，就是熟悉的 Arc 手感。",
      },
      {
        question: "能只用命令列，繼續用原本的新分頁嗎？",
        answer:
          "可以。讓 Lumno 保持啟用，再重新安裝原本的新分頁擴充功能，讓它重新接管新分頁即可，命令列不受影響。",
      },
      {
        question: "為什麼新分頁的網址列會顯示一串擴充功能網址？",
        answer:
          "這是因為開啟了「輸入框自動聚焦」：為了讓游標直接停在 Lumno 的搜尋框，網址列會顯示擴充功能網址。到新分頁的外觀設定中關閉這個選項，網址列就會恢復空白。",
      },
      {
        question: "命令列的深淺色為什麼和系統不一致？",
        answer:
          "在「跟隨系統」模式下，命令列也會參考目前網頁的顏色。如果只想跟隨系統，請到設定的「外觀」關閉「依網頁色彩自動變更主題色」。",
      },
      {
        question: "為什麼在某些頁面上叫不出命令列？",
        answer:
          "瀏覽器不允許擴充功能在 `chrome://` 設定頁、線上商店等受限頁面上執行，這時 Lumno 會改在新分頁開啟搜尋。若要在本機 PDF 或 HTML 檔案中使用，請到擴充功能詳細資料頁開啟「允許存取檔案網址」。",
      },
      {
        question: "設定能在多台裝置之間同步嗎？",
        answer:
          "可以。預設透過瀏覽器帳號同步；開啟 WebDAV（支援堅果雲與自架伺服器）後，還能在不同瀏覽器之間同步圖示與桌布。",
      },
      {
        question: "Lumno 會上傳我的瀏覽資料嗎？",
        answer:
          "不會。分頁、書籤與瀏覽紀錄都在本機檢索。只有在網頁搜尋或 AI 搜尋時，你輸入的內容才會傳送給你選擇的搜尋引擎或 AI 網站。",
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
    footerRelease: "近期更新",
    footerReportIssue: "回報問題",
    footerPrivacy: "隱私權政策",
    footerSocialAria: "追蹤 Lumno",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
    footerWebsiteSource: "官網原始碼",
    languageSelectAria: "選擇語言",
  },
  en: {
    navigationAria: "Primary navigation",
    navFeatures: "Features",
    navRelease: "Release notes",
    navMoreMenuAria: "Open more navigation",
    community: {
      kind: "open",
      label: "Community",
      contactLabel: "Contact",
      contactMenuAria: "Open the author's profiles",
      title: "Lumno community",
      closeLabel: "Close",
      github: { label: "Ask on GitHub", description: "Bugs, ideas and questions, out in the open" },
      x: { label: "Follow on X", description: "Updates from the maker, @kubai087" },
      heroLabel: "GitHub",
      heroAria: "View Lumno's source code on GitHub",
    },
    installLabel: "Install Lumno",
    installLabelShort: "Install",
    installAria: "Open Lumno install options",
    installChromeStoreLabel: "Chrome Web Store",
    installEdgeStoreLabel: "Microsoft Edge Add-ons",
    installFirefoxStoreLabel: "Firefox Add-ons",
    installChromeRecommendation: "Recommended",
    installChromeRecommendationNote: "Faster updates",

    heroTitle: "Your browser, at command.",
    heroTitleSerif: { lead: "Your browser,", accent: "at command." },
    heroOpenSource: {
      label: "Open source · GPL-3.0",
      aria: "View Lumno's source code on GitHub",
      ariaWithStars: "View Lumno's source code on GitHub ({count} stars)",
    },
    heroDescription:
      "Lumno is an open-source command bar and new tab for your browser.\nOne shortcut to search tabs, bookmarks, history, and the sites you love.",
    heroInstallLabel: "Install Lumno — it’s free",
    heroInstallAria: {
      chrome: "Install Lumno for free from the Chrome Web Store",
      edge: "Install Lumno for free from Microsoft Edge Add-ons",
      firefox: "Install Lumno for free from Firefox Add-ons",
    },
    heroBrowserTooltipLabel: "Open source under GPL-3.0. Works in most Chromium-based browsers.",
    firefoxCopy: {
      heroBrowserTooltipLabel: "Open source under GPL-3.0. Works in most Chromium-based browsers and Firefox.",
      browsersLabel: "Works in Chrome, Edge, Firefox, and most Chromium-based browsers",
    },
    heroDemoAria: "Lumno command bar demo: browser search, site search, and commands",

    commandBar: {
      title: "Call it up\nfrom any page.",
      description: "Your tabs, bookmarks, history, and AI, all in one search box.",
      search: {
        label: "Unified search",
        title: "Too many tabs?\nJust search.",
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
        title: "Search inside sites,\none Tab away.",
        description: "Type a shortcut and press Tab to search any of 46 sites.",
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
        title: "Your question,\nstraight to AI.",
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
      title: "Select text.\nAsk AI.",
      description:
        "Shows up only when you need it. One click, and AI answers in a background tab.",
    },
    newTab: {
      eyebrow: "New tab",
      title: "Make your new tab\ntruly yours.",
      description:
        "Painted wallpapers, film-like filters, and your bookmarks one click away. Minimal or full, your call.",
      screenshotAlt: "Lumno new tab with a wallpaper, search box, and site cards",
      screenshotOpenLabel: "View full size",
      screenshotCloseLabel: "Close full-size view",
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
      title: "Small things\nthat add up.",
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
      title: "Built with our users,\npolished in every detail.",
      ariaLabel: "Real user reviews from the Chrome Web Store",
      avatarLabel: "{name}’s avatar",
      storeLinkLabel: "Read all reviews",
      quotes: ["“", "”"],
    },
    openSource: {
      title: "Private and secure,\nby design.",
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
          browser: "Browser sync",
          webdav: "WebDAV",
          file: "Export file",
        },
      },
      browsersLabel: "Works in Chrome, Edge, and most Chromium-based browsers",
      browserNames: BROWSER_NAMES,
      githubLabel: "View source on GitHub",
    },
    faqTitle: "Questions,\nanswered.",
    faqAskLabel: "Ask on GitHub",
    faqItems: [
      {
        question: "What is the default shortcut? Can I change it?",
        answer:
          "⌘ ⇧ K on Mac and Ctrl + Shift + K on Windows by default. You can change it at `chrome://extensions/shortcuts`.",
        firefoxAnswer:
          "⌘ ⇧ K on Mac and Ctrl + Shift + K on Windows by default. You can change it at `chrome://extensions/shortcuts`. In Firefox, it’s ⌃ ⇧ K on Mac and Alt + K on Windows and Linux; change it from the gear menu in `about:addons` under Manage Extension Shortcuts.",
      },
      {
        question: "Which browsers are supported?",
        answer:
          "Chromium browsers that install Chrome extensions, including Chrome, Edge, Dia, Brave, and Vivaldi. Safari and Firefox aren’t supported yet. In Dia, you get the command bar but not Lumno’s new tab.",
        firefoxAnswer:
          "Chromium browsers that install Chrome extensions, including Chrome, Edge, Dia, Brave, and Vivaldi, plus Firefox 140 or later and Firefox-based browsers like Zen. Safari isn’t supported yet. In Dia, you get the command bar but not Lumno’s new tab.",
      },
      {
        question: "How is the Firefox version different?",
        answer:
          "The main features match the Chrome version. Install it from Firefox Add-ons, including in Firefox-based browsers like Zen and LibreWolf. Firefox’s limits mean Web Clip and Auto Picture-in-Picture aren’t available, and the command bar can’t open on `about:` pages, the add-ons site, or local files.",
        firefoxOnly: true,
      },
      {
        question: "I’m moving from Arc. Will this feel familiar?",
        answer:
          "That’s the idea. Lumno borrows from Arc’s interactions (it isn’t affiliated with Arc), so in Dia, Chrome, or Edge you can still call up the command bar anytime, search everything in one place, and switch fast. Set the shortcut to ⌘ T for the Arc feel you know.",
      },
      {
        question: "Can I keep my current new tab and just use the command bar?",
        answer:
          "Yes. Leave Lumno on, then reinstall your other new tab extension so it takes the new tab back. The command bar isn’t affected.",
      },
      {
        question: "Why does the address bar show an extension URL on a new tab?",
        answer:
          "That comes from “Automatically focus input”: to put your cursor straight into Lumno’s search box, the address bar shows the extension URL. Turn it off in the new tab’s appearance settings and the address bar stays empty.",
      },
      {
        question: "Why doesn’t the command bar match my system’s light or dark mode?",
        answer:
          "In Follow system mode, the command bar also takes cues from the current page’s colors. To follow only your system, turn off “Adapt theme colors to each webpage” under Settings › Appearance.",
      },
      {
        question: "Why doesn’t the command bar open on some pages?",
        answer:
          "Browsers block extensions on restricted pages like `chrome://` settings and the Web Store, so Lumno opens search in a new tab. For local PDF and HTML files, turn on “Allow access to file URLs” on the extension’s details page.",
      },
      {
        question: "Can I sync my settings across devices?",
        answer:
          "Yes. Settings sync through your browser account by default. Turn on WebDAV (Nutstore or your own server) to also sync icons and wallpapers between different browsers.",
      },
      {
        question: "Does Lumno upload my browsing data?",
        answer:
          "No. Tabs, bookmarks, and history are searched locally. Only when you run a web or AI search is what you type sent to the search engine or AI site you picked.",
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
    footerRelease: "Release notes",
    footerReportIssue: "Report an issue",
    footerPrivacy: "Privacy policy",
    footerSocialAria: "Follow Lumno",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
    footerWebsiteSource: "Website source",
    languageSelectAria: "Choose language",
  },
  ja: {
    navigationAria: "メインナビゲーション",
    navFeatures: "機能",
    navRelease: "更新履歴",
    navMoreMenuAria: "その他のメニューを開く",
    community: {
      kind: "open",
      label: "コミュニティ",
      contactLabel: "作者に連絡",
      contactMenuAria: "作者のプロフィールを開く",
      title: "Lumno コミュニティ",
      closeLabel: "閉じる",
      github: { label: "GitHub で質問する", description: "不具合、アイデア、質問をオープンに" },
      x: { label: "X でフォロー", description: "作者の最新情報（@kubai087）" },
      heroLabel: "GitHub",
      heroAria: "GitHub で Lumno のソースコードを見る",
    },
    installLabel: "インストール",
    installAria: "Lumno のインストール先を選ぶ",
    installChromeStoreLabel: "Chrome ウェブストア",
    installEdgeStoreLabel: "Microsoft Edge アドオン",
    installFirefoxStoreLabel: "Firefox アドオン",
    installChromeRecommendation: "おすすめ",
    installChromeRecommendationNote: "更新が早い",

    heroTitle: "ブラウザのすべてを、キーひとつで。",
    heroOpenSource: {
      label: "オープンソース · GPL-3.0",
      aria: "GitHub で Lumno のソースコードを見る",
      ariaWithStars: "GitHub で Lumno のソースコードを見る（スター {count} 件）",
    },
    heroDescription:
      "Lumno は、オープンソースのコマンドバーと新しいタブ。\nショートカットひとつで、タブ・ブックマーク・履歴・よく使うサイトをまとめて検索。",
    heroInstallLabel: "Lumno を無料でインストール",
    heroInstallAria: {
      chrome: "Chrome ウェブストアから Lumno を無料でインストール",
      edge: "Microsoft Edge アドオンから Lumno を無料でインストール",
      firefox: "Firefox アドオンから Lumno を無料でインストール",
    },
    heroBrowserTooltipLabel: "GPL-3.0 のオープンソース。ほとんどの Chromium 系ブラウザで使えます",
    firefoxCopy: {
      heroBrowserTooltipLabel: "GPL-3.0 のオープンソース。ほとんどの Chromium 系ブラウザと Firefox で使えます",
      browsersLabel: "Chrome、Edge、Firefox と、ほとんどの Chromium 系ブラウザで使えます",
    },
    heroDemoAria: "Lumno コマンドバーのデモ：ブラウザ内検索、サイト内検索、コマンド",

    commandBar: {
      title: "どのページでも、すぐ呼び出せる",
      description: "タブ、ブックマーク、履歴、そして AI まで。検索ボックスはひとつだけ。",
      search: {
        label: "まとめて検索",
        title: "タブもブックマークも履歴も、まとめて検索",
        description: "よく選ぶ結果ほど、上に表示されます。",
        query: "デザイン",
        mark: "デザイン",
        switchLabel: "切り替え",
        openLabel: "新規",
        results: [
          { icon: "gh", title: "lumno-web · Webサイトのデザイン", detail: "github.com/kubai087/lumno-web", source: "開いている", kind: "tab" },
          { icon: "yt", title: "10分でわかるデザインシステム", detail: "YouTube / デザイン / 後で見る", source: "ブックマーク", kind: "bookmark" },
          { icon: "wk", title: "ユーザーインターフェースデザイン - Wikipedia", detail: "ja.wikipedia.org", source: "履歴", kind: "history" },
        ],
      },
      siteSearch: {
        label: "サイト内検索",
        title: "トップを飛ばして、サイト内を直接検索",
        description: "略称を入力して Tab を押せば、46 のサイト内を直接検索できます。",
        keyword: "gh",
        target: "GitHub",
        query: "lumno",
        tabHint: "GitHub で検索",
        resultTitle: "GitHub で「lumno」を検索",
        actionLabel: "検索",
        fallbackTitle: "「lumno」を検索",
      },
      ai: {
        label: "AI に質問",
        title: "聞きたいことは、そのまま AI へ",
        description: "ChatGPT、Gemini、Perplexity をすぐ切り替えて、Enter で質問。",
        prompt: "量子もつれを3行で説明して",
        groupLabel: "AI検索",
        navigateLabel: "移動",
        selectLabel: "切替",
        providers: [
          { key: "gpt", name: "ChatGPT" },
          { key: "gm", name: "Gemini" },
          { key: "pplx", name: "Perplexity" },
          { key: "ds", name: "DeepSeek" },
          { key: "kimi", name: "Kimi" },
          { key: "mx", name: "MiniMax" },
        ],
        pick: 1,
        resultTitle: "Gemini に「量子もつれを3行で説明して」と質問",
        actionLabel: "Gemini Web版を開く",
      },
    },
    aiIntent: {
      title: "文字を選んで、そのまま AI に",
      description: "必要なときだけ現れます。\nワンクリックで、AI がバックグラウンドのタブで答えます。",
    },
    newTab: {
      eyebrow: "新しいタブ",
      title: "開くたびに、一枚の絵。",
      description: "名画や風景の壁紙にフィルター、ブックマークもよく使うサイトもすぐそこに。\nミニマルにも、多機能にも。",
      screenshotAlt: "Lumno の新しいタブ：壁紙、検索ボックス、よく使うサイトのカード",
      screenshotOpenLabel: "拡大して見る",
      screenshotCloseLabel: "拡大表示を閉じる",
      filters: {
        alt: "雪の村を描いた同じ油絵の壁紙に、さまざまなフィルターをかけた Lumno の新しいタブ",
        tablistLabel: "壁紙フィルターのプレビューを切り替え",
        compareLabel: "ドラッグして元の画像とフィルターを比較",
        searchPlaceholder: "検索またはURLを入力…",
        items: {
          none: { name: "オフ", note: "壁紙をそのままの姿で" },
          blur: { name: "すりガラス", note: "背景をぼかして、文字を読みやすく" },
          grain: { name: "粒子", note: "フィルムのような細かい粒子" },
          blocks: { name: "ブロック", note: "画面をピクセルのタイルで組み直す" },
          halftone: { name: "網点", note: "印刷物のようなドットの網" },
          dither: { name: "ディザ", note: "少ない色数で描くレトロな質感" },
          ascii: { name: "ASCII", note: "暗部や明部を文字で描き直す" },
          crt: { name: "CRT", note: "走査線、にじみ、画面の湾曲" },
        },
      },
      wallpapers: {
        label: "壁紙",
        title: "毎日、新しい景色に出会う",
        description: "名画、Bing の今日の一枚、風景写真。毎日自動で入れ替わります。",
        alt: "Lumno の外観設定パネルで内蔵の壁紙を切り替えているところ",
      },
      dark: {
        label: "ダークモード",
        title: "夜になれば、画面も暗く",
        description: "システムに合わせてダークモードに。壁紙も夜景に変わります。",
        alt: "ダークモードの Lumno の新しいタブ。月夜の水墨画の壁紙",
      },
      bookmarks: {
        label: "ブックマーク",
        title: "ブックマークが多くても、迷わない",
        description: "3 つのレイアウトから選べて、数百件のブックマークもすぐ見つかります。",
        alt: "Lumno の新しいタブの 3 つのブックマーク表示：多層フォルダ、多階層リスト、上部ブックマークバー",
        views: { folder: "多層フォルダ", list: "多階層リスト", top: "上部バー" },
      },
      dock: {
        label: "ショートカット",
        title: "よく使うサイトに、ワンクリックで",
        description: "検索ボックスの下に並び、ポインタを合わせると Dock のように拡大します。",
        alt: "ポインタを合わせると拡大するショートカットのアイコン",
      },
      clock: {
        label: "時計",
        title: "目をやれば、そこに時刻",
        description: "検索ボックスのすぐ上に時計。秒の表示も選べます。",
        alt: "検索ボックスの上に表示された秒付きの時計",
      },
      zen: {
        label: "Zen モード",
        title: "集中したいときは、検索ボックスだけ",
        description: "/zen と入力すればほかの要素をしまえます。もう一度入力すると元どおり。",
        alt: "検索ボックスだけになった Zen モードの新しいタブ",
      },
      scene: {
        searchPlaceholder: "検索またはURLを入力…",
        bookmarksHeading: "ブックマーク",
        sourceLabel: "ソース",
        sources: ["内蔵", "この端末", "Bing", "厳選"],
        lightLabel: "ライト",
        darkLabel: "ダーク",
        systemLabel: "システムに従う",
        folders: ["参考資料", "ガイドライン", "インスピレーション", "競合調査", "AI リサーチ", "デザインシステム"],
        subfolder: "アイコン",
        zenOff: "Zen：オフ",
        zenEnter: "Lumno：Zen モードに切り替え",
      },
      wallpaperPart: {
        title: "見飽きない、壁紙のある毎日",
        lead: "毎日新しい一枚、夜には夜景。お気に入りの一枚も 8 通りの質感で楽しめます。",
      },
      toolsPart: {
        title: "多機能にも、ミニマルにも",
        lead: "ショートカット、ブックマーク、時計がそろっています。集中したいときは、ひと言で検索ボックスだけに。",
        previous: "前へ",
        next: "次へ",
      },
    },
    utilities: {
      title: "ほかにも、便利な機能を",
      description: "どれも個別にオン・オフできます。使うものだけ残してください。",
      items: {
        clip: { title: "Webクリップ", description: "ページの一部を切り取って、常に最新の小窓に。" },
        autoPip: {
          title: "自動ピクチャー・イン・ピクチャー",
          description: "タブを切り替えても、動画は小窓で再生を続けます。",
        },
        progress: {
          title: "進捗カード",
          description: "ドラマや小説を新しいタブに固定。どこまで見たかを自動で記録します。",
        },
        sync: { title: "WebDAV 同期", description: "設定、アイコン、壁紙をブラウザ間で同期。" },
        pinned: { title: "固定タブの復元", description: "ブラウザを再起動しても、固定タブが自動で戻ります。" },
        languages: { title: "日本語に対応", description: "日本語、English、简体中文、繁體中文。ブラウザの言語にも合わせられます。" },
      },
    },
    reviews: {
      eyebrow: "Chrome ウェブストア",
      title: "ユーザーの声とともに、細部まで磨く",
      ariaLabel: "Chrome ウェブストアに寄せられたユーザーレビュー",
      avatarLabel: "{name} のアバター",
      storeLinkLabel: "すべてのレビューを見る",
      quotes: ["「", "」"],
    },
    openSource: {
      title: "プライバシーと安全を、いちばんに",
      points: {
        local: "使用データは一切収集しません",
        source: "GPL-3.0 のオープンソース",
        optional: "設定の同期方法を選べる",
      },
      art: {
        privacy: {
          title: "Lumno が収集するデータ",
          status: "収集しない",
          items: { history: "閲覧履歴", bookmarks: "ブックマークとタブ", searches: "検索内容", usage: "利用統計", location: "位置情報" },
        },
        sync: {
          browser: "ブラウザ同期",
          webdav: "WebDAV",
          file: "ファイルに書き出し",
        },
      },
      browsersLabel: "Chrome、Edge をはじめ、ほとんどの Chromium 系ブラウザで使えます",
      browserNames: BROWSER_NAMES,
      githubLabel: "GitHub でソースを見る",
    },
    faqTitle: "よくある質問",
    faqAskLabel: "GitHub で質問する",
    faqItems: [
      {
        question: "初期設定のショートカットは？ 変更できますか？",
        answer:
          "初期設定は Mac が ⌘ ⇧ K、Windows が Ctrl + Shift + K です。`chrome://extensions/shortcuts` で変更できます。",
        firefoxAnswer:
          "初期設定は Mac が ⌘ ⇧ K、Windows が Ctrl + Shift + K です。`chrome://extensions/shortcuts` で変更できます。Firefox では Mac が ⌃ ⇧ K、Windows と Linux が Alt + K で、`about:addons` の歯車メニューから変更できます。",
      },
      {
        question: "どのブラウザで使えますか？",
        answer:
          "Chrome、Edge、Dia、Brave、Vivaldi など、Chrome 拡張機能を入れられる Chromium 系ブラウザで使えます。Safari と Firefox には未対応です。Dia ではコマンドバーは使えますが、Lumno の新しいタブは使えません。",
        firefoxAnswer:
          "Chrome、Edge、Dia、Brave、Vivaldi など、Chrome 拡張機能を入れられる Chromium 系ブラウザに加え、Firefox 140 以降と Zen などの Firefox 系ブラウザで使えます。Safari には未対応です。Dia ではコマンドバーは使えますが、Lumno の新しいタブは使えません。",
      },
      {
        question: "Firefox 版は何が違いますか？",
        answer:
          "主な機能は Chrome 版と同じで、Firefox アドオンからインストールできます。Zen や LibreWolf などの Firefox 系ブラウザでも使えます。Firefox の制限により、Webクリップと自動ピクチャー・イン・ピクチャーは使えず、`about:` ページ、アドオンサイト、ローカルファイルではコマンドバーを開けません。",
        firefoxOnly: true,
      },
      {
        question: "Arc から乗り換えても、いつものコマンドバーは使えますか？",
        answer:
          "使えます。Lumno の操作感は Arc を参考にしています（Arc とは無関係です）。Dia、Chrome、Edge でもいつでもコマンドバーを呼び出し、まとめて検索して素早く切り替えられます。ショートカットを ⌘ T に変えれば、Arc と同じ感覚で使えます。",
      },
      {
        question: "今の新しいタブはそのままで、コマンドバーだけ使えますか？",
        answer:
          "はい。Lumno をオンにしたまま、使っていた新しいタブの拡張機能を入れ直せば、新しいタブはそちらに戻ります。コマンドバーには影響しません。",
      },
      {
        question: "新しいタブのアドレスバーに、拡張機能の URL が表示されるのはなぜですか？",
        answer:
          "「入力欄を自動フォーカス」がオンになっているためです。カーソルを Lumno の検索ボックスに直接置くため、アドレスバーに拡張機能の URL が表示されます。新しいタブの外観設定でオフにすれば、アドレスバーは空欄に戻ります。",
      },
      {
        question: "コマンドバーのライト・ダークがシステムと合わないのはなぜですか？",
        answer:
          "「システムに従う」では、表示中のページの色も参考にしています。システムだけに合わせたい場合は、設定の「外観」で「Web ページの色に合わせてテーマを自動変更」をオフにしてください。",
      },
      {
        question: "コマンドバーが開かないページがあるのはなぜですか？",
        answer:
          "`chrome://` の設定ページやウェブストアなど、拡張機能の動作が制限されているページがあるためです。その場合、Lumno は新しいタブで検索を開きます。ローカルの PDF や HTML ファイルで使うには、拡張機能の詳細ページで「ファイルの URL へのアクセスを許可する」をオンにしてください。",
      },
      {
        question: "設定は複数のデバイスで同期できますか？",
        answer:
          "できます。初期設定ではブラウザのアカウントで同期されます。WebDAV（NAS や自前のサーバーなど）をオンにすると、アイコンや壁紙も別のブラウザ間で同期できます。",
      },
      {
        question: "閲覧データがアップロードされることはありますか？",
        answer:
          "ありません。タブ、ブックマーク、履歴はすべて端末内で検索します。Web 検索や AI 検索をしたときだけ、入力した内容があなたの選んだ検索エンジンや AI サイトに送られます。",
      },
      {
        question: "Lumno は無料ですか？",
        answer: "完全に無料です。ソースコードは GPL-3.0 ライセンスで GitHub に公開しています。",
      },
    ],
    finalDescription: "オープンソースのコマンドバーと新しいタブ。",

    footerTagline: "ブラウザのためのオープンソースのコマンドバーと、シンプルな新しいタブ。",
    footerProduct: "製品",
    footerSupport: "サポート",
    footerRelease: "更新履歴",
    footerReportIssue: "不具合を報告",
    footerPrivacy: "プライバシーポリシー",
    footerSocialAria: "Lumno をフォロー",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
    footerWebsiteSource: "サイトのソースコード",
    languageSelectAria: "言語を選択",
  },
  ko: {
    navigationAria: "주 메뉴",
    navFeatures: "기능",
    navRelease: "업데이트 내역",
    navMoreMenuAria: "메뉴 더 보기",
    community: {
      kind: "open",
      label: "커뮤니티",
      contactLabel: "개발자에게 연락",
      contactMenuAria: "개발자 프로필 열기",
      title: "Lumno 커뮤니티",
      closeLabel: "닫기",
      github: { label: "GitHub에서 질문하기", description: "버그, 아이디어, 질문을 공개적으로" },
      x: { label: "X에서 팔로우", description: "만든 사람의 새 소식(@kubai087)" },
      heroLabel: "GitHub",
      heroAria: "GitHub에서 Lumno 소스 코드 보기",
    },
    installLabel: "Lumno 설치",
    installAria: "Lumno 설치 옵션 열기",
    installChromeStoreLabel: "Chrome 웹 스토어",
    installEdgeStoreLabel: "Microsoft Edge 추가 기능",
    installFirefoxStoreLabel: "Firefox 부가 기능",
    installChromeRecommendation: "추천",
    installChromeRecommendationNote: "업데이트가 더 빨라요",

    heroTitle: "브라우저의 모든 것, 검색 한 번으로",
    heroOpenSource: {
      label: "오픈 소스 · GPL-3.0",
      aria: "GitHub에서 Lumno 소스 코드 보기",
      ariaWithStars: "GitHub에서 Lumno 소스 코드 보기 (스타 {count}개)",
    },
    heroDescription:
      "Lumno는 오픈 소스 브라우저 커맨드 바이자 새 탭입니다.\n단축키 하나로 탭, 북마크, 방문 기록, 자주 가는 사이트를 한 번에 검색하세요.",
    heroInstallLabel: "Lumno 무료 설치",
    heroInstallAria: {
      chrome: "Chrome 웹 스토어에서 Lumno 무료 설치",
      edge: "Microsoft Edge 추가 기능에서 Lumno 무료 설치",
      firefox: "Firefox 부가 기능에서 Lumno 무료 설치",
    },
    heroBrowserTooltipLabel: "GPL-3.0 오픈 소스. 대부분의 Chromium 기반 브라우저에서 작동합니다",
    firefoxCopy: {
      heroBrowserTooltipLabel: "GPL-3.0 오픈 소스. 대부분의 Chromium 기반 브라우저와 Firefox에서 작동합니다",
      browsersLabel: "Chrome, Edge, Firefox와 대부분의 Chromium 기반 브라우저에서 작동합니다",
    },
    heroDemoAria: "Lumno 커맨드 바 데모: 브라우저 검색, 사이트 내 검색, 명령어",

    commandBar: {
      title: "어떤 페이지에서든 바로 불러오기",
      description: "탭, 북마크, 방문 기록, AI까지. 검색창 하나로 충분합니다.",
      search: {
        label: "통합 검색",
        title: "탭, 북마크, 기록을 한 번에",
        description: "자주 고르는 결과일수록 위로 올라옵니다.",
        query: "디자인",
        mark: "디자인",
        switchLabel: "Switch",
        openLabel: "New Tab",
        results: [
          { icon: "gh", title: "lumno-web · 웹사이트 디자인", detail: "github.com/kubai087/lumno-web", source: "Opened", kind: "tab" },
          { icon: "yt", title: "10분 만에 이해하는 디자인 시스템", detail: "YouTube / 디자인 / 나중에 볼 동영상", source: "Bookmark", kind: "bookmark" },
          { icon: "wk", title: "사용자 인터페이스 디자인 - 위키백과", detail: "ko.wikipedia.org", source: "History", kind: "history" },
        ],
      },
      siteSearch: {
        label: "사이트 내 검색",
        title: "홈페이지는 건너뛰고, 사이트 안에서 바로",
        description: "약어를 입력하고 Tab을 누르면 46개 사이트 안에서 바로 검색합니다.",
        keyword: "gh",
        target: "GitHub",
        query: "lumno",
        tabHint: "Search GitHub",
        resultTitle: "Search in GitHub \"lumno\"",
        actionLabel: "Search",
        fallbackTitle: "Search \"lumno\"",
      },
      ai: {
        label: "AI에게 묻기",
        title: "궁금한 건 바로 AI에게",
        description: "ChatGPT, Gemini, Perplexity를 바로 바꿔 가며 Enter로 질문하세요.",
        prompt: "양자 얽힘을 세 문장으로 설명해 줘",
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
        pick: 1,
        resultTitle: "Ask Gemini \"양자 얽힘을 세 문장으로 설명해 줘\"",
        actionLabel: "Open Gemini web app",
      },
    },
    aiIntent: {
      title: "텍스트를 선택하고, 바로 AI에게",
      description: "필요할 때만 나타납니다.\n한 번 클릭하면 AI가 백그라운드 탭에서 답합니다.",
    },
    newTab: {
      eyebrow: "새 탭",
      title: "열 때마다, 한 폭의 그림",
      description: "명화와 풍경 배경화면, 다양한 필터, 북마크와 자주 가는 사이트까지 클릭 한 번이면 됩니다.\n미니멀하게도, 풍성하게도.",
      screenshotAlt: "Lumno 새 탭: 배경화면, 검색창, 사이트 카드",
      screenshotOpenLabel: "크게 보기",
      screenshotCloseLabel: "크게 보기 닫기",
      filters: {
        alt: "같은 눈 내린 마을 유화 배경화면에 여러 필터를 적용한 Lumno 새 탭",
        tablistLabel: "배경화면 필터 미리 보기",
        compareLabel: "드래그해서 원본과 필터 비교",
        searchPlaceholder: "Search or type a URL…",
        items: {
          none: { name: "원본", note: "배경화면 그대로" },
          blur: { name: "유리 블러", note: "배경을 흐리게 해 콘텐츠를 또렷하게" },
          grain: { name: "그레인", note: "필름 같은 고운 입자" },
          blocks: { name: "블록", note: "픽셀 타일로 다시 쌓은 화면" },
          halftone: { name: "망점", note: "인쇄물 같은 점 패턴" },
          dither: { name: "디더", note: "적은 색으로 표현한 레트로 질감" },
          ascii: { name: "ASCII", note: "어두운 곳이나 밝은 곳을 문자로" },
          crt: { name: "CRT", note: "주사선, 번짐, 휘어진 화면" },
        },
      },
      wallpapers: {
        label: "배경화면",
        title: "매일 새로운 풍경을",
        description: "명화, Bing 오늘의 사진, 풍경 사진이 매일 자동으로 바뀝니다.",
        alt: "내장 배경화면을 바꾸는 Lumno 모양 설정 패널",
      },
      dark: {
        label: "다크 모드",
        title: "밤에는 화면도 어둡게",
        description: "시스템을 따라 다크 모드로 바뀌고, 배경화면도 야경으로 바뀝니다.",
        alt: "다크 모드의 Lumno 새 탭, 달밤 수묵화 배경화면",
      },
      bookmarks: {
        label: "북마크",
        title: "북마크가 많아도 헤매지 않게",
        description: "세 가지 레이아웃 중에서 고르면, 북마크가 수백 개여도 금방 찾습니다.",
        alt: "Lumno 새 탭의 세 가지 북마크 레이아웃: 폴더, 중첩 메뉴, 상단 북마크바",
        views: { folder: "폴더", list: "중첩 메뉴", top: "상단 바" },
      },
      dock: {
        label: "바로가기",
        title: "자주 가는 사이트는 클릭 한 번",
        description: "검색창 아래에 놓이고, 마우스를 올리면 Dock처럼 커집니다.",
        alt: "마우스를 올리면 커지는 바로가기 아이콘",
      },
      clock: {
        label: "시계",
        title: "고개만 들면 지금 시각",
        description: "검색창 바로 위에 시계가 있고, 초 표시도 고를 수 있습니다.",
        alt: "검색창 위에 초까지 표시된 시계",
      },
      zen: {
        label: "Zen 모드",
        title: "집중할 땐 검색창만 남기기",
        description: "/zen을 입력하면 나머지는 모두 숨고, 한 번 더 입력하면 돌아옵니다.",
        alt: "검색창만 남은 Zen 모드의 새 탭",
      },
      scene: {
        searchPlaceholder: "Search or type a URL…",
        bookmarksHeading: "Bookmarks",
        sourceLabel: "Source",
        sources: ["Built-in", "Local", "Bing", "Curated"],
        lightLabel: "Light",
        darkLabel: "Dark",
        systemLabel: "Follow system",
        folders: ["참고 자료", "가이드라인", "영감", "경쟁사", "AI 리서치", "디자인 시스템"],
        subfolder: "아이콘",
        zenOff: "Zen: Off",
        zenEnter: "Lumno: enter Zen mode",
      },
      wallpaperPart: {
        title: "봐도 봐도 질리지 않는 배경화면",
        lead: "매일 새 배경화면, 밤에는 야경. 마음에 드는 한 장도 여덟 가지 질감으로 즐겨 보세요.",
      },
      toolsPart: {
        title: "다양하게, 또는 미니멀하게",
        lead: "바로가기, 북마크, 시계를 모두 갖췄습니다. 집중할 땐 명령어 하나로 검색창만 남기세요.",
        previous: "이전",
        next: "다음",
      },
    },
    utilities: {
      title: "소소하지만 확실한 기능들",
      description: "기능마다 따로 켜고 끌 수 있어요. 쓰는 것만 남기세요.",
      items: {
        clip: { title: "웹 클립", description: "페이지 일부를 잘라 실시간으로 갱신되는 작은 창에 띄웁니다." },
        autoPip: {
          title: "자동 PIP",
          description: "탭을 바꿔도 동영상은 작은 창에서 계속 재생됩니다.",
        },
        progress: {
          title: "진도 카드",
          description: "드라마나 웹소설을 새 탭에 고정하면 어디까지 봤는지 자동으로 기록합니다.",
        },
        sync: { title: "WebDAV 동기화", description: "설정, 아이콘, 배경화면을 브라우저 간에 동기화합니다." },
        pinned: { title: "고정 탭 복원", description: "브라우저를 다시 시작해도 고정 탭이 자동으로 돌아옵니다." },
        languages: { title: "인터페이스 언어", description: "English, 日本語, 简体中文, 繁體中文 지원. 브라우저 언어를 따를 수도 있습니다." },
      },
    },
    reviews: {
      eyebrow: "Chrome 웹 스토어",
      title: "사용자와 함께, 디테일까지 다듬습니다",
      ariaLabel: "Chrome 웹 스토어 실제 사용자 리뷰",
      avatarLabel: "{name} 님의 프로필 사진",
      storeLinkLabel: "리뷰 모두 보기",
      quotes: ["“", "”"],
    },
    openSource: {
      title: "개인정보와 보안을 가장 먼저",
      points: {
        local: "사용 데이터를 수집하지 않음",
        source: "GPL-3.0 오픈 소스",
        optional: "설정 동기화 방식 선택 가능",
      },
      art: {
        privacy: {
          title: "Lumno가 수집하는 데이터",
          status: "수집 안 함",
          items: { history: "방문 기록", bookmarks: "북마크와 탭", searches: "검색어", usage: "사용 통계", location: "위치 정보" },
        },
        sync: {
          browser: "브라우저 동기화",
          webdav: "WebDAV",
          file: "파일로 내보내기",
        },
      },
      browsersLabel: "Chrome, Edge 등 대부분의 Chromium 기반 브라우저에서 작동합니다",
      browserNames: BROWSER_NAMES,
      githubLabel: "GitHub에서 소스 보기",
    },
    faqTitle: "자주 묻는 질문",
    faqAskLabel: "GitHub에 질문하기",
    faqItems: [
      {
        question: "기본 단축키는 무엇인가요? 바꿀 수 있나요?",
        answer:
          "기본값은 Mac에서 ⌘ ⇧ K, Windows에서 Ctrl + Shift + K입니다. `chrome://extensions/shortcuts`에서 바꿀 수 있습니다.",
        firefoxAnswer:
          "기본값은 Mac에서 ⌘ ⇧ K, Windows에서 Ctrl + Shift + K입니다. `chrome://extensions/shortcuts`에서 바꿀 수 있습니다. Firefox에서는 Mac에서 ⌃ ⇧ K, Windows와 Linux에서 Alt + K이며, `about:addons`의 톱니바퀴 메뉴에서 바꿀 수 있습니다.",
      },
      {
        question: "어떤 브라우저를 지원하나요?",
        answer:
          "Chrome, Edge, Dia, Brave, Vivaldi 등 Chrome 확장 프로그램을 설치할 수 있는 Chromium 기반 브라우저를 지원합니다. Safari와 Firefox는 아직 지원하지 않습니다. Dia에서는 커맨드 바만 쓸 수 있고 Lumno 새 탭은 쓸 수 없습니다.",
        firefoxAnswer:
          "Chrome, Edge, Dia, Brave, Vivaldi 등 Chrome 확장 프로그램을 설치할 수 있는 Chromium 기반 브라우저와 Firefox 140 이상, Zen 같은 Firefox 기반 브라우저를 지원합니다. Safari는 아직 지원하지 않습니다. Dia에서는 커맨드 바만 쓸 수 있고 Lumno 새 탭은 쓸 수 없습니다.",
      },
      {
        question: "Firefox 버전은 무엇이 다른가요?",
        answer:
          "주요 기능은 Chrome 버전과 같습니다. Firefox 부가 기능에서 설치할 수 있고, Zen, LibreWolf 같은 Firefox 기반 브라우저에서도 쓸 수 있습니다. Firefox의 제약으로 웹 클립과 자동 PIP는 쓸 수 없고, `about:` 페이지, 부가 기능 사이트, 로컬 파일에서는 커맨드 바를 열 수 없습니다.",
        firefoxOnly: true,
      },
      {
        question: "Arc에서 넘어와도 익숙한 커맨드 바를 쓸 수 있나요?",
        answer:
          "네. Lumno는 Arc의 사용 방식을 참고했습니다(Arc와는 관련이 없습니다). Dia, Chrome, Edge에서도 언제든 커맨드 바를 불러 한곳에서 검색하고 빠르게 전환할 수 있습니다. 단축키를 ⌘ T로 바꾸면 Arc와 같은 손맛 그대로입니다.",
      },
      {
        question: "지금 쓰는 새 탭은 그대로 두고 커맨드 바만 쓸 수 있나요?",
        answer:
          "네. Lumno를 켜 둔 채로 기존 새 탭 확장 프로그램을 다시 설치하면 새 탭이 그쪽으로 돌아갑니다. 커맨드 바에는 영향이 없습니다.",
      },
      {
        question: "새 탭 주소창에 확장 프로그램 URL이 보이는 이유는 무엇인가요?",
        answer:
          "‘Automatically focus input’(입력창 자동 포커스)가 켜져 있기 때문입니다. 커서를 Lumno 검색창에 바로 두기 위해 주소창에 확장 프로그램 URL이 표시됩니다. 새 탭의 모양 설정에서 이 옵션을 끄면 주소창이 다시 비워집니다.",
      },
      {
        question: "커맨드 바의 라이트·다크 모드가 시스템과 다른 이유는 무엇인가요?",
        answer:
          "‘Follow system’ 모드에서는 지금 보고 있는 페이지의 색도 참고합니다. 시스템만 따르게 하려면 Settings › Appearance에서 ‘Adapt theme colors to each webpage’를 끄세요.",
      },
      {
        question: "일부 페이지에서 커맨드 바가 열리지 않는 이유는 무엇인가요?",
        answer:
          "브라우저가 `chrome://` 설정 페이지나 웹 스토어 같은 제한된 페이지에서는 확장 프로그램 실행을 막기 때문입니다. 이때 Lumno는 새 탭에서 검색을 엽니다. 로컬 PDF나 HTML 파일에서 쓰려면 확장 프로그램 세부정보 페이지에서 ‘파일 URL에 대한 액세스 허용’을 켜세요.",
      },
      {
        question: "여러 기기에서 설정을 동기화할 수 있나요?",
        answer:
          "네. 기본적으로 브라우저 계정으로 동기화됩니다. WebDAV(NAS나 직접 운영하는 서버 등)를 켜면 아이콘과 배경화면도 다른 브라우저 사이에서 동기화할 수 있습니다.",
      },
      {
        question: "Lumno가 제 방문 기록을 업로드하나요?",
        answer:
          "아니요. 탭, 북마크, 방문 기록은 모두 기기 안에서 검색합니다. 웹 검색이나 AI 검색을 할 때만 입력한 내용이 사용자가 고른 검색 엔진이나 AI 사이트로 전송됩니다.",
      },
      {
        question: "Lumno는 무료인가요?",
        answer: "완전히 무료이며, GitHub에 GPL-3.0 라이선스로 소스 코드가 공개되어 있습니다.",
      },
    ],
    finalDescription: "오픈 소스 브라우저 커맨드 바와 새 탭.",

    footerTagline: "오픈 소스 브라우저 커맨드 바와 미니멀한 새 탭.",
    footerProduct: "제품",
    footerSupport: "지원",
    footerRelease: "업데이트 내역",
    footerReportIssue: "문제 신고",
    footerPrivacy: "개인정보처리방침",
    footerSocialAria: "Lumno 팔로우",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
    footerWebsiteSource: "웹사이트 소스 코드",
    languageSelectAria: "언어 선택",
  },
  de: {
    navigationAria: "Hauptnavigation",
    navFeatures: "Funktionen",
    navRelease: "Versionshinweise",
    navMoreMenuAria: "Weitere Links öffnen",
    community: {
      kind: "open",
      label: "Community",
      contactLabel: "Kontakt",
      contactMenuAria: "Profile des Entwicklers öffnen",
      title: "Lumno-Community",
      closeLabel: "Schließen",
      github: { label: "Auf GitHub fragen", description: "Fehler, Ideen und Fragen – öffentlich" },
      x: { label: "Auf X folgen", description: "Neues vom Entwickler, @kubai087" },
      heroLabel: "GitHub",
      heroAria: "Lumnos Quellcode auf GitHub ansehen",
    },
    installLabel: "Installieren",
    installAria: "Installationsoptionen für Lumno öffnen",
    installChromeStoreLabel: "Chrome Web Store",
    installEdgeStoreLabel: "Microsoft Edge-Add-ons",
    installFirefoxStoreLabel: "Firefox-Add-ons",
    installChromeRecommendation: "Empfohlen",
    installChromeRecommendationNote: "Schnellere Updates",

    heroTitle: "Dein Browser, auf Befehl.",
    heroTitleSerif: { lead: "Dein Browser,", accent: "auf Befehl." },
    heroOpenSource: {
      label: "Open Source · GPL-3.0",
      aria: "Lumnos Quellcode auf GitHub ansehen",
      ariaWithStars: "Lumnos Quellcode auf GitHub ansehen ({count} Sterne)",
    },
    heroDescription:
      "Lumno ist eine Open-Source-Befehlsleiste und ein neuer Tab für deinen Browser.\nEin Kürzel durchsucht Tabs, Lesezeichen, Verlauf und deine Lieblingsseiten.",
    heroInstallLabel: "Lumno kostenlos installieren",
    heroInstallAria: {
      chrome: "Lumno kostenlos im Chrome Web Store installieren",
      edge: "Lumno kostenlos über Microsoft Edge-Add-ons installieren",
      firefox: "Lumno kostenlos über Firefox-Add-ons installieren",
    },
    heroBrowserTooltipLabel: "Open Source unter GPL-3.0. Läuft in den meisten Chromium-Browsern.",
    firefoxCopy: {
      heroBrowserTooltipLabel: "Open Source unter GPL-3.0. Läuft in den meisten Chromium-Browsern und in Firefox.",
      browsersLabel: "Läuft in Chrome, Edge, Firefox und den meisten Chromium-Browsern",
    },
    heroDemoAria: "Demo der Lumno-Befehlsleiste: Browsersuche, Seitensuche und Befehle",

    commandBar: {
      title: "Auf jeder Seite\nsofort zur Hand.",
      description: "Tabs, Lesezeichen, Verlauf und KI – alles in einem Suchfeld.",
      search: {
        label: "Alles durchsuchen",
        title: "Zu viele Tabs?\nEinfach suchen.",
        description: "Was du oft auswählst, rückt nach oben.",
        query: "design",
        mark: "design",
        switchLabel: "Switch",
        openLabel: "New Tab",
        results: [
          { icon: "gh", title: "lumno-web · Website-Design", detail: "github.com/kubai087/lumno-web", source: "Opened", kind: "tab" },
          { icon: "yt", title: "Designsysteme in 10 Minuten", detail: "YouTube / Design / Später ansehen", source: "Bookmark", kind: "bookmark" },
          { icon: "wk", title: "Interfacedesign – Wikipedia", detail: "de.wikipedia.org", source: "History", kind: "history" },
        ],
      },
      siteSearch: {
        label: "Seitensuche",
        title: "Websites durchsuchen,\neinen Tab entfernt.",
        description: "Kürzel tippen, Tab drücken – und direkt auf 46 Websites suchen.",
        keyword: "gh",
        target: "GitHub",
        query: "lumno",
        tabHint: "Search GitHub",
        resultTitle: "Search in GitHub \"lumno\"",
        actionLabel: "Search",
        fallbackTitle: "Search \"lumno\"",
      },
      ai: {
        label: "KI fragen",
        title: "Deine Frage,\ndirekt an die KI.",
        description: "Wechsle zwischen ChatGPT, Gemini und Perplexity – Enter, und los.",
        prompt: "Erklär Quantenverschränkung einfach",
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
        resultTitle: "Ask Perplexity \"Erklär Quantenverschränkung einfach\"",
        actionLabel: "Open Perplexity web app",
      },
    },
    aiIntent: {
      title: "Text markieren.\nKI fragen.",
      description: "Erscheint nur, wenn du es brauchst. Ein Klick, und die KI antwortet in einem Hintergrund-Tab.",
    },
    newTab: {
      eyebrow: "Neuer Tab",
      title: "Mach den neuen Tab\nzu deinem.",
      description:
        "Gemälde als Hintergrund, Filter wie auf Film und deine Lesezeichen nur einen Klick entfernt. Minimalistisch oder voll ausgestattet – du entscheidest.",
      screenshotAlt: "Neuer Tab von Lumno mit Hintergrundbild, Suchfeld und Website-Karten",
      screenshotOpenLabel: "In voller Größe ansehen",
      screenshotCloseLabel: "Vollansicht schließen",
      filters: {
        alt: "Der neue Tab von Lumno mit verschiedenen Filtern auf demselben Gemälde eines verschneiten Dorfs",
        tablistLabel: "Hintergrundfilter in der Vorschau",
        compareLabel: "Ziehen, um Original und Filter zu vergleichen",
        searchPlaceholder: "Search or type a URL…",
        items: {
          none: { name: "Original", note: "Das Bild, wie es ist" },
          blur: { name: "Milchglas", note: "Weicher Fokus hinter deinen Inhalten" },
          grain: { name: "Körnung", note: "Feines Rauschen wie auf Film" },
          blocks: { name: "Blöcke", note: "Aus Pixelkacheln neu gebaut" },
          halftone: { name: "Raster", note: "Punktraster wie im Druck" },
          dither: { name: "Dithering", note: "Retro-Look mit wenigen Farben" },
          ascii: { name: "ASCII", note: "Schatten oder Lichter aus Zeichen" },
          crt: { name: "CRT", note: "Zeilen, Glühen und Wölbung" },
        },
      },
      wallpapers: {
        label: "Hintergründe",
        title: "Jeden Tag etwas Neues zum Anschauen",
        description: "Klassische Gemälde, Bings Bild des Tages und Landschaftsfotos – täglich neu.",
        alt: "Die Darstellungseinstellungen von Lumno beim Wechsel zwischen integrierten Hintergründen",
      },
      dark: {
        label: "Dunkelmodus",
        title: "Angenehm für die Augen, auch um Mitternacht",
        description: "Folgt deinem System – mit passendem Nachtmotiv.",
        alt: "Der neue Tab von Lumno im Dunkelmodus mit einer Tuschelandschaft im Mondlicht",
      },
      bookmarks: {
        label: "Lesezeichen",
        title: "Hunderte Lesezeichen, null Sucherei",
        description: "Drei Layouts halten auch Hunderte Lesezeichen griffbereit.",
        alt: "Drei Lesezeichen-Layouts im neuen Tab von Lumno: Ordner, verschachtelte Menüs und obere Leiste",
        views: { folder: "Ordner", list: "Menüs", top: "Obere Leiste" },
      },
      dock: {
        label: "Verknüpfungen",
        title: "Deine Lieblingsseiten, einen Klick entfernt",
        description: "Sie liegen unter dem Suchfeld und wachsen beim Darüberfahren wie im Dock.",
        alt: "Verknüpfungssymbole, die unter dem Mauszeiger größer werden",
      },
      clock: {
        label: "Uhr",
        title: "Die Uhrzeit, genau im Blick",
        description: "Eine Uhr direkt über dem Suchfeld, Sekunden nach Wunsch.",
        alt: "Eine Uhr mit Sekunden über dem Suchfeld",
      },
      zen: {
        label: "Zen-Modus",
        title: "Nur das Suchfeld, wenn du dich konzentrierst",
        description: "Tippe /zen, um alles andere auszublenden. Noch einmal tippen, und alles ist zurück.",
        alt: "Der neue Tab im Zen-Modus, nur mit dem Suchfeld",
      },
      scene: {
        searchPlaceholder: "Search or type a URL…",
        bookmarksHeading: "Bookmarks",
        sourceLabel: "Source",
        sources: ["Built-in", "Local", "Bing", "Curated"],
        lightLabel: "Light",
        darkLabel: "Dark",
        systemLabel: "Follow system",
        folders: ["Referenzen", "Richtlinien", "Inspiration", "Wettbewerb", "KI-Recherche", "Designsysteme"],
        subfolder: "Icons",
        zenOff: "Zen: Off",
        zenEnter: "Lumno: enter Zen mode",
      },
      wallpaperPart: {
        title: "Hintergründe, die nie langweilig werden",
        lead: "Jeden Tag ein neuer, nach Sonnenuntergang eine Nachtversion – und acht Looks für dein Lieblingsbild.",
      },
      toolsPart: {
        title: "Voll ausgestattet oder ganz minimalistisch",
        lead: "Verknüpfungen, Lesezeichen und Uhr stets zur Hand. Zum Konzentrieren lässt ein Befehl nur das Suchfeld übrig.",
        previous: "Zurück",
        next: "Weiter",
      },
    },
    utilities: {
      title: "Kleine Helfer,\ngroße Wirkung.",
      description: "Jede Funktion hat ihren eigenen Schalter. Behalte nur, was du nutzt.",
      items: {
        clip: { title: "Web Clip", description: "Schneide einen Teil einer Seite aus – als schwebendes Fenster, das live bleibt." },
        autoPip: {
          title: "Automatisches Bild-in-Bild",
          description: "Tab wechseln, und das Video läuft im schwebenden Fenster weiter.",
        },
        progress: {
          title: "Fortschrittskarten",
          description: "Hefte eine Serie oder einen Roman an den neuen Tab. Die Karte merkt sich Folge oder Kapitel.",
        },
        sync: { title: "WebDAV-Sync", description: "Einstellungen, Symbole und Hintergründe zwischen Browsern synchronisieren." },
        pinned: { title: "Angeheftete Tabs zurückholen", description: "Nach einem Neustart des Browsers sind angeheftete Tabs automatisch wieder da." },
        languages: { title: "Oberflächensprachen", description: "English, 日本語, 简体中文 und 繁體中文 – oder wie dein Browser." },
      },
    },
    reviews: {
      eyebrow: "Chrome Web Store",
      title: "Mit unseren Nutzern gebaut,\nbis ins Detail geschliffen.",
      ariaLabel: "Echte Bewertungen aus dem Chrome Web Store",
      avatarLabel: "Avatar von {name}",
      storeLinkLabel: "Alle Bewertungen lesen",
      quotes: ["„", "“"],
    },
    openSource: {
      title: "Privat und sicher,\nvon Grund auf.",
      points: {
        local: "Sammelt keine Nutzungsdaten",
        source: "Open Source unter GPL-3.0",
        optional: "Flexibel synchronisieren",
      },
      art: {
        privacy: {
          title: "Daten, die Lumno sammelt",
          status: "Keine",
          items: { history: "Browserverlauf", bookmarks: "Lesezeichen & Tabs", searches: "Suchanfragen", usage: "Nutzungsstatistik", location: "Standort" },
        },
        sync: {
          browser: "Browser-Sync",
          webdav: "WebDAV",
          file: "Datei-Export",
        },
      },
      browsersLabel: "Läuft in Chrome, Edge und den meisten Chromium-Browsern",
      browserNames: BROWSER_NAMES,
      githubLabel: "Quellcode auf GitHub ansehen",
    },
    faqTitle: "Häufige Fragen,\nklar beantwortet.",
    faqAskLabel: "Auf GitHub fragen",
    faqItems: [
      {
        question: "Wie lautet das Standardkürzel? Kann ich es ändern?",
        answer:
          "Standardmäßig ⌘ ⇧ K auf dem Mac und Strg + Umschalt + K unter Windows. Ändern kannst du es unter `chrome://extensions/shortcuts`.",
        firefoxAnswer:
          "Standardmäßig ⌘ ⇧ K auf dem Mac und Strg + Umschalt + K unter Windows. Ändern kannst du es unter `chrome://extensions/shortcuts`. In Firefox ist es ⌃ ⇧ K auf dem Mac und Alt + K unter Windows und Linux; ändern kannst du es über das Zahnradmenü unter `about:addons`.",
      },
      {
        question: "Welche Browser werden unterstützt?",
        answer:
          "Chromium-Browser, die Chrome-Erweiterungen installieren können, etwa Chrome, Edge, Dia, Brave und Vivaldi. Safari und Firefox werden noch nicht unterstützt. In Dia gibt es die Befehlsleiste, aber nicht den neuen Tab von Lumno.",
        firefoxAnswer:
          "Chromium-Browser, die Chrome-Erweiterungen installieren können, etwa Chrome, Edge, Dia, Brave und Vivaldi, dazu Firefox ab Version 140 und Firefox-basierte Browser wie Zen. Safari wird noch nicht unterstützt. In Dia gibt es die Befehlsleiste, aber nicht den neuen Tab von Lumno.",
      },
      {
        question: "Was ist bei der Firefox-Version anders?",
        answer:
          "Die wichtigsten Funktionen sind dieselben wie in der Chrome-Version. Du installierst sie über Firefox-Add-ons, auch in Firefox-basierten Browsern wie Zen und LibreWolf. Wegen der Grenzen von Firefox fehlen Web Clip und automatisches Bild-in-Bild, und auf `about:`-Seiten, der Add-ons-Website und lokalen Dateien lässt sich die Befehlsleiste nicht öffnen.",
        firefoxOnly: true,
      },
      {
        question: "Ich komme von Arc. Fühlt sich das vertraut an?",
        answer:
          "Genau darum geht es. Lumno orientiert sich an der Bedienung von Arc (ohne Verbindung zu Arc): Auch in Dia, Chrome oder Edge rufst du die Befehlsleiste jederzeit auf, suchst an einem Ort und wechselst blitzschnell. Leg das Kürzel auf ⌘ T, und es fühlt sich an wie in Arc.",
      },
      {
        question: "Kann ich meinen bisherigen neuen Tab behalten und nur die Befehlsleiste nutzen?",
        answer:
          "Ja. Lass Lumno aktiviert und installiere deine andere Neuer-Tab-Erweiterung neu, damit sie den neuen Tab wieder übernimmt. Die Befehlsleiste bleibt davon unberührt.",
      },
      {
        question: "Warum zeigt die Adressleiste im neuen Tab eine Erweiterungs-URL?",
        answer:
          "Das liegt an „Automatically focus input“: Damit der Cursor direkt im Suchfeld von Lumno steht, zeigt die Adressleiste die URL der Erweiterung. Schalte die Option in den Darstellungseinstellungen des neuen Tabs aus, und die Adressleiste bleibt leer.",
      },
      {
        question: "Warum passt die Befehlsleiste nicht zum Hell- oder Dunkelmodus meines Systems?",
        answer:
          "Im Modus „Follow system“ richtet sich die Befehlsleiste auch nach den Farben der aktuellen Seite. Soll sie nur dem System folgen, schalte unter Settings › Appearance die Option „Adapt theme colors to each webpage“ aus.",
      },
      {
        question: "Warum öffnet sich die Befehlsleiste auf manchen Seiten nicht?",
        answer:
          "Browser sperren Erweiterungen auf geschützten Seiten wie den `chrome://`-Einstellungen und dem Web Store. Lumno öffnet die Suche dann in einem neuen Tab. Für lokale PDF- und HTML-Dateien aktiviere auf der Detailseite der Erweiterung „Zugriff auf Datei-URLs zulassen“.",
      },
      {
        question: "Kann ich meine Einstellungen zwischen Geräten synchronisieren?",
        answer:
          "Ja. Standardmäßig synchronisieren sie sich über dein Browserkonto. Mit WebDAV (z. B. ein NAS oder ein eigener Server) gleichst du zusätzlich Symbole und Hintergründe zwischen verschiedenen Browsern ab.",
      },
      {
        question: "Lädt Lumno meine Browserdaten hoch?",
        answer:
          "Nein. Tabs, Lesezeichen und Verlauf werden lokal durchsucht. Nur bei einer Web- oder KI-Suche geht deine Eingabe an die Suchmaschine oder KI-Website, die du gewählt hast.",
      },
      {
        question: "Ist Lumno kostenlos?",
        answer: "Komplett – und Open Source unter GPL-3.0 auf GitHub.",
      },
    ],
    finalDescription: "Open-Source-Befehlsleiste und neuer Tab für deinen Browser.",

    footerTagline: "Eine Open-Source-Befehlsleiste und ein minimalistischer neuer Tab für deinen Browser.",
    footerProduct: "Produkt",
    footerSupport: "Support",
    footerRelease: "Versionshinweise",
    footerReportIssue: "Problem melden",
    footerPrivacy: "Datenschutz",
    footerSocialAria: "Lumno folgen",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
    footerWebsiteSource: "Quellcode der Website",
    languageSelectAria: "Sprache wählen",
  },
  fr: {
    navigationAria: "Navigation principale",
    navFeatures: "Fonctionnalités",
    navRelease: "Notes de version",
    navMoreMenuAria: "Afficher plus de liens",
    community: {
      kind: "open",
      label: "Communauté",
      contactLabel: "Contact",
      contactMenuAria: "Ouvrir les profils de l’auteur",
      title: "Communauté Lumno",
      closeLabel: "Fermer",
      github: { label: "Poser la question sur GitHub", description: "Bugs, idées et questions, en public" },
      x: { label: "Suivre sur X", description: "Les nouvelles du créateur, @kubai087" },
      heroLabel: "GitHub",
      heroAria: "Voir le code source de Lumno sur GitHub",
    },
    installLabel: "Installer",
    installAria: "Voir les options d’installation de Lumno",
    installChromeStoreLabel: "Chrome Web Store",
    installEdgeStoreLabel: "Modules complémentaires Microsoft Edge",
    installFirefoxStoreLabel: "Modules complémentaires Firefox",
    installChromeRecommendation: "Recommandé",
    installChromeRecommendationNote: "Mises à jour plus rapides",

    heroTitle: "Votre navigateur, à vos ordres.",
    heroTitleSerif: { lead: "Votre navigateur,", accent: "à vos ordres." },
    heroOpenSource: {
      label: "Open source · GPL-3.0",
      aria: "Voir le code source de Lumno sur GitHub",
      ariaWithStars: "Voir le code source de Lumno sur GitHub ({count} étoiles)",
    },
    heroDescription:
      "Lumno, c’est une barre de commande et un nouvel onglet open source.\nUn seul raccourci pour fouiller onglets, favoris, historique et sites préférés.",
    heroInstallLabel: "Installer Lumno, c’est gratuit",
    heroInstallAria: {
      chrome: "Installer gratuitement Lumno depuis le Chrome Web Store",
      edge: "Installer gratuitement Lumno depuis les modules complémentaires Microsoft Edge",
      firefox: "Installer gratuitement Lumno depuis les modules complémentaires Firefox",
    },
    heroBrowserTooltipLabel: "Open source sous licence GPL-3.0. Fonctionne dans la plupart des navigateurs Chromium.",
    firefoxCopy: {
      heroBrowserTooltipLabel: "Open source sous licence GPL-3.0. Fonctionne dans la plupart des navigateurs Chromium et dans Firefox.",
      browsersLabel: "Fonctionne dans Chrome, Edge, Firefox et la plupart des navigateurs Chromium",
    },
    heroDemoAria: "Démo de la barre de commande Lumno : recherche dans le navigateur, sur les sites et commandes",

    commandBar: {
      title: "Sur n’importe quelle page,\nà portée de main.",
      description: "Onglets, favoris, historique et IA réunis dans un seul champ de recherche.",
      search: {
        label: "Recherche unifiée",
        title: "Trop d’onglets\u00A0?\nCherchez, tout simplement.",
        description: "Les résultats que vous choisissez souvent remontent en tête.",
        query: "design",
        mark: "design",
        switchLabel: "Switch",
        openLabel: "New Tab",
        results: [
          { icon: "gh", title: "lumno-web · Design du site", detail: "github.com/kubai087/lumno-web", source: "Opened", kind: "tab" },
          { icon: "yt", title: "Les design systems en 10 minutes", detail: "YouTube / Design / À regarder plus tard", source: "Bookmark", kind: "bookmark" },
          { icon: "wk", title: "Design d’interaction — Wikipédia", detail: "fr.wikipedia.org", source: "History", kind: "history" },
        ],
      },
      siteSearch: {
        label: "Recherche par site",
        title: "Cherchez dans les sites,\nà une touche Tab.",
        description: "Tapez un raccourci, appuyez sur Tab, et cherchez directement sur 46 sites.",
        keyword: "gh",
        target: "GitHub",
        query: "lumno",
        tabHint: "Search GitHub",
        resultTitle: "Search in GitHub \"lumno\"",
        actionLabel: "Search",
        fallbackTitle: "Search \"lumno\"",
      },
      ai: {
        label: "Demander à l’IA",
        title: "Votre question,\ndroit vers l’IA.",
        description: "Passez de ChatGPT à Gemini ou Perplexity, puis Entrée pour poser la question.",
        prompt: "Explique l’intrication simplement",
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
        resultTitle: "Ask Perplexity \"Explique l’intrication simplement\"",
        actionLabel: "Open Perplexity web app",
      },
    },
    aiIntent: {
      title: "Sélectionnez.\nDemandez à l’IA.",
      description: "N’apparaît que lorsque vous en avez besoin. Un clic, et l’IA répond dans un onglet en arrière-plan.",
    },
    newTab: {
      eyebrow: "Nouvel onglet",
      title: "Un nouvel onglet\nvraiment à vous.",
      description:
        "Des tableaux en fond d’écran, des filtres façon pellicule et vos favoris à un clic. Minimaliste ou complet, à vous de voir.",
      screenshotAlt: "Nouvel onglet Lumno avec fond d’écran, champ de recherche et cartes de sites",
      screenshotOpenLabel: "Voir en grand",
      screenshotCloseLabel: "Fermer l’aperçu",
      filters: {
        alt: "Le nouvel onglet Lumno avec différents filtres appliqués au même tableau d’un village enneigé",
        tablistLabel: "Aperçu des filtres de fond d’écran",
        compareLabel: "Faites glisser pour comparer l’original et le filtre",
        searchPlaceholder: "Search or type a URL…",
        items: {
          none: { name: "Original", note: "Le fond d’écran tel quel" },
          blur: { name: "Verre dépoli", note: "Un flou doux derrière vos contenus" },
          grain: { name: "Grain", note: "Un grain fin, comme sur pellicule" },
          blocks: { name: "Blocs", note: "Recomposé en tuiles de pixels" },
          halftone: { name: "Similigravure", note: "Une trame de points façon imprimé" },
          dither: { name: "Dithering", note: "Rétro, avec peu de couleurs" },
          ascii: { name: "ASCII", note: "Ombres ou lumières, en caractères" },
          crt: { name: "CRT", note: "Balayage, halo et écran bombé" },
        },
      },
      wallpapers: {
        label: "Fonds d’écran",
        title: "Du nouveau à contempler chaque jour",
        description: "Grands tableaux, photo du jour de Bing et paysages, renouvelés chaque jour.",
        alt: "Le panneau d’apparence de Lumno passant d’un fond d’écran intégré à l’autre",
      },
      dark: {
        label: "Mode sombre",
        title: "Tout en douceur, même à minuit",
        description: "Suit votre système, avec un fond d’écran nocturne assorti.",
        alt: "Le nouvel onglet Lumno en mode sombre, avec un paysage à l’encre sous la lune",
      },
      bookmarks: {
        label: "Favoris",
        title: "Des centaines de favoris, zéro fouille",
        description: "Trois mises en page gardent des centaines de favoris à portée de main.",
        alt: "Trois mises en page des favoris dans le nouvel onglet Lumno : dossiers, menus imbriqués et barre du haut",
        views: { folder: "Dossiers", list: "Menus", top: "Barre du haut" },
      },
      dock: {
        label: "Raccourcis",
        title: "Vos sites préférés, à un clic",
        description: "Sous le champ de recherche, ils grossissent au survol, comme dans le Dock.",
        alt: "Icônes de raccourcis qui grossissent sous le pointeur",
      },
      clock: {
        label: "Horloge",
        title: "L’heure, là où se pose votre regard",
        description: "Une horloge juste au-dessus du champ de recherche, secondes en option.",
        alt: "Une horloge avec les secondes au-dessus du champ de recherche",
      },
      zen: {
        label: "Mode Zen",
        title: "Rien que la recherche, pour rester concentré",
        description: "Tapez /zen pour tout ranger. Tapez-le à nouveau pour tout retrouver.",
        alt: "Le nouvel onglet en mode Zen, avec seulement le champ de recherche",
      },
      scene: {
        searchPlaceholder: "Search or type a URL…",
        bookmarksHeading: "Bookmarks",
        sourceLabel: "Source",
        sources: ["Built-in", "Local", "Bing", "Curated"],
        lightLabel: "Light",
        darkLabel: "Dark",
        systemLabel: "Follow system",
        folders: ["Références", "Guidelines", "Inspiration", "Concurrence", "Veille IA", "Design systems"],
        subfolder: "Icônes",
        zenOff: "Zen: Off",
        zenEnter: "Lumno: enter Zen mode",
      },
      wallpaperPart: {
        title: "Des fonds d’écran dont on ne se lasse pas",
        lead: "Un nouveau chaque jour, une version nocturne le soir, et huit façons de revisiter celui que vous aimez.",
      },
      toolsPart: {
        title: "Complet, ou aussi épuré que vous le voulez",
        lead: "Raccourcis, favoris et horloge toujours sous la main. Besoin de concentration ? Une commande ne laisse que la recherche.",
        previous: "Précédent",
        next: "Suivant",
      },
    },
    utilities: {
      title: "Ces petits détails\nqui changent tout.",
      description: "Chacun a son propre interrupteur. Ne gardez que ce qui vous sert.",
      items: {
        clip: { title: "Web Clip", description: "Découpez un morceau de page dans une fenêtre flottante, toujours à jour." },
        autoPip: {
          title: "Picture-in-picture automatique",
          description: "Changez d’onglet : la vidéo continue dans une fenêtre flottante.",
        },
        progress: {
          title: "Cartes de progression",
          description: "Épinglez une série ou un roman au nouvel onglet : il retient le dernier épisode ou chapitre.",
        },
        sync: { title: "Synchro WebDAV", description: "Synchronisez réglages, icônes et fonds d’écran entre navigateurs." },
        pinned: { title: "Onglets épinglés restaurés", description: "Vos onglets épinglés reviennent tout seuls après un redémarrage du navigateur." },
        languages: { title: "Langues de l’interface", description: "English, 日本語, 简体中文 et 繁體中文, ou celle de votre navigateur." },
      },
    },
    reviews: {
      eyebrow: "Chrome Web Store",
      title: "Conçu avec nos utilisateurs,\npeaufiné dans le moindre détail.",
      ariaLabel: "Avis réels d’utilisateurs du Chrome Web Store",
      avatarLabel: "Avatar de {name}",
      storeLinkLabel: "Lire tous les avis",
      quotes: ["« ", " »"],
    },
    openSource: {
      title: "Privé et sûr,\ndès la conception.",
      points: {
        local: "Zéro donnée collectée",
        source: "Open source sous GPL-3.0",
        optional: "Synchro à votre façon",
      },
      art: {
        privacy: {
          title: "Données collectées par Lumno",
          status: "Aucune",
          items: { history: "Historique", bookmarks: "Favoris et onglets", searches: "Recherches", usage: "Statistiques d’usage", location: "Localisation" },
        },
        sync: {
          browser: "Synchro du navigateur",
          webdav: "WebDAV",
          file: "Fichier exporté",
        },
      },
      browsersLabel: "Fonctionne dans Chrome, Edge et la plupart des navigateurs Chromium",
      browserNames: BROWSER_NAMES,
      githubLabel: "Voir le code sur GitHub",
    },
    faqTitle: "Vos questions,\nnos réponses.",
    faqAskLabel: "Poser la question sur GitHub",
    faqItems: [
      {
        question: "Quel est le raccourci par défaut ? Puis-je le modifier ?",
        answer:
          "Par défaut, ⌘ ⇧ K sur Mac et Ctrl + Maj + K sous Windows. Vous pouvez le modifier dans `chrome://extensions/shortcuts`.",
        firefoxAnswer:
          "Par défaut, ⌘ ⇧ K sur Mac et Ctrl + Maj + K sous Windows. Vous pouvez le modifier dans `chrome://extensions/shortcuts`. Dans Firefox, c’est ⌃ ⇧ K sur Mac et Alt + K sous Windows et Linux ; modifiez-le depuis le menu en forme d’engrenage de `about:addons`.",
      },
      {
        question: "Quels navigateurs sont pris en charge ?",
        answer:
          "Les navigateurs Chromium qui acceptent les extensions Chrome, dont Chrome, Edge, Dia, Brave et Vivaldi. Safari et Firefox ne sont pas encore pris en charge. Dans Dia, vous avez la barre de commande, mais pas le nouvel onglet de Lumno.",
        firefoxAnswer:
          "Les navigateurs Chromium qui acceptent les extensions Chrome, dont Chrome, Edge, Dia, Brave et Vivaldi, ainsi que Firefox 140 ou plus récent et les navigateurs basés sur Firefox comme Zen. Safari n’est pas encore pris en charge. Dans Dia, vous avez la barre de commande, mais pas le nouvel onglet de Lumno.",
      },
      {
        question: "Qu’est-ce qui change avec la version Firefox ?",
        answer:
          "Les fonctions principales sont les mêmes que dans la version Chrome. Installez-la depuis les modules complémentaires Firefox, y compris dans les navigateurs basés sur Firefox comme Zen et LibreWolf. En raison des limites de Firefox, Web Clip et le picture-in-picture automatique ne sont pas disponibles, et la barre de commande ne s’ouvre ni sur les pages `about:`, ni sur le site des modules complémentaires, ni dans les fichiers locaux.",
        firefoxOnly: true,
      },
      {
        question: "Je viens d’Arc. Vais-je m’y retrouver ?",
        answer:
          "C’est tout l’idée. Lumno s’inspire des interactions d’Arc (sans lien avec Arc) : dans Dia, Chrome ou Edge, vous ouvrez la barre de commande à tout moment, cherchez partout au même endroit et passez d’un onglet à l’autre en un éclair. Réglez le raccourci sur ⌘ T pour retrouver vos réflexes d’Arc.",
      },
      {
        question: "Puis-je garder mon nouvel onglet actuel et n’utiliser que la barre de commande ?",
        answer:
          "Oui. Laissez Lumno activé, puis réinstallez votre autre extension de nouvel onglet pour qu’elle reprenne la main. La barre de commande n’est pas concernée.",
      },
      {
        question: "Pourquoi la barre d’adresse affiche-t-elle une URL d’extension dans un nouvel onglet ?",
        answer:
          "C’est l’option « Automatically focus input » : pour placer votre curseur directement dans le champ de recherche de Lumno, la barre d’adresse affiche l’URL de l’extension. Désactivez-la dans les réglages d’apparence du nouvel onglet et la barre d’adresse redevient vide.",
      },
      {
        question: "Pourquoi la barre de commande ne suit-elle pas le mode clair ou sombre de mon système ?",
        answer:
          "En mode « Follow system », la barre de commande tient aussi compte des couleurs de la page affichée. Pour ne suivre que le système, désactivez « Adapt theme colors to each webpage » dans Settings › Appearance.",
      },
      {
        question: "Pourquoi la barre de commande ne s’ouvre-t-elle pas sur certaines pages ?",
        answer:
          "Les navigateurs bloquent les extensions sur les pages protégées, comme les réglages `chrome://` et le Web Store ; Lumno ouvre alors la recherche dans un nouvel onglet. Pour les fichiers PDF et HTML locaux, activez « Autoriser l’accès aux URL de fichier » dans la page de détails de l’extension.",
      },
      {
        question: "Puis-je synchroniser mes réglages entre plusieurs appareils ?",
        answer:
          "Oui. Par défaut, ils se synchronisent via votre compte de navigateur. Activez WebDAV (un NAS ou votre propre serveur, par exemple) pour synchroniser aussi icônes et fonds d’écran entre différents navigateurs.",
      },
      {
        question: "Lumno envoie-t-il mes données de navigation ?",
        answer:
          "Non. Onglets, favoris et historique sont recherchés en local. Ce que vous tapez n’est envoyé au moteur de recherche ou au site d’IA choisi que lorsque vous lancez une recherche web ou IA.",
      },
      {
        question: "Lumno est-il gratuit ?",
        answer: "Entièrement, et son code est ouvert sous licence GPL-3.0 sur GitHub.",
      },
    ],
    finalDescription: "Barre de commande et nouvel onglet open source pour votre navigateur.",

    footerTagline: "Une barre de commande et un nouvel onglet minimaliste, open source, pour votre navigateur.",
    footerProduct: "Produit",
    footerSupport: "Assistance",
    footerRelease: "Notes de version",
    footerReportIssue: "Signaler un problème",
    footerPrivacy: "Confidentialité",
    footerSocialAria: "Suivre Lumno",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
    footerWebsiteSource: "Code source du site",
    languageSelectAria: "Choisir la langue",
  },
  es: {
    navigationAria: "Navegación principal",
    navFeatures: "Funciones",
    navRelease: "Novedades",
    navMoreMenuAria: "Ver más enlaces",
    community: {
      kind: "open",
      label: "Comunidad",
      contactLabel: "Contacto",
      contactMenuAria: "Abrir los perfiles del autor",
      title: "Comunidad de Lumno",
      closeLabel: "Cerrar",
      github: { label: "Preguntar en GitHub", description: "Errores, ideas y preguntas, en abierto" },
      x: { label: "Sigue en X", description: "Novedades del creador, @kubai087" },
      heroLabel: "GitHub",
      heroAria: "Ver el código fuente de Lumno en GitHub",
    },
    installLabel: "Instalar",
    installAria: "Ver opciones para instalar Lumno",
    installChromeStoreLabel: "Chrome Web Store",
    installEdgeStoreLabel: "Complementos de Microsoft Edge",
    installFirefoxStoreLabel: "Complementos de Firefox",
    installChromeRecommendation: "Recomendado",
    installChromeRecommendationNote: "Se actualiza antes",

    heroTitle: "Tu navegador, a tus órdenes.",
    heroTitleSerif: { lead: "Tu navegador,", accent: "a tus órdenes." },
    heroOpenSource: {
      label: "Código abierto · GPL-3.0",
      aria: "Ver el código fuente de Lumno en GitHub",
      ariaWithStars: "Ver el código fuente de Lumno en GitHub ({count} estrellas)",
    },
    heroDescription:
      "Lumno es una barra de comandos y una nueva pestaña de código abierto.\nCon un solo atajo, busca en pestañas, marcadores, historial y tus sitios favoritos.",
    heroInstallLabel: "Instalar Lumno, es gratis",
    heroInstallAria: {
      chrome: "Instalar Lumno gratis desde Chrome Web Store",
      edge: "Instalar Lumno gratis desde Complementos de Microsoft Edge",
      firefox: "Instalar Lumno gratis desde Complementos de Firefox",
    },
    heroBrowserTooltipLabel: "Código abierto con licencia GPL-3.0. Funciona en la mayoría de navegadores Chromium.",
    firefoxCopy: {
      heroBrowserTooltipLabel: "Código abierto con licencia GPL-3.0. Funciona en la mayoría de navegadores Chromium y en Firefox.",
      browsersLabel: "Funciona en Chrome, Edge, Firefox y la mayoría de navegadores Chromium",
    },
    heroDemoAria: "Demostración de la barra de comandos de Lumno: búsqueda en el navegador, en sitios y comandos",

    commandBar: {
      title: "En cualquier página,\nsiempre a mano.",
      description: "Pestañas, marcadores, historial e IA, todo en un mismo buscador.",
      search: {
        label: "Búsqueda unificada",
        title: "¿Demasiadas pestañas?\nSolo busca.",
        description: "Lo que más eliges sube a los primeros puestos.",
        query: "diseño",
        mark: "diseño",
        switchLabel: "Switch",
        openLabel: "New Tab",
        results: [
          { icon: "gh", title: "lumno-web · Diseño del sitio", detail: "github.com/kubai087/lumno-web", source: "Opened", kind: "tab" },
          { icon: "yt", title: "Sistemas de diseño en 10 minutos", detail: "YouTube / Diseño / Ver más tarde", source: "Bookmark", kind: "bookmark" },
          { icon: "wk", title: "Diseño de interfaz de usuario - Wikipedia", detail: "es.wikipedia.org", source: "History", kind: "history" },
        ],
      },
      siteSearch: {
        label: "Búsqueda en sitios",
        title: "Busca dentro de los sitios,\na un Tab de distancia.",
        description: "Escribe un atajo, pulsa Tab y busca directamente en 46 sitios.",
        keyword: "gh",
        target: "GitHub",
        query: "lumno",
        tabHint: "Search GitHub",
        resultTitle: "Search in GitHub \"lumno\"",
        actionLabel: "Search",
        fallbackTitle: "Search \"lumno\"",
      },
      ai: {
        label: "Preguntar a la IA",
        title: "Tu pregunta,\ndirecta a la IA.",
        description: "Cambia entre ChatGPT, Gemini y Perplexity, y pulsa Intro para preguntar.",
        prompt: "Explica el entrelazamiento cuántico fácil",
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
        pick: 1,
        resultTitle: "Ask Gemini \"Explica el entrelazamiento cuántico fácil\"",
        actionLabel: "Open Gemini web app",
      },
    },
    aiIntent: {
      title: "Selecciona texto.\nPregunta a la IA.",
      description: "Solo aparece cuando lo necesitas. Un clic y la IA responde en una pestaña en segundo plano.",
    },
    newTab: {
      eyebrow: "Nueva pestaña",
      title: "Una nueva pestaña\nhecha a tu medida.",
      description:
        "Fondos de grandes pintores, filtros con aire de película y tus marcadores a un clic. Minimalista o completa, tú decides.",
      screenshotAlt: "Nueva pestaña de Lumno con fondo de pantalla, buscador y tarjetas de sitios",
      screenshotOpenLabel: "Ver a tamaño completo",
      screenshotCloseLabel: "Cerrar la vista ampliada",
      filters: {
        alt: "La nueva pestaña de Lumno con distintos filtros sobre el mismo cuadro de un pueblo nevado",
        tablistLabel: "Vista previa de los filtros del fondo",
        compareLabel: "Arrastra para comparar el original con el filtro",
        searchPlaceholder: "Search or type a URL…",
        items: {
          none: { name: "Original", note: "El fondo tal cual" },
          blur: { name: "Cristal", note: "Un desenfoque suave tras tu contenido" },
          grain: { name: "Grano", note: "Ruido fino, como de película" },
          blocks: { name: "Bloques", note: "Reconstruido con píxeles" },
          halftone: { name: "Semitono", note: "Trama de puntos, como en imprenta" },
          dither: { name: "Tramado", note: "Aire retro con pocos colores" },
          ascii: { name: "ASCII", note: "Sombras o luces, hechas de texto" },
          crt: { name: "CRT", note: "Líneas, brillo y pantalla curva" },
        },
      },
      wallpapers: {
        label: "Fondos",
        title: "Algo nuevo que mirar cada día",
        description: "Cuadros clásicos, la foto del día de Bing y paisajes, renovados a diario.",
        alt: "El panel de apariencia de Lumno cambiando entre los fondos integrados",
      },
      dark: {
        label: "Modo oscuro",
        title: "Descansa la vista a medianoche",
        description: "Sigue a tu sistema, con un fondo nocturno a juego.",
        alt: "La nueva pestaña de Lumno en modo oscuro, con un paisaje a tinta bajo la luna",
      },
      bookmarks: {
        label: "Marcadores",
        title: "Cientos de marcadores, cero rebusques",
        description: "Tres diseños mantienen a mano incluso cientos de marcadores.",
        alt: "Tres diseños de marcadores en la nueva pestaña de Lumno: carpetas, menús anidados y barra superior",
        views: { folder: "Carpetas", list: "Menús", top: "Barra superior" },
      },
      dock: {
        label: "Accesos directos",
        title: "Tus sitios de siempre, a un clic",
        description: "Bajo el buscador, se amplían al pasar el ratón, como el Dock.",
        alt: "Iconos de accesos directos que se amplían bajo el puntero",
      },
      clock: {
        label: "Reloj",
        title: "La hora, justo donde miras",
        description: "Un reloj justo encima del buscador, con segundos si quieres.",
        alt: "Un reloj con segundos encima del buscador",
      },
      zen: {
        label: "Modo Zen",
        title: "Solo el buscador, para concentrarte",
        description: "Escribe /zen para ocultar todo lo demás. Escríbelo otra vez para recuperarlo.",
        alt: "La nueva pestaña en modo Zen, solo con el buscador",
      },
      scene: {
        searchPlaceholder: "Search or type a URL…",
        bookmarksHeading: "Bookmarks",
        sourceLabel: "Source",
        sources: ["Built-in", "Local", "Bing", "Curated"],
        lightLabel: "Light",
        darkLabel: "Dark",
        systemLabel: "Follow system",
        folders: ["Referencias", "Guías", "Inspiración", "Competencia", "IA", "Sistemas de diseño"],
        subfolder: "Iconos",
        zenOff: "Zen: Off",
        zenEnter: "Lumno: enter Zen mode",
      },
      wallpaperPart: {
        title: "Fondos que nunca cansan",
        lead: "Uno nuevo cada día, una versión nocturna al caer la noche y ocho estilos para tu favorito.",
      },
      toolsPart: {
        title: "Completa, o tan minimalista como quieras",
        lead: "Accesos directos, marcadores y reloj, siempre a mano. Para concentrarte, un comando deja solo el buscador.",
        previous: "Anterior",
        next: "Siguiente",
      },
    },
    utilities: {
      title: "Pequeños detalles\nque suman.",
      description: "Cada uno tiene su propio interruptor. Quédate solo con lo que uses.",
      items: {
        clip: { title: "Web Clip", description: "Recorta parte de una página en una ventana flotante que se mantiene al día." },
        autoPip: {
          title: "Imagen en imagen automática",
          description: "Cambia de pestaña y el vídeo sigue en una ventana flotante.",
        },
        progress: {
          title: "Tarjetas de progreso",
          description: "Fija una serie o novela en la nueva pestaña y recordará tu último episodio o capítulo.",
        },
        sync: { title: "Sincronización WebDAV", description: "Sincroniza ajustes, iconos y fondos entre navegadores." },
        pinned: { title: "Pestañas fijadas a salvo", description: "Tus pestañas fijadas vuelven solas al reiniciar el navegador." },
        languages: { title: "Idiomas de la interfaz", description: "English, 日本語, 简体中文 y 繁體中文, o el de tu navegador." },
      },
    },
    reviews: {
      eyebrow: "Chrome Web Store",
      title: "Hecho con nuestros usuarios,\npulido al detalle.",
      ariaLabel: "Reseñas reales de Chrome Web Store",
      avatarLabel: "Avatar de {name}",
      storeLinkLabel: "Ver todas las reseñas",
      quotes: ["“", "”"],
    },
    openSource: {
      title: "Privado y seguro,\ndesde el diseño.",
      points: {
        local: "No recopila datos de uso",
        source: "Código abierto con GPL-3.0",
        optional: "Varias formas de sincronizar",
      },
      art: {
        privacy: {
          title: "Datos que recopila Lumno",
          status: "Ninguno",
          items: { history: "Historial", bookmarks: "Marcadores y pestañas", searches: "Búsquedas", usage: "Estadísticas de uso", location: "Ubicación" },
        },
        sync: {
          browser: "Sincronización del navegador",
          webdav: "WebDAV",
          file: "Archivo exportado",
        },
      },
      browsersLabel: "Funciona en Chrome, Edge y la mayoría de navegadores Chromium",
      browserNames: BROWSER_NAMES,
      githubLabel: "Ver el código en GitHub",
    },
    faqTitle: "Tus preguntas,\nrespondidas.",
    faqAskLabel: "Preguntar en GitHub",
    faqItems: [
      {
        question: "¿Cuál es el atajo predeterminado? ¿Puedo cambiarlo?",
        answer:
          "Por defecto es ⌘ ⇧ K en Mac y Ctrl + Mayús + K en Windows. Puedes cambiarlo en `chrome://extensions/shortcuts`.",
        firefoxAnswer:
          "Por defecto es ⌘ ⇧ K en Mac y Ctrl + Mayús + K en Windows. Puedes cambiarlo en `chrome://extensions/shortcuts`. En Firefox es ⌃ ⇧ K en Mac y Alt + K en Windows y Linux; cámbialo desde el menú del engranaje en `about:addons`.",
      },
      {
        question: "¿Qué navegadores son compatibles?",
        answer:
          "Los navegadores Chromium que instalan extensiones de Chrome, como Chrome, Edge, Dia, Brave y Vivaldi. Safari y Firefox aún no son compatibles. En Dia tienes la barra de comandos, pero no la nueva pestaña de Lumno.",
        firefoxAnswer:
          "Los navegadores Chromium que instalan extensiones de Chrome, como Chrome, Edge, Dia, Brave y Vivaldi, además de Firefox 140 o posterior y navegadores basados en Firefox como Zen. Safari aún no es compatible. En Dia tienes la barra de comandos, pero no la nueva pestaña de Lumno.",
      },
      {
        question: "¿Qué cambia en la versión para Firefox?",
        answer:
          "Las funciones principales son las mismas que en la versión para Chrome. Instálala desde Complementos de Firefox, también en navegadores basados en Firefox como Zen y LibreWolf. Por las limitaciones de Firefox, Web Clip y la imagen en imagen automática no están disponibles, y la barra de comandos no se abre en páginas `about:`, en el sitio de complementos ni en archivos locales.",
        firefoxOnly: true,
      },
      {
        question: "Vengo de Arc. ¿Me resultará familiar?",
        answer:
          "Esa es la idea. Lumno se inspira en las interacciones de Arc (sin relación con Arc): en Dia, Chrome o Edge puedes abrir la barra de comandos cuando quieras, buscar todo en un solo lugar y cambiar de pestaña al instante. Asigna el atajo a ⌘ T y tendrás la sensación de Arc que ya conoces.",
      },
      {
        question: "¿Puedo conservar mi nueva pestaña actual y usar solo la barra de comandos?",
        answer:
          "Sí. Deja Lumno activado y vuelve a instalar tu otra extensión de nueva pestaña para que la recupere. La barra de comandos no se ve afectada.",
      },
      {
        question: "¿Por qué la barra de direcciones muestra una URL de extensión en la nueva pestaña?",
        answer:
          "Se debe a «Automatically focus input»: para dejar el cursor directamente en el buscador de Lumno, la barra de direcciones muestra la URL de la extensión. Desactívalo en los ajustes de apariencia de la nueva pestaña y la barra de direcciones quedará vacía.",
      },
      {
        question: "¿Por qué la barra de comandos no coincide con el modo claro u oscuro de mi sistema?",
        answer:
          "En el modo «Follow system», la barra de comandos también se guía por los colores de la página actual. Si quieres que siga solo al sistema, desactiva «Adapt theme colors to each webpage» en Settings › Appearance.",
      },
      {
        question: "¿Por qué la barra de comandos no se abre en algunas páginas?",
        answer:
          "Los navegadores bloquean las extensiones en páginas protegidas, como los ajustes de `chrome://` y Chrome Web Store, así que Lumno abre la búsqueda en una nueva pestaña. Para archivos PDF y HTML locales, activa «Permitir el acceso a las URL de archivo» en la página de detalles de la extensión.",
      },
      {
        question: "¿Puedo sincronizar mis ajustes entre dispositivos?",
        answer:
          "Sí. Por defecto se sincronizan con tu cuenta del navegador. Activa WebDAV (por ejemplo, un NAS o tu propio servidor) para sincronizar también iconos y fondos entre distintos navegadores.",
      },
      {
        question: "¿Lumno sube mis datos de navegación?",
        answer:
          "No. Las pestañas, los marcadores y el historial se buscan en tu dispositivo. Solo cuando haces una búsqueda web o con IA se envía lo que escribes al buscador o sitio de IA que hayas elegido.",
      },
      {
        question: "¿Lumno es gratis?",
        answer: "Totalmente, y es de código abierto con licencia GPL-3.0 en GitHub.",
      },
    ],
    finalDescription: "Barra de comandos y nueva pestaña de código abierto para tu navegador.",

    footerTagline: "Una barra de comandos y una nueva pestaña minimalista de código abierto para tu navegador.",
    footerProduct: "Producto",
    footerSupport: "Soporte",
    footerRelease: "Novedades",
    footerReportIssue: "Informar de un problema",
    footerPrivacy: "Privacidad",
    footerSocialAria: "Seguir a Lumno",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
    footerWebsiteSource: "Código fuente del sitio",
    languageSelectAria: "Elegir idioma",
  },
  "pt-BR": {
    navigationAria: "Navegação principal",
    navFeatures: "Recursos",
    navRelease: "Novidades",
    navMoreMenuAria: "Ver mais links",
    community: {
      kind: "open",
      label: "Comunidade",
      contactLabel: "Contato",
      contactMenuAria: "Abrir os perfis do autor",
      title: "Comunidade do Lumno",
      closeLabel: "Fechar",
      github: { label: "Perguntar no GitHub", description: "Problemas, ideias e perguntas, em aberto" },
      x: { label: "Siga no X", description: "Novidades do criador, @kubai087" },
      heroLabel: "GitHub",
      heroAria: "Ver o código-fonte do Lumno no GitHub",
    },
    installLabel: "Instalar",
    installAria: "Ver opções para instalar o Lumno",
    installChromeStoreLabel: "Chrome Web Store",
    installEdgeStoreLabel: "Complementos do Microsoft Edge",
    installFirefoxStoreLabel: "Complementos do Firefox",
    installChromeRecommendation: "Recomendado",
    installChromeRecommendationNote: "Atualiza primeiro",

    heroTitle: "Seu navegador, às suas ordens.",
    heroTitleSerif: { lead: "Seu navegador,", accent: "às suas ordens." },
    heroOpenSource: {
      label: "Código aberto · GPL-3.0",
      aria: "Ver o código-fonte do Lumno no GitHub",
      ariaWithStars: "Ver o código-fonte do Lumno no GitHub ({count} estrelas)",
    },
    heroDescription:
      "O Lumno é uma barra de comandos e uma nova aba de código aberto.\nCom um só atalho, pesquise abas, favoritos, histórico e os sites que você mais usa.",
    heroInstallLabel: "Instalar o Lumno, é grátis",
    heroInstallAria: {
      chrome: "Instalar o Lumno grátis pela Chrome Web Store",
      edge: "Instalar o Lumno grátis pelos Complementos do Microsoft Edge",
      firefox: "Instalar o Lumno grátis pelos Complementos do Firefox",
    },
    heroBrowserTooltipLabel: "Código aberto sob a licença GPL-3.0. Funciona na maioria dos navegadores Chromium.",
    firefoxCopy: {
      heroBrowserTooltipLabel: "Código aberto sob a licença GPL-3.0. Funciona na maioria dos navegadores Chromium e no Firefox.",
      browsersLabel: "Funciona no Chrome, no Edge, no Firefox e na maioria dos navegadores Chromium",
    },
    heroDemoAria: "Demonstração da barra de comandos do Lumno: pesquisa no navegador, em sites e comandos",

    commandBar: {
      title: "Em qualquer página,\nsempre à mão.",
      description: "Abas, favoritos, histórico e IA, tudo em uma só caixa de pesquisa.",
      search: {
        label: "Pesquisa unificada",
        title: "Abas demais?\nÉ só pesquisar.",
        description: "O que você mais escolhe sobe para o topo.",
        query: "design",
        mark: "design",
        switchLabel: "Switch",
        openLabel: "New Tab",
        results: [
          { icon: "gh", title: "lumno-web · Design do site", detail: "github.com/kubai087/lumno-web", source: "Opened", kind: "tab" },
          { icon: "yt", title: "Design systems em 10 minutos", detail: "YouTube / Design / Assistir mais tarde", source: "Bookmark", kind: "bookmark" },
          { icon: "wk", title: "Design de interação – Wikipédia", detail: "pt.wikipedia.org", source: "History", kind: "history" },
        ],
      },
      siteSearch: {
        label: "Pesquisa em sites",
        title: "Pesquise dentro dos sites,\na um Tab de distância.",
        description: "Digite um atalho, aperte Tab e pesquise direto em 46 sites.",
        keyword: "gh",
        target: "GitHub",
        query: "lumno",
        tabHint: "Search GitHub",
        resultTitle: "Search in GitHub \"lumno\"",
        actionLabel: "Search",
        fallbackTitle: "Search \"lumno\"",
      },
      ai: {
        label: "Pergunte à IA",
        title: "Sua pergunta,\ndireto para a IA.",
        description: "Alterne entre ChatGPT, Gemini e Perplexity e aperte Enter para perguntar.",
        prompt: "Explique o emaranhamento quântico fácil",
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
        pick: 1,
        resultTitle: "Ask Gemini \"Explique o emaranhamento quântico fácil\"",
        actionLabel: "Open Gemini web app",
      },
    },
    aiIntent: {
      title: "Selecione o texto.\nPergunte à IA.",
      description: "Só aparece quando você precisa. Um clique, e a IA responde em uma aba em segundo plano.",
    },
    newTab: {
      eyebrow: "Nova aba",
      title: "Uma nova aba\ndo seu jeito.",
      description:
        "Pinturas como papel de parede, filtros com cara de filme e seus favoritos a um clique. Minimalista ou completa, você escolhe.",
      screenshotAlt: "Nova aba do Lumno com papel de parede, caixa de pesquisa e cartões de sites",
      screenshotOpenLabel: "Ver em tamanho real",
      screenshotCloseLabel: "Fechar a visualização ampliada",
      filters: {
        alt: "A nova aba do Lumno com filtros diferentes sobre a mesma pintura de uma vila com neve",
        tablistLabel: "Prévia dos filtros do papel de parede",
        compareLabel: "Arraste para comparar o original com o filtro",
        searchPlaceholder: "Search or type a URL…",
        items: {
          none: { name: "Original", note: "O papel de parede como ele é" },
          blur: { name: "Vidro fosco", note: "Desfoque suave atrás do conteúdo" },
          grain: { name: "Granulado", note: "Ruído fino, como em filme" },
          blocks: { name: "Blocos", note: "Remontado em pixels" },
          halftone: { name: "Retícula", note: "Pontos de impressão gráfica" },
          dither: { name: "Pontilhado", note: "Visual retrô com poucas cores" },
          ascii: { name: "ASCII", note: "Sombras ou luzes feitas de texto" },
          crt: { name: "CRT", note: "Linhas, brilho e tela curva" },
        },
      },
      wallpapers: {
        label: "Papéis de parede",
        title: "Algo novo para ver todo dia",
        description: "Pinturas clássicas, a foto do dia do Bing e paisagens, renovadas diariamente.",
        alt: "O painel de aparência do Lumno alternando entre os papéis de parede integrados",
      },
      dark: {
        label: "Modo escuro",
        title: "Descanso para os olhos à meia-noite",
        description: "Segue o seu sistema, com um papel de parede noturno combinando.",
        alt: "A nova aba do Lumno no modo escuro, com uma paisagem em nanquim sob a lua",
      },
      bookmarks: {
        label: "Favoritos",
        title: "Centenas de favoritos, zero garimpo",
        description: "Três layouts deixam até centenas de favoritos ao alcance.",
        alt: "Três layouts de favoritos na nova aba do Lumno: pastas, menus aninhados e barra superior",
        views: { folder: "Pastas", list: "Menus", top: "Barra superior" },
      },
      dock: {
        label: "Atalhos",
        title: "Seus sites favoritos, a um clique",
        description: "Ficam sob a caixa de pesquisa e crescem ao passar o mouse, como o Dock.",
        alt: "Ícones de atalho que crescem sob o ponteiro",
      },
      clock: {
        label: "Relógio",
        title: "A hora, bem onde você olha",
        description: "Um relógio logo acima da caixa de pesquisa, com segundos se quiser.",
        alt: "Um relógio com segundos acima da caixa de pesquisa",
      },
      zen: {
        label: "Modo Zen",
        title: "Só a pesquisa, para você se concentrar",
        description: "Digite /zen para esconder todo o resto. Digite de novo para trazer tudo de volta.",
        alt: "A nova aba no modo Zen, só com a caixa de pesquisa",
      },
      scene: {
        searchPlaceholder: "Search or type a URL…",
        bookmarksHeading: "Bookmarks",
        sourceLabel: "Source",
        sources: ["Built-in", "Local", "Bing", "Curated"],
        lightLabel: "Light",
        darkLabel: "Dark",
        systemLabel: "Follow system",
        folders: ["Referências", "Diretrizes", "Inspiração", "Concorrentes", "Pesquisa IA", "Design systems"],
        subfolder: "Ícones",
        zenOff: "Zen: Off",
        zenEnter: "Lumno: enter Zen mode",
      },
      wallpaperPart: {
        title: "Papéis de parede que nunca cansam",
        lead: "Um novo todo dia, uma versão noturna depois que escurece e oito estilos para o seu favorito.",
      },
      toolsPart: {
        title: "Completa, ou tão minimalista quanto quiser",
        lead: "Atalhos, favoritos e relógio sempre à mão. Na hora de focar, um comando deixa só a caixa de pesquisa.",
        previous: "Anterior",
        next: "Próximo",
      },
    },
    utilities: {
      title: "Pequenos detalhes\nque fazem diferença.",
      description: "Cada um tem seu próprio botão. Fique só com o que você usa.",
      items: {
        clip: { title: "Web Clip", description: "Recorte parte de uma página numa janela flutuante sempre atualizada." },
        autoPip: {
          title: "Picture-in-picture automático",
          description: "Troque de aba e o vídeo continua numa janela flutuante.",
        },
        progress: {
          title: "Cartões de progresso",
          description: "Fixe uma série ou um livro na nova aba, e ele lembra o último episódio ou capítulo.",
        },
        sync: { title: "Sincronização WebDAV", description: "Sincronize configurações, ícones e papéis de parede entre navegadores." },
        pinned: { title: "Abas fixadas de volta", description: "Suas abas fixadas voltam sozinhas quando o navegador reinicia." },
        languages: { title: "Idiomas da interface", description: "English, 日本語, 简体中文 e 繁體中文, ou o idioma do navegador." },
      },
    },
    reviews: {
      eyebrow: "Chrome Web Store",
      title: "Feito com nossos usuários,\ncaprichado em cada detalhe.",
      ariaLabel: "Avaliações reais da Chrome Web Store",
      avatarLabel: "Avatar de {name}",
      storeLinkLabel: "Ler todas as avaliações",
      quotes: ["“", "”"],
    },
    openSource: {
      title: "Privado e seguro,\ndesde a origem.",
      points: {
        local: "Não coleta dados de uso",
        source: "Código aberto sob GPL-3.0",
        optional: "Várias formas de sincronizar",
      },
      art: {
        privacy: {
          title: "Dados que o Lumno coleta",
          status: "Nenhum",
          items: { history: "Histórico", bookmarks: "Favoritos e abas", searches: "Pesquisas", usage: "Estatísticas de uso", location: "Localização" },
        },
        sync: {
          browser: "Sincronização do navegador",
          webdav: "WebDAV",
          file: "Arquivo exportado",
        },
      },
      browsersLabel: "Funciona no Chrome, no Edge e na maioria dos navegadores Chromium",
      browserNames: BROWSER_NAMES,
      githubLabel: "Ver o código no GitHub",
    },
    faqTitle: "Suas perguntas,\nrespondidas.",
    faqAskLabel: "Perguntar no GitHub",
    faqItems: [
      {
        question: "Qual é o atalho padrão? Dá para mudar?",
        answer:
          "O padrão é ⌘ ⇧ K no Mac e Ctrl + Shift + K no Windows. Você pode mudar em `chrome://extensions/shortcuts`.",
        firefoxAnswer:
          "O padrão é ⌘ ⇧ K no Mac e Ctrl + Shift + K no Windows. Você pode mudar em `chrome://extensions/shortcuts`. No Firefox, é ⌃ ⇧ K no Mac e Alt + K no Windows e no Linux; mude pelo menu de engrenagem em `about:addons`.",
      },
      {
        question: "Quais navegadores são compatíveis?",
        answer:
          "Navegadores Chromium que instalam extensões do Chrome, como Chrome, Edge, Dia, Brave e Vivaldi. Safari e Firefox ainda não são compatíveis. No Dia, você usa a barra de comandos, mas não a nova aba do Lumno.",
        firefoxAnswer:
          "Navegadores Chromium que instalam extensões do Chrome, como Chrome, Edge, Dia, Brave e Vivaldi, além do Firefox 140 ou mais recente e navegadores baseados no Firefox, como o Zen. Safari ainda não é compatível. No Dia, você usa a barra de comandos, mas não a nova aba do Lumno.",
      },
      {
        question: "O que muda na versão para Firefox?",
        answer:
          "Os principais recursos são os mesmos da versão para Chrome. Instale pelos Complementos do Firefox, inclusive em navegadores baseados no Firefox, como Zen e LibreWolf. Por limitações do Firefox, Web Clip e o picture-in-picture automático não estão disponíveis, e a barra de comandos não abre em páginas `about:`, no site de complementos nem em arquivos locais.",
        firefoxOnly: true,
      },
      {
        question: "Estou vindo do Arc. Vou me sentir em casa?",
        answer:
          "Essa é a ideia. O Lumno se inspira nas interações do Arc (sem relação com o Arc): no Dia, no Chrome ou no Edge, você abre a barra de comandos a qualquer momento, pesquisa tudo num só lugar e troca de aba num instante. Defina o atalho como ⌘ T e pronto, é o Arc que você conhece.",
      },
      {
        question: "Posso manter minha nova aba atual e usar só a barra de comandos?",
        answer:
          "Pode. Deixe o Lumno ativado e reinstale sua outra extensão de nova aba para ela voltar a assumir a nova aba. A barra de comandos não muda.",
      },
      {
        question: "Por que a barra de endereço mostra uma URL de extensão na nova aba?",
        answer:
          "É por causa do “Automatically focus input”: para deixar o cursor direto na caixa de pesquisa do Lumno, a barra de endereço mostra a URL da extensão. Desative a opção nas configurações de aparência da nova aba e a barra de endereço volta a ficar vazia.",
      },
      {
        question: "Por que a barra de comandos não segue o modo claro ou escuro do sistema?",
        answer:
          "No modo “Follow system”, a barra de comandos também leva em conta as cores da página atual. Para seguir só o sistema, desative “Adapt theme colors to each webpage” em Settings › Appearance.",
      },
      {
        question: "Por que a barra de comandos não abre em algumas páginas?",
        answer:
          "Os navegadores bloqueiam extensões em páginas protegidas, como as configurações `chrome://` e a Chrome Web Store, então o Lumno abre a pesquisa numa nova aba. Para arquivos PDF e HTML locais, ative “Permitir acesso aos URLs de arquivo” na página de detalhes da extensão.",
      },
      {
        question: "Dá para sincronizar as configurações entre dispositivos?",
        answer:
          "Dá. Por padrão, elas sincronizam pela sua conta do navegador. Ative o WebDAV (um NAS ou seu próprio servidor, por exemplo) para sincronizar também ícones e papéis de parede entre navegadores diferentes.",
      },
      {
        question: "O Lumno envia meus dados de navegação?",
        answer:
          "Não. Abas, favoritos e histórico são pesquisados no seu dispositivo. Só quando você faz uma pesquisa na web ou com IA o que você digita vai para o buscador ou site de IA que você escolheu.",
      },
      {
        question: "O Lumno é gratuito?",
        answer: "Totalmente, e o código é aberto sob a licença GPL-3.0 no GitHub.",
      },
    ],
    finalDescription: "Barra de comandos e nova aba de código aberto para o seu navegador.",

    footerTagline: "Uma barra de comandos e uma nova aba minimalista de código aberto para o seu navegador.",
    footerProduct: "Produto",
    footerSupport: "Suporte",
    footerRelease: "Novidades",
    footerReportIssue: "Relatar um problema",
    footerPrivacy: "Privacidade",
    footerSocialAria: "Seguir o Lumno",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
    footerWebsiteSource: "Código-fonte do site",
    languageSelectAria: "Escolher idioma",
  },
  ru: {
    navigationAria: "Основная навигация",
    navFeatures: "Возможности",
    navRelease: "Что нового",
    navMoreMenuAria: "Показать ещё ссылки",
    community: {
      kind: "open",
      label: "Сообщество",
      contactLabel: "Связаться",
      contactMenuAria: "Открыть профили автора",
      title: "Сообщество Lumno",
      closeLabel: "Закрыть",
      github: { label: "Спросить на GitHub", description: "Ошибки, идеи и вопросы — открыто" },
      x: { label: "Следить в X", description: "Новости от автора, @kubai087" },
      heroLabel: "GitHub",
      heroAria: "Исходный код Lumno на GitHub",
    },
    installLabel: "Установить",
    installAria: "Варианты установки Lumno",
    installChromeStoreLabel: "Интернет-магазин Chrome",
    installEdgeStoreLabel: "Надстройки Microsoft Edge",
    installFirefoxStoreLabel: "Дополнения Firefox",
    installChromeRecommendation: "Рекомендуем",
    installChromeRecommendationNote: "Обновления быстрее",

    heroTitle: "Весь браузер — под рукой.",
    heroTitleSerif: { lead: "Весь браузер —", accent: "под рукой." },
    heroOpenSource: {
      label: "Открытый код · GPL-3.0",
      aria: "Исходный код Lumno на GitHub",
      ariaWithStars: "Исходный код Lumno на GitHub (звёзд: {count})",
    },
    heroDescription:
      "Lumno — командная панель и новая вкладка с открытым исходным кодом.\nОдно сочетание клавиш — и поиск по вкладкам, закладкам, истории и любимым сайтам.",
    heroInstallLabel: "Установить Lumno — бесплатно",
    heroInstallAria: {
      chrome: "Бесплатно установить Lumno из интернет-магазина Chrome",
      edge: "Бесплатно установить Lumno из надстроек Microsoft Edge",
      firefox: "Бесплатно установить Lumno из дополнений Firefox",
    },
    heroBrowserTooltipLabel: "Открытый код под лицензией GPL-3.0. Работает в большинстве браузеров на Chromium.",
    firefoxCopy: {
      heroBrowserTooltipLabel: "Открытый код под лицензией GPL-3.0. Работает в большинстве браузеров на Chromium и в Firefox.",
      browsersLabel: "Работает в Chrome, Edge, Firefox и большинстве браузеров на Chromium",
    },
    heroDemoAria: "Демонстрация командной панели Lumno: поиск по браузеру, по сайтам и команды",

    commandBar: {
      title: "На любой странице —\nпод рукой.",
      description: "Вкладки, закладки, история и ИИ — в одной строке поиска.",
      search: {
        label: "Единый поиск",
        title: "Слишком много вкладок?\nПросто ищите.",
        description: "То, что вы выбираете чаще, поднимается выше.",
        query: "дизайн",
        mark: "дизайн",
        switchLabel: "Switch",
        openLabel: "New Tab",
        results: [
          { icon: "gh", title: "lumno-web · Дизайн сайта", detail: "github.com/kubai087/lumno-web", source: "Opened", kind: "tab" },
          { icon: "yt", title: "Дизайн-системы за 10 минут", detail: "YouTube / Дизайн / Смотреть позже", source: "Bookmark", kind: "bookmark" },
          { icon: "wk", title: "Дизайн интерфейса — Википедия", detail: "ru.wikipedia.org", source: "History", kind: "history" },
        ],
      },
      siteSearch: {
        label: "Поиск по сайтам",
        title: "Поиск по сайтам —\nв одно нажатие Tab.",
        description: "Введите сокращение, нажмите Tab и ищите сразу на одном из 46 сайтов.",
        keyword: "gh",
        target: "GitHub",
        query: "lumno",
        tabHint: "Search GitHub",
        resultTitle: "Search in GitHub \"lumno\"",
        actionLabel: "Search",
        fallbackTitle: "Search \"lumno\"",
      },
      ai: {
        label: "Спросить ИИ",
        title: "Ваш вопрос —\nсразу к ИИ.",
        description: "Переключайтесь между DeepSeek, ChatGPT и Gemini и спрашивайте по Enter.",
        prompt: "Объясни квантовую запутанность просто",
        groupLabel: "AI search",
        navigateLabel: "Move",
        selectLabel: "Switch",
        providers: [
          { key: "gpt", name: "ChatGPT" },
          { key: "gm", name: "Gemini" },
          { key: "ds", name: "DeepSeek" },
          { key: "pplx", name: "Perplexity" },
          { key: "kimi", name: "Kimi" },
          { key: "mx", name: "MiniMax" },
        ],
        pick: 2,
        resultTitle: "Ask DeepSeek \"Объясни квантовую запутанность просто\"",
        actionLabel: "Open DeepSeek web app",
      },
    },
    aiIntent: {
      title: "Выделите текст.\nСпросите ИИ.",
      description: "Появляется, только когда нужно. Один клик — и ИИ отвечает в фоновой вкладке.",
    },
    newTab: {
      eyebrow: "Новая вкладка",
      title: "Новая вкладка —\nпо вашему вкусу.",
      description:
        "Шедевры живописи на фоне, плёночные фильтры и закладки в один клик. Минимализм или всё сразу — решать вам.",
      screenshotAlt: "Новая вкладка Lumno: фон, строка поиска и карточки сайтов",
      screenshotOpenLabel: "Открыть крупно",
      screenshotCloseLabel: "Закрыть крупный просмотр",
      filters: {
        alt: "Новая вкладка Lumno с разными фильтрами на одной и той же картине с заснеженной деревней",
        tablistLabel: "Предпросмотр фильтров фона",
        compareLabel: "Потяните, чтобы сравнить оригинал и фильтр",
        searchPlaceholder: "Search or type a URL…",
        items: {
          none: { name: "Оригинал", note: "Фон как есть" },
          blur: { name: "Матовое стекло", note: "Мягкое размытие под контентом" },
          grain: { name: "Зерно", note: "Мелкий шум, как на плёнке" },
          blocks: { name: "Блоки", note: "Картина из пиксельных плиток" },
          halftone: { name: "Растр", note: "Точечный растр, как в печати" },
          dither: { name: "Дизеринг", note: "Ретро с ограниченной палитрой" },
          ascii: { name: "ASCII", note: "Тени или света из символов" },
          crt: { name: "ЭЛТ", note: "Строки развёртки, свечение, изгиб" },
        },
      },
      wallpapers: {
        label: "Фоны",
        title: "Каждый день — новый вид",
        description: "Классическая живопись, фото дня от Bing и пейзажи, обновляются ежедневно.",
        alt: "Панель оформления Lumno: переключение встроенных фонов",
      },
      dark: {
        label: "Тёмная тема",
        title: "Бережно к глазам даже в полночь",
        description: "Следует за системой и подбирает ночной фон.",
        alt: "Новая вкладка Lumno в тёмной теме с лунным пейзажем тушью",
      },
      bookmarks: {
        label: "Закладки",
        title: "Сотни закладок — и ничего не нужно искать",
        description: "Три вида раскладки держат под рукой даже сотни закладок.",
        alt: "Три вида закладок в новой вкладке Lumno: папки, вложенные меню и верхняя панель",
        views: { folder: "Папки", list: "Меню", top: "Панель" },
      },
      dock: {
        label: "Ярлыки",
        title: "Любимые сайты в один клик",
        description: "Они под строкой поиска и увеличиваются при наведении, как в Dock.",
        alt: "Значки ярлыков, увеличивающиеся под курсором",
      },
      clock: {
        label: "Часы",
        title: "Время — прямо перед глазами",
        description: "Часы прямо над строкой поиска, секунды по желанию.",
        alt: "Часы с секундами над строкой поиска",
      },
      zen: {
        label: "Режим Zen",
        title: "Только поиск, когда нужна концентрация",
        description: "Введите /zen, чтобы скрыть всё остальное. Введите ещё раз, чтобы вернуть.",
        alt: "Новая вкладка в режиме Zen, только со строкой поиска",
      },
      scene: {
        searchPlaceholder: "Search or type a URL…",
        bookmarksHeading: "Bookmarks",
        sourceLabel: "Source",
        sources: ["Built-in", "Local", "Bing", "Curated"],
        lightLabel: "Light",
        darkLabel: "Dark",
        systemLabel: "Follow system",
        folders: ["Справочники", "Гайдлайны", "Вдохновение", "Конкуренты", "ИИ", "Дизайн-системы"],
        subfolder: "Иконки",
        zenOff: "Zen: Off",
        zenEnter: "Lumno: enter Zen mode",
      },
      wallpaperPart: {
        title: "Фоны, которые не надоедают",
        lead: "Каждый день новый, после заката — ночной, а любимый можно показать в восьми стилях.",
      },
      toolsPart: {
        title: "Со всеми функциями — или совсем минималистично",
        lead: "Ярлыки, закладки и часы всегда под рукой. Чтобы сосредоточиться, одна команда оставит только поиск.",
        previous: "Назад",
        next: "Вперёд",
      },
    },
    utilities: {
      title: "Мелочи,\nиз которых всё складывается.",
      description: "Каждая включается отдельно. Оставьте только то, чем пользуетесь.",
      items: {
        clip: { title: "Web Clip", description: "Вырежьте часть страницы в плавающее окно, которое обновляется вживую." },
        autoPip: {
          title: "Авто «картинка в картинке»",
          description: "Переключитесь на другую вкладку — видео продолжит играть в плавающем окне.",
        },
        progress: {
          title: "Карточки прогресса",
          description: "Закрепите сериал или книгу на новой вкладке — она запомнит последнюю серию или главу.",
        },
        sync: { title: "Синхронизация WebDAV", description: "Настройки, значки и фоны — синхронно во всех браузерах." },
        pinned: { title: "Закреплённые вкладки на месте", description: "После перезапуска браузера закреплённые вкладки возвращаются сами." },
        languages: { title: "Языки интерфейса", description: "English, 日本語, 简体中文 и 繁體中文 — или как в браузере." },
      },
    },
    reviews: {
      eyebrow: "Интернет-магазин Chrome",
      title: "Создано с пользователями,\nотточено до мелочей.",
      ariaLabel: "Настоящие отзывы из интернет-магазина Chrome",
      avatarLabel: "Аватар пользователя {name}",
      storeLinkLabel: "Читать все отзывы",
      quotes: ["«", "»"],
    },
    openSource: {
      title: "Приватно и безопасно —\nс самого начала.",
      points: {
        local: "Не собирает ваши данные",
        source: "Открытый код под GPL-3.0",
        optional: "Синхронизация на выбор",
      },
      art: {
        privacy: {
          title: "Какие данные собирает Lumno",
          status: "Никакие",
          items: { history: "История", bookmarks: "Закладки и вкладки", searches: "Запросы", usage: "Статистика", location: "Местоположение" },
        },
        sync: {
          browser: "Синхронизация браузера",
          webdav: "WebDAV",
          file: "Файл экспорта",
        },
      },
      browsersLabel: "Работает в Chrome, Edge и большинстве браузеров на Chromium",
      browserNames: BROWSER_NAMES,
      githubLabel: "Исходный код на GitHub",
    },
    faqTitle: "Вопросы\nи ответы.",
    faqAskLabel: "Спросить на GitHub",
    faqItems: [
      {
        question: "Какое сочетание клавиш по умолчанию? Можно ли его изменить?",
        answer:
          "По умолчанию ⌘ ⇧ K на Mac и Ctrl + Shift + K в Windows. Изменить его можно на странице `chrome://extensions/shortcuts`.",
        firefoxAnswer:
          "По умолчанию ⌘ ⇧ K на Mac и Ctrl + Shift + K в Windows. Изменить его можно на странице `chrome://extensions/shortcuts`. В Firefox — ⌃ ⇧ K на Mac и Alt + K в Windows и Linux; изменить его можно через меню с шестерёнкой на странице `about:addons`.",
      },
      {
        question: "Какие браузеры поддерживаются?",
        answer:
          "Браузеры на Chromium, в которые можно ставить расширения Chrome: Chrome, Edge, Dia, Brave, Vivaldi и другие. Safari и Firefox пока не поддерживаются. В Dia доступна командная панель, но не новая вкладка Lumno.",
        firefoxAnswer:
          "Браузеры на Chromium, в которые можно ставить расширения Chrome: Chrome, Edge, Dia, Brave, Vivaldi и другие, а также Firefox 140 и новее и браузеры на основе Firefox, например Zen. Safari пока не поддерживается. В Dia доступна командная панель, но не новая вкладка Lumno.",
      },
      {
        question: "Чем отличается версия для Firefox?",
        answer:
          "Основные функции те же, что и в версии для Chrome. Установите её из дополнений Firefox — в том числе в браузеры на основе Firefox, например Zen и LibreWolf. Из-за ограничений Firefox недоступны Web Clip и авто «картинка в картинке», а командную панель нельзя открыть на страницах `about:`, на сайте дополнений и в локальных файлах.",
        firefoxOnly: true,
      },
      {
        question: "Я перехожу с Arc. Всё будет привычно?",
        answer:
          "В этом и смысл. Lumno вдохновлён интерфейсом Arc (и никак с Arc не связан): в Dia, Chrome или Edge вы так же вызываете командную панель в любой момент, ищете всё в одном месте и мгновенно переключаетесь. Назначьте сочетание ⌘ T — и всё будет как в Arc.",
      },
      {
        question: "Можно оставить свою новую вкладку и пользоваться только командной панелью?",
        answer:
          "Да. Оставьте Lumno включённым и переустановите своё расширение новой вкладки, чтобы оно снова её заняло. Командная панель продолжит работать.",
      },
      {
        question: "Почему в адресной строке новой вкладки виден адрес расширения?",
        answer:
          "Дело в параметре «Automatically focus input»: чтобы курсор сразу оказался в строке поиска Lumno, в адресной строке показывается адрес расширения. Отключите его в настройках оформления новой вкладки, и адресная строка снова будет пустой.",
      },
      {
        question: "Почему командная панель не совпадает со светлой или тёмной темой системы?",
        answer:
          "В режиме «Follow system» командная панель учитывает ещё и цвета открытой страницы. Чтобы она следовала только за системой, отключите «Adapt theme colors to each webpage» в Settings › Appearance.",
      },
      {
        question: "Почему на некоторых страницах командная панель не открывается?",
        answer:
          "Браузеры не пускают расширения на защищённые страницы, например настройки `chrome://` и интернет-магазин Chrome, поэтому Lumno открывает поиск в новой вкладке. Для локальных PDF- и HTML-файлов включите «Разрешить открывать файлы по ссылкам» на странице сведений о расширении.",
      },
      {
        question: "Настройки синхронизируются между устройствами?",
        answer:
          "Да. По умолчанию они синхронизируются через аккаунт браузера. Включите WebDAV (например, NAS или собственный сервер), чтобы синхронизировать между разными браузерами ещё и значки с фонами.",
      },
      {
        question: "Lumno отправляет мои данные о просмотре?",
        answer:
          "Нет. Вкладки, закладки и история ищутся прямо на устройстве. Введённый текст уходит в выбранный поисковик или сервис ИИ, только когда вы запускаете веб-поиск или поиск с ИИ.",
      },
      {
        question: "Lumno бесплатный?",
        answer: "Полностью. А ещё у него открытый код под лицензией GPL-3.0 на GitHub.",
      },
    ],
    finalDescription: "Командная панель и новая вкладка с открытым исходным кодом.",

    footerTagline: "Командная панель и минималистичная новая вкладка с открытым исходным кодом.",
    footerProduct: "Продукт",
    footerSupport: "Поддержка",
    footerRelease: "Что нового",
    footerReportIssue: "Сообщить о проблеме",
    footerPrivacy: "Конфиденциальность",
    footerSocialAria: "Следить за Lumno",
    footerGithub: "GitHub",
    footerCopyright: "Lumno",
    footerWebsiteSource: "Исходный код сайта",
    languageSelectAria: "Выбрать язык",
  },
};

/**
 * `firefoxListed` swaps in the Firefox wording; leave it off until Firefox Add-ons
 * serves a listed version, so the site never promises a store that isn't live.
 */
export function getHomeContent(
  locale: SupportedLocale,
  { firefoxListed = false }: { firefoxListed?: boolean } = {},
): HomeContent {
  const content = HOME_CONTENT[locale] || HOME_CONTENT["zh-CN"];
  if (!firefoxListed) return { ...content, faqItems: content.faqItems.filter((item) => !item.firefoxOnly) };
  return {
    ...content,
    heroBrowserTooltipLabel: content.firefoxCopy.heroBrowserTooltipLabel,
    openSource: {
      ...content.openSource,
      browsersLabel: content.firefoxCopy.browsersLabel,
      browserNames: content.openSource.browserNames.flatMap((name) => (name === "Edge" ? [name, "Firefox"] : [name])),
    },
    faqItems: content.faqItems.map((item) => (item.firefoxAnswer ? { ...item, answer: item.firefoxAnswer } : item)),
  };
}
