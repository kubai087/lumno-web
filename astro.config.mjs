import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://lumno.kubai.design",
  output: "static",
  // The web onboarding page was retired once the extension shipped its own;
  // old links and bookmarks land on the homepage instead of a 404.
  redirects: {
    "/onboarding": "/",
    "/en/onboarding": "/en/",
    "/zh-tw/onboarding": "/zh-tw/",
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
