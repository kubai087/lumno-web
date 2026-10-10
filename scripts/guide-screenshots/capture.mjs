// Captures real Lumno UI for the guides in a clean Chromium profile seeded
// with the demo tabs, bookmarks and history from scenes/<locale>.json.
//
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/guide-screenshots/capture.mjs zh-CN [scene...]
//   node scripts/guide-screenshots/convert.mjs zh-CN
//
// Needs a lumno-extension checkout (LUMNO_EXTENSION_DIR, default ../lumno-extension
// with `npm run build:react` done) and Chromium, not branded Chrome, which no
// longer loads unpacked extensions from the command line. CHROMIUM_PATH picks a
// specific build; HEADED=1 shows the window.
import { chromium } from "playwright";
import fs from "node:fs";
import http from "node:http";
import sharp from "sharp";
import os from "node:os";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "../..");
const EXT = path.resolve(process.env.LUMNO_EXTENSION_DIR || path.join(REPO, "../lumno-extension"));
const locale = process.argv[2] || "zh-CN";
const only = new Set(process.argv.slice(3));
const WORK = path.join(os.tmpdir(), "lumno-guide-shots");
const OUT = path.join(WORK, locale);
fs.mkdirSync(OUT, { recursive: true });
const cfg = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "scenes", `${locale}.json`), "utf8"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// "blank" in the tab list is a plain local page, so nothing competes with Lumno behind the overlay.
const blankServer = http.createServer((_request, response) => {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end(`<!doctype html><title>${cfg.blankTitle || "Blank"}</title><body style="margin:0;background:#f3f4f6"></body>`);
});
await new Promise((resolve) => blankServer.listen(0, "127.0.0.1", resolve));
const BLANK_URL = `http://127.0.0.1:${blankServer.address().port}/`;

const profile = fs.mkdtempSync(path.join(WORK, "profile-"));
const ctx = await chromium.launchPersistentContext(profile, {
  executablePath: process.env.CHROMIUM_PATH || undefined,
  headless: process.env.HEADED ? false : true,
  locale,
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
  args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`, `--lang=${locale}`, "--hide-scrollbars"],
});
const sw = ctx.serviceWorkers()[0] || (await ctx.waitForEvent("serviceworker"));
const extBase = sw.url().replace(/src\/background\/background\.js$/, "");
await sleep(2000);

// Seed bookmarks (bookmark bar) and history, then open the demo tabs.
await sw.evaluate(async (bookmarks) => {
  const [bar] = (await chrome.bookmarks.getTree())[0].children;
  for (const b of bookmarks) {
    if (b.children) {
      const folder = await chrome.bookmarks.create({ parentId: bar.id, title: b.title });
      for (const c of b.children) await chrome.bookmarks.create({ parentId: folder.id, ...c });
    } else {
      await chrome.bookmarks.create({ parentId: bar.id, ...b });
    }
  }
}, cfg.bookmarks);

for (const p of ctx.pages()) if (!p.url().startsWith("about:blank")) await p.close();
const visit = async (url) => {
  const page = await ctx.newPage();
  try { await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 }); } catch {}
  await sleep(1500);
  return page;
};
for (const url of cfg.history) await (await visit(url)).close();
// The new tab's "most visited" cards: a few repeat visits rank these first.
for (let round = 0; round < 3; round++) {
  for (const url of cfg.frequentSites || []) await (await visit(url)).close();
}
const tabs = [];
for (const url of cfg.tabs) tabs.push(await visit(url === "blank" ? BLANK_URL : url));
for (const p of ctx.pages()) if (p.url() === "about:blank") await p.close();
// Drop the install onboarding, store redirects and the blank page from history; they are not demo data.
await sw.evaluate(async (blankUrl) => {
  const items = await chrome.history.search({ text: "", startTime: 0, maxResults: 500 });
  for (const item of items) {
    if (item.url.startsWith(blankUrl) || /^chrome-extension:|chromewebstore\.google\.com|chrome\.google\.com\/webstore/.test(item.url)) {
      await chrome.history.deleteUrl({ url: item.url });
    }
  }
}, BLANK_URL);
const front = tabs[cfg.frontTab ?? tabs.length - 1];
// Cycle through tabs so the switcher has previews and recency order.
for (const t of tabs) { await t.bringToFront(); await sleep(700); }
await front.bringToFront();
await sleep(800);

async function openOverlay(page) {
  await page.bringToFront();
  await sw.evaluate(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    triggerShowSearchForTab(tab, "commands");
  });
  await sleep(1200);
}
async function closeOverlay(page) {
  await page.keyboard.press("Escape");
  await sleep(600);
}
// Crops are measured, not guessed: the box around the Lumno UI being shown, plus
// even padding, so nothing ever starts flush against the edge of a picture.
const PAD = 40;
async function shot(name, page, box) {
  await sleep(900);
  const viewport = page.viewportSize();
  const clip = box
    ? (() => {
        const x = Math.max(0, Math.floor(box.left - PAD));
        const y = Math.max(0, Math.floor(box.top - PAD));
        const right = Math.min(viewport.width, Math.ceil(box.right + PAD));
        const bottom = Math.min(viewport.height, Math.ceil(box.bottom + PAD));
        return { x, y, width: right - x, height: bottom - y };
      })()
    : { x: 0, y: 0, width: viewport.width, height: viewport.height };
  await page.screenshot({ path: path.join(OUT, `${name}.png`), clip });
  console.log("captured", name, `${clip.width}x${clip.height}`);
}

// The union of the visible boxes of everything matching the selectors.
async function boxOf(page, selectors) {
  return page.evaluate((list) => {
    let box = null;
    for (const selector of list) {
      for (const el of document.querySelectorAll(selector)) {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        box = box
          ? { left: Math.min(box.left, r.left), top: Math.min(box.top, r.top), right: Math.max(box.right, r.right), bottom: Math.max(box.bottom, r.bottom) }
          : { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
      }
    }
    return box;
  }, selectors);
}

// The command bar renders in a closed shadow root the page cannot measure, so measure the
// picture instead: everything that differs from the plain backdrop is Lumno (and its shadow).
async function overlayBox(page) {
  const { data, info } = await sharp(await page.screenshot())
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const scale = info.width / page.viewportSize().width;
  const at = (x, y) => (y * info.width + x) * 3;
  const bg = [data[at(4, 4)], data[at(4, 4) + 1], data[at(4, 4) + 2]];
  let left = info.width, top = info.height, right = -1, bottom = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = at(x, y);
      if (Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]) > 18) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }
  if (right < 0) return null;
  return { left: left / scale, top: top / scale, right: right / scale, bottom: bottom / scale };
}

// New tab helpers: preferences go to both storage areas the extension may read from.
async function setPrefs(values) {
  await sw.evaluate(async (entries) => {
    await chrome.storage.sync.set(entries).catch(() => {});
    await chrome.storage.local.set(entries).catch(() => {});
  }, values);
  await sleep(300);
}
async function dismissHints(page) {
  for (let i = 0; i < 4; i++) {
    const close = page.locator(".x-lumno-feature-hint__close").filter({ visible: true }).first();
    if (!(await close.count())) break;
    await close.click({ timeout: 1000 }).catch(() => {});
    await sleep(400);
  }
}
async function openNewtab() {
  const page = await ctx.newPage();
  // The clock reads 09:41, as on the homepage artwork.
  await page.clock.setFixedTime(new Date("2026-10-10T09:41:00"));
  await page.goto(extBase + "newtab.html");
  await sleep(2500);
  await dismissHints(page);
  await page.mouse.move(5, 5);
  return page;
}
// The extension's own select mirrors a hidden native <select>; set that and let the page react.
async function pickOption(page, id, index) {
  await page.evaluate(({ id, index }) => {
    const select = document.querySelector(`${id}_select`) || document.querySelector(`${id} select`);
    if (!select || !select.options[index]) return;
    select.selectedIndex = index;
    select.dispatchEvent(new Event("input", { bubbles: true }));
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }, { id, index });
  await sleep(900);
}

// Stage the new tab like the homepage artwork: shortcuts without the "+", the clock, and the
// light-mode wallpaper the store artwork uses (P2, Monet coast).
let newtabReady = false;
async function prepareNewtab() {
  if (newtabReady) return;
  newtabReady = true;
  const page = await ctx.newPage();
  await page.goto(extBase + "newtab.html");
  await sleep(2000);
  await page.evaluate(async (items) => {
    await globalThis.LumnoNewtabShortcutsStore.saveShortcuts(chrome.storage.sync, items, {
      key: "_x_extension_newtab_shortcuts_2026_unique_",
      maxShortcuts: 60,
    });
  }, cfg.shortcuts || []);
  await page.close();
  await setPrefs({
    _x_extension_newtab_shortcut_add_visible_2026_unique_: false,
    _x_extension_newtab_wordmark_visible_2026_unique_: "time",
    ...(cfg.wallpaper
      ? { _x_extension_newtab_wallpaper_2026_unique_: { version: 2, sameForModes: true, light: cfg.wallpaper, dark: cfg.wallpaper } }
      : {}),
  });
}

const scenes = {
  // Mixed results: open tab, bookmark, history under one query.
  async search(page) {
    await openOverlay(page);
    await page.keyboard.type(cfg.queries.search, { delay: 80 });
    await shot("search", page, await overlayBox(page));
    await closeOverlay(page);
  },
  async pinyin(page) {
    if (!cfg.queries.pinyin) return;
    await openOverlay(page);
    await page.keyboard.type(cfg.queries.pinyin, { delay: 80 });
    await shot("pinyin", page, await overlayBox(page));
    await closeOverlay(page);
  },
  // Empty input + Tab: search open tabs only.
  async opentabs(page) {
    await openOverlay(page);
    await page.keyboard.press("Tab");
    await sleep(700);
    if (cfg.queries.opentabs) await page.keyboard.type(cfg.queries.opentabs, { delay: 80 });
    await shot("opentabs", page, await overlayBox(page));
    await closeOverlay(page);
    await closeOverlay(page);
  },
  // Shortcut + Tab: search inside a site.
  async sitesearch(page) {
    await openOverlay(page);
    await page.keyboard.type(cfg.queries.siteKey, { delay: 120 });
    await sleep(500);
    await page.keyboard.press("Tab");
    await sleep(600);
    await page.keyboard.type(cfg.queries.siteQuery, { delay: 80 });
    await shot("sitesearch", page, await overlayBox(page));
    await closeOverlay(page);
    await closeOverlay(page);
  },
  async ai(page) {
    await openOverlay(page);
    await page.keyboard.type(cfg.queries.aiKey, { delay: 120 });
    await sleep(500);
    await page.keyboard.press("Tab");
    await sleep(600);
    await page.keyboard.type(cfg.queries.aiQuery, { delay: 60 });
    await shot("ai", page, await overlayBox(page));
    await closeOverlay(page);
    await closeOverlay(page);
  },
  // Double Tab on an empty input: the search mode menu.
  async modemenu(page) {
    await openOverlay(page);
    await page.keyboard.press("Tab");
    await sleep(120);
    await page.keyboard.press("Tab");
    await sleep(900);
    await shot("modemenu", page, await overlayBox(page));
    await closeOverlay(page);
    await closeOverlay(page);
    await closeOverlay(page);
  },
  async switcher(page) {
    await page.bringToFront();
    await sw.evaluate(async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      triggerTabSwitcherForTab(tab, "commands-tab-switcher", Date.now());
    });
    await sleep(1500);
    await shot("switcher", page, await overlayBox(page));
    await closeOverlay(page);
  },
  async newtab() {
    const nt = await openNewtab();
    await shot("newtab", nt);
    await nt.close();
  },
  // The page the extension opens right after installing.
  async onboarding() {
    const page = await ctx.newPage();
    await page.goto(`${extBase}src/onboarding/onboarding.html?entry=ext&reason=install`);
    await sleep(2500);
    await shot("onboarding", page);
    await page.close();
  },
  async "nt-appearance"() {
    const page = await openNewtab();
    await page.click(".x-nt-wallpaper-button");
    await sleep(1200);
    // Bring the wallpaper section of the panel into view.
    await page.locator(".x-nt-wallpaper-tab").first().scrollIntoViewIfNeeded().catch(() => {});
    await page.evaluate(() => {
      const tab = document.querySelector(".x-nt-wallpaper-tile");
      const section = tab && tab.closest("section, .x-nt-appearance-section, div");
      if (section) section.scrollIntoView({ block: "center" });
    });
    await sleep(800);
    await shot("nt-appearance", page);
    await page.close();
  },
  async "nt-filter"() {
    const page = await openNewtab();
    await page.click(".x-nt-wallpaper-button");
    await sleep(900);
    await pickOption(page, "#x-nt-wallpaper-effect", cfg.filterIndex ?? 6);
    await page.keyboard.press("Escape");
    await page.mouse.click(640, 60);
    await sleep(1500);
    await shot("nt-filter", page);
    await page.click(".x-nt-wallpaper-button");
    await sleep(700);
    await pickOption(page, "#x-nt-wallpaper-effect", 0);
    await page.close();
  },
  async "nt-bookmarks"() {
    for (const [index, mode] of ["folder", "list", "top"].entries()) {
      const page = await openNewtab();
      await pickOption(page, "#_x_extension_newtab_bookmark_mode_2026_unique_", index);
      await page.mouse.move(5, 5);
      await sleep(900);
      if (mode === "top") {
        await shot(`nt-bookmarks-${mode}`, page, await boxOf(page, ["[class*='topbar']", "#_x_extension_newtab_wordmark_2026_unique_", "#_x_extension_newtab_root_2024_unique_", "#_x_extension_newtab_shortcuts_2026_unique_"]));
      } else {
        // Open the first folder so the layout shows what it does.
        await page.locator("#_x_extension_newtab_bookmarks_2024_unique_ [class*='folder']").first().hover().catch(() => {});
        await sleep(900);
        await shot(`nt-bookmarks-${mode}`, page, await boxOf(page, ["#_x_extension_newtab_bookmarks_2024_unique_"]));
      }
      await page.close();
    }
    const reset = await openNewtab();
    await pickOption(reset, "#_x_extension_newtab_bookmark_mode_2026_unique_", 0);
    await reset.close();
  },
  async "nt-shortcuts"() {
    const page = await openNewtab();
    const tiles = page.locator(".x-nt-shortcut-tile");
    const box = await tiles.nth(3).boundingBox().catch(() => null);
    if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await sleep(900);
    await shot("nt-shortcuts", page, await boxOf(page, ["#_x_extension_newtab_wordmark_2026_unique_", "#_x_extension_newtab_root_2024_unique_", "#_x_extension_newtab_shortcuts_2026_unique_"]));
    await page.close();
  },
  async "nt-recent"() {
    const page = await openNewtab();
    await shot("nt-recent", page, await boxOf(page, ["#_x_extension_newtab_bottom_dock_scroller_2024_unique_ > section:not(#_x_extension_newtab_bookmarks_2024_unique_)"]));
    await page.close();
  },
  async "nt-clock"() {
    await setPrefs({
      _x_extension_newtab_quote_prefs_2026_unique_: { enabled: true, position: "input", category: cfg.quoteCategory || "literature" },
    });
    const page = await openNewtab();
    await sleep(1500);
    await shot("nt-clock", page, await boxOf(page, ["#_x_extension_newtab_wordmark_2026_unique_", "#_x_extension_newtab_root_2024_unique_", "#_x_extension_newtab_shortcuts_2026_unique_"]));
    await page.close();
    await setPrefs({ _x_extension_newtab_quote_prefs_2026_unique_: { enabled: false } });
  },
  async "nt-zen"() {
    await setPrefs({ _x_extension_newtab_zen_mode_2026_unique_: true });
    const page = await openNewtab();
    await shot("nt-zen", page);
    await page.close();
    await setPrefs({ _x_extension_newtab_zen_mode_2026_unique_: false });
  },
  async shortcuts() {
    const sc = await ctx.newPage();
    await sc.goto("chrome://extensions/shortcuts");
    await sleep(1500);
    // A browser page with nothing of Lumno's to measure: the shortcuts card and the sidebar beside it.
    await shot("shortcuts", sc, { left: 0, top: 0, right: 1040, bottom: 440 });
    await sc.close();
  },
};

for (const [name, run] of Object.entries(scenes)) {
  if (only.size && !only.has(name)) continue;
  if (name === "newtab" || name.startsWith("nt-")) await prepareNewtab();
  try { await run(front); } catch (error) { console.error("scene failed", name, error.message); }
}
await ctx.close();
blankServer.close();
fs.rmSync(profile, { recursive: true, force: true });
