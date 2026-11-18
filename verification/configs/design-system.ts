// WHY: Pages that pick their own colors, sizes and one-off values drift away from the theme in globals.css.
// SOLVES: Lets components/ui own the look of its components, so app code may only place them, and allows only Tailwind classes built from theme tokens, written so the linter can read them.
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
        'shadcn/no-restyle': [
          'error',
          {
            allow: ['layout'],
            componentImports: [
              '^@/components/ui(/|$)',
              '^@/components/shared/(Row|Column)$',
            ],
            contracts: [
              {
                pattern: '^(Row|Column)$',
                allow: ['layout'],
                message: {
                  spacing:
                    'Set the space between children with the gap prop: none, xs (gap-1), sm (gap-2), md (gap-4), lg (gap-8), xl (gap-12) or 2xl (gap-16).',
                },
              },
            ],
          },
        ],
        'shadcn/no-raw-colors': 'error',
        'shadcn/no-arbitrary-values': 'error',
        'shadcn/no-inline-styles': 'error',
        'shadcn/no-unknown-classes': 'error',
        'shadcn/require-static-classes': 'error',
      },
    },
  ],
});
