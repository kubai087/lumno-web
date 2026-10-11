import type { APIRoute } from "astro";
import { buildGuideSearchSynonyms } from "../../lib/guide-search-index";
import { DEFAULT_LOCALE } from "../../lib/locales";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(buildGuideSearchSynonyms(DEFAULT_LOCALE)), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
