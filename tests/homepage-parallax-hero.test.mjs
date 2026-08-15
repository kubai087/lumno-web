import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");
const readSource = (file) => fs.readFileSync(path.join(workspaceRoot, file), "utf8");

test("homepage second section uses the Aceternity Hero Parallax composition", () => {
  const pageSource = readSource("src/pages/index.astro");
  const componentSource = readSource("src/components/ui/hero-parallax.tsx");
  const copySource = readSource("src/lib/home-content.ts");
  const fullBleedFeatureRules = pageSource.match(/\.feature-intro\s*\{[^}]*width:\s*100%;[^}]*\}/g) || [];

  assert.match(pageSource, /const FEATURE_PARALLAX_THUMBNAILS = \[[\s\S]*?\] as const/);
  assert.match(pageSource, /<section id="features" class="section feature-intro"[\s\S]*?<HeroParallax/);
  assert.match(pageSource, /products=\{featureParallaxProducts\}/);
  assert.match(pageSource, /client:visible/);
  assert.match(componentSource, /products\.slice\(0, 5\)/);
  assert.match(componentSource, /products\.slice\(5, 10\)/);
  assert.match(componentSource, /products\.slice\(10, 15\)/);
  assert.match(componentSource, /useScroll\(\{[\s\S]*?target: containerRef/);
  assert.match(componentSource, /offset: \["start 55%", "end 18%"\]/);
  assert.match(componentSource, /useTransform\(scrollYProgress, \[0, 0\.72\], \[0, 820\]\)/);
  assert.match(componentSource, /useTransform\(scrollYProgress, \[0, 0\.72\], \[0, -820\]\)/);
  assert.match(componentSource, /useTransform\(scrollYProgress, \[0, 0\.18\], \[-700, -300\]\)/);
  assert.match(componentSource, /h-\[200svh\][\s\S]*?md:h-\[250vh\]/);
  assert.match(componentSource, /useReducedMotion\(\)/);
  assert.match(componentSource, /data-hero-parallax-stage/);
  assert.match(componentSource, /data-hero-parallax-card/);
  assert.match(componentSource, /hero-parallax__title/);
  assert.match(componentSource, /hero-parallax__description/);
  assert.match(componentSource, /hero-title-line/);
  assert.match(componentSource, /hero-title-segment/);
  assert.equal(fullBleedFeatureRules.length, 2);
  assert.match(componentSource, /whileHover=\{shouldReduceMotion \? undefined : \{ y: -18 \}\}/);
  assert.doesNotMatch(componentSource, /group-hover\/product:opacity-100/);
  assert.doesNotMatch(componentSource, /<h3/);
  assert.doesNotMatch(componentSource, /hero-parallax__link/);
  assert.doesNotMatch(pageSource, /linkLabel=\{content\.featurePageLabel\}/);
  assert.doesNotMatch(pageSource, /linkAriaLabel=\{content\.featurePageAria\}/);
  assert.match(copySource, /featureSectionTitle: "极简强大，你的满分新标签页"/);
  assert.match(copySource, /featureSectionDescription:\s*"书签、常用网站与快捷搜索，一个干净的新标签页全部装下（也可以隐藏）"/);
});
