import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

function readSource(file) {
  return fs.readFileSync(path.join(workspaceRoot, file), "utf8");
}

function sourceFiles(dir) {
  return fs.readdirSync(path.join(workspaceRoot, dir), { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && /\.(astro|tsx?|jsx?|mjs|md|css)$/.test(entry.name))
    .map((entry) => path.relative(workspaceRoot, path.join(entry.parentPath, entry.name)));
}

const iconRule = /^\.(ri-[a-z0-9-]+):before \{/gm;

test("the subset Remix Icon stylesheet covers every icon class used in src", () => {
  const fullIcons = new Set([...readSource("scripts/font-sources/remixicon.full.css").matchAll(iconRule)].map((m) => m[1]));
  const subsetIcons = new Set([...readSource("public/assets/remixicon.css").matchAll(iconRule)].map((m) => m[1]));
  const used = new Set(sourceFiles("src").flatMap((file) => readSource(file).match(/\bri-[a-z0-9-]+/g) ?? []));

  const missing = [...used].filter((name) => fullIcons.has(name) && !subsetIcons.has(name));
  assert.deepEqual(missing, [], "Run scripts/subset-fonts.py to add the new icons to public/assets/remixicon.*");
});

test("Open Sans ships as per-script WOFF2 subsets instead of the full TTF", () => {
  const fontFiles = ["latin", "latin-ext", "cyrillic-ext", "cyrillic", "greek", "vietnamese"].map((name) => `/assets/fonts/open-sans/open-sans-${name}.woff2`);
  for (const file of fontFiles) assert.ok(fs.existsSync(path.join(workspaceRoot, "public", file)), `${file} is missing`);

  for (const stylesheet of ["src/styles/site.css", "public/assets/fonts/open-sans/open-sans.css"]) {
    const css = readSource(stylesheet);
    for (const file of fontFiles) assert.match(css, new RegExp(`url\\("${file.replaceAll(".", "\\.")}"\\) format\\("woff2"\\)`));
    assert.equal(css.match(/unicode-range:/g)?.length, fontFiles.length);
  }

  const usesFullFont = sourceFiles("src").filter((file) => readSource(file).includes("OpenSans-VariableFont"));
  assert.deepEqual(usesFullFont, []);
});
