import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import islandModulePreload from "./src/integrations/island-modulepreload.mjs";
import quietRedirects from "./src/integrations/quiet-redirects.mjs";

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
      ["zh-tw", "en", "ja", "ko", "de", "fr", "es", "pt-br", "ru"].flatMap((segment) => [
        [`/${segment}/help`, `/${segment}/help/what-is-lumno/`],
        [`/${segment}/guides`, `/${segment}/help/what-is-lumno/`],
      ]),
    ),
    // The standalone features page was folded back into the homepage.
    "/features": "/",
    ...Object.fromEntries(
      ["zh-tw", "en", "ja", "ko", "de", "fr", "es", "pt-br", "ru"].map((segment) => [`/${segment}/features`, `/${segment}/`]),
    ),
  },
  integrations: [react(), islandModulePreload(), quietRedirects()],
  vite: {
    plugins: [tailwindcss()],
  },
});
