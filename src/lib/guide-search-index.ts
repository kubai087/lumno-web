import { getChromeStoreReviews } from "./chrome-store-reviews";
import {
  GUIDE_SLUGS,
  getGuideContent,
  getGuidePath,
  getGuideSource,
  toSearchText,
  type GuideLocale,
  type GuideNavKey,
} from "./guides";
import searchEn from "../content/guides/search/en";
import searchJa from "../content/guides/search/ja";
import searchZhCN from "../content/guides/search/zh-CN";
import searchZhTW from "../content/guides/search/zh-TW";
import synonymsEn from "../content/guides/search/synonyms/en";
import synonymsJa from "../content/guides/search/synonyms/ja";
import synonymsZhCN from "../content/guides/search/synonyms/zh-CN";
import synonymsZhTW from "../content/guides/search/synonyms/zh-TW";
import { PRIVACY_SECTION_IDS, getPrivacyContent } from "./privacy-content";

type SearchSection = { id: string; title: string; aliases?: string[] };
type SearchDoc = { title: string; href: string; aliases?: string[]; sections: SearchSection[]; text: string };

/**
 * How people phrase a page or one of its sections when they search (热键, 收藏夹, "快捷键没反应"…). Never shown on
 * the page; they only reach search-index.json, where they match like a heading (see src/scripts/help-center-search.js,
 * which the help search box and the extension's "Lumno 帮助中心" site search both run). Keyed by page, then by section
 * anchor; "" is the page as a whole. Words that mean the same thing everywhere belong in the synonym list instead
 * (search/synonyms/<locale>.ts). The extension reads the zh-CN, zh-TW, ja and en indexes, so only those carry them.
 */
export type GuideSearchAliases = Partial<Record<GuideNavKey, Record<string, string[]>>>;
const SEARCH_ALIASES: Partial<Record<GuideLocale, GuideSearchAliases>> = {
  "zh-CN": searchZhCN,
  "zh-TW": searchZhTW,
  ja: searchJa,
  en: searchEn,
};

/** Groups of words that mean the same thing to a reader; the search tries each word of a group in place of the others. */
export type GuideSearchSynonyms = string[][];
const SEARCH_SYNONYMS: Partial<Record<GuideLocale, GuideSearchSynonyms>> = {
  "zh-CN": synonymsZhCN,
  "zh-TW": synonymsZhTW,
  ja: synonymsJa,
  en: synonymsEn,
};

export function buildGuideSearchSynonyms(locale: GuideLocale): GuideSearchSynonyms {
  return SEARCH_SYNONYMS[locale] || [];
}

/** Puts a page's aliases on the sections they belong to, and the page-wide ones on the page. */
function withAliases(key: GuideNavKey, locale: GuideLocale, sections: SearchSection[]): Pick<SearchDoc, "aliases" | "sections"> {
  const aliases = SEARCH_ALIASES[locale]?.[key] || {};
  for (const id of Object.keys(aliases)) {
    if (id && !sections.some((section) => section.id === id)) throw new Error(`Search aliases for ${locale}/${key} point at #${id}, which the page doesn't have`);
  }
  return {
    ...(aliases[""]?.length ? { aliases: aliases[""] } : {}),
    sections: sections.map((section) => (aliases[section.id]?.length ? { ...section, aliases: aliases[section.id] } : section)),
  };
}

/** The help center's search index: every page and the privacy policy, as plain text. */
export async function buildGuideSearchIndex(locale: GuideLocale): Promise<SearchDoc[]> {
  const { ui, pages } = getGuideContent(locale);
  const reviews = await getChromeStoreReviews();
  const facts: Record<string, string> = {
    chromeRating: reviews.averageRating.toFixed(1),
    chromeRatingCount: String(reviews.ratingCount),
  };
  const docs: SearchDoc[] = GUIDE_SLUGS.map((slug) => {
    const source = getGuideSource(slug, locale).replace(/\{\{(\w+)\}\}/g, (_token, name) => facts[name] ?? "");
    const sections = [...source.matchAll(/^## (.+?)\s*\{#([a-z0-9-]+)\}$/gm)].map(([, title, id]) => ({
      id,
      title: toSearchText(title),
    }));
    const faq = (pages[slug].faq || []).map((item) => `${item.question} ${item.answer}`).join(" ");
    return {
      title: pages[slug].title,
      href: getGuidePath(locale, slug),
      ...withAliases(slug, locale, faq ? [...sections, { id: "faq", title: ui.faqTitle }] : sections),
      text: `${toSearchText(source)} ${faq}`.trim(),
    };
  });

  const privacy = getPrivacyContent(locale);
  const privacyTitles = [...privacy.policySource.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].replace(/^\d+\.\s*/, "").trim());
  docs.push({
    title: ui.privacyLabel,
    href: getGuidePath(locale, "privacy"),
    ...withAliases(
      "privacy",
      locale,
      [
        { id: "summary", title: privacy.summarySource.match(/^##\s+(.+)$/m)?.[1].trim() || "" },
        ...PRIVACY_SECTION_IDS.map((id, index) => ({ id, title: privacyTitles[index] || "" })),
      ],
    ),
    text: toSearchText(`${privacy.summarySource}\n${privacy.policySource}`),
  });
  return docs;
}
