import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { env } from "node:process";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  mode: "development",
  base: env.COSTING_APP_PUBLIC_PATH ?? "/",
  build: {
    outDir: env.COSTING_APP_DESTINATION_DIR ?? "dist",
    target: "esnext",
    minify: false,
  },
  server: {
    port: 2233,
  },
  preview: {
    open: true,
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@packages": fileURLToPath(new URL("./packages", import.meta.url)),
      "@ui": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
