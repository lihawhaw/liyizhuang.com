---
title: ESLint 配置
---

## Next.js ESLint v8

```javascript
// eslint.config.mts
import pluginCss from '@eslint/css'
import pluginJs from '@eslint/js'
import pluginJson from '@eslint/json'
import pluginMarkdown from '@eslint/markdown'
import { defineConfig, globalIgnores } from 'eslint/config'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import { tailwind4 } from 'tailwind-csstree'
import pluginTs from 'typescript-eslint'
import prettierConfig from './prettier.config.mts'

/** 1. Ignore */
const ignores = globalIgnores(['dist/', 'tsconfig.json', 'biome.jsonc', 'eslint.config.mts', '.trae/rules/project_rules.md', 'CLAUDE.md'])

/** 2. JavaScript */
const javascript = { files: ['**/*.{js,mjs,cjs,jsx}'], languageOptions: { globals: globals.browser }, ...pluginJs.configs.recommended }

/** 3. TypeScript */
const typescript = {
  files: ['**/*.{ts,tsx,mts,cts}'],
  ...pluginTs.configs.recommended[2],
  languageOptions: {
    parser: pluginTs.parser,
    parserOptions: {
      ecmaVersion: 'latest', // 2024,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    globals: globals.browser,
  },
  plugins: { '@typescript-eslint': pluginTs.plugin },
  rules: {
    ...pluginTs.configs.recommended[2].rules,
    '@typescript-eslint/no-unused-vars': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/ban-types': ['off'],
    '@typescript-eslint/naming-convention': [
      'warn',
      { selector: 'enum', format: ['PascalCase'] },
      { selector: 'enumMember', format: ['PascalCase'] },
    ],
  },
}

/** 4. React + Hooks */
const react = {
  files: ['**/*.{jsx,tsx}'],
  ...pluginReact.configs.flat.recommended,
  plugins: { react: pluginReact, 'react-hooks': pluginReactHooks },
  languageOptions: { globals: globals.browser },
  settings: { react: { version: 'detect' } },
  rules: {
    ...pluginReact.configs.flat.recommended.rules,
    ...pluginReactHooks.configs.flat.recommended.rules,

    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'error',
  },
}

/** 5. Node */
const node = {
  files: ['**/*.{cjs,mjs,mts}', 'commitlint.config.*'],
  languageOptions: {
    globals: globals.node,
    parser: pluginTs.parser,
    parserOptions: {
      ecmaVersion: 'latest', // 2024,
      sourceType: 'module',
    },
  },
}

/** 6. JSON / JSONC / JSON5 */
const jsonBase = { plugins: { json: pluginJson }, extends: ['json/recommended'] }

const json = { ...jsonBase, files: ['**/*.json'], language: 'json/json' }

const jsonc = { ...jsonBase, files: ['**/*.jsonc'], language: 'json/jsonc' }

const json5 = { ...jsonBase, files: ['**/*.json5'], language: 'json/json5' }

/** 7. Markdown */
const markdown = {
  files: ['**/*.md'],
  plugins: { markdown: pluginMarkdown },
  language: 'markdown/commonmark',
  extends: ['markdown/recommended'],
  // processor: 'markdown/markdown',
  rules: { 'markdown/fenced-code-language': 'off' },
}

/** 8. CSS + Tailwind v4 */
const css = {
  files: ['**/*.css'],
  plugins: { css: pluginCss },
  language: 'css/css',
  languageOptions: { customSyntax: tailwind4, tolerant: true },
  rules: { 'css/no-empty-blocks': 'error', 'css/no-browser-hacks': 'off', 'css/no-unknown-animations': 'off' },
}

/** 9. Prettier */
const prettier = {
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}'],
  plugins: { prettier: pluginPrettier },
  rules: { 'prettier/prettier': ['warn', prettierConfig] },
}

/** 10. 导出最终配置（顺序极其关键） */
// @ts-expect-error
export default defineConfig([ignores, javascript, typescript, react, node, json, jsonc, json5, markdown, css, prettier])
```
