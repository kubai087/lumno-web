import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");
const readSource = (file) => fs.readFileSync(path.join(workspaceRoot, file), "utf8");

test("AI intent demo simulates text selection before exposing the Lumno toolbar", () => {
  const component = readSource("src/components/home/AiIntentDemo.tsx");
  const styles = readSource("src/components/home/ai-intent-demo.css");

  assert.doesNotMatch(component, /lucide-react/);
  assert.match(component, /className="ai-intent-demo__body"/);
  assert.match(component, /className="ai-intent-demo__selection"/);
  assert.doesNotMatch(component, /ai-intent-demo__article h3|ai-intent-demo__intro|articleTitle/);
  assert.match(component, /type DemoPhase = "idle" \| "selecting" \| "mark" \| "toolbar" \| "sending"/);
  assert.match(component, /setPhase\("selecting"\), 760/);
  assert.match(component, /setPhase\("mark"\), 2_240/);
  assert.match(component, /onClick=\{phase === "toolbar" \? replay : openToolbar\}/);
  assert.match(component, /ai-intent-demo__actions-viewport[\s\S]*?ai-intent-demo__primary-divider[\s\S]*?ai-intent-demo__main/);
  assert.match(component, /ri-sparkling-2-fill/);
  assert.match(component, /ri-lightbulb-line/);
  assert.match(component, /ri-search-line/);

  assert.match(styles, /height: 38px;/);
  assert.match(styles, /border-radius: var\(--lumno-selection-surface-radius\);/);
  assert.match(styles, /backdrop-filter: blur\(14px\) saturate\(130%\);/);
  assert.match(styles, /font: 400 12px\/1\.2 "Open Sans"/);
  assert.match(styles, /button \+ button \{\s*margin-inline-start: 7px;/);
  assert.match(styles, /width: 16px;\s*height: 16px;\s*flex: 0 0 auto;[\s\S]*?font-size: 16px;/);
  assert.match(styles, /ai-intent-demo__cursor-stem/);
  assert.match(styles, /ai-intent-demo__cursor-cap--top/);
  assert.match(styles, /ai-intent-demo__cursor-cap--bottom/);
});
