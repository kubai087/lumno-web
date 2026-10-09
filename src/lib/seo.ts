import { LOCALE_CONFIG, SUPPORTED_UI_LANGUAGES, type SupportedLocale } from "./locales";

export const SITE_URL = "https://lumno.kubai.design";
export const SITE_NAME = "Lumno";
export const SITE_TITLE = "Lumno | Focus Search, Browser Command Bar & Minimal New Tab";
export const SITE_LOGO_IMAGE = `${SITE_URL}/assets/logo@3x.png`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image-20260701.png`;
export const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/assets/og-image-twitter-20260701.png`;
export const DEFAULT_SOCIAL_SQUARE_IMAGE = `${SITE_URL}/assets/og-image-square-20260701.png`;
export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/lumno-%E5%85%A8%E5%B1%80%E5%BF%AB%E6%8D%B7%E5%91%BD%E4%BB%A4%E6%B5%AE%E5%B1%82/nggfkkbmogmadfoikakkfegkoilfcfao";
export const EDGE_STORE_URL = "https://microsoftedge.microsoft.com/addons/detail/pfbklkaefmfamjpibfiapaiihlddhchc";
// AMO picks the visitor's language when the path has no locale.
export const FIREFOX_STORE_URL = "https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/";
export const ORGANIZATION_ID = `${SITE_URL}#organization`;
export const WEBSITE_ID = `${SITE_URL}#website`;
export const APP_ID = `${SITE_URL}#app`;

export type HreflangLink = {
  hreflang: string;
  href: string;
};

const OG_LOCALE_BY_LOCALE: Partial<Record<string, string>> = Object.fromEntries(
  LOCALE_CONFIG.map((item) => [item.code, item.ogLocale]),
);

/** Languages the extension's own interface ships in (not the website's). */
const EXTENSION_UI_LANGUAGES = ["zh-CN", "zh-TW", "en", "ja"];

const CORE_KEYWORDS = [
  "Lumno",
  "浏览器命令栏",
  "浏览器快捷命令",
  "快捷命令浮层",
  "聚焦搜索",
  "浏览器搜索工具",
  "新标签页",
  "极简新标签页",
  "标签页搜索",
  "书签搜索",
  "历史记录搜索",
  "站内搜索",
  "Chrome 扩展",
  "Edge 扩展",
  "Dia 浏览器",
  "AI 搜索",
  "划词问 AI",
  "新标签页壁纸",
  "browser command bar",
  "browser command palette",
  "focus search",
  "new tab extension",
  "ask AI from command bar",
  "new tab wallpaper",
];

const EXTENDED_DISCOVERY_KEYWORDS = [
  "Arc 浏览器替代",
  "Arc 浏览器迁移",
  "Dia 浏览器搜索",
  "Chrome 标签页搜索",
  "Edge 标签页搜索",
  "书签搜索工具",
  "历史记录搜索工具",
  "浏览器效率扩展",
  "Chrome 效率插件",
  "Chrome 新标签页插件",
  "ChatGPT 快捷入口",
  "DeepSeek 快捷搜索",
  "拼音搜索标签页",
  "名画壁纸",
  "瀏覽器命令欄",
  "瀏覽器快捷命令",
  "聚焦搜尋",
  "分頁搜尋",
  "書籤搜尋",
  "歷史紀錄搜尋",
  "站內搜尋",
  "極簡新分頁",
  "AI 搜尋",
  "新分頁桌布",
  "arc browser alternative",
  "arc browser migration",
  "arc style command bar",
  "arc inspired browser search",
  "command palette browser extension",
  "global browser search",
  "tab manager extension",
  "bookmark manager search",
  "history search extension",
  "site search shortcut",
  "Chrome command palette",
  "Edge command bar extension",
  "Dia browser extension",
  "minimal browser new tab",
  "open source Chrome extension",
  "ChatGPT shortcut extension",
  "ask AI about selected text",
  "Chrome new tab wallpaper",
  "Bing wallpaper new tab",
  "Spotlight for Chrome",
  "privacy friendly Chrome extension",
];

const PRODUCT_ALTERNATE_NAMES = [
  "Lumno Browser Command Bar",
  "Lumno Focus Search",
  "Lumno New Tab",
  "Lumno Extension",
  "Lumno Chrome Extension",
  "Lumno 浏览器命令栏",
  "Lumno 聚焦搜索",
  "Lumno 快捷命令浮层",
  "Lumno 極簡新分頁",
  "Lumno ブラウザコマンドバー",
  "Lumno 브라우저 커맨드 바",
  "Lumno Befehlsleiste für den Browser",
  "Lumno barre de commande pour navigateur",
  "Lumno barra de comandos para el navegador",
  "Lumno barra de comandos para navegador",
  "Lumno командная панель для браузера",
];

/*
 * The same search intents in each newer language (AGENTS.md): command bar, focus
 * search, tab/bookmark/history/site search, minimalist new tab, Arc alternatives.
 */
const LOCALIZED_KEYWORDS: Partial<Record<SupportedLocale, string[]>> = {
  ja: [
    "ブラウザ コマンドバー",
    "コマンドパレット 拡張機能",
    "タブ検索",
    "ブックマーク検索",
    "履歴検索",
    "サイト内検索",
    "新しいタブ 拡張機能",
    "シンプル 新しいタブ",
    "Arc 代替",
    "Arc ブラウザ 移行",
    "Chrome 拡張機能 おすすめ",
    "選択テキスト AI 質問",
    "新しいタブ 壁紙",
  ],
  ko: [
    "브라우저 커맨드 바",
    "커맨드 팔레트 확장 프로그램",
    "탭 검색",
    "북마크 검색",
    "방문 기록 검색",
    "사이트 내 검색",
    "새 탭 확장 프로그램",
    "미니멀 새 탭",
    "Arc 대안",
    "Arc 브라우저 대체",
    "크롬 확장 프로그램 추천",
    "선택한 텍스트 AI 질문",
    "새 탭 배경화면",
  ],
  de: [
    "Befehlsleiste Browser",
    "Command Palette Chrome-Erweiterung",
    "Tabs durchsuchen",
    "Lesezeichen durchsuchen",
    "Verlauf durchsuchen",
    "Seitensuche",
    "Neuer Tab Erweiterung",
    "minimalistischer neuer Tab",
    "Arc Alternative",
    "Arc Browser Alternative",
    "KI fragen Chrome-Erweiterung",
    "neuer Tab Hintergrundbild",
  ],
  fr: [
    "barre de commande navigateur",
    "palette de commandes extension Chrome",
    "recherche d’onglets",
    "recherche de favoris",
    "recherche dans l’historique",
    "recherche sur un site",
    "extension nouvel onglet",
    "nouvel onglet minimaliste",
    "alternative à Arc",
    "alternative Arc Browser",
    "demander à l’IA extension Chrome",
    "nouvel onglet fond d’écran",
  ],
  es: [
    "barra de comandos navegador",
    "paleta de comandos extensión Chrome",
    "buscar pestañas",
    "buscar marcadores",
    "buscar en el historial",
    "búsqueda en sitios",
    "extensión nueva pestaña",
    "nueva pestaña minimalista",
    "alternativa a Arc",
    "alternativa a Arc Browser",
    "preguntar a la IA extensión Chrome",
    "nueva pestaña con fondos de pantalla",
  ],
  "pt-BR": [
    "barra de comandos navegador",
    "paleta de comandos extensão Chrome",
    "pesquisar abas",
    "pesquisar favoritos",
    "pesquisar histórico",
    "pesquisa em sites",
    "extensão nova aba",
    "nova aba minimalista",
    "alternativa ao Arc",
    "alternativa ao Arc Browser",
    "perguntar à IA extensão Chrome",
    "nova aba com papel de parede",
  ],
  ru: [
    "командная панель браузера",
    "палитра команд расширение Chrome",
    "поиск по вкладкам",
    "поиск по закладкам",
    "поиск по истории",
    "поиск по сайту",
    "расширение новая вкладка",
    "минималистичная новая вкладка",
    "альтернатива Arc",
    "аналог Arc Browser",
    "спросить ИИ расширение Chrome",
    "обои для новой вкладки",
  ],
};

export function buildAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function buildAlternateLinks(
  routeLanguageMap: Record<string, string>,
  xDefaultPath: string,
): HreflangLink[] {
  return [
    ...Object.entries(routeLanguageMap).map(([hreflang, href]) => ({
      hreflang,
      href: buildAbsoluteUrl(href),
    })),
    {
      hreflang: "x-default",
      href: buildAbsoluteUrl(xDefaultPath),
    },
  ];
}

export function getOpenGraphLocale(locale: string): string {
  return OG_LOCALE_BY_LOCALE[locale] || "en_US";
}

export function buildKeywords(extra: string[] = [], locale?: SupportedLocale): string[] {
  const localized = (locale && LOCALIZED_KEYWORDS[locale]) || [];
  return Array.from(new Set([...localized, ...CORE_KEYWORDS, ...EXTENDED_DISCOVERY_KEYWORDS, ...extra]));
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO_IMAGE,
    knowsLanguage: SUPPORTED_UI_LANGUAGES,
    sameAs: [
      "https://github.com/kubai087/lumno-extension",
      "https://x.com/Kubai087",
      CHROME_STORE_URL,
      EDGE_STORE_URL,
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: PRODUCT_ALTERNATE_NAMES,
    url: SITE_URL,
    inLanguage: SUPPORTED_UI_LANGUAGES,
    publisher: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function buildSoftwareApplicationSchema({
  description,
  version,
  rating,
  firefoxListed = false,
}: {
  description: string;
  version?: string;
  /** Chrome Web Store rating; only pass it where the page shows it. */
  rating?: { value: number; count: number };
  /** Whether Firefox Add-ons lists Lumno yet. */
  firefoxListed?: boolean;
}) {
  const browsers = firefoxListed
    ? "Chrome, Edge, Dia, Chromium-based browsers, and Firefox"
    : "Chrome, Edge, Dia, and Chromium-based browsers";
  const storeUrls = firefoxListed
    ? [CHROME_STORE_URL, EDGE_STORE_URL, FIREFOX_STORE_URL]
    : [CHROME_STORE_URL, EDGE_STORE_URL];
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: SITE_NAME,
    applicationCategory: "BrowserApplication",
    operatingSystem: browsers,
    browserRequirements: browsers,
    isAccessibleForFree: true,
    alternateName: PRODUCT_ALTERNATE_NAMES,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description,
    keywords: buildKeywords(),
    image: DEFAULT_OG_IMAGE,
    url: SITE_URL,
    downloadUrl: storeUrls,
    installUrl: CHROME_STORE_URL,
    sameAs: [...storeUrls, "https://github.com/kubai087/lumno-extension"],
    aggregateRating:
      rating && rating.count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            ratingCount: rating.count,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    softwareVersion: version || undefined,
    availableLanguage: EXTENSION_UI_LANGUAGES,
    audience: {
      "@type": "Audience",
      audienceType: [
        "Browser power users",
        "Researchers",
        "Developers",
        "Designers",
        "Students",
        "Arc migration users",
      ],
    },
    featureList: [
      "Open a browser command bar from any page",
      "Run tab search, bookmark search, and history search in one focus search surface",
      "Use built-in site engines to start site search instantly with Tab",
      "Keep a minimalist new tab with bookmarks and useful page cards",
      "Ask ChatGPT, Gemini, DeepSeek, and other AI sites straight from the command bar",
      "Select text on any page and ask AI in a background tab",
      "New tab wallpapers: classic paintings, Bing's photo of the day, and landscapes",
      "Searches tabs, bookmarks, and history locally without collecting usage data",
      firefoxListed
        ? "Works on Chrome, Edge, Dia, other Chromium-based browsers, and Firefox"
        : "Works on Chrome, Edge, Dia, and other Chromium-based browsers",
      "Preserve an Arc-style command bar workflow after moving to Dia, Chrome, or Edge",
    ],
    author: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function buildWebPageSchema({
  name,
  description,
  path,
  language,
  mainEntity,
}: {
  name: string;
  description: string;
  path: string;
  language?: string;
  mainEntity?: Record<string, unknown> | Array<Record<string, unknown>>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${new URL(path, SITE_URL).toString()}#webpage`,
    name,
    description,
    keywords: buildKeywords(),
    url: new URL(path, SITE_URL).toString(),
    inLanguage: language || SUPPORTED_UI_LANGUAGES,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": APP_ID,
    },
    mainEntity: mainEntity || undefined,
  };
}

export function buildFAQPageSchema({
  items,
  language,
}: {
  items: Array<{
    question: string;
    answer: string;
  }>;
  language?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: language,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildItemListSchema({
  name,
  description,
  path,
  language,
  items,
}: {
  name: string;
  description?: string;
  path: string;
  language?: string;
  items: Array<{
    name: string;
    description?: string;
    url?: string;
    type?: string;
    datePublished?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    inLanguage: language,
    url: buildAbsoluteUrl(path),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": item.type || "Thing",
        name: item.name,
        description: item.description || undefined,
        url: item.url ? buildAbsoluteUrl(item.url) : undefined,
        datePublished: item.datePublished || undefined,
      },
    })),
  };
}

export function buildBreadcrumbListSchema({
  items,
}: {
  items: Array<{
    name: string;
    path: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}
