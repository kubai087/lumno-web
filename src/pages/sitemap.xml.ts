import type { APIRoute } from "astro";
import { execSync } from "node:child_process";
import { buildLocalizedPath, getNonDefaultLocales } from "../lib/locales";
import { fetchReleases } from "../lib/releases";
import { SITE_URL } from "../lib/seo";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function readLastCommitIso(paths: string[], fallback: string): string {
  const input = paths
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .join(" ");
  if (!input) return fallback;
  try {
    const raw = execSync(`git log -1 --format=%cI -- ${input}`, {
      stdio: ["ignore", "pipe", "ignore"],
      encoding: "utf8",
    }).trim();
    return raw || fallback;
  } catch (_error) {
    return fallback;
  }
}

export const GET: APIRoute = async () => {
  const releases = await fetchReleases();
  const now = new Date().toISOString();
  const releaseLastmod = releases[0]?.date || now;
  const homeLastmod = readLastCommitIso(["src/pages/index.astro", "src/lib/seo.ts"], now);
  const onboardingLastmod = readLastCommitIso(["src/pages/onboarding/index.astro"], now);
  const localizedHomeUrls = getNonDefaultLocales().map((locale) => ({
    locale,
    loc: `${SITE_URL}${buildLocalizedPath(locale, "/")}`,
    lastmod: homeLastmod,
    changefreq: "weekly",
    priority: "0.9",
  }));
  const localizedOnboardingUrls = getNonDefaultLocales().map((locale) => ({
    locale,
    loc: `${SITE_URL}${buildLocalizedPath(locale, "/onboarding/")}`,
    lastmod: onboardingLastmod,
    changefreq: "monthly",
    priority: "0.7",
  }));
  const localizedReleaseUrls = getNonDefaultLocales().map((locale) => ({
    locale,
    loc: `${SITE_URL}${buildLocalizedPath(locale, "/release/")}`,
    lastmod: releaseLastmod,
    changefreq: "daily",
    priority: "0.8",
  }));

  const urls = [
    { locale: "zh-CN", loc: `${SITE_URL}/`, lastmod: homeLastmod, changefreq: "weekly", priority: "1.0" },
    ...localizedHomeUrls,
    {
      locale: "zh-CN",
      loc: `${SITE_URL}/onboarding/`,
      lastmod: onboardingLastmod,
      changefreq: "monthly",
      priority: "0.7",
    },
    ...localizedOnboardingUrls,
    {
      locale: "zh-CN",
      loc: `${SITE_URL}/release/`,
      lastmod: releaseLastmod,
      changefreq: "daily",
      priority: "0.8",
    },
    ...localizedReleaseUrls,
  ];

  const alternateByPath = new Map<string, Array<{ hreflang: string; href: string }>>();
  for (const item of urls) {
    const path = new URL(item.loc).pathname;
    const normalized = path.replace(/^\/(?:en|zh-tw)(?=\/)/i, "");
    const alternates = alternateByPath.get(normalized) || [];
    alternates.push({ hreflang: item.locale, href: item.loc });
    alternateByPath.set(normalized, alternates);
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map((item) => {
    const path = new URL(item.loc).pathname;
    const normalized = path.replace(/^\/(?:en|zh-tw)(?=\/)/i, "");
    const alternates = alternateByPath.get(normalized) || [];
    return `  <url>
    <loc>${escapeXml(item.loc)}</loc>
${alternates
  .map(
    (alt) =>
      `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`,
  )
  .join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_URL}${normalized}`)}" />
    <lastmod>${escapeXml(item.lastmod)}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
