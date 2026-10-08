import type { APIRoute } from "astro";
import { execFileSync } from "node:child_process";
import { buildLocalizedPath, getNonDefaultLocales, stripLocaleSegment } from "../lib/locales";
import { fetchReleases, isReleaseNoteLocale } from "../lib/releases";
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
  const input = paths.map((item) => String(item || "").trim()).filter(Boolean);
  if (!input.length) return fallback;
  try {
    // Pass paths as argv so bracketed route folders like [locale] are never shell-globbed.
    const raw = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...input], {
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
  const homeLastmod = readLastCommitIso(
    ["src/pages/index.astro", "src/pages/[locale]/index.astro", "src/lib/home-content.ts", "src/lib/seo.ts"],
    now,
  );
  const privacyLastmod = readLastCommitIso(
    [
      "src/pages/privacy/index.astro",
      "src/pages/[locale]/privacy/index.astro",
      "src/lib/privacy-content.ts",
      "src/content/",
    ],
    now,
  );
  const localizedHomeUrls = getNonDefaultLocales().map((locale) => ({
    locale,
    loc: `${SITE_URL}${buildLocalizedPath(locale, "/")}`,
    lastmod: homeLastmod,
    changefreq: "weekly",
    priority: "0.9",
  }));
  // Only languages with their own notes; the rest are noindex (see release/index.astro).
  const localizedReleaseUrls = getNonDefaultLocales().filter(isReleaseNoteLocale).map((locale) => ({
    locale,
    loc: `${SITE_URL}${buildLocalizedPath(locale, "/release/")}`,
    lastmod: releaseLastmod,
    changefreq: "daily",
    priority: "0.8",
  }));
  const localizedPrivacyUrls = getNonDefaultLocales().map((locale) => ({
    locale,
    loc: `${SITE_URL}${buildLocalizedPath(locale, "/privacy/")}`,
    lastmod: privacyLastmod,
    changefreq: "monthly",
    priority: "0.5",
  }));

  const urls = [
    { locale: "zh-CN", loc: `${SITE_URL}/`, lastmod: homeLastmod, changefreq: "weekly", priority: "1.0" },
    ...localizedHomeUrls,
    {
      locale: "zh-CN",
      loc: `${SITE_URL}/release/`,
      lastmod: releaseLastmod,
      changefreq: "daily",
      priority: "0.8",
    },
    ...localizedReleaseUrls,
    {
      locale: "zh-CN",
      loc: `${SITE_URL}/privacy/`,
      lastmod: privacyLastmod,
      changefreq: "monthly",
      priority: "0.5",
    },
    ...localizedPrivacyUrls,
  ];

  const alternateByPath = new Map<string, Array<{ hreflang: string; href: string }>>();
  for (const item of urls) {
    const path = new URL(item.loc).pathname;
    const normalized = stripLocaleSegment(path);
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
    const normalized = stripLocaleSegment(path);
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
