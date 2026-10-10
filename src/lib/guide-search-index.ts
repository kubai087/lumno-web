import { getChromeStoreReviews } from "./chrome-store-reviews";
import {
  GUIDE_SLUGS,
  getGuideContent,
  getGuidePath,
  getGuideSource,
  toSearchText,
  type GuideLocale,
} from "./guides";
import { PRIVACY_SECTION_IDS, getPrivacyContent } from "./privacy-content";

type SearchDoc = { title: string; href: string; sections: Array<{ id: string; title: string }>; text: string };

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
      sections: faq ? [...sections, { id: "faq", title: ui.faqTitle }] : sections,
      text: `${toSearchText(source)} ${faq}`.trim(),
    };
  });

  const privacy = getPrivacyContent(locale);
  const privacyTitles = [...privacy.policySource.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].replace(/^\d+\.\s*/, "").trim());
  docs.push({
    title: ui.privacyLabel,
    href: getGuidePath(locale, "privacy"),
    sections: PRIVACY_SECTION_IDS.map((id, index) => ({ id, title: privacyTitles[index] || "" })),
    text: toSearchText(privacy.policySource),
  });
  return docs;
}
