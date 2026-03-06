import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // ── Modularity constraints ──────────────────────────────
  // Business logic files: 60-line function limit
  {
    files: [
      "src/features/**/lib/**/*.ts",
      "src/features/**/actions/**/*.ts",
      "src/features/**/hooks/**/*.ts",
      "src/shared/lib/**/*.ts",
    ],
    rules: {
      "max-lines-per-function": ["error", { max: 60, skipBlankLines: true, skipComments: true }],
      "max-lines": ["error", { max: 150, skipBlankLines: true, skipComments: true }],
    },
  },

  // UI components: 100-line function limit
  {
    files: ["src/**/*.tsx"],
    rules: {
      "max-lines-per-function": ["error", { max: 100, skipBlankLines: true, skipComments: true }],
      "max-lines": ["error", { max: 150, skipBlankLines: true, skipComments: true }],
    },
  },

  // All source files: 150-line file limit
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    ignores: ["src/shared/db/schema.ts", "src/shared/db/migrations/**"],
    rules: {
      "max-lines": ["error", { max: 150, skipBlankLines: true, skipComments: true }],
    },
  },
]);

export default eslintConfig;
