import type { APIRoute } from "astro";
import { CHROME_STORE_URL, SITE_URL } from "../lib/seo";

export const GET: APIRoute = async () => {
  const body = `# Lumno

Lumno is an open-source browser command bar and focus search extension for Chrome, Edge, Dia, and Chromium-based browsers. It helps people run tab search, bookmark search, history search, site search, and minimalist new tab workflows from a lightweight command surface.

## Core Product

- Product: Lumno
- Category: browser command bar, focus search, new tab extension
- Primary use cases: tab search, bookmark search, history search, site search, Arc migration workflows, minimalist new tab
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
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
