import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");
const readSource = (file) => fs.readFileSync(path.join(workspaceRoot, file), "utf8");

test("AI intent demo walks through one selection per intent before sending to a background tab", () => {
  const component = readSource("src/components/home/AiIntentDemo.tsx");
  const styles = readSource("src/components/home/ai-intent-demo.css");

  assert.doesNotMatch(component, /lucide-react/);
  assert.match(component, /const SCENARIO_ACTIONS: readonly Action\[\] = \["ask", "explain", "translate"\];/);
  assert.match(
    component,
    /type DemoPhase =\s*\| "idle"\s*\| "selecting"\s*\| "mark"\s*\| "toolbar"\s*\| "press"\s*\| "sending"\s*\| "flying"\s*\| "landing"\s*\| "sent"\s*\| "clearing";/,
  );
  assert.match(component, /className="ai-intent-demo__body"/);
  assert.match(component, /className="ai-intent-demo__selection"/);
  assert.match(component, /ai-intent-demo__toolbar[\s\S]*?ai-intent-demo__primary-divider[\s\S]*?ai-intent-demo__main/);
  assert.match(component, /ai-intent-demo__group/);
  assert.match(component, /ai-intent-demo__status/);
  assert.doesNotMatch(component, /ai-intent-demo__card/);
  assert.match(component, /ai-intent-demo__scenarios/);
  assert.match(component, /IntersectionObserver/);
  assert.match(component, /prefers-reduced-motion: reduce/);
  assert.match(component, /ri-sparkling-2-fill/);
  assert.match(component, /ri-lightbulb-line/);
  assert.match(component, /ri-search-line/);
  assert.match(component, /ri-translate/);

  // Toolbar geometry mirrors the extension's selection surface.
  assert.match(styles, /height: 38px;/);
  assert.match(styles, /backdrop-filter: blur\(14px\) saturate\(130%\);/);
  assert.match(styles, /font: 400 12px\/1\.2 "Open Sans"/);
  assert.match(styles, /button \+ button \{\s*margin-inline-start: 7px;/);
  assert.match(styles, /width: 16px;\s*height: 16px;\s*flex: 0 0 auto;[\s\S]*?font-size: 16px;/);
  // The mark unfolds into the toolbar in place instead of being swapped for it.
  assert.match(styles, /\.ai-intent-demo__material \{[\s\S]*?width: 30px;[\s\S]*?0 8px 24px rgba\(15, 23, 42, 0\.14\)/);
  assert.match(styles, /width: 100%;\s*border-radius: var\(--lumno-selection-surface-radius\);/);
  assert.doesNotMatch(styles, /clip-path/);
  assert.match(styles, /ai-intent-demo__caret-stem/);
  assert.match(styles, /ai-intent-demo__caret-cap--top/);
  assert.match(styles, /ai-intent-demo__caret-cap--bottom/);
});
