import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { resolveInitialLanguageMode } from "../src/lib/language-preference.js";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

test("forced locale wins over stored and system locale", () => {
  assert.equal(
    resolveInitialLanguageMode({
      forcedLocale: "en",
      storedMode: "ja",
      systemMode: "zh-CN",
    }),
    "en",
  );
});

test("stored locale wins over system locale on default routes", () => {
  assert.equal(
    resolveInitialLanguageMode({
      forcedLocale: "",
      storedMode: "fr",
      systemMode: "zh-CN",
    }),
    "fr",
  );
});

test("system locale is the fallback when nothing else is set", () => {
  assert.equal(
    resolveInitialLanguageMode({
      forcedLocale: "",
      storedMode: "",
      systemMode: "ko",
    }),
    "ko",
  );
});

test("onboarding uses the shared language preference helper", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/onboarding/index.astro"), "utf8");
  assert.match(source, /import "\.\.\/\.\.\/scripts\/language-preference"/);
  assert.match(source, /import "\.\.\/\.\.\/scripts\/language-runtime"/);
  assert.match(source, /window\.__lumnoLanguageRuntime\.setupLanguageRuntime\(/);
  assert.doesNotMatch(source, /function applyLanguageMode\(mode, options\)/);
});

test("release uses the shared language preference helper", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/release/index.astro"), "utf8");
  assert.match(source, /import "\.\.\/\.\.\/scripts\/language-preference"/);
  assert.match(source, /import "\.\.\/\.\.\/scripts\/language-runtime"/);
  assert.match(source, /window\.__lumnoLanguageRuntime\.setupLanguageRuntime\(/);
  assert.match(source, /shouldRedirect:\s*\(\)\s*=>\s*!INITIAL_ENTRY_CONTEXT\.isExtensionEntry/);
  assert.match(source, /window\.history\.replaceState\(\{\},\s*"",\s*window\.location\.pathname\)/);
  assert.doesNotMatch(source, /function applyLanguageMode\(mode, options\)/);
});

test("entry context config keeps extension entry key coverage", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/lib/entry-context.ts"), "utf8");
  assert.match(source, /EXTENSION_ENTRY_KEYS = \["entry", "source", "reason", "version", "updated", "upgrade", "install", "from", "context"\]/);
  assert.match(source, /latestVersion: formatVersionToken\(latestVersion \|\| ""\)/);
});

test("homepage uses the shared language preference helper too", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/index.astro"), "utf8");
  assert.match(source, /import "\.\.\/scripts\/language-preference"/);
  assert.match(source, /import "\.\.\/scripts\/language-runtime"/);
  assert.match(source, /window\.__lumnoLanguageRuntime\.setupLanguageRuntime\(/);
  assert.doesNotMatch(source, /function applyLanguageMode\(mode, options\)/);
});

test("privacy keeps x-default stable until a user has saved a language choice", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/privacy/index.astro"), "utf8");
  const headSource = source.slice(0, source.indexOf("</head>"));
  assert.match(source, /import "\.\.\/\.\.\/scripts\/language-preference"/);
  assert.match(source, /import "\.\.\/\.\.\/scripts\/language-runtime"/);
  assert.match(source, /window\.__lumnoLanguageRuntime\.setupLanguageRuntime\(/);
  assert.match(source, /routeLanguageMap:\s*ROUTE_LANGUAGE_MAP/);
  assert.match(headSource, /!forcedLocale && \(/);
  assert.match(headSource, /if \(!storedMode\) return;/);
  assert.match(headSource, /window\.location\.replace\(`/);
  assert.match(headSource, /routeMap\[resolvedLocale\]/);
  assert.ok(
    headSource.indexOf("if (!storedMode) return;") < headSource.indexOf("window.location.replace(`"),
    "privacy should only redirect before paint when a preference already exists",
  );
  assert.match(source, /const DEFAULT_PRIVACY_LOCALE = "zh-CN";/);
  assert.match(source, /const initialForcedLocale = FORCED_LOCALE \|\| \(!storedMode \? DEFAULT_PRIVACY_LOCALE : null\);/);
  assert.match(source, /forcedLocale: initialForcedLocale/);
  assert.doesNotMatch(source, /function applyLanguageMode\(mode, options\)/);
});
