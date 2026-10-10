import type { APIRoute } from "astro";
import { quietRedirectPage } from "../../../../integrations/quiet-redirects.mjs";
import { GUIDE_LOCALES, GUIDE_SLUGS, getGuidePath, type GuideSlug } from "../../../../lib/guides";
import { DEFAULT_LOCALE, buildLocalizedPath, resolveLocaleFromSegment } from "../../../../lib/locales";

/* The help center moved from /<locale>/guides/ to /<locale>/help/: each old page sends readers on to its new address. */
export function getStaticPaths() {
  return GUIDE_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).flatMap((locale) =>
    GUIDE_SLUGS.map((slug) => ({ params: { locale: buildLocalizedPath(locale, "/").replaceAll("/", ""), slug } })),
  );
}

export const GET: APIRoute = ({ params, site }) => {
  const locale = resolveLocaleFromSegment(params.locale || "");
  if (!locale) throw new Error(`Unsupported locale: ${params.locale}`);
  const target = getGuidePath(locale, params.slug as GuideSlug);
  return new Response(quietRedirectPage(target, new URL(target, site).href), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
