import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/*
 * Astro fetches a client:load island's renderer and component only when the
 * island boots, and each of their imports only once that file has arrived, so
 * the homepage hero (which the intro waits on) loads in several round trips.
 * After the build, list each eager island's whole static import graph as
 * <link rel="modulepreload"> in <head> so the browser fetches it in one wave.
 */

const STATIC_IMPORT = /(?:\bfrom\s*|\bimport\s*)"(\.\/[^"]+\.js)"/g;
const ISLAND_TAG = /<astro-island\b[^>]*>/g;

function attribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
}

function collectGraph(distDir, url, seen) {
  if (seen.has(url)) return;
  const file = path.join(distDir, url);
  if (!fs.existsSync(file)) return;
  seen.add(url);
  const source = fs.readFileSync(file, "utf8");
  for (const [, specifier] of source.matchAll(STATIC_IMPORT)) {
    collectGraph(distDir, path.posix.join(path.posix.dirname(url), specifier), seen);
  }
}

export default function islandModulePreload() {
  return {
    name: "lumno:island-modulepreload",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const pages = fs.readdirSync(distDir, { recursive: true }).filter((file) => file.endsWith(".html"));
        let patched = 0;

        for (const page of pages) {
          const file = path.join(distDir, page);
          const html = fs.readFileSync(file, "utf8");
          const urls = new Set();
          for (const [tag] of html.matchAll(ISLAND_TAG)) {
            if (attribute(tag, "client") !== "load") continue;
            for (const name of ["renderer-url", "component-url"]) {
              const url = attribute(tag, name);
              if (url?.startsWith("/")) collectGraph(distDir, url, urls);
            }
          }
          if (!urls.size || !html.includes("</head>")) continue;

          const links = [...urls].map((url) => `<link rel="modulepreload" href="${url}">`).join("");
          fs.writeFileSync(file, html.replace("</head>", `${links}</head>`));
          patched += 1;
        }

        logger.info(`Added island modulepreload links to ${patched} page(s)`);
      },
    },
  };
}
