import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import islandModulePreload from "./src/integrations/island-modulepreload.mjs";
import quietRedirects from "./src/integrations/quiet-redirects.mjs";

// URL prefixes of every language but Simplified Chinese (src/lib/locales.ts).
const LOCALE_SEGMENTS = ["zh-tw", "en", "ja", "ko", "de", "fr", "es", "pt-br", "ru"];

export default defineConfig({
  site: "https://lumno.kubai.design",
  output: "static",
  // The web onboarding page was retired once the extension shipped its own;
  // old links and bookmarks land on the homepage instead of a 404.
  redirects: {
    "/onboarding": "/",
    "/en/onboarding": "/en/",
    "/zh-tw/onboarding": "/zh-tw/",
    // The help center has no index page; its sidebar starts at the first article.
    // It lived at /guides/ before moving to /help/ (old pages: src/pages/guides/).
    "/help": "/help/what-is-lumno/",
    "/guides": "/help/what-is-lumno/",
    ...Object.fromEntries(
      LOCALE_SEGMENTS.flatMap((segment) => [
        [`/${segment}/help`, `/${segment}/help/what-is-lumno/`],
        [`/${segment}/guides`, `/${segment}/help/what-is-lumno/`],
      ]),
    ),
    // The "privacy and data" help page became the privacy policy's opening summary.
    "/help/privacy-data": "/privacy/",
    "/guides/privacy-data": "/privacy/",
    ...Object.fromEntries(
      LOCALE_SEGMENTS.flatMap((segment) => [
        [`/${segment}/help/privacy-data`, `/${segment}/privacy/`],
        [`/${segment}/guides/privacy-data`, `/${segment}/privacy/`],
      ]),
    ),
    // The standalone features page was folded back into the homepage.
    "/features": "/",
    ...Object.fromEntries(
      LOCALE_SEGMENTS.map((segment) => [`/${segment}/features`, `/${segment}/`]),
    ),
  },
  integrations: [react(), islandModulePreload(), quietRedirects()],
  vite: {
    plugins: [tailwindcss()],
  },
});
