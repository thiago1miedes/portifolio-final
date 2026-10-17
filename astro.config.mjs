// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://thiagomiedes.com.br",
  trailingSlash: "always",
  build: { inlineStylesheets: "auto" },
  devToolbar: { enabled: false },
});
