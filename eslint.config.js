import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: { '@typescript-eslint': ts },
    rules: {
      ...ts.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
    }
  },
  
  {
  files: ['**/*.svelte', '**/*.svelte.ts'],
  languageOptions: {
    parser: svelteParser,
    parserOptions: { parser: tsParser },
    globals: {
      ...globals.browser,
      $state:   'readonly',
      $derived: 'readonly',
      $effect:  'readonly',
      $props:   'readonly',
    }
  },
  plugins: {
    svelte,
    '@typescript-eslint': ts
  },
  rules: {
    ...svelte.configs.recommended.rules,
    '@typescript-eslint/no-explicit-any': 'error',
  }
  },

  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tsParser },
      globals: { ...globals.browser }
    },
    plugins: {
      svelte,
      '@typescript-eslint': ts
    },
    rules: {
      ...svelte.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
    }
  },

  {
    ignores: ['.svelte-kit/**', 'build/**', 'node_modules/**']
  }
];