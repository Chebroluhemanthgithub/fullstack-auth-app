import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.node, ...globals.es2021 }, // ✅ Node + ES2021 globals
      parserOptions: { ecmaVersion: 2021, sourceType: "module" },
    },
    env: {
      node: true, // ✅ Node environment (process, __dirname, etc.)
      es2021: true,
    },
    rules: {
      "no-unused-vars": "warn", // warn for unused variables
      "no-console": "off",      // allow console.log
    },
  },
]);
