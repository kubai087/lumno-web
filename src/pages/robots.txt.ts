import type { APIRoute } from "astro";
import { SITE_URL } from "../lib/seo";

export const GET: APIRoute = async () => {
  const host = new URL(SITE_URL).host;
  const allowAiCrawlers = String(import.meta.env.PUBLIC_ALLOW_AI_CRAWLERS || "true")
    .trim()
    .toLowerCase() !== "false";
  const aiCrawlerRule = allowAiCrawlers ? "Allow: /" : "Disallow: /";
  // Search indexers, user-triggered fetchers and grounding tokens behind AI answers.
  // Listed explicitly so PUBLIC_ALLOW_AI_CRAWLERS=false reaches every one of them.
  const aiAnswerCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "DuckAssistBot",
    // ByteDance's crawler also feeds Doubao and Toutiao search answers.
    "Bytespider",
  ];
  const trainingOnlyCrawlers = ["CCBot"];
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
