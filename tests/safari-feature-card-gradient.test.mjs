import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

const featureCardPages = [
  ["onboarding", "src/pages/onboarding/index.astro"],
];

function readFeatureCardBackground(source) {
  const match = source.match(/\.feature-card::before\s*\{[\s\S]*?background:\s*([\s\S]*?);\s*\}/);
  assert.ok(match, "feature-card::before background block should exist");
  return match[1];
}

test("feature card white highlight layers fade to transparent white for Safari", () => {
  for (const [label, file] of featureCardPages) {
    const source = fs.readFileSync(path.join(workspaceRoot, file), "utf8");
    const background = readFeatureCardBackground(source);

    assert.match(
      source,
      /--card-white-clear:\s*rgba\(255,\s*255,\s*255,\s*0\);/,
      `${label} should define a transparent white color token`,
    );

    assert.doesNotMatch(
      background,
      /\btransparent\b/,
      `${label} feature card highlights should not fade through the transparent-black keyword`,
    );
  }
});
