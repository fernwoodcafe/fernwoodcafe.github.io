import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { env } from "node:process";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: env.COSTING_APP_PUBLIC_PATH ?? "/",
  build: {
    outDir: env.COSTING_APP_DESTINATION_DIR,
    target: "esnext",
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
