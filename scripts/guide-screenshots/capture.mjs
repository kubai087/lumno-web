// Captures real Lumno UI for the guides in a clean Chromium profile seeded
// with the demo tabs, bookmarks and history from scenes/<locale>.json.
//
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/guide-screenshots/capture.mjs zh-CN [scene...]
//   node scripts/guide-screenshots/convert.mjs zh-CN
//
// Needs a lumno-extension checkout (LUMNO_EXTENSION_SOURCE, default ../lumno-extension), built with
// `npm run build` (LUMNO_EXTENSION_DIR, default its dist/chrome), and Chromium, not branded Chrome, which no
// longer loads unpacked extensions from the command line. CHROMIUM_PATH picks a
// specific build; HEADED=1 shows the window.
import { chromium } from "playwright";
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import sharp from "sharp";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const REPO = path.resolve(import.meta.dirname, "../..");
const EXT_SOURCE = path.resolve(process.env.LUMNO_EXTENSION_SOURCE || path.join(REPO, "../lumno-extension"));
const EXT = path.resolve(process.env.LUMNO_EXTENSION_DIR || path.join(EXT_SOURCE, "dist/chrome"));
const locale = process.argv[2] || "zh-CN";
const only = new Set(process.argv.slice(3));
const WORK = path.join(os.tmpdir(), "lumno-guide-shots");
const OUT = path.join(WORK, locale);
fs.mkdirSync(OUT, { recursive: true });
// The new tab packs its shortcuts into several storage keys; the extension's own code does the packing.
const shortcutsStoreFile = path.join(WORK, "shortcuts-store.mjs");
await build({
  entryPoints: [path.join(EXT_SOURCE, "src/domain/shortcuts-store.ts")],
  bundle: true,
  format: "esm",
  platform: "neutral",
  outfile: shortcutsStoreFile,
  logLevel: "silent",
});
const ShortcutsStore = await import(pathToFileURL(shortcutsStoreFile).href);
const cfg = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "scenes", `${locale}.json`), "utf8"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const APPLE_LANGUAGE = { "zh-CN": "zh-Hans", "zh-TW": "zh-Hant", en: "en", ja: "ja" };

// "blank" in the tab list is a plain local page, so nothing competes with Lumno behind the overlay.
// "/article" is a short plain article to select text in (use cases); "/article-link" turns
// the article's link text into a link to "/article-preview", a second article (link preview).
const escapeHtml = (value) => String(value).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const articleParagraph = (text, link) => {
  const html = escapeHtml(text);
  if (!link) return html;
  const label = escapeHtml(link.text);
  return html.replace(label, `<a id="preview-link" href="/article-preview" style="color:#0969da;text-decoration:underline;text-underline-offset:3px">${label}</a>`);
};
const blankServer = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  const article = cfg.useCases && cfg.useCases.article;
  const previewed = article && article.link && article.link.page;
  if (request.url.startsWith("/article-preview") && previewed) {
    response.end(`<!doctype html><title>${escapeHtml(previewed.title)}</title><body style="margin:0;background:#fff;color:#1f2328;font:18px/1.8 -apple-system,'PingFang SC','Hiragino Sans',sans-serif"><main style="max-width:640px;margin:96px auto;padding:0 24px"><h1 style="font-size:30px;line-height:1.3;margin:0 0 24px">${escapeHtml(previewed.title)}</h1>${previewed.paragraphs.map((text) => `<p style="margin:0 0 20px">${escapeHtml(text)}</p>`).join("")}</main></body>`);
    return;
  }
  if (request.url.startsWith("/article") && article) {
    response.end(`<!doctype html><title>${escapeHtml(article.title)}</title><body style="margin:0;background:#fff;color:#1f2328;font:18px/1.8 -apple-system,'PingFang SC','Hiragino Sans',sans-serif"><main style="max-width:640px;margin:96px auto;padding:0 24px"><h1 style="font-size:30px;line-height:1.3;margin:0 0 24px">${escapeHtml(article.title)}</h1>${article.paragraphs.map((text) => `<p style="margin:0 0 20px">${articleParagraph(text, request.url.startsWith("/article-link") && article.link)}</p>`).join("")}${request.url.startsWith("/article-clip") && article.table ? `<table id="clip-target" style="border-collapse:collapse;width:100%;font-size:16px;line-height:1.6;margin:8px 0 0"><thead><tr>${article.table.head.map((cell) => `<th style="text-align:left;padding:10px 14px;border-bottom:1px solid #d0d7de;background:#f6f8fa">${escapeHtml(cell)}</th>`).join("")}</tr></thead><tbody>${article.table.rows.map((row) => `<tr>${row.map((cell, index) => `<td style="padding:10px 14px;border-bottom:1px solid #eaeef2;${index ? "" : "font-family:ui-monospace,Menlo,monospace;font-size:14px"}">${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : ""}</main></body>`);
    return;
  }
  response.end(`<!doctype html><title>${cfg.blankTitle || "Blank"}</title><body style="margin:0;background:#f3f4f6"></body>`);
});
await new Promise((resolve) => blankServer.listen(0, "127.0.0.1", resolve));
const BLANK_URL = `http://127.0.0.1:${blankServer.address().port}/`;

// macOS Chromium takes its own UI language (chrome:// pages, default site names) from the
// app's AppleLanguages preference, not --lang (and won't accept it as an argument), so set it
// on the test browser's own bundle for this run and remove it again on exit.
const executablePath = process.env.CHROMIUM_PATH || chromium.executablePath();
let languageBundle = "";
if (process.platform === "darwin") {
  const infoPlist = path.join(executablePath.split(".app/")[0] + ".app", "Contents/Info");
  languageBundle = execFileSync("defaults", ["read", infoPlist, "CFBundleIdentifier"], { encoding: "utf8" }).trim();
  execFileSync("defaults", ["write", languageBundle, "AppleLanguages", "-array", APPLE_LANGUAGE[locale] || locale]);
  process.on("exit", () => {
    try {
      execFileSync("defaults", ["delete", languageBundle, "AppleLanguages"]);
    } catch (_error) {}
  });
}

const profile = fs.mkdtempSync(path.join(WORK, "profile-"));
const ctx = await chromium.launchPersistentContext(profile, {
  executablePath,
  headless: process.env.HEADED ? false : true,
  locale,
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
  args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`, `--lang=${locale}`, "--hide-scrollbars"],
});
const sw = ctx.serviceWorkers()[0] || (await ctx.waitForEvent("serviceworker"));
const extBase = sw.url().replace(/^(chrome-extension:\/\/[^/]+\/).*$/, "$1");
await sleep(2000);
// Lumno suggests graphics acceleration where the browser draws without the GPU; keep that
// notice closed everywhere but its own scene.
const GRAPHICS_NOTICE_DISMISSED_KEY = "_x_lumno_feature_hint_local_dismissed_2026_graphics_acceleration_notice_1";
await sw.evaluate((key) => chrome.storage.local.set({ [key]: true }), GRAPHICS_NOTICE_DISMISSED_KEY);

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
  await sw.evaluate(() => chrome.commands.onCommand.dispatch("show-search"));
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
// With lighterOnly, only what is lighter than the backdrop counts: a white panel without its shadow.
async function overlayBox(page, { lighterOnly = false } = {}) {
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
      const differs = lighterOnly
        ? data[i] + data[i + 1] + data[i + 2] - bg[0] - bg[1] - bg[2] > 12
        : Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]) > 18;
      if (differs) {
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

// The box of whatever changed between two screenshots of the same page (Lumno UI that has
// just appeared over a busy page, where overlayBox's plain-backdrop trick doesn't work).
async function diffBox(page, before, after) {
  const read = (image) => sharp(image).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const [{ data: a, info }, { data: b }] = await Promise.all([read(before), read(after)]);
  const scale = info.width / page.viewportSize().width;
  let left = info.width, top = info.height, right = -1, bottom = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 3;
      if (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]) > 30) {
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
const unionBox = (a, b) => (!a ? b : !b ? a : { left: Math.min(a.left, b.left), top: Math.min(a.top, b.top), right: Math.max(a.right, b.right), bottom: Math.max(a.bottom, b.bottom) });
const PINNED_SITES_KEY = "_x_extension_newtab_pinned_recent_sites_2026_unique_";

// New tab helpers: preferences go to both storage areas the extension may read from.
async function setPrefs(values) {
  await sw.evaluate(async (entries) => {
    await chrome.storage.sync.set(entries).catch(() => {});
    await chrome.storage.local.set(entries).catch(() => {});
  }, values);
  await sleep(300);
}
// Stores the new tab's shortcuts (and their groups, else one untitled group), as the new tab saves them.
async function saveShortcuts(items, groups) {
  const plan = ShortcutsStore.createShortcutStoragePlan({ groups, items });
  await sw.evaluate(async ({ payload, overflow }) => {
    await chrome.storage.sync.set(payload);
    await chrome.storage.local.set(overflow);
  }, { payload: plan.payload, overflow: { [ShortcutsStore.SHORTCUTS_LOCAL_OVERFLOW_KEY]: plan.overflowRecord } });
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
  // Shortcut icons arrive one by one; a cold profile can still be fetching some.
  await page.waitForFunction(() => [...document.images].every((img) => img.complete), null, { timeout: 8000 }).catch(() => {});
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
  await saveShortcuts(cfg.shortcuts || []);
  await setPrefs({
    _x_extension_newtab_shortcut_add_visible_2026_unique_: false,
    _x_extension_newtab_wordmark_visible_2026_unique_: "time",
    ...(cfg.wallpaper
      ? { _x_extension_newtab_wallpaper_2026_unique_: { version: 2, sameForModes: true, light: cfg.wallpaper, dark: cfg.wallpaper } }
      : {}),
  });
}

const FULL_NEWTAB_WALLPAPER = cfg.fullNewtabWallpaper || "impressionist-orchard-white";
async function stageFullNewtab() {
  await setPrefs({
    _x_extension_newtab_wallpaper_2026_unique_: { version: 2, sameForModes: true, light: FULL_NEWTAB_WALLPAPER, dark: FULL_NEWTAB_WALLPAPER },
    _x_extension_newtab_wallpaper_overlay_2026_unique_: { version: 2, light: 0, dark: 0 },
    _x_extension_bookmark_columns_2024_unique_: 4,
    _x_extension_bookmark_count_2024_unique_: 8,
    _x_extension_recent_count_2024_unique_: 4,
  });
}
async function unstageFullNewtab() {
  await setPrefs({
    _x_extension_newtab_wallpaper_2026_unique_: { version: 2, sameForModes: true, light: cfg.wallpaper, dark: cfg.wallpaper },
    _x_extension_newtab_wallpaper_overlay_2026_unique_: { version: 2, light: 50, dark: 50 },
    _x_extension_bookmark_columns_2024_unique_: 6,
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
    await sw.evaluate(() => chrome.commands.onCommand.dispatch("show-tab-switcher"));
    await sleep(1500);
    // Its shadow reaches far below the panel; keep as much room below the panel as above it.
    const outer = await overlayBox(page);
    const panel = await overlayBox(page, { lighterOnly: true });
    await shot("switcher", page, outer && panel ? { ...outer, bottom: Math.min(outer.bottom, panel.bottom + (panel.top - outer.top)) } : outer);
    await closeOverlay(page);
  },
  // The whole new tab, staged like a real one: a vivid painting with no veil, eight bookmarks
  // filling two rows of four, one full row of frequent sites.
  async newtab() {
    await stageFullNewtab();
    const nt = await openNewtab();
    await sleep(1200);
    await shot("newtab", nt);
    await nt.close();
    await unstageFullNewtab();
  },
  // The capsule under the new tab's search box when the browser draws without the GPU.
  async "graphics-notice"() {
    await setPrefs({
      _x_extension_newtab_shortcuts_visible_2026_unique_: false,
      _x_extension_newtab_wordmark_visible_2026_unique_: "time",
      ...(cfg.wallpaper
        ? { _x_extension_newtab_wallpaper_2026_unique_: { version: 2, sameForModes: true, light: cfg.wallpaper, dark: cfg.wallpaper } }
        : {}),
    });
    // The capture browser has a GPU, so the worker's probe is told there is none: WebGL and
    // WebGPU both come back empty, as they do with graphics acceleration off.
    await sw.evaluate(async (key) => {
      globalThis.__lumnoGuideGetContext = OffscreenCanvas.prototype.getContext;
      OffscreenCanvas.prototype.getContext = () => null;
      if (navigator.gpu) {
        globalThis.__lumnoGuideRequestAdapter = navigator.gpu.requestAdapter;
        navigator.gpu.requestAdapter = async () => null;
      }
      await chrome.storage.local.set({ _x_lumno_graphics_probe_2026_unique_: { rendering: "software", checkedAt: Date.now() } });
      await chrome.storage.local.remove(key);
      // The new tab's other tips (help center, WebDAV and the rest) would share the picture.
      const tips = ["newtab_wallpaper_sources_0_9_58", "newtab_ai_quick_jump_0_9_9", "newtab_tab_switcher_0_9_13", "newtab_webdav_sync_0_9_58", "newtab_help_center_ask_1_0_0"];
      for (const area of ["sync", "local"]) {
        await chrome.storage[area].set(Object.fromEntries(tips.map((tip) => [`_x_lumno_feature_hint_${area}_dismissed_2026_${tip}`, true])));
      }
    }, GRAPHICS_NOTICE_DISMISSED_KEY);
    const page = await ctx.newPage();
    await page.clock.setFixedTime(new Date("2026-10-10T09:41:00"));
    await page.goto(extBase + "newtab.html");
    await page.locator(".x-lumno-feature-hint--graphics-notice").filter({ visible: true }).first().waitFor({ timeout: 10000 });
    await page.mouse.move(5, 5);
    await sleep(1200);
    await shot("graphics-notice", page, await boxOf(page, ["#_x_extension_newtab_root_2024_unique_", ".x-lumno-feature-hint--graphics-notice"]));
    await page.close();
    await sw.evaluate(async (key) => {
      OffscreenCanvas.prototype.getContext = globalThis.__lumnoGuideGetContext;
      if (navigator.gpu) navigator.gpu.requestAdapter = globalThis.__lumnoGuideRequestAdapter;
      await chrome.storage.local.set({ [key]: true, _x_lumno_graphics_probe_2026_unique_: { rendering: "hardware", checkedAt: Date.now() } });
    }, GRAPHICS_NOTICE_DISMISSED_KEY);
    await setPrefs({ _x_extension_newtab_shortcuts_visible_2026_unique_: true });
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
  // The bookmarks area at rest, then each layout with the first folder open. A folder nested in the
  // first one, put there for the layout shots only, shows that both layouts go more than one level deep.
  async "nt-bookmarks"() {
    const BOOKMARKS = "#_x_extension_newtab_bookmarks_2024_unique_";
    const BOOKMARK_COUNT_KEY = "_x_extension_bookmark_count_2024_unique_";
    const BOOKMARK_COLUMNS_KEY = "_x_extension_bookmark_columns_2024_unique_";
    // At rest: the pointer over the first folder shows the sites inside it.
    const overview = await openNewtab();
    await overview.locator(`${BOOKMARKS} [class*='folder']`).first().hover().catch(() => {});
    await sleep(900);
    await shot("nt-bookmarks", overview, await boxOf(overview, [BOOKMARKS]));
    await overview.close();
    const subfolder = cfg.bookmarkSubfolder;
    for (const child of subfolder ? subfolder.children : []) await (await visit(child.url)).close();
    const subfolderId = subfolder
      ? await sw.evaluate(async ({ parentTitle, title, children }) => {
          const [bar] = (await chrome.bookmarks.getTree())[0].children;
          const parent = (await chrome.bookmarks.getChildren(bar.id)).find((node) => node.title === parentTitle);
          const node = await chrome.bookmarks.create({ parentId: parent.id, title, index: 0 });
          for (const child of children) await chrome.bookmarks.create({ parentId: node.id, ...child });
          return node.id;
        }, { parentTitle: cfg.bookmarks[0].title, ...subfolder })
      : null;
    const { [BOOKMARK_COUNT_KEY]: bookmarkCount, [BOOKMARK_COLUMNS_KEY]: bookmarkColumns } = await sw.evaluate(
      async (keys) => chrome.storage.sync.get(keys),
      [BOOKMARK_COUNT_KEY, BOOKMARK_COLUMNS_KEY],
    );
    for (const [index, mode] of ["folder", "list", "top"].entries()) {
      // The list shot has one row of four: the menus open over empty space instead of half-covering a
      // card, and the open folder keeps room for its name beside the site icons it shows while open.
      await setPrefs(
        mode === "list"
          ? { [BOOKMARK_COUNT_KEY]: 4, [BOOKMARK_COLUMNS_KEY]: 4 }
          : { [BOOKMARK_COUNT_KEY]: bookmarkCount ?? 8, [BOOKMARK_COLUMNS_KEY]: bookmarkColumns ?? 6 },
      );
      const page = await openNewtab();
      await pickOption(page, "#_x_extension_newtab_bookmark_mode_2026_unique_", index);
      await page.mouse.move(5, 5);
      await sleep(900);
      if (mode === "top") {
        await shot(`nt-bookmarks-${mode}`, page, await boxOf(page, ["[class*='topbar']", "#_x_extension_newtab_wordmark_2026_unique_", "#_x_extension_newtab_root_2024_unique_", "#_x_extension_newtab_shortcuts_2026_unique_"]));
        await page.close();
        continue;
      }
      await page.locator(`${BOOKMARKS} [class*='folder']`).first().click().catch(() => {});
      await sleep(1200);
      if (mode === "list") {
        // The menu hangs over the site cards; hide them (not their space) so it reads on its own.
        await page.addStyleTag({ content: "#_x_extension_newtab_bottom_dock_scroller_2024_unique_ > section:not(#_x_extension_newtab_bookmarks_2024_unique_) { visibility: hidden !important; }" });
        if (subfolder) {
          await page.locator(".x-nt-bookmark-cascade-level").first().getByText(subfolder.title, { exact: true }).hover().catch(() => {});
          await sleep(1200);
        }
        await page.waitForFunction(() => [...document.images].every((img) => img.complete), null, { timeout: 8000 }).catch(() => {});
      } else {
        // Inside the folder; the pointer leaves so no tooltip covers the cards.
        await page.mouse.move(5, 5);
        await sleep(900);
      }
      await shot(`nt-bookmarks-${mode}`, page, await boxOf(page, [BOOKMARKS, ".x-nt-bookmark-cascade-level"]));
      await page.close();
    }
    await setPrefs({ [BOOKMARK_COUNT_KEY]: bookmarkCount ?? 8, [BOOKMARK_COLUMNS_KEY]: bookmarkColumns ?? 6 });
    if (subfolderId) await sw.evaluate((id) => chrome.bookmarks.removeTree(id), subfolderId);
    const reset = await openNewtab();
    await pickOption(reset, "#_x_extension_newtab_bookmark_mode_2026_unique_", 0);
    await reset.close();
  },
  // Settings → Appearance → New Tab: bookmark rows (0 hides them), bookmarks per row, folder icons, site cards.
  async "nt-layout-settings"() {
    const page = await ctx.newPage();
    await page.goto(`${extBase}src/options/options.html`);
    await sleep(2000);
    await page.click("._x_extension_settings_tab_button_2024_unique_[data-tab='appearance']");
    await sleep(1200);
    await page.locator("#_x_extension_bookmark_rows_setting_row_2026_unique_").evaluate((row) => row.scrollIntoView({ block: "center" }));
    await sleep(900);
    // Only these rows: the ones around them are hidden, and the picture ends at the panel's own edges.
    const box = await page.evaluate((pad) => {
      const first = document.getElementById("_x_extension_bookmark_rows_setting_row_2026_unique_");
      const last = document.getElementById("_x_extension_recent_count_control_2026_unique_").closest("._x_extension_setting_row_2024_unique_");
      let inside = false;
      for (const row of first.parentElement.children) {
        if (row === first) inside = true;
        if (!inside) row.style.visibility = "hidden";
        if (row === last) inside = false;
      }
      let panel = first.parentElement;
      while (panel.parentElement && getComputedStyle(panel).backgroundColor === "rgba(0, 0, 0, 0)") panel = panel.parentElement;
      const edges = panel.getBoundingClientRect();
      return {
        // Two pixels in, past the panel's border.
        left: edges.left + pad + 2,
        top: first.getBoundingClientRect().top,
        right: edges.right - pad - 2,
        bottom: last.getBoundingClientRect().bottom,
      };
    }, PAD);
    await shot("nt-layout-settings", page, box);
    await page.close();
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
  // A shortcut folder, opened: the AI shortcuts stacked into one bookmarks-bar folder, as dropping
  // one shortcut on another makes them. The folder and the shortcut list are put back afterwards.
  async "nt-shortcut-folder"() {
    const folder = cfg.shortcutFolder;
    if (!folder) return;
    const folderId = await sw.evaluate(async ({ title, children }) => {
      const [bar] = (await chrome.bookmarks.getTree())[0].children;
      const node = await chrome.bookmarks.create({ parentId: bar.id, title });
      for (const child of children) await chrome.bookmarks.create({ parentId: node.id, ...child });
      return node.id;
    }, folder);
    const stacked = new Set(folder.children.map((child) => child.url));
    const shortcuts = cfg.shortcuts || [];
    const at = shortcuts.findIndex((item) => stacked.has(item.url));
    const items = shortcuts.filter((item) => !stacked.has(item.url));
    items.splice(Math.max(0, at), 0, { type: "folder", folderId, title: folder.title });
    // The bookmarks under the shortcuts would show half-covered behind the menu; hide them for this shot.
    const BOOKMARK_COUNT_KEY = "_x_extension_bookmark_count_2024_unique_";
    const bookmarkCount = await sw.evaluate(async (key) => (await chrome.storage.sync.get(key))[key], BOOKMARK_COUNT_KEY);
    await setPrefs({ [BOOKMARK_COUNT_KEY]: 0 });
    await saveShortcuts(items);
    const page = await openNewtab();
    const tile = page.locator(".x-nt-shortcut-tile").nth(Math.max(0, at));
    await tile.click();
    await sleep(1200);
    // Folder sites' icons load after the menu opens.
    await page.waitForFunction(() => [...document.images].every((img) => img.complete), null, { timeout: 8000 }).catch(() => {});
    // The site cards then rise to just under the menu; hiding them (not their space) keeps the usual layout.
    await page.addStyleTag({ content: "#_x_extension_newtab_bottom_dock_scroller_2024_unique_ > section:not(#_x_extension_newtab_bookmarks_2024_unique_) { visibility: hidden !important; }" });
    await shot("nt-shortcut-folder", page, await boxOf(page, ["#_x_extension_newtab_root_2024_unique_", "#_x_extension_newtab_shortcuts_2026_unique_", ".x-nt-bookmark-cascade-level"]));
    await page.keyboard.press("Escape");
    await page.close();
    await saveShortcuts(shortcuts);
    await sw.evaluate((id) => chrome.bookmarks.removeTree(id), folderId);
    await setPrefs({ [BOOKMARK_COUNT_KEY]: bookmarkCount ?? 8 });
  },
  // Shortcuts sorted into titled groups (cfg.shortcutGroups names each group and the sites in it),
  // the pointer on the first group's title. The ungrouped list is put back afterwards.
  async "nt-shortcut-groups"() {
    const groups = cfg.shortcutGroups;
    if (!groups) return;
    const shortcuts = cfg.shortcuts || [];
    const state = {
      groups: groups.map((group, index) => ({ id: `guide-group-${index}`, title: group.title })),
      items: groups.flatMap((group, index) =>
        group.urls.map((url) => ({ ...shortcuts.find((item) => item.url === url), groupId: `guide-group-${index}` })),
      ),
    };
    const BOOKMARK_COUNT_KEY = "_x_extension_bookmark_count_2024_unique_";
    const bookmarkCount = await sw.evaluate(async (key) => (await chrome.storage.sync.get(key))[key], BOOKMARK_COUNT_KEY);
    await setPrefs({ [BOOKMARK_COUNT_KEY]: 0 });
    await saveShortcuts(state.items, state.groups);
    const page = await openNewtab();
    // Three groups need more height than 800px leaves above the site cards, where the shortcuts would scroll.
    await page.setViewportSize({ width: 1280, height: 1000 });
    await sleep(1200);
    // The pointer rests on the first group's title, so its "···" menu button shows.
    await page.locator(".x-nt-shortcut-group-header").first().hover().catch(() => {});
    await sleep(800);
    // The site cards are hidden, so the shortcuts may use their room instead of scrolling above them.
    await page.addStyleTag({ content: "#_x_extension_newtab_bottom_dock_scroller_2024_unique_ > section:not(#_x_extension_newtab_bookmarks_2024_unique_) { visibility: hidden !important; } .x-nt-shortcuts-section[data-shortcuts-scrollable='true'] { max-height: none !important; overflow: visible !important; mask-image: none !important; }" });
    await sleep(600);
    await shot("nt-shortcut-groups", page, await boxOf(page, ["#_x_extension_newtab_root_2024_unique_", ".x-nt-shortcut-group-header", ".x-nt-shortcut-tile"]));
    await page.close();
    await saveShortcuts(shortcuts);
    await setPrefs({ [BOOKMARK_COUNT_KEY]: bookmarkCount ?? 8 });
  },
  // The whole new tab in the Liquid glass material, over the full new tab's wallpaper.
  async "nt-glass"() {
    await stageFullNewtab();
    await setPrefs({ _x_extension_newtab_glass_style_2026_unique_: "liquid" });
    const page = await openNewtab();
    await sleep(1500);
    await shot("nt-glass", page);
    await page.close();
    await setPrefs({ _x_extension_newtab_glass_style_2026_unique_: "none" });
    await unstageFullNewtab();
  },
  async "nt-recent"() {
    const page = await openNewtab();
    await shot("nt-recent", page, await boxOf(page, ["#_x_extension_newtab_bottom_dock_scroller_2024_unique_ > section:not(#_x_extension_newtab_bookmarks_2024_unique_)"]));
    await page.close();
  },
  async "nt-clock"() {
    await stageFullNewtab();
    // The daily quote is a random draw; serve one chosen line so the picture stays the same.
    if (cfg.quote) {
      await ctx.route("https://v1.hitokoto.cn/**", (route) =>
        route.fulfill({ contentType: "application/json", body: JSON.stringify(cfg.quote) }),
      );
    }
    await setPrefs({
      _x_extension_newtab_quote_prefs_2026_unique_: { enabled: true, position: "input", category: cfg.quoteCategory || "literature" },
    });
    const page = await openNewtab();
    await sleep(1500);
    await shot("nt-clock", page);
    await page.close();
    await setPrefs({ _x_extension_newtab_quote_prefs_2026_unique_: { enabled: false } });
    await unstageFullNewtab();
  },
  async "nt-zen"() {
    await setPrefs({ _x_extension_newtab_zen_mode_2026_unique_: true });
    const page = await openNewtab();
    await shot("nt-zen", page);
    await page.close();
    await setPrefs({ _x_extension_newtab_zen_mode_2026_unique_: false });
  },
  // Use cases. Bookmarks and history that turn up for one query: a saved page and a read one.
  async "uc-research"(page) {
    const research = cfg.useCases && cfg.useCases.research;
    if (!research) return;
    for (const url of research.history) await (await visit(url)).close();
    const folderId = await sw.evaluate(async ({ title, children }) => {
      const [bar] = (await chrome.bookmarks.getTree())[0].children;
      const folder = await chrome.bookmarks.create({ parentId: bar.id, title });
      for (const child of children) await chrome.bookmarks.create({ parentId: folder.id, ...child });
      return folder.id;
    }, research.folder);
    // Search suggestions follow the network's region, not the page language; keep this
    // picture to what Lumno found in bookmarks and history.
    await ctx.route("https://suggestqueries.google.com/**", (route) => route.fulfill({ contentType: "application/json", body: "[]" }));
    await openOverlay(page);
    await page.keyboard.type(research.query, { delay: 80 });
    // Suggestions arrive after the local results; measure once the list has settled.
    await sleep(2000);
    await shot("uc-research", page, await overlayBox(page));
    await closeOverlay(page);
    await sw.evaluate((id) => chrome.bookmarks.removeTree(id), folderId);
    await ctx.unroute("https://suggestqueries.google.com/**");
  },
  // Dozens of tabs, narrowed to the open ones whose titles match.
  async "uc-tabs"(page) {
    const useCases = cfg.useCases;
    if (!useCases || !useCases.tabs) return;
    const extra = [];
    for (const url of useCases.tabs) extra.push(await visit(url));
    await page.bringToFront();
    await sleep(800);
    await openOverlay(page);
    await page.keyboard.press("Tab");
    await sleep(700);
    await page.keyboard.type(useCases.tabsQuery, { delay: 80 });
    await shot("uc-tabs", page, await overlayBox(page));
    await closeOverlay(page);
    await closeOverlay(page);
    for (const tab of extra) await tab.close();
  },
  // Select a sentence in an article; Lumno's selection button opens its actions.
  async "uc-selection"() {
    const article = cfg.useCases && cfg.useCases.article;
    if (!article) return;
    await setPrefs({ _x_extension_selection_quick_actions_enabled_2026_unique_: true });
    const page = await ctx.newPage();
    await page.goto(`${BLANK_URL}article`);
    await sleep(1500);
    const selection = await page.evaluate((target) => {
      for (const p of document.querySelectorAll("p")) {
        const node = p.firstChild;
        const start = node && node.textContent.indexOf(target);
        if (!node || start < 0) continue;
        const range = document.createRange();
        range.setStart(node, start);
        range.setEnd(node, start + target.length);
        const rects = [...range.getClientRects()];
        const first = rects[0];
        const last = rects[rects.length - 1];
        const para = p.closest("main").getBoundingClientRect();
        return {
          from: { x: first.left + 1, y: first.top + first.height / 2 },
          to: { x: last.right - 1, y: last.top + last.height / 2 },
          article: { left: para.left, top: para.top, right: para.right, bottom: para.bottom },
        };
      }
      return null;
    }, article.select);
    if (!selection) throw new Error("selection text not found");
    await page.mouse.move(selection.from.x, selection.from.y);
    await page.mouse.down();
    await page.mouse.move(selection.to.x, selection.to.y, { steps: 12 });
    await page.mouse.up();
    const selected = await page.screenshot();
    await sleep(1000);
    const entry = await diffBox(page, selected, await page.screenshot());
    if (!entry) throw new Error("selection button did not appear");
    await page.mouse.click((entry.left + entry.right) / 2, (entry.top + entry.bottom) / 2);
    await sleep(1600);
    const toolbar = await diffBox(page, selected, await page.screenshot());
    await shot("uc-selection", page, unionBox(selection.article, toolbar));
    await page.close();
    await setPrefs({ _x_extension_selection_quick_actions_enabled_2026_unique_: false });
  },
  // Web clip: the /clip command in the command bar, then the picker's highlight on an article.
  async "web-clip"(front) {
    const article = cfg.useCases && cfg.useCases.article;
    if (!article || !article.table) return;
    await setPrefs({ _x_extension_document_pip_enabled_2026_unique_: true });
    // The command itself, on the plain page like the other command bar pictures.
    await openOverlay(front);
    await front.keyboard.type("/clip", { delay: 120 });
    await sleep(900);
    await shot("clip-command", front, await overlayBox(front));
    await closeOverlay(front);
    await closeOverlay(front);
    const page = await ctx.newPage();
    await page.goto(`${BLANK_URL}article-clip`);
    await sleep(1500);
    const before = await page.screenshot();
    await openOverlay(page);
    await page.keyboard.type("/clip", { delay: 120 });
    await sleep(900);
    await page.keyboard.press("Enter");
    await sleep(1200);
    const table = await page.evaluate(() => {
      const r = document.getElementById("clip-target").getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, top: r.top, bottom: r.bottom };
    });
    await page.mouse.move(table.x - 30, table.y - 10);
    await page.mouse.move(table.x, table.y, { steps: 8 });
    await sleep(900);
    // The picker starts on the article; one step inward ("]") lands on the table.
    for (let step = 0; step < Number(process.env.CLIP_STEPS || 1); step++) {
      await page.keyboard.press("]");
      await sleep(700);
    }
    const picked = await diffBox(page, before, await page.screenshot());
    // The hint at the top and the highlighted table, with the article around them.
    const main = await page.evaluate(() => {
      const r = document.querySelector("main").getBoundingClientRect();
      return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
    });
    await shot("clip-picker", page, unionBox(picked, main));
    await page.keyboard.press("Escape");
    await page.close();
    await setPrefs({ _x_extension_document_pip_enabled_2026_unique_: false });
  },
  // Link preview: Shift+click a link in the article; the page recedes behind the preview window.
  async "link-preview"() {
    const article = cfg.useCases && cfg.useCases.article;
    if (!article || !article.link || !article.link.page) return;
    const page = await ctx.newPage();
    await page.goto(`${BLANK_URL}article-link`);
    await sleep(1500);
    const link = await page.evaluate(() => {
      const r = document.getElementById("preview-link").getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    await page.mouse.move(link.x, link.y, { steps: 6 });
    await page.keyboard.down("Shift");
    await sleep(400);
    await page.mouse.click(link.x, link.y);
    await page.keyboard.up("Shift");
    // Let the previewed page load and the opening settle.
    await sleep(Number(process.env.PREVIEW_WAIT || 3000));
    // Park the pointer away from the window's buttons so none shows its hover state.
    await page.mouse.move(8, 8);
    await shot("link-preview", page);
    await page.keyboard.press("Escape");
    await page.close();
  },
  // Pinned episode and chapter cards that follow progress (the radar icon).
  async "uc-series"() {
    const series = cfg.useCases && cfg.useCases.series;
    if (!series) return;
    await prepareNewtab();
    const now = Date.now();
    await setPrefs({
      [PINNED_SITES_KEY]: series.map((item, index) => ({
        ...item,
        progressTracking: true,
        progressId: `guide-${index}`,
        pinnedAt: now - index * 1000,
        lastVisitTime: now - index * 60000,
      })),
    });
    const page = await openNewtab();
    await sleep(1200);
    await shot("uc-series", page, await boxOf(page, ["#_x_extension_newtab_bottom_dock_scroller_2024_unique_ > section:not(#_x_extension_newtab_bookmarks_2024_unique_)"]));
    await page.close();
    await setPrefs({ [PINNED_SITES_KEY]: [] });
  },
  async shortcuts() {
    const sc = await ctx.newPage();
    await sc.goto("chrome://extensions/shortcuts");
    await sleep(1500);
    // A browser page with nothing of Lumno's to measure: the shortcuts card and the sidebar beside it.
    await shot("shortcuts", sc, { left: 0, top: 0, right: 1040, bottom: 440 });
    await sc.close();
  },
  // The same page after the tab switcher guide's console snippet binds ⌃ Tab, run as the guide writes it.
  async "shortcuts-ctrl-tab"() {
    const sc = await ctx.newPage();
    await sc.goto("chrome://extensions/shortcuts");
    await sleep(1500);
    await sc.evaluate(async () => {
      const extensions = await chrome.developerPrivate.getExtensionsInfo();
      const lumno = extensions.find((item) =>
        item.commands.some((command) => command.name === "show-tab-switcher"));
      await chrome.developerPrivate.updateExtensionCommand({
        extensionId: lumno.id,
        commandName: "show-tab-switcher",
        keybinding: "Ctrl+Tab",
      });
    });
    await sc.reload();
    await sleep(1500);
    await shot("shortcuts-ctrl-tab", sc, { left: 0, top: 0, right: 1040, bottom: 440 });
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
