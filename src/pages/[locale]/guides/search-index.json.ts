import type { APIRoute } from "astro";
import { buildGuideSearchIndex } from "../../../lib/guide-search-index";
import { GUIDE_LOCALES, isGuideLocale } from "../../../lib/guides";
import { DEFAULT_LOCALE, buildLocalizedPath, resolveLocaleFromSegment } from "../../../lib/locales";

export function getStaticPaths() {
  return GUIDE_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => ({
    params: { locale: buildLocalizedPath(locale, "/").replaceAll("/", "") },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const locale = resolveLocaleFromSegment(params.locale || "");
  if (!locale || !isGuideLocale(locale)) throw new Error(`Unsupported guide locale: ${params.locale}`);
  return new Response(JSON.stringify(await buildGuideSearchIndex(locale)), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
