// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginUnicorn from "eslint-plugin-unicorn";
import configPrettier from "eslint-config-prettier";

export default [
  // 1. Cấu hình Cơ bản
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 2. Khối cấu hình chính cho Code (Browser)
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      unicorn: pluginUnicorn,
    },
    
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginUnicorn.configs.recommended.rules,
      "unicorn/filename-case": ["error", {
        "cases": { "pascalCase": true }
      }],
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  
  // 3. Khối cấu hình cho File Node/Config
  {
    files: [
      "**/*.config.{js,cjs,ts}", 
      "*.{js,cjs}", 
      "*.config.js",
    ],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs", 
    },
    rules: {
      "no-undef": "off", 
      "unicorn/filename-case": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
    }
  },
  
  // 4. KHỐI ĐÃ SỬA: Tắt cả hai quy tắc Unicorn cho TẤT CẢ các file .d.ts
  {
    files: ["**/*.d.ts"],
    rules: {
      "unicorn/filename-case": "off",
      "unicorn/prevent-abbreviations": "off", // <--- FIX TRIỆT ĐỂ LỖI NÀY
    },
  },

  // (Khối 5 cũ đã bị loại bỏ)

  // 5. Tích hợp Prettier
  configPrettier,
];