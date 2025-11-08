import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    ignores: [
      'src/assets/js/vendor/',
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**',
      '**/.husky/**',
      '**/coverage/**',
      '**/build/**',
      '**/out/**',
      'pnpm-lock.yaml',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.mjs', '.cjs', '.json'],
        },
      },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: { import: importPlugin },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-console': 'off',
      'no-unused-vars': 'warn',
      'no-debugger': 'off',
      'no-undef': 'warn',
      'no-empty': 'off',
      'no-mixed-spaces-and-tabs': 'off',
      eqeqeq: 'off',
      camelcase: 'off',
      'import/order': [
        'warn',
        {
          groups: [
            ['builtin', 'external', 'internal'],
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
  eslintConfigPrettier,
]);
