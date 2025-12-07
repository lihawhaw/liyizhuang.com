---
title: Biome 配置
---

## React 项目

```json title="biome.jsonc"
{
  "$schema": "https://biomejs.dev/schemas/2.3.6/schema.json",
  "root": true,
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  },
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "includes": ["**", "!**/generated", "!!**/dist"]
  },
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
              {
                "selector": {
                  "kind": "enum"
                },
                "match": "I?[A-Z][a-z]+(?:[A-Z][a-z]*)*",
                "formats": ["PascalCase"]
              },
              {
                "selector": {
                  "kind": "enumMember"
                },
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
      "react": "recommended"
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 140,
    "attributePosition": "auto",
    "formatWithErrors": false,
    "lineEnding": "auto",
    "bracketSpacing": true,
    "expand": "never"
  },
  "html": {
    "experimentalFullSupportEnabled": true,
    "formatter": {
      "enabled": true,
      "indentScriptAndStyle": true
    }
  },
  "css": {
    "parser": {
      "cssModules": true,
      "tailwindDirectives": true
    },
    "linter": {
      "enabled": true
    },
    "formatter": {
      "enabled": true,
      "indentWidth": 2,
      "quoteStyle": "single",
      "lineWidth": 140
    }
  },
  "javascript": {
    "assist": {
      "enabled": true
    },
    "formatter": {
      "enabled": true,
      "quoteStyle": "single",
      "jsxQuoteStyle": "single",
      "semicolons": "asNeeded",
      "trailingCommas": "all",
      "attributePosition": "auto",
      "arrowParentheses": "asNeeded",
      "bracketSpacing": true,
      "bracketSameLine": false,
      "indentStyle": "space",
      "expand": "never",
      "quoteProperties": "asNeeded"
    }
  },
  "json": {
    "parser": {
      "allowComments": false
    },
    "linter": {
      "enabled": true
    },
    "formatter": {
      "enabled": true,
      "expand": "auto",
      "indentStyle": "space",
      "indentWidth": 2,
      "lineWidth": 140,
      "trailingCommas": "none"
    }
  },
  "overrides": [
    {
      "includes": ["**/*.jsonc", "biome.jsonc", ".vscode/**", "tsconfig.json"],
      "json": {
        "parser": {
          "allowComments": true
        }
      }
    }
  ]
}
```
