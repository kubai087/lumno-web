// Pings IndexNow (Bing, Yandex, Naver, Seznam) with the sitemap URLs whose
// <lastmod> changed since the previous deploy. Scheduled rebuilds that change
// nothing submit nothing, so the 10-minute cron never spams the endpoint.
//
// Usage: node scripts/submit-indexnow.mjs <current-sitemap> [previous-sitemap] [--all]
import fs from "node:fs";

const SITE_URL = "https://lumno.kubai.design";
const INDEXNOW_KEY = "38ca83f44070e91086d6d7f8d3d5f425";
const ENDPOINT = "https://api.indexnow.org/indexnow";

function readSitemap(file) {
  if (!file || !fs.existsSync(file)) return null;
  const xml = fs.readFileSync(file, "utf8");
  const entries = new Map();
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() || "";
    if (loc) entries.set(loc.replaceAll("&amp;", "&"), lastmod);
  }
  return entries;
}

function pickChangedUrls(current, previous) {
  return [...current].filter(([loc, lastmod]) => previous.get(loc) !== lastmod).map(([loc]) => loc);
}

async function main() {
  const args = process.argv.slice(2);
  const submitAll = args.includes("--all");
  const [currentFile, previousFile] = args.filter((arg) => !arg.startsWith("--"));

  const current = readSitemap(currentFile);
  if (!current?.size) throw new Error(`No URLs found in ${currentFile}`);

  let urls;
  if (submitAll) {
    urls = [...current.keys()];
  } else {
    const previous = readSitemap(previousFile);
    if (!previous) {
      // Without the live sitemap we cannot tell what changed; skip rather than resubmit everything.
      console.log("No previous sitemap to compare against. Skipping IndexNow.");
      return;
    }
    urls = pickChangedUrls(current, previous);
  }

  if (!urls.length) {
    console.log("No sitemap URLs changed. Skipping IndexNow.");
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  // 200 = accepted, 202 = accepted while the key is still being verified.
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow responded ${response.status}: ${await response.text()}`);
  }
  console.log(`Submitted ${urls.length} URL(s) to IndexNow (${response.status}):\n${urls.join("\n")}`);
}

main().catch((error) => {
  process.stderr.write(`[submit-indexnow] ${error.message}\n`);
  process.exit(1);
});
