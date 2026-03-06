import type { APIRoute } from "astro";
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

export const GET: APIRoute = async () => {
  const releases = await fetchReleases();
  const releaseLastmod = releases[0]?.date || new Date().toISOString();
  const generatedAt = new Date().toISOString();

  const urls = [
    { loc: `${SITE_URL}/`, lastmod: generatedAt, changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE_URL}/en/`, lastmod: generatedAt, changefreq: "weekly", priority: "0.9" },
    { loc: `${SITE_URL}/zh-tw/`, lastmod: generatedAt, changefreq: "weekly", priority: "0.9" },
    { loc: `${SITE_URL}/onboarding/`, lastmod: generatedAt, changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/en/onboarding/`, lastmod: generatedAt, changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/zh-tw/onboarding/`, lastmod: generatedAt, changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/release/`, lastmod: releaseLastmod, changefreq: "daily", priority: "0.8" },
    { loc: `${SITE_URL}/en/release/`, lastmod: releaseLastmod, changefreq: "daily", priority: "0.8" },
    { loc: `${SITE_URL}/zh-tw/release/`, lastmod: releaseLastmod, changefreq: "daily", priority: "0.8" },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${escapeXml(item.lastmod)}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
