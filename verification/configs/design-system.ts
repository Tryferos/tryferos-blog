// WHY: Pages that pick their own colors, sizes and one-off values drift away from the theme in globals.css.
// SOLVES: Allows only Tailwind classes built from theme tokens, written so the linter can read them.
import path from 'node:path';
import { defineConfig } from 'oxlint';

const shadcnPlugin = path.join(
  import.meta.dirname,
  '../plugins/shadcn.plugin.ts',
);

export default defineConfig({
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      jsPlugins: [shadcnPlugin],
      rules: {
        'shadcn/no-raw-colors': 'error',
        'shadcn/no-arbitrary-values': 'error',
        'shadcn/no-inline-styles': 'error',
        'shadcn/no-unknown-classes': 'error',
        'shadcn/require-static-classes': 'error',
      },
    },
  ],
});
