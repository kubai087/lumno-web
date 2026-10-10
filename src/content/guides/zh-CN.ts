import type { GuideLocaleContent } from "../../lib/guides";

/** Simplified Chinese is the source text the other guide languages translate. */
const content: GuideLocaleContent = {
  ui: {
    navLabel: "帮助中心",
    navTitle: "Lumno 帮助中心",
    groups: {
      about: "了解 Lumno",
      quickstart: "快速上手",
      trust: "兼容性与安全",
    },
    sections: {
      setup: "安装与设置",
      "command-bar": "命令栏",
      "new-tab": "新标签页",
      scenarios: "按场景",
    },
    navToggle: "目录",
    updatedLabel: "{date}更新",
    tocLabel: "本页内容",
    faqTitle: "常见问题",
    previousLabel: "上一篇",
    nextLabel: "下一篇",
    zoomLabel: "查看大图",
    closeLabel: "关闭",
    privacyLabel: "隐私政策",
    searchPlaceholder: "搜索帮助",
    searchLabel: "搜索帮助中心",
    searchEmpty: "没有找到相关内容",
    stuckText: "还没解决？进群问问，作者就在群里。",
    stuckPrimary: "加入用户群",
    stuckSecondary: "提交 Issue",
  },
  pages: {
    "what-is-lumno": {
      pageTitle: "Lumno 是什么：开源的浏览器命令栏与新标签页扩展｜Lumno 帮助中心",
      pageDescription:
        "Lumno 是免费开源的浏览器扩展，在任意网页按 ⌘⇧K 打开命令栏，搜索标签页、书签和历史记录，在网站内搜索或向 AI 提问，并提供可自定义的新标签页。支持 Chrome、Edge、Dia 等 Chromium 浏览器。",
      keywords: ["Lumno", "浏览器命令栏", "Chrome 命令栏插件", "聚焦搜索", "新标签页插件", "Arc 命令栏"],
      title: "Lumno 是什么",
      navTitle: "Lumno 是什么",
      faq: [
        {
          question: "Lumno 收费吗？",
          answer: "不收费。Lumno 基于 GPL-3.0 协议开源，所有功能免费使用，不需要注册账号。",
        },
        {
          question: "Lumno 支持哪些浏览器？",
          answer: "支持 Chrome、Edge、Dia、Brave、Arc、Vivaldi 等 Chromium 内核浏览器，暂不支持 Safari。详见「浏览器兼容性」。",
        },
      ],
    },
    limitations: {
      pageTitle: "Lumno 做不到的事：功能边界与已知限制｜Lumno 帮助中心",
      pageDescription:
        "Lumno 是浏览器扩展，不是浏览器：没有侧边栏、Spaces 和分屏；在 chrome:// 等受限页面无法显示命令栏；暂不支持 Safari，Dia 中新标签页不可用。安装前可以先了解这些限制。",
      keywords: ["Lumno 限制", "Chrome 扩展受限页面", "Arc 侧边栏替代", "Dia 新标签页"],
      title: "Lumno 做不到的事",
      navTitle: "Lumno 做不到的事",
    },
    "use-cases": {
      pageTitle: "Lumno 使用场景：标签页太多、从 Arc 迁移、开发与写作｜Lumno 帮助中心",
      pageDescription:
        "Lumno 适合哪些人和场景：标签页开得很多、从 Arc 换到 Chrome 或 Dia、经常查文档和 GitHub 的开发者、需要找回资料的研究和写作者、常用 AI 的人，以及想要安静新标签页的人。",
      keywords: ["Lumno 使用场景", "标签页太多怎么办", "Arc 迁移", "开发者浏览器插件", "AI 快捷提问"],
      title: "使用场景",
      navTitle: "使用场景",
    },
    install: {
      pageTitle: "安装 Lumno：从 Chrome 应用商店或 Edge 加载项安装｜Lumno 帮助中心",
      pageDescription:
        "在 Chrome、Dia、Brave、Arc 中从 Chrome 应用商店安装 Lumno，在 Edge 中从 Microsoft Edge 加载项安装。安装后会打开欢迎页，按 ⌘⇧K 即可开始使用。",
      keywords: ["安装 Lumno", "Lumno Chrome 应用商店", "Lumno Edge 加载项", "Chrome 扩展安装"],
      title: "安装 Lumno",
      navTitle: "安装 Lumno",
      faq: [
        {
          question: "需要注册账号吗？",
          answer: "不需要。Lumno 没有账号系统，安装后即可使用。",
        },
        {
          question: "如何卸载？",
          answer: "在 chrome://extensions（Edge 中为 edge://extensions）找到 Lumno，点击「移除」。卸载会删除扩展保存在本机的设置和图片。",
        },
      ],
    },
    "keyboard-shortcuts": {
      pageTitle: "Lumno 快捷键：默认快捷键、修改方法和命令栏按键｜Lumno 帮助中心",
      pageDescription:
        "Lumno 默认用 ⌘⇧K（Windows 为 Ctrl+Shift+K）打开命令栏，⌥Q 打开最近标签页切换器。在 chrome://extensions/shortcuts 中可以修改，也可以改为 ⌘T。附命令栏和切换器内的全部按键。",
      keywords: ["Lumno 快捷键", "修改 Chrome 扩展快捷键", "chrome://extensions/shortcuts", "⌘T 命令栏"],
      title: "快捷键",
      navTitle: "快捷键",
      faq: [
        {
          question: "快捷键没有反应怎么办？",
          answer:
            "先确认当前不是 chrome:// 设置页或扩展商店这类受限页面；再到 chrome://extensions/shortcuts 检查快捷键是否被其他扩展占用。在 Dia 中，请把范围改为「全局」。",
        },
      ],
    },
    sync: {
      pageTitle: "同步设置：用浏览器同步和 WebDAV 在多台电脑间同步 Lumno｜Lumno 帮助中心",
      pageDescription:
        "Lumno 的设置会跟着浏览器自带的同步走；开启 WebDAV 同步后，上传的快捷方式图标和自定义壁纸也能同步，支持坚果云、NAS 和自建服务器。附坚果云的填写方法。",
      keywords: ["Lumno 同步", "WebDAV 同步", "坚果云 WebDAV", "Chrome 扩展同步设置", "新标签页同步"],
      title: "同步设置",
      navTitle: "同步设置",
      faq: [
        {
          question: "同步需要注册 Lumno 账号吗？",
          answer: "不需要。Lumno 没有账号和服务器，设置通过浏览器自带的同步传递；图标和壁纸可以通过你自己的 WebDAV 同步。",
        },
        {
          question: "Chrome 和 Firefox 之间能同步吗？",
          answer: "可以用 WebDAV。两个浏览器连接同一个 WebDAV 服务器和目录，即使在同一台电脑上同时打开也能同步。",
        },
      ],
    },
    "search-tabs-bookmarks-history": {
      pageTitle: "搜索已打开的标签页、书签和历史记录｜Lumno 帮助中心",
      pageDescription:
        "在任意网页按 ⌘⇧K（Windows 为 Ctrl+Shift+K）打开 Lumno，在同一个搜索框中搜索已打开的标签页、书签、历史记录和常用网站，支持拼音搜索，也可以只搜索已打开的标签页。",
      keywords: ["Chrome 标签页搜索", "书签搜索插件", "历史记录搜索", "搜索已打开标签页", "拼音搜索书签", "Chrome 聚焦搜索"],
      title: "搜索标签页、书签和历史记录",
      navTitle: "搜索标签页、书签和历史",
      faq: [
        {
          question: "Lumno 会上传我的浏览记录或书签吗？",
          answer:
            "不会。标签页、书签和历史记录都在浏览器本地搜索，Lumno 不收集这些数据。输入时，内容会发送到当前搜索引擎的搜索建议接口，用于显示搜索建议，和在浏览器地址栏输入时相同。",
        },
        {
          question: "搜索结果可以在新标签页中打开吗？",
          answer: "可以。在 Lumno 设置中可以选择在当前标签页、当前标签页的左侧或右侧，或标签栏末尾打开。",
        },
      ],
    },
    "site-search": {
      pageTitle: "站内搜索：输入简称按 Tab，在 GitHub、B 站、知乎中直接搜索｜Lumno 帮助中心",
      pageDescription:
        "Lumno 内置 46 个搜索入口：输入 gh、bb、zh 等简称后按 Tab，可以直接在 GitHub、Bilibili、知乎中搜索，也可以把问题直接发给 ChatGPT、DeepSeek、Kimi、豆包。包含简称列表。",
      keywords: ["Chrome 站内搜索", "Tab 键站内搜索", "浏览器搜索快捷方式", "快速搜索 GitHub", "DeepSeek 快捷提问", "自定义搜索引擎"],
      title: "站内搜索和 AI 提问",
      navTitle: "站内搜索和 AI 提问",
      faq: [
        {
          question: "支持哪些网站？",
          answer:
            "内置 46 个：11 个搜索引擎，11 个 AI 和 AI 搜索（如 ChatGPT、DeepSeek、Kimi、Perplexity），以及 GitHub、YouTube、Bilibili、知乎、小红书等 24 个网站。也可以添加自定义网站。",
        },
        {
          question: "站内搜索会经过 Lumno 的服务器吗？",
          answer: "不会。Lumno 没有自己的服务器，按回车后会直接打开目标网站的搜索地址。",
        },
      ],
    },
    "tab-switcher": {
      pageTitle: "最近标签页切换器：按 ⌥Q 在最近的标签页之间切换｜Lumno 帮助中心",
      pageDescription:
        "按 ⌥Q（Windows 为 Alt+Q）打开 Lumno 的最近标签页切换器，标签页按最近使用的顺序排列并显示页面预览。按住 ⌥ 连按 Q 选择，松开即切换。",
      keywords: ["Chrome 标签页切换", "最近标签页", "Alt Tab 浏览器", "Arc Ctrl Tab"],
      title: "切换最近的标签页",
      navTitle: "切换最近的标签页",
    },
    "newtab-wallpaper": {
      pageTitle: "新标签页壁纸：内置名画、Bing 每日壁纸、本地图片和滤镜｜Lumno 帮助中心",
      pageDescription:
        "在 Lumno 新标签页的外观设置中更换壁纸：内置名画与插画、Bing 每日壁纸、精选摄影、本地图片或图片链接，并可调整遮罩和滤镜，为浅色和深色模式分别设置。",
      keywords: ["新标签页壁纸", "Chrome 新标签页壁纸", "Bing 每日壁纸", "新标签页插件"],
      title: "更换壁纸",
      navTitle: "更换壁纸",
    },
    "newtab-bookmarks-shortcuts": {
      pageTitle: "新标签页的快捷方式和书签：添加、排列与三种书签布局｜Lumno 帮助中心",
      pageDescription:
        "在 Lumno 新标签页添加常用网站快捷方式、自定义图标，并在多层文件夹、多级列表和顶部书签栏三种布局中查看浏览器书签。",
      keywords: ["新标签页快捷方式", "新标签页书签", "Chrome 书签栏", "书签文件夹"],
      title: "快捷方式和书签",
      navTitle: "快捷方式和书签",
    },
    "newtab-frequent-sites": {
      pageTitle: "常访网站和追更卡片：置顶网站，自动记住看到哪一集｜Lumno 帮助中心",
      pageDescription:
        "Lumno 新标签页底部显示最常访问或最近访问的网站，可以置顶最多 3 个卡片；置顶剧集或连载小说后，卡片会自动更新到最新一集或一章。",
      keywords: ["新标签页常用网站", "追剧进度", "连载小说进度", "置顶网站"],
      title: "常访网站和追更卡片",
      navTitle: "常访网站和追更卡片",
    },
    "newtab-clock-zen": {
      pageTitle: "时钟、每日名句和 Zen 模式：让新标签页只留搜索框｜Lumno 帮助中心",
      pageDescription:
        "在 Lumno 新标签页显示时钟和每日名句（文学或诗词），或在搜索框输入 /zen 进入 Zen 模式，只保留搜索框。",
      keywords: ["新标签页时钟", "每日一句", "极简新标签页", "Zen 模式"],
      title: "时钟、名句和 Zen 模式",
      navTitle: "时钟、名句和 Zen 模式",
    },
    "arc-command-bar": {
      pageTitle: "从 Arc 迁移到 Chrome、Dia 或 Edge：命令栏与快捷键对照｜Lumno 帮助中心",
      pageDescription:
        "从 Arc 换到 Chrome、Dia 或 Edge 后，用 Lumno 获得类似 Arc 的命令栏：按 ⌘⇧K 搜索标签页、书签和历史记录，可改为 ⌘T；按 ⌥Q 切换最近的标签页。包含 Arc 快捷键对照表。",
      keywords: ["Arc 命令栏替代", "Arc 浏览器替代", "Arc 迁移 Chrome", "Dia 命令栏", "Arc 快捷键"],
      title: "从 Arc 迁移",
      navTitle: "从 Arc 迁移",
      faq: [
        {
          question: "Lumno 和 Arc 是什么关系？",
          answer: "Lumno 是独立的开源项目，交互参考了 Arc，与 Arc 和 The Browser Company 没有关系。",
        },
      ],
    },
    "browser-compatibility": {
      pageTitle: "浏览器兼容性：Chrome、Edge、Dia、Brave、Firefox 与 Safari｜Lumno 帮助中心",
      pageDescription:
        "Lumno 在 Chrome、Edge、Brave、Arc、Vivaldi 等 Chromium 浏览器中可以使用全部功能；Dia 中新标签页不可用；Firefox 版有若干限制；暂不支持 Safari 和手机浏览器。",
      keywords: ["Lumno 兼容性", "Dia 插件", "Edge 扩展", "Firefox 版", "Chromium 浏览器扩展"],
      title: "浏览器兼容性",
      navTitle: "浏览器兼容性",
    },
    "privacy-data": {
      pageTitle: "隐私与数据：Lumno 在本机处理数据，不收集使用信息｜Lumno 帮助中心",
      pageDescription:
        "Lumno 没有账号和服务器，标签页、书签和历史记录只在本机处理，不收集使用数据。本文说明哪些请求会离开你的设备，以及浏览器同步和 WebDAV 同步的范围。",
      keywords: ["Lumno 隐私", "浏览器扩展隐私", "Chrome 扩展数据", "WebDAV 同步"],
      title: "隐私与数据",
      navTitle: "隐私与数据",
    },
    "security-open-source": {
      pageTitle: "安全与开源：GPL-3.0 源码、权限用途和 Manifest V3｜Lumno 帮助中心",
      pageDescription:
        "Lumno 基于 GPL-3.0 协议开源，源码在 GitHub 公开；采用 Manifest V3，不运行远程代码。本文列出每项浏览器权限的用途。",
      keywords: ["Lumno 开源", "Lumno 安全", "Chrome 扩展权限", "Manifest V3"],
      title: "安全与开源",
      navTitle: "安全与开源",
    },
    "ratings-reviews": {
      pageTitle: "评分与评测：Chrome 应用商店评分和少数派报道｜Lumno 帮助中心",
      pageDescription:
        "Lumno 在 Chrome 应用商店的评分与评价，以及少数派对 Lumno 的介绍文章。",
      keywords: ["Lumno 评价", "Lumno 评分", "少数派 Lumno", "Chrome 命令栏插件推荐"],
      title: "评分与评测",
      navTitle: "评分与评测",
    },
  },
};

export default content;
