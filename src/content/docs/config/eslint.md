---
title: ESLint 配置
---

## Next.js ESLint v8

```javascript
// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc'
import stylistic from '@stylistic/eslint-plugin'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/**
 * @type {import('eslint').Linter.Config}
 */
const eslintConfig = [
  ...compat.config({
    extends: ['next', 'next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  }),
  {
    plugins: {
      stylistic,
    },
    rules: {
      // 单引号
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      // 缩进
      indent: ['error', 2],
      // 末尾逗号
      'comma-dangle': ['error', 'always-multiline'],
      // 不使用分号
      semi: ['error', 'never'],
    },
  },
]

export default eslintConfig
```
