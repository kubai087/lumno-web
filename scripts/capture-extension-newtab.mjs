#!/usr/bin/env node
/*
 * Captures what the extension's new tab computes for the sites the /design
 * gallery shows: each site's favicon as the new tab draws it, and the colors
 * it derives from that favicon (a shortcut tile's icon plate, a bookmark
 * card's fill, border and shadow), in light and dark.
 *
 *   npm i --no-save playwright
 *   CHROMIUM_PATH=… node scripts/capture-extension-newtab.mjs [path/to/lumno-extension]
 *
 * Loads the unpacked extension in Playwright's Chromium, seeds its new tab
 * with the sites (as shortcuts and bookmarks), and writes
 * src/components/design/extension/newtab-sites.json and
 * public/assets/design/favicons/<id>.<ext>. Needs network access for the
 * favicons. The output is committed; rerun when the site list or the
 * extension's theming changes.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright";
import { NEWTAB_SITES } from "../src/components/design/newtab-sites-list.mjs";

const root = path.resolve(import.meta.dirname, "..");
const extension = path.resolve(process.argv[2] || path.join(root, "..", "lumno-extension"));
const faviconDir = path.join(root, "public/assets/design/favicons");
const outFile = path.join(root, "src/components/design/extension/newtab-sites.json");
const SHORTCUTS_KEY = "_x_extension_newtab_shortcuts_2026_unique_";
const VIEW_MODE_KEY = "_x_extension_bookmark_view_mode_2026_unique_";
const FOLDER = "Lumno design gallery";

/** Waits until every favicon in `selector` has loaded (or 20 seconds pass). */
async function waitForFavicons(page, selector) {
  await page
    .waitForFunction(
      (sel) => {
        const images = [...document.querySelectorAll(sel)];
        return images.length > 0 && images.every((img) => img.getAttribute("data-favicon-load-state") === "loaded" && img.src.startsWith("data:"));
      },
      selector,
      { timeout: 20000 },
    )
    .catch(() => {});
}

async function capture(theme) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "lumno-newtab-"));
  const context = await chromium.launchPersistentContext(profile, {
    executablePath: process.env.CHROMIUM_PATH || undefined,
    headless: true,
    args: [`--disable-extensions-except=${extension}`, `--load-extension=${extension}`, "--headless=new"],
    viewport: { width: 1440, height: 1000 },
    colorScheme: theme,
  });
  try {
    let [worker] = context.serviceWorkers();
    if (!worker) worker = await context.waitForEvent("serviceworker", { timeout: 20000 });
    const id = worker.url().split("/")[2];
    const page = await context.newPage();
    await page.goto(`chrome-extension://${id}/newtab.html`);
    await page.waitForTimeout(1500);
    const results = {};
    // Shortcuts hold up to a row; seed them in batches, and every site as a bookmark in one folder.
    const batches = [];
    for (let i = 0; i < NEWTAB_SITES.length; i += 8) batches.push(NEWTAB_SITES.slice(i, i + 8));
    await page.evaluate(
      async ({ sites, folder, viewKey }) => {
        const tree = await chrome.bookmarks.getTree();
        const bar = tree[0].children[0];
        const node = await chrome.bookmarks.create({ parentId: bar.id, title: folder });
        for (const site of sites) await chrome.bookmarks.create({ parentId: node.id, title: site.title, url: site.url });
        await chrome.storage.sync.set({ [viewKey]: "folder", _x_extension_bookmark_count_2024_unique_: 8, _x_extension_bookmark_columns_2024_unique_: 6 });
      },
      { sites: NEWTAB_SITES, folder: FOLDER, viewKey: VIEW_MODE_KEY },
    );
    for (const batch of batches) {
      await page.evaluate(
        ({ key, list }) => chrome.storage.sync.set({ [key]: list.map((site, index) => ({ id: `s${index}`, title: site.title, url: site.url })) }),
        { key: SHORTCUTS_KEY, list: batch },
      );
      await page.reload();
      await page.waitForTimeout(1500);
      await waitForFavicons(page, "img.x-nt-shortcut-favicon");
      const tiles = await page.evaluate(() =>
        [...document.querySelectorAll(".x-nt-shortcut-tile[data-shortcut-url]")].map((tile) => {
          const img = tile.querySelector("img.x-nt-shortcut-favicon");
          const style = getComputedStyle(tile);
          return {
            url: tile.dataset.shortcutUrl,
            iconBg: style.getPropertyValue("--x-nt-shortcut-icon-bg").trim(),
            iconColor: style.getPropertyValue("--x-nt-shortcut-icon-color").trim(),
            favicon: img && img.getAttribute("data-favicon-load-state") === "loaded" ? img.src : "",
            offset: img ? img.style.transform : "",
          };
        }),
      );
      for (const tile of tiles) {
        const site = NEWTAB_SITES.find((entry) => entry.url === tile.url);
        if (site) results[site.id] = { ...(results[site.id] || {}), tile };
      }
    }
    // The folder's cards, page by page.
    await page.evaluate((folder) => {
      const card = [...document.querySelectorAll(".x-nt-bookmark-card--folder")].find((el) => el.textContent.includes(folder));
      card && card.click();
    }, FOLDER);
    await page.waitForTimeout(1500);
    for (let pageIndex = 0; pageIndex < 6; pageIndex++) {
      await waitForFavicons(page, ".x-nt-bookmark-card[data-bookmark-type='bookmark'] img.x-nt-bookmark-icon");
      const cards = await page.evaluate(() =>
        [...document.querySelectorAll(".x-nt-bookmark-card[data-bookmark-type='bookmark']")].map((card) => {
          const style = card.getAttribute("style") || "";
          const vars = Object.fromEntries(
            style
              .split(";")
              .map((part) => part.trim())
              .filter((part) => part.startsWith("--x-nt-bookmark"))
              .map((part) => [part.slice(0, part.indexOf(":")).trim(), part.slice(part.indexOf(":") + 1).trim()]),
          );
          const img = card.querySelector("img.x-nt-bookmark-icon");
          return { title: card.querySelector(".x-nt-bookmark-title")?.textContent || "", vars, favicon: img ? img.src : "" };
        }),
      );
      for (const card of cards) {
        const site = NEWTAB_SITES.find((entry) => entry.title === card.title);
        if (site) results[site.id] = { ...(results[site.id] || {}), card: { vars: card.vars, favicon: card.favicon } };
      }
      const next = page.locator(".x-nt-bookmarks-pager-btn").nth(1);
      if ((await next.getAttribute("aria-disabled")) === "true") break;
      await next.click();
      await page.waitForTimeout(900);
    }
    return results;
  } finally {
    await context.close();
    fs.rmSync(profile, { recursive: true, force: true });
  }
}

function saveFavicon(id, dataUrl) {
  const match = /^data:image\/([a-z+]+);base64,(.+)$/.exec(dataUrl || "");
  if (!match) return "";
  const ext = match[1] === "svg+xml" ? "svg" : match[1] === "jpeg" ? "jpg" : match[1];
  fs.writeFileSync(path.join(faviconDir, `${id}.${ext}`), Buffer.from(match[2], "base64"));
  return `/assets/design/favicons/${id}.${ext}`;
}

fs.mkdirSync(faviconDir, { recursive: true });
const light = await capture("light");
const dark = await capture("dark");
const sites = {};
for (const site of NEWTAB_SITES) {
  const l = light[site.id] || {};
  const d = dark[site.id] || {};
  const favicon = saveFavicon(site.id, l.tile?.favicon || l.card?.favicon);
  if (!favicon) console.warn(`No favicon for ${site.id}`);
  sites[site.id] = {
    title: site.title,
    url: site.url,
    favicon,
    faviconOffset: l.tile?.offset || "",
    tile: { light: { bg: l.tile?.iconBg || "", color: l.tile?.iconColor || "" }, dark: { bg: d.tile?.iconBg || "", color: d.tile?.iconColor || "" } },
    card: { light: l.card?.vars || {}, dark: d.card?.vars || {} },
  };
}
fs.writeFileSync(outFile, `${JSON.stringify({ generatedBy: "scripts/capture-extension-newtab.mjs", sites }, null, 2)}\n`);
console.log(`Captured ${Object.keys(sites).length} sites into ${path.relative(root, outFile)}`);
