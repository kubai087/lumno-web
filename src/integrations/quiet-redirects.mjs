import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/*
 * GitHub Pages can't send real redirects, so Astro writes each one as a tiny
 * HTML page whose body reads "Redirecting from … to …" in the browser's default
 * styles, which flashes while the next page loads. This rewrites those pages
 * after the build into a blank white page that leaves from its <head>, before
 * anything paints, keeping the query and hash.
 */
const MARKER = /^<!doctype html><title>Redirecting to: /i;

async function htmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return htmlFiles(full);
      return entry.name.endsWith(".html") ? [full] : [];
    }),
  );
  return nested.flat();
}

export function quietRedirectPage(target, canonical) {
  const href = JSON.stringify(target);
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lumno</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${canonical}">
<script>location.replace(${href} + location.search + location.hash);</script>
<meta http-equiv="refresh" content="0;url=${target}">
<style>html{background:#fff;color-scheme:light}</style>
</head>
<body><noscript><a href="${target}">${target}</a></noscript></body>
</html>
`;
}

export default function quietRedirects() {
  return {
    name: "lumno-quiet-redirects",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const root = fileURLToPath(dir);
        for (const file of await htmlFiles(root)) {
          const html = await fs.readFile(file, "utf8");
          if (!MARKER.test(html)) continue;
          const target = html.match(/http-equiv="refresh" content="0;url=([^"]+)"/)?.[1];
          const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
          if (!target || !canonical) continue;
          await fs.writeFile(file, quietRedirectPage(target, canonical));
        }
      },
    },
  };
}
