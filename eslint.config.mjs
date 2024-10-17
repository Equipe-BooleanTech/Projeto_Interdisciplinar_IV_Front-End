import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "projects/**/*",
        "**/.DS_Store",
        "**/node_modules",
        "build",
        "**/build",
        "dist",
        "**/dist",
        "**/.env",
        "**/.env.*",
        "!**/.env.example",
        "**/__generated__",
        "**/pnpm-lock.yaml",
        "**/package-lock.json",
        "**/yarn.lock",
        "**/coverage",
    ],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@angular-eslint/recommended",
    "plugin:@angular-eslint/template/process-inline-templates",
    "plugin:prettier/recommended",
).map(config => ({
    ...config,
    files: ["**/*.ts"],
})), {
    files: ["**/*.ts"],

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: true,
            tsconfigRootDir: "./",
        },
    },

    rules: {
        "@angular-eslint/directive-selector": ["error", {
            type: "attribute",
            prefix: "app",
            style: "camelCase",
        }],

        "@angular-eslint/component-selector": ["error", {
            type: "element",
            prefix: "app",
            style: "kebab-case",
        }],

        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/no-explicit-any": "error",

        "@typescript-eslint/naming-convention": ["error", {
            selector: "variable",
            modifiers: ["const"],
            format: ["strictCamelCase", "UPPER_CASE"],
        }, {
            selector: "variable",
            types: ["boolean"],
            format: ["StrictPascalCase"],
            prefix: ["is", "should", "has", "can", "did", "will"],
        }, {
            selector: "function",
            format: ["strictCamelCase"],
        }, {
            selector: "parameter",
            format: ["strictCamelCase"],
            leadingUnderscore: "allow",
        }, {
            selector: "memberLike",
            format: ["strictCamelCase"],
        }, {
            selector: "memberLike",
            modifiers: ["private"],
            format: ["strictCamelCase"],
            leadingUnderscore: "require",
        }, {
            selector: "typeLike",
            format: ["StrictPascalCase"],
        }, {
            selector: "enum",
            format: ["StrictPascalCase"],
        }, {
            selector: "enumMember",
            format: ["StrictPascalCase"],
        }],
    },
}, ...compat.extends(
    "plugin:@angular-eslint/template/recommended",
    "plugin:@angular-eslint/template/accessibility",
).map(config => ({
    ...config,
    files: ["**/*.html"],
})), {
    files: ["**/*.html"],
    rules: {},
}];