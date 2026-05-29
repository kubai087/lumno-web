import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

const headerPages = [
  ["homepage", "src/pages/index.astro"],
  ["onboarding", "src/pages/onboarding/index.astro"],
];

test("mobile header feedback CTA stays content-sized", () => {
  for (const [label, file] of headerPages) {
    const source = fs.readFileSync(path.join(workspaceRoot, file), "utf8");

    assert.match(
      source,
      /\.actions \.pill-btn\.pill-btn-dark\s*\{[\s\S]*?flex:\s*0 1 auto;[\s\S]*?aspect-ratio:\s*auto;[\s\S]*?padding:\s*0 12px;/,
      `${label} mobile feedback CTA should not grow or inherit icon-only square sizing`,
    );
  }
});
