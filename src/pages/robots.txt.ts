import type { APIRoute } from "astro";
import { SITE_URL } from "../lib/seo";

export const GET: APIRoute = async () => {
  const host = new URL(SITE_URL).host;
  const allowAiCrawlers = String(import.meta.env.PUBLIC_ALLOW_AI_CRAWLERS || "true")
    .trim()
    .toLowerCase() !== "false";
  const aiCrawlerRule = allowAiCrawlers ? "Allow: /" : "Disallow: /";
  const aiAnswerCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "ClaudeBot",
    "anthropic-ai",
    "PerplexityBot",
  ];
  const trainingOnlyCrawlers = ["Bytespider", "CCBot"];
  const body = [
    "# General crawlers",
    "User-agent: *",
    "Allow: /",
    "",
    "# AI answer crawlers",
    ...aiAnswerCrawlers.flatMap((crawler) => [
      `User-agent: ${crawler}`,
      aiCrawlerRule,
      "",
    ]),
    "# Training-only crawlers",
    ...trainingOnlyCrawlers.flatMap((crawler) => [
      `User-agent: ${crawler}`,
      "Disallow: /",
      "",
    ]),
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
