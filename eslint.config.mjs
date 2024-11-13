import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import prettier from 'eslint-plugin-prettier'
import _import from 'eslint-plugin-import'
import globals from 'globals'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: ['**/node_modules', '**/build']
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:prettier/recommended',
      'plugin:import/errors',
      'plugin:import/warnings'
    )
  ),
  {
    plugins: {
      prettier: fixupPluginRules(prettier),
      import: fixupPluginRules(_import)
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },

      ecmaVersion: 'latest',
      sourceType: 'commonjs'
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js'],
          moduleDirectory: ['node_modules', 'src/']
        }
      }
    },

    rules: {
      'import/no-unresolved': [
        2,
        {
          caseSensitive: false
        }
      ],

      'import/order': [
        2,
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          'newlines-between': 'always'
        }
      ],

      indent: ['error', 2],
      'linebreak-style': [0, 'windows'],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ],
      quotes: ['error', 'single'],
      semi: ['error', 'never']
    }
  }
]
