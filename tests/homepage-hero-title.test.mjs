import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");
const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/index.astro"), "utf8");
const contentSource = fs.readFileSync(
  path.join(workspaceRoot, "src/lib/home-content.ts"),
  "utf8",
);

test("simplified Chinese hero title wraps only at its comma", () => {
  assert.match(source, /uiLocale === "zh-CN" \? content\.heroTitle\.indexOf\("，"\) : -1/);
  assert.match(source, /const heroTitleSeparator = heroTitleCommaIndex >= 0/);
  assert.match(source, /content\.heroTitle\.slice\(0, heroTitleCommaIndex\)/);
  assert.match(source, /class:list=\{\{ "hero-title-has-break": heroTitleSegments\.length > 1 \}\}/);
  assert.match(source, /<span class="hero-title-separator">\{heroTitleSeparator\}<\/span>/);
  assert.match(
    source,
    /\.hero-title-has-break \.hero-title-segment\s*\{[\s\S]*?display:\s*inline-block;[\s\S]*?white-space:\s*nowrap;/,
  );
  assert.match(
    source,
    /@media \(max-width:\s*760px\)[\s\S]*?\.hero-title-has-break \.hero-title-line\s*\{[\s\S]*?flex-direction:\s*column;[\s\S]*?align-items:\s*center;/,
  );
  assert.match(
    source,
    /@media \(max-width:\s*760px\)[\s\S]*?\.hero-title-separator\s*\{[\s\S]*?display:\s*none;/,
  );
});

test("simplified Chinese hero title renders one uninterrupted text style", () => {
  assert.match(source, /<span class="hero-title-segment">\s*\{segment\}/);
  assert.doesNotMatch(source, /heroTitleRotation|heroTitleHighlightedWord|hero-title-rotator/);
  assert.doesNotMatch(source, /HeroTitleRotator|AnimatePresence|is-entering-ready|hero-title-word-enter|hero-title-word-exit/);
});

test("mobile hero copy preserves curved-screen safe spacing", () => {
  assert.match(
    source,
    /@media \(max-width:\s*760px\)[\s\S]*?\.hero-copy\s*\{[\s\S]*?padding-left:\s*max\(8px,\s*env\(safe-area-inset-left\)\);[\s\S]*?padding-right:\s*max\(8px,\s*env\(safe-area-inset-right\)\);/,
  );
  assert.match(source, /font-size:\s*clamp\(28px,\s*8\.5vw,\s*40px\);/);
});

test("localized hero descriptions preserve their intentional sentence break", () => {
  const descriptionsWithLineBreak = contentSource.match(
    /heroDescription:\s*\n\s*"[^"\n]*\\n[^"\n]*"/g,
  );

  assert.equal(descriptionsWithLineBreak?.length, 3);
  assert.match(
    source,
    /\.hero-copy > p\s*\{[\s\S]*?white-space:\s*pre-line;/,
  );
});
