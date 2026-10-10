import type { APIRoute } from "astro";
import { quietRedirectPage } from "../../../integrations/quiet-redirects.mjs";
import { GUIDE_SLUGS, getGuidePath, type GuideSlug } from "../../../lib/guides";
import { DEFAULT_LOCALE } from "../../../lib/locales";

/* The help center moved from /guides/ to /help/: each old page sends readers on to its new address. */
export function getStaticPaths() {
  return GUIDE_SLUGS.map((slug) => ({ params: { slug } }));
}

export const GET: APIRoute = ({ params, site }) => {
  const target = getGuidePath(DEFAULT_LOCALE, params.slug as GuideSlug);
  return new Response(quietRedirectPage(target, new URL(target, site).href), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
