import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Terminal from "vite-plugin-terminal";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Terminal()],
  logLevel: "info",
  clearScreen: true,
  base: "/Project_Vocab/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
});
