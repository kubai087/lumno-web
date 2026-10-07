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
  assert.match(source, /uiLocale\.startsWith\("zh"\) \? content\.heroTitle\.indexOf\("，"\) : -1/);
  assert.match(source, /const heroTitleSeparator = heroTitleCommaIndex >= 0/);
  assert.match(source, /content\.heroTitle\.slice\(0, heroTitleCommaIndex\)/);
  assert.match(source, /"hero-title-has-break": heroTitleSegments\.length > 1,/);
  assert.match(source, /<span class="hero-title-separator">\{heroTitleSeparator\}<\/span>/);
  assert.match(
    source,
    /\.hero-title-has-break \.hero-title-segment\s*\{[\s\S]*?display:\s*inline-block;[\s\S]*?white-space:\s*nowrap;/,
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
  assert.match(source, /font-size:\s*clamp\(34px,\s*10vw,\s*44px\);/);
});

test("hero description is two short lines that break at punctuation in Chinese", () => {
  const descriptionsWithLineBreak = contentSource.match(/heroDescription:\s*\n\s*"[^"\n]*\\n[^"\n]*"/g);

  assert.equal(descriptionsWithLineBreak?.length, 3);
  assert.match(contentSource, /"Lumno 是开源的浏览器命令栏与新标签页。\\n一个快捷键，搜遍标签页、书签、历史记录和常用网站。"/);
  assert.match(source, /heroDescriptionLines\.map\(\(line\) => <span class="hero-description-line">\{line\}<\/span>\)/);
  assert.match(source, /body\[data-locale\^="zh"\] \.hero-description-line\s*\{[\s\S]*?word-break:\s*keep-all;/);
  assert.match(source, /\.hero-description-line \+ \.hero-description-line\s*\{[\s\S]*?margin-top:\s*8px;/);
});

test("English hero uses the editorial serif slogan", () => {
  assert.match(contentSource, /heroTitle: "Your browser, at command\.",/);
  assert.match(contentSource, /heroTitleSerif: \{ lead: "Your browser,", accent: "at command\." \}/);
  assert.match(source, /import "@fontsource\/eb-garamond\/600\.css";/);
  assert.match(source, /import "@fontsource\/eb-garamond\/500-italic\.css";/);
  assert.match(source, /\.hero-title-serif-accent\s*\{[\s\S]*?font-style:\s*italic;/);
});
