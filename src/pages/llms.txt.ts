import type { APIRoute } from "astro";
import { LOCALE_CONFIG, buildLocalizedPath } from "../lib/locales";
import { CHROME_STORE_URL, FIREFOX_STORE_URL, SITE_URL } from "../lib/seo";
import { getSiteStoreVersions } from "../lib/site-links";
import { GUIDE_LOCALES, GUIDE_SLUGS, getGuideContent, getGuidePath } from "../lib/guides";

export const GET: APIRoute = async () => {
  // Firefox is named only once Firefox Add-ons lists Lumno.
  const { firefox: firefoxStoreVersion } = await getSiteStoreVersions();
  const browsers = firefoxStoreVersion
    ? "Chrome, Edge, Dia, Chromium-based browsers, and Firefox"
    : "Chrome, Edge, Dia, and Chromium-based browsers";
  const localizedHomepages = LOCALE_CONFIG.filter((item) => item.segment)
    .map((item) => `${item.label} ${SITE_URL}${buildLocalizedPath(item.code, "/")}`)
    .join(", ");
  const guideLines = GUIDE_LOCALES.flatMap((locale) =>
    GUIDE_SLUGS.map((slug) => `- ${getGuideContent(locale).pages[slug].title} (${locale}): ${SITE_URL}${getGuidePath(locale, slug)}`),
  ).join("\n");
  const body = `# Lumno

Lumno is an open-source browser command bar and focus search extension for ${browsers}. It helps people run tab search, bookmark search, history search, site search, and minimalist new tab workflows from a lightweight command surface.

## Core Product

- Product: Lumno
- Category: browser command bar, focus search, new tab extension
- Primary use cases: tab search, bookmark search, history search, site search, Arc migration workflows, minimalist new tab
- Search intent coverage: browser command bar, browser command palette, focus search, tab search extension, bookmark search extension, history search extension, site search shortcut, minimalist new tab, Arc browser alternative, Dia browser extension
- Supported browsers: ${browsers}
- Interface languages: Simplified Chinese, Traditional Chinese, English, Japanese (the website also covers Korean, German, French, Spanish, Brazilian Portuguese, and Russian)
- Pricing: free
- Source: open source

## Important URLs

- Homepage (Simplified Chinese): ${SITE_URL}/
- Localized homepages: ${localizedHomepages}
- Release notes: ${SITE_URL}/release/ (English: ${SITE_URL}/en/release/)
- Privacy policy: ${SITE_URL}/privacy/ (English: ${SITE_URL}/en/privacy/)
- Chrome Web Store: ${CHROME_STORE_URL}${firefoxStoreVersion ? `\n- Firefox Add-ons: ${FIREFOX_STORE_URL}` : ""}
- GitHub: https://github.com/kubai087/lumno-extension

## Help Center

What Lumno is and isn't, step-by-step how-tos with real screenshots of the extension, and browser compatibility, privacy and security notes:

${guideLines}

The whole help center in English, as one Markdown document: ${SITE_URL}/llms-full.txt

## Short Description

Lumno gives browser power users an Arc-inspired command bar without requiring them to switch browsers. It is useful for people moving from Arc to Dia or Chrome, and for anyone who wants one place to search open tabs, bookmarks, history, frequently visited pages, and supported site engines.

## Target Users

- Researchers and writers who need to recover context across search results, docs, notes, bookmarks, and browser history.
- Developers and designers who frequently jump between GitHub, documentation, product consoles, design references, and debugging pages.
- Students and knowledge workers who want a clean new tab and faster access to saved or recently visited pages.
- People migrating from Arc who want a familiar command bar workflow inside Dia, Chrome, Edge, or another Chromium browser.

## Differentiation

Lumno is not a full browser replacement. It is a browser extension that focuses on high-frequency lookup and switching workflows: opening a command bar from any page, finding existing browser context, sending queries into supported sites, and keeping a minimalist new tab.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
