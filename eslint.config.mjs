import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // Delegate unused detection to unused-imports so imports auto-strip on fix.
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "none",
          ignoreRestSiblings: true,
        },
      ],
      // Smart equality: allows == null, requires === everywhere else.
      eqeqeq: ["warn", "smart"],
      // Natural apostrophes/quotes in copy don't need HTML escaping.
      "react/no-unescaped-entities": "off",
    },
  },
  // Prettier owns formatting — switches off conflicting style rules.
  prettier,
  {
    rules: {
      "react/jsx-curly-spacing": ["warn", { when: "always", children: true }],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "playwright-report/**", "test-results/**"]),
]);

export default eslintConfig;
