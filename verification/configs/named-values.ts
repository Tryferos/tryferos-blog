// WHY: A bare number in a condition or index hides what it means, so the reader has to guess why it is there.
// SOLVES: Requires numbers other than 0, 1 and -1 to live in a named constant. shadcn's generated components keep their numbers.
import { defineConfig } from 'oxlint';

export default defineConfig({
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      rules: {
        'no-magic-numbers': [
          'error',
          {
            ignore: [0, 1, -1],
            enforceConst: true,
            ignoreNumericLiteralTypes: true,
            ignoreTypeIndexes: true,
          },
        ],
      },
    },
    {
      files: ['src/components/ui/**'],
      rules: { 'no-magic-numbers': 'off' },
    },
  ],
});
