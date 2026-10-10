# Lumno Web Agent Notes

Last updated: 2026-10-08

## Confirmed Tech Direction

- Framework: Astro + React
- Deployment target: GitHub Pages (static files)
- Analytics: Google Analytics 4 (gtag.js)
- Release page strategy: sync `/release` content with GitHub Releases data

## Infrastructure Notes

- Domain ownership and DNS are available (Alibaba Cloud domain).
- ICP filing is available (Tencent Cloud record).
- China mainland acceleration is **not** in current scope.
- Keep a future TODO for mainland performance/CDN optimization when traffic requires it.

## Practical Implications for Development

- Node.js is required for local development and build tooling.
- No Node.js server is required in production for the current static-site plan.
- Keep route structure stable:
  - `/` for product homepage and feature intro
  - `/release` for changelog/release notes
  - `/privacy` for the privacy policy
  - `/guides/<slug>/` for the help center wiki (about Lumno, quick start, compatibility & trust); `/guides/` redirects to the first page
  - `/onboarding` is retired (the extension ships its own onboarding); it redirects to `/`

## Multilingual SEO Workflow

- Keep multilingual SEO routes static and indexable:
  - default routes stay on `/`, `/release`, `/privacy`
  - localized routes use explicit paths such as `/en/...` and `/zh-tw/...`
- Do not let extension entry pages depend on stored language for first render:
  - release entry behavior (opened by the extension with `?entry=ext`) should still resolve from browser language by default
  - explicit localized routes should stay pinned to their locale
- Separate UI copy from SEO metadata:
  - page body copy, runtime i18n titles, and SEO `<title>/<meta>` must not share the same key when their wording differs
  - keep `page_title_ui` and SEO title/description independent when needed
- Prefer SSR/static localized copy for anything visible above the fold:
  - hero title/subtitle
  - feature card titles and descriptions
  - language menu current label
  - key CTA labels where practical
- Keep accessibility text localized too:
  - `aria-label`, `alt`, modal titles, tooltip labels, and similar helper text should match the route locale in static HTML whenever possible
- Translation quality rules:
  - Simplified Chinese is the source-of-truth baseline
  - Traditional Chinese should be idiomatic, not mechanically converted
  - English should read like product copy, not literal translation or keyword stuffing
  - When adding new locales or pages, prefer concise, benefit-led phrasing similar to Apple / Google product pages, but never mimic branded wording
- Multilingual expansion should stay within the existing page types unless Kevin explicitly asks for new page types:
  - `/`
  - `/release`
  - `/privacy`
  - add language variants and localized metadata, but do not introduce extra landing-page categories by default
- When extending language coverage, keep the existing search intents consistent across locales:
  - browser command bar
  - focus search
  - tab search
  - bookmark search
  - history search
  - site search
  - minimalist new tab
  - Arc migration / alternatives for Dia or Chrome

## Implementation Status

- Astro + React scaffold has been introduced in repository root.
- GitHub Pages workflow now builds with Node and deploys `dist/`.
- Pages below the homepage (`/release`, `/privacy`) use `src/layouts/SitePage.astro`, which shares the homepage header (`src/components/site/SiteHeader.astro`), footer (`src/components/site/PageFooter.astro`) and design tokens (`src/styles/home.css`, `src/styles/site.css`).

## Loading Performance Notes

- The header menus are React components rendered to static HTML with no `client:*` directive; `src/scripts/settings-select-runtime.ts` drives them. Keep it that way so `/release` and `/privacy` ship no React.
- Community QR dialogs open from static `[data-community-qr-trigger]` buttons; `src/scripts/community-qr.ts` lazy-loads the React dialog on first use.
- `src/integrations/island-modulepreload.mjs` adds `modulepreload` links for every `client:load` island's import graph; prefer `client:idle` / `client:visible` for anything the first paint does not need.
- Homepage intro: before hydration it paints the hero artwork from server HTML (a 32px inlined placeholder under the real image, sized by the inline script after the hero) while the demo's CSS animations stay paused until `data-intro-ready`. Don't gate the reveal on the window `load` event; fonts and the stable-frame check are enough.
- Help center (`src/lib/guides.ts` holds the sidebar tree; page text in `src/content/guides/<locale>.ts`, bodies in `src/content/guides/*.md`) uses only real captures of the extension, taken by `scripts/guide-screenshots/` in each guide locale's UI language; a guide ships only in languages the extension itself speaks (zh-CN, zh-TW, en, ja), and hreflang lists only the languages that have it. The language menu keeps the reader on the same guide page and falls back to English (`resolveGuideLocale`) for other site languages.
- Fonts are subset by `scripts/subset-fonts.py`; rerun it after using a new Remix Icon class (`tests/font-assets.test.mjs` enforces this).

## SVG Rendering Notes (Safari)

- For visually critical SVGs (logo, hero cards, decorated UI), prefer inline SVG rendering over `<img src="*.svg">`:
  - Astro: `import xxx from "...svg?raw"` + `set:html={xxx}`
  - React: `import xxx from "...svg?raw"` + `dangerouslySetInnerHTML`
- In Safari, avoid stacking `scale + filter + subpixel transform` on the same SVG container.
- Prefer integer pixel geometry/alignment for Safari-specific overrides when fine-tuning sharpness.
- Keep `shape-rendering: geometricPrecision` on inline SVGs that need crisp edges.
- Avoid `preserveAspectRatio="none"` for logos/marks unless stretching is intentional.

## Collaboration Preference

- When introducing new SVG assets or refactoring existing SVG rendering, ask Kevin first:
  - "Do you want to apply the inline-SVG Safari-clarity strategy used on the homepage?"
