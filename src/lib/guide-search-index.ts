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
import { PRIVACY_SECTION_IDS, getPrivacyContent } from "./privacy-content";

type SearchDoc = { title: string; href: string; sections: Array<{ id: string; title: string }>; text: string };
type SearchSection = SearchDoc["sections"][number];

/**
 * Words people type that the pages don't use (热键, 收藏夹, 浮层, "hotkey"…), written as the questions they'd ask.
 * Never shown on the page; they only reach search-index.json, which the help search box and the extension's
 * "Lumno 帮助中心" site search both match by plain substring. Keyed by page, then by section anchor: phrases become
 * extra sections, so a hit scores like a heading, links to that anchor and shows the phrase. Phrases under "" are about
 * the whole page and point at its first section, just below the intro. The extension only reads the zh-CN, zh-TW, ja
 * and en indexes, so only those carry aliases.
 */
export type GuideSearchAliases = Partial<Record<GuideNavKey, Record<string, string[]>>>;
const SEARCH_ALIASES: Partial<Record<GuideLocale, GuideSearchAliases>> = {
  "zh-CN": searchZhCN,
  "zh-TW": searchZhTW,
  ja: searchJa,
  en: searchEn,
};

/** Appends a page's aliases after its real headings, so a heading still wins when both match. */
function withAliases(key: GuideNavKey, locale: GuideLocale, sections: SearchSection[], text: string): Pick<SearchDoc, "sections" | "text"> {
  const aliases = SEARCH_ALIASES[locale]?.[key] || {};
  for (const id of Object.keys(aliases)) {
    if (id && !sections.some((section) => section.id === id)) throw new Error(`Search aliases for ${locale}/${key} point at #${id}, which the page doesn't have`);
  }
  const extra = Object.entries(aliases).flatMap(([id, phrases]) => phrases.map((title) => ({ id: id || sections[0].id, title })));
  return { sections: [...sections, ...extra], text };
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
      ...withAliases(slug, locale, faq ? [...sections, { id: "faq", title: ui.faqTitle }] : sections, `${toSearchText(source)} ${faq}`.trim()),
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
      toSearchText(`${privacy.summarySource}\n${privacy.policySource}`),
    ),
  });
  return docs;
}
