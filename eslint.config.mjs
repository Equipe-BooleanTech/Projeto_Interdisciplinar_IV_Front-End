import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: [
            'projects/**/*',
            '**/.DS_Store',
            '**/node_modules',
            'build',
            '**/build',
            'dist',
            '**/dist',
            '**/.env',
            '**/.env.*',
            '!**/.env.example',
            '**/__generated__',
            '**/pnpm-lock.yaml',
            '**/package-lock.json',
            '**/yarn.lock',
            '**/coverage',
            'tailwind.config.ts',
        ],
    },
    ...compat
        .extends(
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-requiring-type-checking',
            'plugin:@angular-eslint/recommended',
            'plugin:@angular-eslint/template/process-inline-templates',
            'plugin:prettier/recommended',
        )
        .map((config) => ({
            ...config,
            files: ['**/*.ts'],
        })),
    {
        files: ['**/*.ts'],

        languageOptions: {
            ecmaVersion: 5,
            sourceType: 'script',

            parserOptions: {
                project: true,
                tsconfigRootDir: './',
            },
        },

        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],

            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],

            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/naming-convention': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@angular-eslint/no-output-on-prefix': 'off',
            '@angular-eslint/template/click-events-have-key-events': 'off',
            '@angular-eslint/template/interactive-supports-focus': 'off',
            '@angular-eslint/no-empty-lifecycle-method': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/unbound-method': 'off',
            'no-empty': 'off'
        },
    },
    ...compat
        .extends(
            'plugin:@angular-eslint/template/recommended',
            'plugin:@angular-eslint/template/accessibility',
        )
        .map((config) => ({
            ...config,
            files: ['**/*.html'],
        })),
    {
        files: ['**/*.html'],
        rules: {},
    },
];
