import type { APIRoute } from "astro";
import { CHROME_STORE_URL, SITE_URL } from "../lib/seo";

export const GET: APIRoute = async () => {
  const body = `# Lumno

Lumno is an open-source browser command bar and focus search extension for Chrome, Edge, Dia, and Chromium-based browsers. It helps people run tab search, bookmark search, history search, site search, and minimalist new tab workflows from a lightweight command surface.

## Core Product

- Product: Lumno
- Category: browser command bar, focus search, new tab extension
- Primary use cases: tab search, bookmark search, history search, site search, Arc migration workflows, minimalist new tab
- Search intent coverage: browser command bar, browser command palette, focus search, tab search extension, bookmark search extension, history search extension, site search shortcut, minimalist new tab, Arc browser alternative, Dia browser extension
- Supported browsers: Chrome, Edge, Dia, and Chromium-based browsers
- Pricing: free
- Source: open source

## Important URLs

- Homepage: ${SITE_URL}/
- English homepage: ${SITE_URL}/en/
- Traditional Chinese homepage: ${SITE_URL}/zh-tw/
- Features: ${SITE_URL}/features/
- English features: ${SITE_URL}/en/features/
- Traditional Chinese features: ${SITE_URL}/zh-tw/features/
- Onboarding: ${SITE_URL}/onboarding/
- Release notes: ${SITE_URL}/release/
- Chrome Web Store: ${CHROME_STORE_URL}
- GitHub: https://github.com/kubai087/lumno-extension

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
