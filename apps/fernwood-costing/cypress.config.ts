import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:2233",
    experimentalStudio: true,
    // We use a wide width for human readability during behavior testing.
    viewportWidth: 1500,
    viewportHeight: 800,
  },
});
