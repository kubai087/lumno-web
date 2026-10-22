<p align="center">
  <img src="./public/assets/logo@3x.png" alt="Lumno logo" width="88" height="88" />
</p>

<h1 align="center">lumno-web</h1>

<p align="center">
  Source of <a href="https://lumno.kubai.design/">lumno.kubai.design</a>, the website of
  <a href="https://github.com/kubai087/lumno-extension">Lumno</a>, a command bar and new tab extension for Chrome, Edge and Firefox.
  <br />
  A static Astro + React site in ten languages, with animated product demos drawn from the extension's real UI.
</p>

<p align="center">
  <a href="https://lumno.kubai.design/">Website</a> ·
  <a href="https://lumno.kubai.design/help/">Help center</a> ·
  <a href="https://github.com/kubai087/lumno-extension">Extension repository</a>
  <br />
  <a href="README.zh-CN.md">简体中文</a> |
  <a href="README.md">English</a>
</p>

> This repository is the website only. Bugs and ideas about the extension itself go to
> [lumno-extension](https://github.com/kubai087/lumno-extension/issues).

## What's inside

| Route | What it is |
| --- | --- |
| `/` | Homepage: animated demos of the command bar, new tab and selection tools |
| `/help/<slug>/` | Help center (sidebar tree in `src/lib/guides.ts`, articles in `src/content/guides/`) with its own client-side search |
| `/release/` | Release notes, pulled from [lumno-extension's GitHub Releases](https://github.com/kubai087/lumno-extension/releases) at build time |
| `/privacy/` | Privacy policy (`src/content/privacy-policy*.md`) |
| `/account/`, `/oauth/`, `/auth/` | Account sign-in pages backed by Supabase |
| `/llms.txt`, `/llms-full.txt` | Summaries for answer engines |

Every page is prerendered in Simplified Chinese (`/`) and nine more languages (`/en/`, `/zh-tw/`, `/ja/`, `/ko/`, `/de/`, `/fr/`, `/es/`, `/pt-br/`, `/ru/`). Production is plain static files on GitHub Pages; no server runs.

## Worth a read: how the motion works

Most of the homepage is animation, and most of it follows a few rules: the server HTML is always a finished, readable frame; scripts only add motion on top; reduced-motion and no-JS visitors get the whole picture; nothing that the first paint doesn't need ships React. These are the files to start from.

| Effect | Where | What to look at |
| --- | --- | --- |
| Hero intro and the scripted browser demo | [`HeroSafariDemo.tsx`](src/components/home/HeroSafariDemo.tsx), [`hero-safari-demo.css`](src/components/home/hero-safari-demo.css) | A cursor that follows the typed query and lands on a result; the JS timeline and CSS timings stay in step through `[data-intro-pace]`. The intro waits for fonts and a run of stable frames (not `window.load`), then sets `data-intro-ready` to unpause the CSS animations. |
| Tilted screenshot wall | [`ui/hero-parallax.tsx`](src/components/ui/hero-parallax.tsx) | Scroll drives four springs (closed-form, so any frame length is exact) that write CSS custom properties on the stage; CSS turns them into the tilt and the rows' drift. Scrolling never re-renders React, the server HTML is the tilted first frame, and reduced motion gets the flat frame from CSS alone. |
| Dithered paintings | [`DitherShader.tsx`](src/components/home/DitherShader.tsx), [`ordered-dither.ts`](src/lib/ordered-dither.ts) | A colour ordered dither on one canvas, painted in place from a 16 × 256 lookup table. One canvas pixel is one fixed-size cell, so the grain never "breathes" while the window resizes, and the canvas painted during the intro carries on through its handoff. |
| Scroll entrances | [`home-reveal.ts`](src/scripts/home-reveal.ts), [`home.css`](src/styles/home.css) | `[data-reveal]` elements wait for the hero intro, play once, and anything entering in the same frame is staggered in document order. |
| New tab scenes | [`newtab/scene-runtime.ts`](src/components/home/newtab/scene-runtime.ts), [`newtab/`](src/components/home/newtab/) | Shared playback for a set of Astro illustrations whose markup is the last frame of each pass. |
| Wallpaper-adaptive clock ink | [`newtab/scene-clock-ink.ts`](src/components/home/newtab/scene-clock-ink.ts) | Samples the wallpaper behind the text, tints it toward the page, then holds a contrast floor. |
| Selection toolbar to status pill | [`AiIntentDemo.tsx`](src/components/home/AiIntentDemo.tsx), [`ai-intent-demo.css`](src/components/home/ai-intent-demo.css) | A toolbar that folds into a pill, which travels into a new tab. |
| Replay on hover | [`OpenSourceArt.tsx`](src/components/home/OpenSourceArt.tsx), [`home-phone.ts`](src/scripts/home-phone.ts) | Plays once when seen; hover replays by remounting the animated part. Phones replay on re-entry or tap. |
| Review marquee | [`ChromeReviewMarquee.astro`](src/components/home/ChromeReviewMarquee.astro) | CSS-only lanes over a dithered painting that turn into a hand-swiped row on phones. |
| Snap carousel | [`newtab/NewTabCarousel.astro`](src/components/home/newtab/NewTabCarousel.astro) | Scroll snap aligned to the content column, cards fading outside it, and arrow clicks that count from where a smooth scroll is heading. |
| Sliding tab indicator | [`extension-settings/tabs-indicator.ts`](src/components/extension-settings/tabs-indicator.ts) | One block slides under the active tab, measured from real boxes so an ancestor's scale doesn't leave it a pixel off. |
| Continuous corners | [`public/continuous-corners.css`](public/continuous-corners.css) | Squircle corners through the CSS `corner-shape` API, with plain `border-radius` as the fallback. |

Loading performance, which the animations depend on:

- [`island-modulepreload.mjs`](src/integrations/island-modulepreload.mjs) lists each eager island's whole import graph as `modulepreload` so the hero loads in one wave instead of several round trips.
- [`quiet-redirects.mjs`](src/integrations/quiet-redirects.mjs) turns Astro's redirect pages into blank pages that leave before they paint (GitHub Pages can't send real redirects).
- Header menus are React rendered to static HTML and driven by [`settings-select-runtime.ts`](src/scripts/settings-select-runtime.ts), so `/release/` and `/privacy/` ship no React. The community panel loads its dialog on first hover ([`community-panel.ts`](src/scripts/community-panel.ts)).
- Visually critical SVGs are inlined (`?raw` + `set:html`) to stay sharp in Safari.

[AGENTS.md](AGENTS.md) collects the reasoning behind these and other decisions.

## Getting started

Requires Node.js 22.12 or later.

```bash
npm ci
npm run dev        # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Runs the tests, builds to `dist/`, then checks help search quality |
| `npm run preview` | Serves the built `dist/` |
| `npm run check` | Astro and TypeScript type check |
| `npm test` | Node test runner (`tests/*.test.mjs`) |
| `npm run search-eval` | Help search evaluation with per-query output |

The site builds without any configuration. To turn on analytics, webmaster verification, sign-in or a different release source, copy [`.env.example`](.env.example) to `.env`; every variable there is optional and explained inline.

Building `/release/` calls the GitHub API. Without a token you share the anonymous rate limit; set `GITHUB_RELEASES_TOKEN` if builds start failing on it.

## Project layout

```text
src/
  pages/            Routes; [locale]/ mirrors every page for the nine prefixed languages
  layouts/          SitePage (release, privacy), AuthLayout (account pages)
  components/
    home/           Homepage sections and demos
    guides/         Help center shell and article rendering
    site/           Shared header and footer
    ui/             shadcn/ui-style primitives (see THIRD_PARTY_NOTICES.md)
  content/          Help center articles, privacy policy and their translations
  lib/              Locales, SEO, guides tree, release parsing, site links
  scripts/          Small client scripts that run without React
  styles/           Design tokens and page styles
  integrations/     Astro build integrations
public/             Static files copied as-is (images, fonts, CNAME)
scripts/            Build helpers: store versions, font subsetting, guide screenshots, IndexNow
tests/              node:test suites over the source files
```

### Help center content

Articles are Markdown in `src/content/guides/`, one file per language. Simplified Chinese is the source text; the other languages are translations of it. Screenshots are real captures of the extension, taken by [`scripts/guide-screenshots/`](scripts/guide-screenshots/). If you change a heading, update the search aliases in `src/content/guides/search/`, and if you fix a search miss, add a case to `search/eval/`.

### Fonts

Open Sans and Remix Icon are subset by `scripts/subset-fonts.py` (needs `fonttools` and `brotli`). Rerun it after using a new `ri-*` icon class; `tests/font-assets.test.mjs` fails until you do.

## Deployment

[`deploy-pages.yml`](.github/workflows/deploy-pages.yml) builds and deploys `main` to GitHub Pages on every push, on a schedule, and when the extension repository dispatches it after a release. It resolves the current store versions, builds with the repository secrets listed in `.env.example`, and notifies IndexNow of changed pages. Pull requests are checked by [`ci.yml`](.github/workflows/ci.yml).

## Contributing

Fixes, translations and performance improvements are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) and the [code of conduct](CODE_OF_CONDUCT.md) first; security issues go through [SECURITY.md](SECURITY.md).

## License

The source code is released under the [MIT License](LICENSE). Feel free to learn from it and reuse the techniques and components in your own projects.

The MIT License does **not** cover:

- **The Lumno brand**: the name, logo, app icon and wordmark.
- **Lumno's content and artwork**: screenshots and captures of the extension, wallpapers and illustrations, the help center articles, privacy policy and other written copy, and the community QR codes.
- **Third-party material**: fonts, icons and logos of other products, each under its own terms.

Please don't publish a copy of this site as your own or present a fork as Lumno. [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) lists exactly which files fall outside the MIT License and why.

The Lumno extension itself is a separate project under [GPL-3.0](https://github.com/kubai087/lumno-extension/blob/main/LICENSE).
