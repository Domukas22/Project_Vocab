//

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Terminal from "vite-plugin-terminal";
import process from "process";

// Use Node's process.env to check if in production
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react(), Terminal()],
  logLevel: "info",
  clearScreen: true,
  base: isProduction ? "/Project_Vocab/" : "/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
});
