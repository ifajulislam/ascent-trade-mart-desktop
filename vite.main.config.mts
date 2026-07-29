import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      // This tells Vite: "Do not try to bundle this package, just leave it alone"
      external: ["better-sqlite3"],
    },
  },
});
