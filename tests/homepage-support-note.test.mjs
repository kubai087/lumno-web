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

test("homepage support tooltip copy generalizes Arc migration destinations", () => {
  const source = readSource("src/pages/index.astro");

  for (const copy of [
    "为从 Arc 迁移到其他浏览器的用户保留熟悉的命令栏搜索体验。",
    "為從 Arc 遷移到其他瀏覽器的使用者保留熟悉的命令欄搜尋體驗。",
    "Keeps a familiar command-bar search workflow for people moving from Arc to other browsers.",
  ]) {
    assert.ok(
      source.includes(copy),
      `support tooltip should include ${copy}`,
    );
  }

  for (const staleCopy of [
    "从 Arc 迁移到 Dia 或 Chrome",
    "從 Arc 遷移到 Dia 或 Chrome",
    "moving from Arc to Dia or Chrome",
  ]) {
    assert.ok(
      !source.includes(staleCopy),
      `support tooltip should not still mention ${staleCopy}`,
    );
  }
});

test("homepage support tooltip can choose among eight viewport-aware arrow placements", () => {
  const source = readSource("src/pages/index.astro");

  assert.match(
    source,
    /const SUPPORT_TOOLTIP_PLACEMENTS = Object\.freeze\(\[\s*"right",\s*"bottom-end",\s*"bottom",\s*"bottom-start",\s*"left",\s*"top-start",\s*"top",\s*"top-end"\s*\]\);/,
    "support tooltip should define eight placement candidates",
  );

  assert.match(
    source,
    /function positionSupportTooltipBubble\(host\)[\s\S]*?bubble\.dataset\.tooltipPlacement = bestPlacement\.placement;[\s\S]*?bubble\.dataset\.arrowSide = bestPlacement\.arrowSide;[\s\S]*?bubble\.dataset\.arrowAlign = bestPlacement\.arrowAlign;/,
    "support tooltip should write the selected placement and arrow metadata",
  );

  assert.match(
    source,
    /clampNumber\(bestPlacement\.left,\s*SUPPORT_TOOLTIP_MARGIN,\s*viewportWidth - tooltipRect\.width - SUPPORT_TOOLTIP_MARGIN\)/,
    "support tooltip should clamp horizontal position inside the viewport",
  );

  assert.match(
    source,
    /const viewportWidth = Math\.round\(window\.visualViewport\?\.width \|\| window\.innerWidth \|\| document\.documentElement\.clientWidth \|\| 0\);/,
    "support tooltip should use the visual viewport width before document layout width",
  );

  assert.match(
    source,
    /clampNumber\(bestPlacement\.top,\s*SUPPORT_TOOLTIP_MARGIN,\s*viewportHeight - tooltipRect\.height - SUPPORT_TOOLTIP_MARGIN\)/,
    "support tooltip should clamp vertical position inside the viewport",
  );

  for (const side of ["top", "right", "bottom", "left"]) {
    assert.match(
      source,
      new RegExp(`\\.support-tooltip-bubble\\[data-arrow-side="${side}"\\]::before`),
      `support tooltip should draw a ${side} arrow border`,
    );
    assert.match(
      source,
      new RegExp(`\\.support-tooltip-bubble\\[data-arrow-side="${side}"\\]::after`),
      `support tooltip should draw a ${side} arrow fill`,
    );
  }

  for (const align of ["start", "center", "end"]) {
    assert.match(
      source,
      new RegExp(`\\.support-tooltip-bubble\\[data-arrow-side="top"\\]\\[data-arrow-align="${align}"\\]`),
      `support tooltip should support ${align} horizontal arrow alignment`,
    );
    assert.match(
      source,
      new RegExp(`\\.support-tooltip-bubble\\[data-arrow-side="left"\\]\\[data-arrow-align="${align}"\\]`),
      `support tooltip should support ${align} vertical arrow alignment`,
    );
  }

  assert.match(
    source,
    /\.support-tooltip-bubble\s*\{[\s\S]*?position:\s*fixed;[\s\S]*?left:\s*var\(--support-tooltip-left,\s*0px\);[\s\S]*?top:\s*var\(--support-tooltip-top,\s*0px\);/,
    "support tooltip bubble should use fixed positioning with JS-computed coordinates",
  );

  assert.match(
    source,
    /document\.body\.appendChild\(bubble\);/,
    "support tooltip bubble should be mounted under body so fixed positioning is viewport-relative",
  );

  assert.match(
    source,
    /trigger\.addEventListener\("click",\s*\(\) => scheduleShow\(\{ persist: true \}\)\);/,
    "support tooltip trigger clicks should keep the bubble open for touch/mobile use",
  );

  assert.match(
    source,
    /if \(bubble\.dataset\.pinned === "true"\) return;[\s\S]*?hideSupportTooltipBubble\(host\);/,
    "support tooltip should not immediately hide a click-opened bubble on focus or pointer changes",
  );

  assert.match(
    source,
    /\.support-tooltip-bubble\[data-visible="true"\]\s*\{[\s\S]*?visibility:\s*visible;[\s\S]*?opacity:\s*1;/,
    "support tooltip bubble visibility should be controlled after being reparented",
  );
});
