import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

const headerPages = [
  ["homepage", "src/pages/index.astro", 40],
  ["onboarding", "src/pages/onboarding/index.astro", 36],
];

test("mobile header feedback CTA matches the icon-only buttons", () => {
  for (const [label, file, size] of headerPages) {
    const source = fs.readFileSync(path.join(workspaceRoot, file), "utf8");

    assert.match(
      source,
      new RegExp(
        String.raw`\.actions \.pill-btn\s*\{[\s\S]*?width:\s*${size}px;[\s\S]*?min-width:\s*${size}px;[\s\S]*?max-width:\s*${size}px;[\s\S]*?height:\s*${size}px;[\s\S]*?flex:\s*0 0 ${size}px;[\s\S]*?padding:\s*0;[\s\S]*?gap:\s*0;`,
      ),
      `${label} mobile header buttons should share fixed icon-only sizing`,
    );

    assert.match(
      source,
      /\.actions \.pill-btn span\s*\{[\s\S]*?display:\s*none;/,
      `${label} mobile header button labels should be hidden`,
    );

    assert.doesNotMatch(
      source,
      /\.actions \.pill-btn\.pill-btn-dark\s*\{[\s\S]*?(width:\s*auto|aspect-ratio:\s*auto|padding:\s*0 12px)/,
      `${label} mobile feedback CTA should not override the icon-only sizing`,
    );

    assert.doesNotMatch(
      source,
      /\.actions \.pill-btn\.pill-btn-dark span\s*\{[\s\S]*?display:\s*inline-block;/,
      `${label} mobile feedback CTA should not restore its text label`,
    );
  }
});

test("mobile release feedback CTA matches the icon-only social buttons", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/release/index.astro"), "utf8");

  assert.match(
    source,
    /\.social-btn-icon\s*\{[\s\S]*?width:\s*36px;[\s\S]*?min-width:\s*36px;[\s\S]*?padding:\s*0;/,
    "release mobile icon buttons should keep fixed sizing",
  );

  assert.match(
    source,
    /\.social-btn-discord\s*\{[\s\S]*?width:\s*36px;[\s\S]*?min-width:\s*36px;[\s\S]*?max-width:\s*36px;[\s\S]*?padding:\s*0;[\s\S]*?gap:\s*0;/,
    "release mobile feedback CTA should use the same icon-only sizing",
  );

  assert.match(
    source,
    /\.social-btn-discord span\s*\{[\s\S]*?display:\s*none;/,
    "release mobile feedback CTA should hide its text label",
  );
});

test("mobile release banner cannot expand wider than the viewport", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/release/index.astro"), "utf8");

  assert.match(
    source,
    /\.top-banner\s*\{[^}]*width:\s*100%;[^}]*max-width:\s*100%;/,
    "release banner should have an explicit content-width constraint",
  );

  assert.match(
    source,
    /@media \(max-width:\s*767px\)\s*\{[\s\S]*?\.top-banner\s*\{[^}]*min-height:\s*0;/,
    "release mobile banner should not let min-height and aspect-ratio force a wider box",
  );
});
