import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Warn on usage of 'any'
      "@typescript-eslint/no-explicit-any": "warn",

      // Warn on unused variables
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],

      // Warn for unescaped characters like single quotes in JSX
      "react/no-unescaped-entities": "warn",

      // Warn if <img> is used instead of Next.js <Image>
      "@next/next/no-img-element": "warn",

      // Warn on console.log in production (allow warn & error)
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default eslintConfig;
