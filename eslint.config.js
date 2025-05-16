import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import jest from 'eslint-plugin-jest';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      jest: jest,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      quotes: ['error', 'single'],
     // indent: ['error', 2],
      curly: ['error', 'all'],
      'max-len': ['error', { code: 120 }],
      'no-magic-numbers': ['warn', { ignoreArrayIndexes: true }],
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          memberSyntaxSortOrder: ['none', 'single', 'multiple', 'all'],
        },
      ],
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-empty-function': 'warn',
      'consistent-return': 'error',
      'no-unsafe-finally': 'warn',
      'prefer-const': 'error',
      'require-await': 'warn',
    },
  },
);
