import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const styles = await readFile(
  new URL("../src/components/home/hero-safari-demo.css", import.meta.url),
  "utf8",
);

test("homepage site-search mode tag replaces the trigger query in the same interaction frame", () => {
  assert.match(
    styles,
    /\.site-search-demo-query-token--trigger\s*\{[\s\S]*?animation:\s*site-search-demo-trigger-clear 180ms linear calc\(var\(--case-delay, 0ms\) \+ var\(--site-search-demo-mode-switch-delay\)\) both/,
  );
  assert.match(
    styles,
    /\.site-search-demo-card \.x-lumno-search-input__field\s*\{[\s\S]*?site-search-demo-input-mode-activate 180ms linear calc\(var\(--case-delay, 0ms\) \+ var\(--site-search-demo-mode-switch-delay\)\) both/,
  );
  assert.match(
    styles,
    /\.site-search-demo-mode-prefix\s*\{[\s\S]*?visibility:\s*hidden;[\s\S]*?site-search-demo-prefix-visible 180ms linear[\s\S]*?site-search-demo-prefix-enter 180ms cubic-bezier\(0\.16, 1, 0\.3, 1\) calc\(var\(--case-delay, 0ms\) \+ var\(--site-search-demo-mode-switch-delay\)\) both/,
  );
  assert.match(
    styles,
    /@keyframes site-search-demo-prefix-enter\s*\{[\s\S]*?0%\s*\{\s*opacity:\s*0\.4;[\s\S]*?translateY\(-50%\) translateX\(-4px\) scaleX\(0\.92\)/,
  );
  assert.doesNotMatch(styles, /site-search-demo-prefix-press|site-search-demo-prefix-click-ring|site-search-demo-trigger-exit|site-search-demo-input-mode-padding/);
});
