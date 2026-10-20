import { LOCALE_CONFIG, buildLocalizedPath, getExtensionLocale, type SupportedLocale } from "./locales";
import guideBanners from "../content/guides/banners.json";
import guideScreenshots from "../content/guides/screenshots.json";
import de from "../content/guides/de";
import en from "../content/guides/en";
import es from "../content/guides/es";
import fr from "../content/guides/fr";
import ja from "../content/guides/ja";
import ko from "../content/guides/ko";
import ptBR from "../content/guides/pt-BR";
import ru from "../content/guides/ru";
import zhCN from "../content/guides/zh-CN";
import zhTW from "../content/guides/zh-TW";

/**
 * The help center (/help/): a small wiki of answer-shaped pages for people,
 * search and AI answer engines. Page text lives in src/content/guides/<locale>.ts
 * and bodies in <slug>.md (zh-CN) or <slug>.<locale>.md, in every site language.
 * Screenshots are real captures of the extension (scripts/guide-screenshots) in
 * the language it shows that reader; see getGuideScreenshot.
 */
export const GUIDE_LOCALES = ["zh-CN", "zh-TW", "en", "ja", "ko", "de", "fr", "es", "pt-BR", "ru"] as const satisfies readonly SupportedLocale[];
export type GuideLocale = (typeof GUIDE_LOCALES)[number];

/**
 * The sidebar, in reading order. "Quick start" follows what someone does after
 * installing: set it up, use the command bar, then the new tab, then scenarios.
 */
export const GUIDE_NAV = [
  { id: "about", sections: [{ slugs: ["what-is-lumno", "limitations", "use-cases", "faq"] }] },
  {
    id: "quickstart",
    sections: [
      { id: "setup", slugs: ["install", "keyboard-shortcuts", "sync"] },
      { id: "command-bar", slugs: ["search-tabs-bookmarks-history", "site-search", "tab-switcher"] },
      {
        id: "new-tab",
        slugs: [
          "newtab-wallpaper",
          "newtab-bookmarks-shortcuts",
          "newtab-frequent-sites",
          "newtab-clock-zen",
          "newtab-other-extensions",
        ],
      },
      { id: "more", slugs: ["selection-actions", "web-clip", "auto-pip"] },
      { id: "scenarios", slugs: ["arc-command-bar"] },
    ],
  },
  {
    id: "trust",
    // "privacy" is the privacy policy itself, kept at /privacy/ and shown in this layout. Its plain-language
    // summary replaced the old "privacy-data" page, whose addresses redirect there (astro.config.mjs).
    sections: [{ slugs: ["browser-compatibility", "privacy", "security-open-source", "ratings-reviews"] }],
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
export const GUIDES_LAST_UPDATED = "2026-10-21";
export const GUIDES_EXTENSION_VERSION = "1.1.4";

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
    /** The first page's left card, back to the website. */
    homeCardLabel: string;
    homeCardTitle: string;
    zoomLabel: string;
    closeLabel: string;
    privacyLabel: string;
    searchPlaceholder: string;
    searchLabel: string;
    /** No results: the heading over the ways to ask the developer instead. */
    searchEmpty: string;
    /** Over the close pages that follow the exact matches. */
    searchRecommended: string;
    /** The ways to ask when nothing matches: the WeChat group (Chinese only), a GitHub issue, the author on X. */
    searchFeedbackGroup: string;
    searchFeedbackIssue: string;
    searchFeedbackAuthor: string;
    /** Above the pager: where to go when the page didn't answer it (the community panel's channels). */
    stuckText: string;
    /** Its two buttons: the group and GitHub in Chinese, GitHub and X elsewhere. */
    stuckPrimary: string;
    stuckSecondary: string;
  };
  pages: Record<GuideSlug, GuidePageContent>;
};

const CONTENT: Record<GuideLocale, GuideLocaleContent> = { "zh-CN": zhCN, "zh-TW": zhTW, en, ja, ko, de, fr, es, "pt-BR": ptBR, ru };

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

/** A page's path; without a slug, the help center's first page (/help/ only redirects there). */
export function getGuidePath(locale: SupportedLocale, slug: GuideNavKey = GUIDE_SLUGS[0]): string {
  return buildLocalizedPath(locale, slug === "privacy" ? "/privacy/" : `/help/${slug}/`);
}

/** The sidebar label for any entry, the privacy policy included. */
export function getGuideNavTitle(locale: GuideLocale, key: GuideNavKey): string {
  const { ui, pages } = getGuideContent(locale);
  return key === "privacy" ? ui.privacyLabel : pages[key].navTitle;
}

// `⌃ ⇧ K | Alt K`: a key for each platform (GuideArticle); one copy when both are the same.
export const withPlatformKeys = (markdown: string) =>
  markdown.replace(/`([^`|]+) \| ([^`|]+)`/g, (_, mac, other) => (mac === other ? mac : `${mac} / ${other}`));

/** Markdown reduced to plain text for the search index. */
export function toSearchText(markdown: string): string {
  return withPlatformKeys(markdown)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\{#[a-z0-9-]+\}/g, "")
    // Bold, italics and code drop their marks without leaving a gap (服务，**不经过**。 → 服务，不经过。).
    .replace(/(\*\*|__|\*|`)(\S(?:.*?\S)?)\1/g, "$2")
    .replace(/^\s*\|?\s*:?-{3,}.*$/gm, "")
    .replace(/[`*_>#|]/g, " ")
    .replace(/^\s*(?:[-+]|\d+\.)\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Markdown reduced to the search index's page text, one line per block, so a search result's hover card can
 * lay a passage out as the page does. Leading tabs say what a line is: one for a heading, two for a bullet,
 * three for a table row, whose cells are split by tabs; numbered steps keep their "1. ". Older copies of the
 * help search read the text as one run and see the tabs and line breaks as spaces.
 */
export function toSearchBlocks(markdown: string): string {
  const lines: string[] = [];
  let paragraph: string[] = [];
  const push = (prefix: string, text: string) => {
    const value = toSearchText(text);
    if (value) lines.push(`${prefix}${value}`);
  };
  const flush = () => {
    push("", paragraph.join(" "));
    paragraph = [];
  };
  for (const raw of withPlatformKeys(markdown).split("\n")) {
    const line = raw.trim();
    let match: RegExpMatchArray | null;
    if (!line || /^!\[[^\]]*\]\([^)]*\)$/.test(line)) {
      flush();
    } else if (/^\|?\s*:?-{3,}/.test(line)) {
      // A table's divider row.
    } else if ((match = line.match(/^#{1,6}\s+(.+)$/))) {
      flush();
      push("\t", match[1]);
    } else if ((match = line.match(/^[-+*]\s+(.+)$/))) {
      flush();
      push("\t\t", match[1]);
    } else if ((match = line.match(/^(\d+)\.\s+(.+)$/))) {
      flush();
      push(`${match[1]}. `, match[2]);
    } else if (line.startsWith("|")) {
      flush();
      const cells = line.replace(/^\||\|$/g, "").split("|").map((cell) => toSearchText(cell) || "—");
      lines.push(`\t\t\t${cells.join("\t")}`);
    } else {
      paragraph.push(line);
    }
  }
  flush();
  return lines.join("\n");
}

/** The language menu for a page: switching language keeps the reader on the same page. */
export function buildGuideRouteLanguageMap(slug: GuideSlug): Record<SupportedLocale, string> {
  return Object.fromEntries(LOCALE_CONFIG.map((item) => [item.code, getGuidePath(item.code, slug)])) as Record<
    SupportedLocale,
    string
  >;
}

/**
 * Real screenshot dimensions, written by scripts/guide-screenshots/convert.mjs.
 * Screenshots show the extension in the language it speaks to that reader, so
 * languages it doesn't ship (Korean, German…) use the English captures.
 */
export function getGuideScreenshot(locale: GuideLocale, name: string) {
  const shotLocale = getExtensionLocale(locale);
  const size = (guideScreenshots as Record<string, number[]>)[`${shotLocale}/${name}`];
  if (!size) throw new Error(`Missing guide screenshot: ${shotLocale}/${name} (run scripts/guide-screenshots)`);
  return { src: `/assets/guides/${shotLocale}/${name}.webp`, width: size[0], height: size[1] };
}

/** A page's banner, cropped from a built-in wallpaper (scripts/guide-screenshots/banners.mjs); `color` paints while it loads. */
export function getGuideBanner(key: GuideSlug | "privacy") {
  const banner = (guideBanners as Record<string, { width: number; height: number; color: string }>)[key];
  if (!banner) throw new Error(`Missing guide banner: ${key} (run scripts/guide-screenshots/banners.mjs)`);
  return { src: `/assets/guides/banners/${key}.webp`, ...banner };
}
