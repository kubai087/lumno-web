// Saves the favicon of every external site the help pages link to, so the pages
// serve them from this site instead of sending visitors to a favicon service.
// Usage: node scripts/guide-screenshots/favicons.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const REPO = path.resolve(import.meta.dirname, "../..");
const CONTENT = path.join(REPO, "src/content/guides");
const TARGET = path.join(REPO, "public/assets/guides/favicons");

const hosts = new Set();
for (const file of fs.readdirSync(CONTENT).filter((name) => name.endsWith(".md"))) {
  const source = fs.readFileSync(path.join(CONTENT, file), "utf8");
  for (const [, href] of source.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) hosts.add(new URL(href).hostname);
}

fs.mkdirSync(TARGET, { recursive: true });
for (const host of [...hosts].sort()) {
  const response = await fetch(`https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`);
  if (!response.ok) {
    console.warn(`skip ${host}: ${response.status}`);
    continue;
  }
  // 32px PNG: crisp at the 16px it is shown, small enough to inline in a page's requests.
  await sharp(Buffer.from(await response.arrayBuffer())).resize(32, 32).png().toFile(path.join(TARGET, `${host}.png`));
  console.log(`favicons/${host}.png`);
}
