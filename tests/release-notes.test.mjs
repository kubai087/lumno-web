import test from "node:test";
import assert from "node:assert/strict";
import { parseReleaseBody } from "../src/lib/releases.ts";

test("Traditional Chinese notes use Taiwan wording and the extension's own terms", () => {
  const { locales } = parseReleaseBody([
    "## Features",
    "",
    "- 新标签页打开更快，从 Edge 加载项商店安装时打开对应页面。",
    "- 聚合搜索标签页组支持排除其他分组扩展，并修复网络请求重试。",
  ].join("\n"));

  assert.deepEqual(locales["zh-TW"].features, [
    "新分頁開啟更快，從 Edge 附加元件商店安裝時開啟對應頁面。",
    "彙整搜尋分頁群組支援排除其他分組擴充功能，並修復網路請求重試。",
  ]);
});

test("Chinese release notes use Chinese quotes; English and code keep straight ones", () => {
  const { locales } = parseReleaseBody([
    "## Features",
    "",
    '- 繁体中文界面改用台湾惯用词汇，例如"桌布""快速键"。',
    '- 按钮文案改为"商店评分"，配置项 `"autoFocus": true` 不变。',
    "",
    "---",
    "",
    "## Features",
    "",
    '- The related buttons now read "Store rating".',
  ].join("\n"));

  assert.deepEqual(locales["zh-CN"].features, [
    "繁体中文界面改用台湾惯用词汇，例如“桌布”“快速键”。",
    '按钮文案改为“商店评分”，配置项 `"autoFocus": true` 不变。',
  ]);
  assert.deepEqual(locales["zh-TW"].features, [
    "繁體中文介面改用臺灣慣用詞彙，例如「桌布」「快速鍵」。",
    '按鈕文案改為「商店評分」，配置項 `"autoFocus": true` 不變。',
  ]);
  assert.deepEqual(locales.en.features, ['The related buttons now read "Store rating".']);
});
