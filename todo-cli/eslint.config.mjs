import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["plugin:@eslint/js/recommended"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021,
      sourceType: "module",
    },
    env: {
      node: true,
    },
    rules: {
      // your rules here
    },
  },
  {
    files: ["**/__tests__/**/*.js", "**/__test__/**/*.js", "**/*.test.js", "**/*.spec.js"],
    env: {
      jest: true,
      node: true,
      es2021: true,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    extends: [pluginReact.configs.flat.recommended],
    rules: {
      // react-specific rules here if needed
    },
  },
]);
