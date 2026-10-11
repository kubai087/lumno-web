// Runs each language's help search eval set (src/content/guides/search/eval/<locale>.json: what someone types →
// the page or section that should open) against the built search index and synonym list, with the same
// matching rules the help search box and the extension use. Prints how often the right page comes first and
// within the first three, and fails when either drops below the floor, so changes to aliases, synonyms or
// the algorithm show whether search got better or worse.
// Usage: node scripts/help-search-eval.mjs [--verbose] (after astro build)
import fs from "node:fs";
import path from "node:path";
import "../src/scripts/help-center-search.js";

const REPO = path.resolve(import.meta.dirname, "..");
const DIST = path.join(REPO, "dist");
const EVAL_DIR = path.join(REPO, "src/content/guides/search/eval");
const LOCALE_PATHS = { "zh-CN": "", "zh-TW": "zh-tw", ja: "ja", en: "en" };
// Floors, a little under today's rates; raise them as search improves.
const FLOOR = { top1: 0.85, top3: 0.95 };
const verbose = process.argv.includes("--verbose");
const { searchIndex } = globalThis.LumnoHelpCenterSearch;

// "keyboard-shortcuts#change" accepts only that section; "keyboard-shortcuts" accepts the page or any section on it.
function matches(url, expected) {
  const [slug, anchor] = expected.split("#");
  const [pathname, hash] = url.split("#");
  const page = slug === "privacy" ? /\/privacy\/$/ : new RegExp(`/help/${slug}/$`);
  return page.test(pathname) && (!anchor || hash === anchor);
}

let failed = false;
for (const [locale, segment] of Object.entries(LOCALE_PATHS)) {
  const base = path.join(DIST, segment, "help");
  const index = JSON.parse(fs.readFileSync(path.join(base, "search-index.json"), "utf8"));
  const synonyms = JSON.parse(fs.readFileSync(path.join(base, "search-synonyms.json"), "utf8"));
  const evalFile = path.join(EVAL_DIR, `${locale}.json`);
  if (!fs.existsSync(evalFile)) {
    console.error(`help search ${locale}: no eval set at ${path.relative(REPO, evalFile)}`);
    failed = true;
    continue;
  }
  const cases = JSON.parse(fs.readFileSync(evalFile, "utf8"));
  let top1 = 0;
  let top3 = 0;
  const misses = [];
  for (const { q, expect } of cases) {
    const urls = searchIndex(index, q, { synonyms }).map((item) => item.url);
    const rank = urls.findIndex((url) => expect.some((expected) => matches(url, expected)));
    if (rank === 0) top1 += 1;
    if (rank >= 0 && rank < 3) top3 += 1;
    if (rank !== 0) misses.push({ q, expect, rank, got: urls.slice(0, 3) });
  }
  const rate1 = top1 / cases.length;
  const rate3 = top3 / cases.length;
  const below = rate1 < FLOOR.top1 || rate3 < FLOOR.top3;
  failed ||= below;
  console.log(`help search ${locale}: first ${(rate1 * 100).toFixed(0)}% · top 3 ${(rate3 * 100).toFixed(0)}% (${cases.length} queries)${below ? "  ← below floor" : ""}`);
  if (verbose || below) {
    misses
      .filter((miss) => verbose || miss.rank < 0 || miss.rank >= 3)
      .forEach(({ q, expect, rank, got }) => console.log(`  ${rank < 0 ? "miss" : `#${rank + 1}`}  ${q}  → want ${expect.join(" | ")}  got ${got.map((url) => url.replace(/^.*?\/help\//, "")).join(", ") || "nothing"}`));
  }
}
if (failed) {
  console.error(`Help search fell below the floor (first ${FLOOR.top1 * 100}%, top 3 ${FLOOR.top3 * 100}%).`);
  process.exit(1);
}
