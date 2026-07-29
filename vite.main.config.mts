// vite.main.config.mts (The Backend): This bundles the Node.js code and SQLite database logic. This environment has full access to the computer's hard drive but no access to the visual screen.

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      // Vite's job is to bundle all of the JS into one file. But better-sqlite3 is not normal JavaScript; it is a "Native Module" written in C++ so it can talk directly to computer's hard drive. If Vite tries to bundle C++ code, the bundler will crash. This tells Vite to leave this package
      external: ["better-sqlite3"],
    },
  },
});
