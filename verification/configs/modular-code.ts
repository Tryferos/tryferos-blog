// WHY: Long, deeply nested functions with many parameters are hard to read, review and change.
// SOLVES: Caps complexity, nesting, parameters and length so code splits into small units.
import { defineConfig } from 'oxlint';

const maxComplexity = 10;
const maxDepth = 3;
const maxNestedCallbacks = 3;
const maxParams = 3;
const maxLinesPerFile = 300;
const maxLinesPerFunction = 100;

export default defineConfig({
  overrides: [
    {
      files: ['**/*'],
      jsPlugins: ['eslint-plugin-sonarjs'],
      rules: {
        complexity: ['error', maxComplexity],
        'sonarjs/cognitive-complexity': ['error', maxComplexity],
        'max-depth': ['error', maxDepth],
        'max-nested-callbacks': ['error', maxNestedCallbacks],
        'max-params': ['error', maxParams],
        'max-lines': [
          'error',
          { max: maxLinesPerFile, skipBlankLines: true, skipComments: true },
        ],
        'max-lines-per-function': [
          'error',
          {
            max: maxLinesPerFunction,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        'no-else-return': ['error', { allowElseIf: false }],
        'no-lonely-if': 'error',
        'no-nested-ternary': 'error',
        'no-param-reassign': ['error', { props: true }],
      },
    },
  ],
});
