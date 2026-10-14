import type { APIRoute } from "astro";
import { getChromeStoreReviews } from "../lib/chrome-store-reviews";
import { GUIDES_EXTENSION_VERSION, GUIDES_LAST_UPDATED, GUIDE_SLUGS, getGuideContent, getGuidePath, getGuideSource, withPlatformKeys } from "../lib/guides";
import { buildLocalizedPath } from "../lib/locales";
import { getPrivacyContent } from "../lib/privacy-content";
import { SITE_URL } from "../lib/seo";
import { getSiteStoreVersions } from "../lib/site-links";

/*
 * The English help center as one Markdown document (llmstxt.org's llms-full.txt),
 * so an answer engine can read every page in one fetch. Built from the same
 * sources as the pages: screenshots drop out, links become absolute.
 */
export const GET: APIRoute = async () => {
  const reviews = await getChromeStoreReviews();
  // Firefox is named only once Firefox Add-ons lists Lumno (as in llms.txt).
  const { firefox: firefoxStoreVersion } = await getSiteStoreVersions();
  const browsers = firefoxStoreVersion
    ? "Chrome, Edge, Dia, other Chromium-based browsers, and Firefox"
    : "Chrome, Edge, Dia and other Chromium-based browsers";
  const facts: Record<string, string> = {
    chromeRating: reviews.averageRating.toFixed(1),
    chromeRatingCount: String(reviews.ratingCount),
  };
  const { pages } = getGuideContent("en");

  const toDocument = (markdown: string, pageUrl: string) =>
    withPlatformKeys(markdown)
      .replace(/\{\{(\w+)\}\}/g, (token, name) => facts[name] ?? token)
      .replace(/^!\[[^\]]*\]\([^)]*\)\s*$/gm, "")
      .replace(/\s*\{#[a-z0-9-]+\}/g, "")
      // Page headings become level 1, so a page's own ## and ### move down one.
      .replace(/^(#{2,5}) /gm, "#$1 ")
      .replace(/\]\((\.\.\/[^)]+|\/[^)]*|#[^)]*)\)/g, (_, href: string) => `](${new URL(href, pageUrl).toString()})`)
      .replace(/\n{3,}/g, "\n\n")
      .trim();

  const guides = GUIDE_SLUGS.map((slug) => {
    const page = pages[slug];
    const url = `${SITE_URL}${getGuidePath("en", slug)}`;
    const faq = (page.faq || []).map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n");
    return [`# ${page.title}`, `URL: ${url}`, toDocument(getGuideSource(slug, "en"), url), faq && `## FAQ\n\n${faq}`]
      .filter(Boolean)
      .join("\n\n");
  });
  const privacyUrl = `${SITE_URL}${buildLocalizedPath("en", "/privacy/")}`;
  const privacy = [`# Privacy`, `URL: ${privacyUrl}`, toDocument(getPrivacyContent("en").summarySource, privacyUrl)].join("\n\n");

  const body = `# Lumno Help Center

> Lumno is an open-source browser command bar, focus search and minimalist new tab extension for ${browsers}. This is every page of its help center in English, checked against Lumno ${GUIDES_EXTENSION_VERSION} on ${GUIDES_LAST_UPDATED}. Keys are written for Mac; on Windows and Linux ⌘ and ⌃ are Ctrl, ⌥ is Alt, ⇧ is Shift. Summary: ${SITE_URL}/llms.txt

${[...guides, privacy].join("\n\n---\n\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
