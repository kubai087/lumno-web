import { DEFAULT_LOCALE, LOCALE_CONFIG, SUPPORTED_UI_LANGUAGES, type SupportedLocale } from "./locales";

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

/*
 * The site's search intents in each language (AGENTS.md): command bar, focus
 * search, tab/bookmark/history/site search, minimalist new tab, Arc alternatives.
 * One language per page and about ten terms each: a long mixed-language list
 * reads as keyword stuffing to the engines that still read the tag (Bing, Baidu).
 */
const LOCALE_KEYWORDS: Record<SupportedLocale, string[]> = {
  "zh-CN": ["Lumno", "浏览器命令栏", "聚焦搜索", "标签页搜索", "书签搜索", "历史记录搜索", "站内搜索", "极简新标签页", "Arc 浏览器替代", "Chrome 扩展"],
  "zh-TW": ["Lumno", "瀏覽器命令列", "聚焦搜尋", "分頁搜尋", "書籤搜尋", "歷史紀錄搜尋", "站內搜尋", "極簡新分頁", "Arc 瀏覽器替代", "Chrome 擴充功能"],
  en: ["Lumno", "browser command bar", "focus search", "tab search", "bookmark search", "history search", "site search", "minimal new tab", "Arc browser alternative", "Chrome extension"],
  ja: ["Lumno", "ブラウザ コマンドバー", "コマンドパレット 拡張機能", "タブ検索", "ブックマーク検索", "履歴検索", "サイト内検索", "シンプル 新しいタブ", "Arc 代替", "Chrome 拡張機能"],
  ko: ["Lumno", "브라우저 커맨드 바", "커맨드 팔레트 확장 프로그램", "탭 검색", "북마크 검색", "방문 기록 검색", "사이트 내 검색", "미니멀 새 탭", "Arc 대안", "크롬 확장 프로그램"],
  de: ["Lumno", "Befehlsleiste Browser", "Command Palette Chrome-Erweiterung", "Tabs durchsuchen", "Lesezeichen durchsuchen", "Verlauf durchsuchen", "Seitensuche", "minimalistischer neuer Tab", "Arc Alternative", "Chrome-Erweiterung"],
  fr: ["Lumno", "barre de commande navigateur", "palette de commandes extension Chrome", "recherche d’onglets", "recherche de favoris", "recherche dans l’historique", "recherche sur un site", "nouvel onglet minimaliste", "alternative à Arc", "extension Chrome"],
  es: ["Lumno", "barra de comandos navegador", "paleta de comandos extensión Chrome", "buscar pestañas", "buscar marcadores", "buscar en el historial", "búsqueda en sitios", "nueva pestaña minimalista", "alternativa a Arc", "extensión de Chrome"],
  "pt-BR": ["Lumno", "barra de comandos navegador", "paleta de comandos extensão Chrome", "pesquisar abas", "pesquisar favoritos", "pesquisar histórico", "pesquisa em sites", "nova aba minimalista", "alternativa ao Arc", "extensão do Chrome"],
  ru: ["Lumno", "командная панель браузера", "палитра команд расширение Chrome", "поиск по вкладкам", "поиск по закладкам", "поиск по истории", "поиск по сайту", "минималистичная новая вкладка", "альтернатива Arc", "расширение Chrome"],
};

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

/** The site's keywords in one language: the homepage's, and the schema's. */
export function buildKeywords(locale: SupportedLocale = DEFAULT_LOCALE): string[] {
  return LOCALE_KEYWORDS[locale];
}

/** A page's own keywords, in the page's language, after the brand. */
export function buildPageKeywords(keywords: string[]): string[] {
  return Array.from(new Set([SITE_NAME, ...keywords]));
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
  language,
  version,
  rating,
  firefoxListed = false,
}: {
  description: string;
  /** The language of `description`; the keywords follow it. */
  language?: SupportedLocale;
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
    // A browser extension runs wherever its browser does; the browsers themselves go in browserRequirements.
    operatingSystem: "Windows, macOS, Linux, ChromeOS",
    browserRequirements: browsers,
    isAccessibleForFree: true,
    alternateName: PRODUCT_ALTERNATE_NAMES,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description,
    keywords: buildKeywords(language),
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
  language?: SupportedLocale;
  mainEntity?: Record<string, unknown> | Array<Record<string, unknown>>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${new URL(path, SITE_URL).toString()}#webpage`,
    name,
    description,
    keywords: buildKeywords(language),
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

/** A how-to guide about Lumno, with its real screenshots as images. */
export function buildTechArticleSchema({
  headline,
  description,
  path,
  language,
  images,
  dateModified,
  version,
}: {
  headline: string;
  description: string;
  path: string;
  language: string;
  images: string[];
  dateModified: string;
  version: string;
}) {
  const url = buildAbsoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: language,
    image: images.map((image) => buildAbsoluteUrl(image)),
    dateModified,
    proficiencyLevel: "Beginner",
    dependencies: `Lumno ${version}`,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    about: { "@id": APP_ID },
    isPartOf: { "@id": WEBSITE_ID },
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
