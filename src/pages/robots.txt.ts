import type { APIRoute } from "astro";
import { SITE_URL } from "../lib/seo";

export const GET: APIRoute = async () => {
  const host = new URL(SITE_URL).host;
  const body = [
    "# General crawlers",
    "User-agent: *",
    "Allow: /",
    "",
    "# AI crawlers (adjust as needed)",
    "User-agent: GPTBot",
    "Disallow: /",
    "",
    "User-agent: ChatGPT-User",
    "Disallow: /",
    "",
    "User-agent: ClaudeBot",
    "Disallow: /",
    "",
    "User-agent: anthropic-ai",
    "Disallow: /",
    "",
    "User-agent: PerplexityBot",
    "Disallow: /",
    "",
    "User-agent: Bytespider",
    "Disallow: /",
    "",
    "User-agent: CCBot",
    "Disallow: /",
    "",
    `Host: ${host}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
