// WHY: The React Compiler memoizes components and hooks itself, so manual memoization only adds noise.
// SOLVES: Bans useMemo, useCallback and memo from React.
import { defineConfig } from 'oxlint';

const message = 'The React Compiler memoizes this. Write the plain value.';

export default defineConfig({
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'react',
                importNames: ['useMemo', 'useCallback', 'memo'],
                message,
              },
            ],
          },
        ],
      },
    },
  ],
});
