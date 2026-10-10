import { LOCALE_CONFIG, buildLocalizedPath, type SupportedLocale } from "./locales";
import guideBanners from "../content/guides/banners.json";
import guideScreenshots from "../content/guides/screenshots.json";
import zhCN from "../content/guides/zh-CN";

/**
 * The help center (/guides/): a small wiki of answer-shaped pages for people,
 * search and AI answer engines. Page text lives in src/content/guides/<locale>.ts
 * and bodies in <slug>.md (zh-CN) or <slug>.<locale>.md. Screenshots are real
 * captures of the extension in that locale's UI (scripts/guide-screenshots), so
 * a language ships only where the extension itself speaks it.
 */
export const GUIDE_LOCALES = ["zh-CN"] as const satisfies readonly SupportedLocale[];
export type GuideLocale = (typeof GUIDE_LOCALES)[number];

/**
 * The sidebar, in reading order. "Quick start" follows what someone does after
 * installing: set it up, use the command bar, then the new tab, then scenarios.
 */
export const GUIDE_NAV = [
  { id: "about", sections: [{ slugs: ["what-is-lumno", "limitations", "use-cases"] }] },
  {
    id: "quickstart",
    sections: [
      { id: "setup", slugs: ["install", "keyboard-shortcuts", "sync"] },
      { id: "command-bar", slugs: ["search-tabs-bookmarks-history", "site-search", "tab-switcher"] },
      {
        id: "new-tab",
        slugs: ["newtab-wallpaper", "newtab-bookmarks-shortcuts", "newtab-frequent-sites", "newtab-clock-zen"],
      },
      { id: "scenarios", slugs: ["arc-command-bar"] },
    ],
  },
  {
    id: "trust",
    // "privacy" is the privacy policy itself, kept at /privacy/ and shown in this layout.
    sections: [{ slugs: ["browser-compatibility", "privacy-data", "privacy", "security-open-source", "ratings-reviews"] }],
  },
] as const;

export type GuideGroupId = (typeof GUIDE_NAV)[number]["id"];
type GuideSection = (typeof GUIDE_NAV)[number]["sections"][number];
export type GuideSectionId = Extract<GuideSection, { id: string }>["id"];
/** Everything in the sidebar: the help pages plus the privacy policy. */
export type GuideNavKey = GuideSection["slugs"][number];
export type GuideSlug = Exclude<GuideNavKey, "privacy">;

export const GUIDE_NAV_KEYS: GuideNavKey[] = GUIDE_NAV.flatMap((group) => group.sections.flatMap((section) => [...section.slugs]));
export const GUIDE_SLUGS: GuideSlug[] = GUIDE_NAV_KEYS.filter((key): key is GuideSlug => key !== "privacy");

/** When the pages were last checked against the extension. */
export const GUIDES_LAST_UPDATED = "2026-10-10";
export const GUIDES_EXTENSION_VERSION = "0.9.61";

type GuideFaqItem = { question: string; answer: string };

type GuidePageContent = {
  /** SEO <title>; may differ from the on-page heading. */
  pageTitle: string;
  pageDescription: string;
  keywords: string[];
  title: string;
  /** Shorter label for the sidebar. */
  navTitle: string;
  faq?: GuideFaqItem[];
};

export type GuideLocaleContent = {
  ui: {
    navLabel: string;
    navTitle: string;
    groups: Record<GuideGroupId, string>;
    sections: Record<GuideSectionId, string>;
    navToggle: string;
    /** {date} is the formatted GUIDES_LAST_UPDATED. */
    updatedLabel: string;
    tocLabel: string;
    faqTitle: string;
    previousLabel: string;
    nextLabel: string;
    zoomLabel: string;
    closeLabel: string;
    privacyLabel: string;
    searchPlaceholder: string;
    searchLabel: string;
    searchEmpty: string;
  };
  pages: Record<GuideSlug, GuidePageContent>;
};

const CONTENT: Record<GuideLocale, GuideLocaleContent> = { "zh-CN": zhCN };

export function getGuideContent(locale: GuideLocale): GuideLocaleContent {
  return CONTENT[locale];
}

const GUIDE_SOURCES = import.meta.glob("../content/guides/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export function isGuideLocale(locale: SupportedLocale): locale is GuideLocale {
  return (GUIDE_LOCALES as readonly string[]).includes(locale);
}

export function getGuideSource(slug: GuideSlug, locale: GuideLocale): string {
  const file = locale === "zh-CN" ? `${slug}.md` : `${slug}.${locale}.md`;
  const source = GUIDE_SOURCES[`../content/guides/${file}`];
  if (!source) throw new Error(`Missing guide source: src/content/guides/${file}`);
  return source;
}

/** A page's path; without a slug, the help center's first page (/guides/ only redirects there). */
export function getGuidePath(locale: SupportedLocale, slug: GuideNavKey = GUIDE_SLUGS[0]): string {
  return buildLocalizedPath(locale, slug === "privacy" ? "/privacy/" : `/guides/${slug}/`);
}

/** The sidebar label for any entry, the privacy policy included. */
export function getGuideNavTitle(locale: GuideLocale, key: GuideNavKey): string {
  const { ui, pages } = getGuideContent(locale);
  return key === "privacy" ? ui.privacyLabel : pages[key].navTitle;
}

/** Markdown reduced to plain text for the search index. */
export function toSearchText(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\{#[a-z0-9-]+\}/g, "")
    .replace(/^\s*\|?\s*:?-{3,}.*$/gm, "")
    .replace(/[`*_>#|]/g, " ")
    .replace(/^\s*(?:[-+]|\d+\.)\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * The language menu for a page: guide languages keep the page; the rest go to
 * their homepage, since the page has no version in that language.
 */
export function buildGuideRouteLanguageMap(slug: GuideSlug): Record<SupportedLocale, string> {
  return Object.fromEntries(
    LOCALE_CONFIG.map((item) => [
      item.code,
      isGuideLocale(item.code) ? getGuidePath(item.code, slug) : buildLocalizedPath(item.code, "/"),
    ]),
  ) as Record<SupportedLocale, string>;
}

/** Real screenshot dimensions, written by scripts/guide-screenshots/convert.mjs. */
export function getGuideScreenshot(locale: GuideLocale, name: string) {
  const size = (guideScreenshots as Record<string, number[]>)[`${locale}/${name}`];
  if (!size) throw new Error(`Missing guide screenshot: ${locale}/${name} (run scripts/guide-screenshots)`);
  return { src: `/assets/guides/${locale}/${name}.webp`, width: size[0], height: size[1] };
}

/** A page's banner, cropped from a built-in wallpaper (scripts/guide-screenshots/banners.mjs); `color` paints while it loads. */
export function getGuideBanner(key: GuideSlug | "privacy") {
  const banner = (guideBanners as Record<string, { width: number; height: number; color: string }>)[key];
  if (!banner) throw new Error(`Missing guide banner: ${key} (run scripts/guide-screenshots/banners.mjs)`);
  return { src: `/assets/guides/banners/${key}.webp`, ...banner };
}
