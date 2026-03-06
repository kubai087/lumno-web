import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://lumno.kubai.design",
  output: "static",
  integrations: [react()],
});
