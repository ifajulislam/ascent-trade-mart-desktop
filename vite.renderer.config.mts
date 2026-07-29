// vite.renderer.config.mts (The Frontend): This bundles your React components, Tailwind CSS, and HTML. This environment controls what the user sees, but it is locked in a sandbox and cannot touch the hard drive directly.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/renderer"),
    },
  },
});
