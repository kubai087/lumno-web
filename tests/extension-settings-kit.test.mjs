import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const kitPath = new URL("../src/components/extension-settings/SettingsKit.tsx", import.meta.url);
const stylesPath = new URL("../src/components/extension-settings/settings-kit.css", import.meta.url);
const showcasePath = new URL("../src/components/extension-settings/ExtensionSettingsShowcase.tsx", import.meta.url);

test("settings kit exports the reusable settings primitives", async () => {
  const source = await readFile(kitPath, "utf8");
  const exports = [
    "SettingsSurface",
    "SettingsTabs",
    "SettingsSection",
    "SettingsRow",
    "SettingsDivider",
    "SettingsButton",
    "SettingsIconButton",
    "SettingsSwitch",
    "SettingsSegmentedControl",
    "SettingsSelect",
    "SettingsInput",
    "SettingsThemePicker",
    "ShortcutKeys",
    "SettingsBadge",
  ];

  for (const componentName of exports) {
    assert.match(source, new RegExp(`export function ${componentName}\\b`));
  }
});

test("settings kit remains independent from extension runtime and persistence", async () => {
  const source = await readFile(kitPath, "utf8");
  assert.doesNotMatch(source, /\bchrome\s*\./);
  assert.doesNotMatch(source, /\bbrowser\s*\./);
  assert.doesNotMatch(source, /localStorage|sessionStorage|indexedDB/);
});

test("settings controls expose semantic form and popup states", async () => {
  const source = await readFile(kitPath, "utf8");
  assert.match(source, /type="checkbox"/);
  assert.match(source, /aria-haspopup=\{menuRole\}/);
  assert.match(source, /role=\{menuRole\}/);
  assert.match(source, /role="radiogroup"/);
  assert.match(source, /aria-pressed=/);
  assert.match(source, /aria-label=\{item\.label\}/);
  assert.match(source, /children\?: ReadonlyArray<SettingsSelectItem<T>>/);
  assert.match(source, /"aria-expanded": expandable \? expanded : undefined/);
  assert.match(source, /"data-depth": depth/);
  assert.match(source, /const toggleExpandedValue = [\s\S]*?setExpandedValues\(\(currentValues\) =>/);
  assert.match(source, /event\.key !== "Enter" && event\.key !== " "[\s\S]*?toggleExpandedValue\(item\.value\)/);
  assert.match(source, /const closeMenu = [\s\S]*?setExpandedValues\(new Set\(\)\);[\s\S]*?const toggleMenu = \(\) =>/);
  assert.match(source, /className="lumno-settings-select-submenu"[\s\S]*?aria-hidden=\{!expanded\}[\s\S]*?data-expanded=\{expanded\}/);
});

test("settings styles are scoped under the Lumno settings namespace", async () => {
  const source = await readFile(stylesPath, "utf8");
  assert.match(source, /\.lumno-settings-kit\s*\{/);
  assert.match(source, /\.lumno-settings-panel/);
  assert.match(source, /\.lumno-settings-select-menu\s*\{[\s\S]*?--lumno-settings-menu-closed-transform:\s*translateY\(-6px\)\s*scale\(0\.96,\s*0\.86\);[\s\S]*?opacity:\s*0;[\s\S]*?visibility:\s*hidden;[\s\S]*?transform:\s*var\(--lumno-settings-menu-closed-transform\);[\s\S]*?will-change:\s*transform,\s*opacity;[\s\S]*?opacity\s+170ms\s+ease,[\s\S]*?transform\s+360ms\s+cubic-bezier\(0\.2,\s*1\.45,\s*0\.35,\s*1\)/);
  assert.match(source, /\.lumno-settings-select-menu\[data-placement="above"\]/);
  assert.match(source, /\.lumno-settings-select-menu\[data-open="true"\]/);
  assert.match(source, /\.lumno-settings-select-submenu\s*\{[\s\S]*?grid-template-rows:\s*0fr;[\s\S]*?grid-template-rows 240ms[\s\S]*?\.lumno-settings-select-submenu\[data-expanded="true"\]\s*\{[\s\S]*?grid-template-rows:\s*1fr;/);
  assert.match(source, /\.lumno-settings-select\[data-trigger-variant\]\s*\{[\s\S]*?min-width:\s*0;/);
  assert.match(source, /\.lumno-settings-select\[data-open="true"\]\s*\{[\s\S]*?z-index:\s*2;/);
  assert.match(
    source,
    /\.lumno-settings-icon-button\s*\{[\s\S]*?width:\s*38px;[\s\S]*?height:\s*38px;[\s\S]*?padding:\s*2px;[\s\S]*?border-radius:\s*50%;/,
  );
  assert.doesNotMatch(source, /_x_extension_/);
  assert.doesNotMatch(source, /^\s*(html|body|:root)\s*\{/m);
});

test("showcase provides localized settings compositions", async () => {
  const source = await readFile(showcasePath, "utf8");
  assert.match(source, /"zh-CN"/);
  assert.match(source, /"zh-TW"/);
  assert.match(source, /\ben:\s*\{/);
  assert.match(source, /深浅色模式/);
  assert.match(source, /Automatic picture in picture/);
  assert.match(source, /<SettingsSurface/);
});
