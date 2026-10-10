import type { APIRoute } from "astro";
import { buildGuideSearchIndex } from "../../lib/guide-search-index";
import { DEFAULT_LOCALE } from "../../lib/locales";

export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await buildGuideSearchIndex(DEFAULT_LOCALE)), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
