---
title: Biome 配置
---

## React 项目

```json title="biome.jsonc"
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "root": true,
  "assist": { "enabled": true, "actions": { "source": { "organizeImports": "on" } } },
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 140,
    "attributePosition": "auto",
    "formatWithErrors": false
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded",
      "trailingCommas": "all",
      "attributePosition": "auto",
      "jsxQuoteStyle": "single",
      "arrowParentheses": "asNeeded",
      "bracketSpacing": true,
      "bracketSameLine": false
    }
  },
  "css": {
    "parser": {
      "cssModules": true
    }
  },
  "json": { "parser": { "allowComments": true }, "linter": { "enabled": true } },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noUselessFragments": "off",
        "noExtraBooleanCast": "off",
        "noBannedTypes": "off"
      },
      "style": {
        "useNamingConvention": {
          "level": "warn",
          "options": {
            "strictCase": true,
            "conventions": [
              { "selector": { "kind": "enum" }, "match": "I?[A-Z][a-z]+(?:[A-Z][a-z]*)*", "formats": ["PascalCase"] },
              {
                "selector": { "kind": "enumMember" },
                "match": "[A-Z][a-z]+(?:[A-Z][a-z]*)*",
                "formats": ["PascalCase"]
              }
            ]
          }
        },
        "noNamespace": "warn"
      }
    },
    "domains": {
      "react": "all"
    }
  }
}
```
