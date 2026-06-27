import { SUPPORTED_UI_LANGUAGES } from "./locales";

export const SITE_URL = "https://lumno.kubai.design";
export const SITE_NAME = "Lumno";
export const SITE_TITLE = "Lumno | Focus Search, Browser Command Bar & Minimal New Tab";
export const SITE_LOGO_IMAGE = `${SITE_URL}/assets/logo@3x.png`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image.png`;
export const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/assets/og-image-twitter.png`;
export const DEFAULT_SOCIAL_SQUARE_IMAGE = `${SITE_URL}/assets/og-image-square.png`;
export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/lumno-%E5%85%A8%E5%B1%80%E5%BF%AB%E6%8D%B7%E5%91%BD%E4%BB%A4%E6%B5%AE%E5%B1%82/nggfkkbmogmadfoikakkfegkoilfcfao";
export const ORGANIZATION_ID = `${SITE_URL}#organization`;
export const WEBSITE_ID = `${SITE_URL}#website`;
export const APP_ID = `${SITE_URL}#app`;

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
  "arc browser alternative",
  "arc browser migration",
  "arc style command bar",
  "arc inspired browser search",
  "command palette browser extension",
  "global browser search",
  "tab manager extension",
  "bookmark manager search",
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
    featureList: [
      "Search tabs, bookmarks, history, and frequently visited pages",
      "Use built-in site engines to start site search instantly with Tab",
      "Keep a minimalist new tab with bookmarks and useful page cards",
      "Works on Chrome, Edge, Dia, and other Chromium-based browsers",
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
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${new URL(path, SITE_URL).toString()}#webpage`,
    name,
    description,
    keywords: buildKeywords(),
    url: new URL(path, SITE_URL).toString(),
    inLanguage: SUPPORTED_UI_LANGUAGES,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": APP_ID,
    },
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
