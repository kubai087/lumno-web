import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

function readSource(file) {
  return fs.readFileSync(path.join(workspaceRoot, file), "utf8");
}

test("homepage support note is localized for the expanded browser list", () => {
  const source = readSource("src/pages/index.astro");

  for (const copy of [
    "支持 Dia \\\\ Edge \\\\ Comet \\\\ Atlas \\\\ Helium 浏览器",
    "支援 Dia \\\\ Edge \\\\ Comet \\\\ Atlas \\\\ Helium 瀏覽器",
    "Supports Dia \\\\ Edge \\\\ Comet \\\\ Atlas \\\\ Helium browsers",
  ]) {
    assert.ok(
      source.includes(`cwsSupportNote: "${copy}"`),
      `static initial UI should include ${copy}`,
    );

    assert.ok(
      source.includes(`cws_support_note: "${copy}"`),
      `runtime i18n should include ${copy}`,
    );
  }
});

test("homepage support note stays on one line until the viewport is too narrow", () => {
  const source = readSource("src/pages/index.astro");

  assert.match(
    source,
    /\.shortcut-store-note\s*\{[\s\S]*?width:\s*max-content;[\s\S]*?max-width:\s*min\(calc\(100vw - 40px\),\s*520px\);[\s\S]*?flex-wrap:\s*nowrap;/,
    "support note should be wider than the store badge when the text fits",
  );

  assert.match(
    source,
    /\.shortcut-store-note \[data-i18n="cws_support_note"\]\s*\{[\s\S]*?min-width:\s*0;[\s\S]*?overflow-wrap:\s*normal;[\s\S]*?word-break:\s*keep-all;/,
    "support note text should avoid forced early wrapping",
  );

  assert.doesNotMatch(
    source,
    /\.shortcut-store-note\s*\{[\s\S]*?max-width:\s*248px;[\s\S]*?\}/,
    "support note should no longer be capped to the store badge width",
  );
});
