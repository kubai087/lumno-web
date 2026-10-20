// Generated from lumno-extension/assets/data/site-search.json, src/shared/search-utils.js and
// src/shared/search-input-mode.js by scripts/sync-extension-ui.mjs. Do not edit; rerun the script.
import type { ExtensionStringKey } from "./strings";

export type OverlayProvider = { name: string; nameKey?: ExtensionStringKey; host: string; group: "engine" | "site" | "ai" };

export const OVERLAY_PROVIDERS: Record<string, OverlayProvider> = {
  "yt": {
    "name": "YouTube",
    "host": "youtube.com",
    "group": "site"
  },
  "bb": {
    "name": "Bilibili",
    "host": "search.bilibili.com",
    "group": "site"
  },
  "gh": {
    "name": "GitHub",
    "host": "github.com",
    "group": "site"
  },
  "sf": {
    "name": "Stack Overflow",
    "host": "stackoverflow.com",
    "group": "site"
  },
  "mdn": {
    "name": "MDN",
    "host": "developer.mozilla.org",
    "group": "site"
  },
  "npm": {
    "name": "npm",
    "host": "npmjs.com",
    "group": "site"
  },
  "hf": {
    "name": "Hugging Face",
    "host": "huggingface.co",
    "group": "site"
  },
  "gs": {
    "name": "Google Scholar",
    "host": "scholar.google.com",
    "group": "site"
  },
  "ss": {
    "name": "Semantic Scholar",
    "host": "semanticscholar.org",
    "group": "site"
  },
  "maps": {
    "name": "Google Maps",
    "host": "google.com",
    "group": "site"
  },
  "gpt": {
    "name": "ChatGPT",
    "nameKey": "site_search_name_chatgpt",
    "host": "chatgpt.com",
    "group": "ai"
  },
  "gm": {
    "name": "Gemini",
    "nameKey": "site_search_name_gemini",
    "host": "gemini.google.com",
    "group": "ai"
  },
  "dbai": {
    "name": "豆包",
    "nameKey": "site_search_name_doubao",
    "host": "doubao.com",
    "group": "ai"
  },
  "qw": {
    "name": "千问",
    "nameKey": "site_search_name_qianwen",
    "host": "qianwen.com",
    "group": "ai"
  },
  "yb": {
    "name": "元宝",
    "nameKey": "site_search_name_yuanbao",
    "host": "yuanbao.tencent.com",
    "group": "ai"
  },
  "mx": {
    "name": "MiniMax",
    "nameKey": "site_search_name_minimax",
    "host": "chat.minimax.io",
    "group": "ai"
  },
  "ds": {
    "name": "DeepSeek",
    "nameKey": "site_search_name_deepseek",
    "host": "chat.deepseek.com",
    "group": "ai"
  },
  "kimi": {
    "name": "Kimi",
    "nameKey": "site_search_name_kimi",
    "host": "kimi.com",
    "group": "ai"
  },
  "pplx": {
    "name": "Perplexity",
    "host": "perplexity.ai",
    "group": "ai"
  },
  "metaso": {
    "name": "Metaso AI Search",
    "nameKey": "site_search_name_metaso",
    "host": "metaso.cn",
    "group": "ai"
  },
  "felo": {
    "name": "Felo",
    "host": "felo.ai",
    "group": "ai"
  },
  "bd": {
    "name": "Baidu",
    "nameKey": "site_search_name_baidu",
    "host": "baidu.com",
    "group": "engine"
  },
  "bi": {
    "name": "Bing",
    "host": "bing.com",
    "group": "engine"
  },
  "gg": {
    "name": "Google",
    "host": "google.com",
    "group": "engine"
  },
  "kg": {
    "name": "Kagi",
    "host": "kagi.com",
    "group": "engine"
  },
  "ddg": {
    "name": "DuckDuckGo",
    "host": "duckduckgo.com",
    "group": "engine"
  },
  "br": {
    "name": "Brave Search",
    "host": "search.brave.com",
    "group": "engine"
  },
  "eco": {
    "name": "Ecosia",
    "host": "ecosia.org",
    "group": "engine"
  },
  "sg": {
    "name": "Sogou",
    "nameKey": "site_search_name_sogou",
    "host": "sogou.com",
    "group": "engine"
  },
  "yh": {
    "name": "Yahoo",
    "host": "search.yahoo.com",
    "group": "engine"
  },
  "yx": {
    "name": "Yandex",
    "host": "yandex.com",
    "group": "engine"
  },
  "sm": {
    "name": "Shenma",
    "nameKey": "site_search_name_shenma",
    "host": "m.sm.cn",
    "group": "engine"
  },
  "zh": {
    "name": "Zhihu",
    "nameKey": "site_search_name_zhihu",
    "host": "zhihu.com",
    "group": "site"
  },
  "db": {
    "name": "Douban",
    "nameKey": "site_search_name_douban",
    "host": "douban.com",
    "group": "site"
  },
  "jj": {
    "name": "Juejin",
    "nameKey": "site_search_name_juejin",
    "host": "juejin.cn",
    "group": "site"
  },
  "tb": {
    "name": "Taobao",
    "nameKey": "site_search_name_taobao",
    "host": "s.taobao.com",
    "group": "site"
  },
  "tm": {
    "name": "Tmall",
    "nameKey": "site_search_name_tmall",
    "host": "list.tmall.com",
    "group": "site"
  },
  "wx": {
    "name": "WeChat Official Accounts",
    "nameKey": "site_search_name_wechat",
    "host": "weixin.sogou.com",
    "group": "site"
  },
  "tw": {
    "name": "X",
    "host": "x.com",
    "group": "site"
  },
  "rd": {
    "name": "Reddit",
    "host": "reddit.com",
    "group": "site"
  },
  "wb": {
    "name": "Weibo",
    "nameKey": "site_search_name_weibo",
    "host": "s.weibo.com",
    "group": "site"
  },
  "xhs": {
    "name": "Xiaohongshu",
    "nameKey": "site_search_name_xiaohongshu",
    "host": "xiaohongshu.com",
    "group": "site"
  },
  "dy": {
    "name": "Douyin",
    "nameKey": "site_search_name_douyin",
    "host": "douyin.com",
    "group": "site"
  },
  "jd": {
    "name": "JD.com",
    "nameKey": "site_search_name_jd",
    "host": "search.jd.com",
    "group": "site"
  },
  "wk": {
    "name": "Wikipedia",
    "host": "en.wikipedia.org",
    "group": "site"
  },
  "zw": {
    "name": "Wikipedia",
    "nameKey": "site_search_name_wikipedia",
    "host": "zh.wikipedia.org",
    "group": "site"
  },
  "lm": {
    "name": "Lumno Help Center",
    "nameKey": "site_search_name_lumno_help",
    "host": "lumno.kubai.design",
    "group": "site"
  }
};

export const MODE_MENU_LINE_ICON_PATHS: Record<string, string[]> = {
  "bookmark": [
    "M18 7v14l-6-4l-6 4V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4"
  ],
  "browser": [
    "M4 8h16M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm4-2v4"
  ],
  "history": [
    "M12 8v4l2 2",
    "M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"
  ],
  "star": [
    "m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
  ]
};
