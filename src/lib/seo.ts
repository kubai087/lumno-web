import { SUPPORTED_UI_LANGUAGES } from "./locales";

export const SITE_URL = "https://lumno.kubai.design";
export const SITE_NAME = "Lumno";
export const SITE_TITLE = "Lumno | Focus Search, Browser Command Bar & Minimal New Tab";
export const SITE_LOGO_IMAGE = `${SITE_URL}/assets/logo@3x.png`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image-20260701.png`;
export const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/assets/og-image-twitter-20260701.png`;
export const DEFAULT_SOCIAL_SQUARE_IMAGE = `${SITE_URL}/assets/og-image-square-20260701.png`;
export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/lumno-%E5%85%A8%E5%B1%80%E5%BF%AB%E6%8D%B7%E5%91%BD%E4%BB%A4%E6%B5%AE%E5%B1%82/nggfkkbmogmadfoikakkfegkoilfcfao";
export const ORGANIZATION_ID = `${SITE_URL}#organization`;
export const WEBSITE_ID = `${SITE_URL}#website`;
export const APP_ID = `${SITE_URL}#app`;

export type HreflangLink = {
  hreflang: string;
  href: string;
};

const OG_LOCALE_BY_LOCALE: Partial<Record<string, string>> = {
  "zh-CN": "zh_CN",
  "zh-TW": "zh_TW",
  en: "en_US",
};

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
  "browser command bar",
  "browser command palette",
  "focus search",
  "new tab extension",
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
  "瀏覽器命令欄",
  "瀏覽器快捷命令",
  "聚焦搜尋",
  "分頁搜尋",
  "書籤搜尋",
  "歷史紀錄搜尋",
  "站內搜尋",
  "極簡新分頁",
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
];

const PRODUCT_ALTERNATE_NAMES = [
  "Lumno Browser Command Bar",
  "Lumno Focus Search",
  "Lumno New Tab",
  "Lumno 浏览器命令栏",
  "Lumno 聚焦搜索",
  "Lumno 快捷命令浮层",
  "Lumno 極簡新分頁",
  "Lumno browser befehlsleiste",
  "Lumno barre de commande navigateur",
  "Lumno barra de comandos del navegador",
  "Lumno ブラウザ コマンドバー",
  "Lumno 브라우저 커맨드바",
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

export function buildKeywords(extra: string[] = []): string[] {
  return Array.from(new Set([...CORE_KEYWORDS, ...EXTENDED_DISCOVERY_KEYWORDS, ...extra]));
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
}: {
  description: string;
  version?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: SITE_NAME,
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome, Edge, Dia, and Chromium-based browsers",
    browserRequirements: "Chrome, Edge, Dia, and Chromium-based browsers",
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
    downloadUrl: CHROME_STORE_URL,
    sameAs: [CHROME_STORE_URL, "https://github.com/kubai087/lumno-extension"],
    softwareVersion: version || undefined,
    availableLanguage: SUPPORTED_UI_LANGUAGES,
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
      "Works on Chrome, Edge, Dia, and other Chromium-based browsers",
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

export function buildHowToSchema({
  name,
  description,
  path,
  language,
  steps,
}: {
  name: string;
  description: string;
  path: string;
  language?: string;
  steps: Array<{
    name: string;
    text: string;
    anchor?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    inLanguage: language,
    url: buildAbsoluteUrl(path),
    tool: [
      {
        "@type": "HowToTool",
        name: "Chromium extension shortcut settings",
      },
    ],
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.anchor ? buildAbsoluteUrl(`${path}${step.anchor}`) : undefined,
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
