// WHY: Older forms such as { api: api }, replace with a global regex and includes on a fixed list hide what the code means behind extra syntax.
// SOLVES: Requires property shorthand, replaceAll for replacing every match and a Set for membership checks.
import { defineConfig } from 'oxlint';

export default defineConfig({
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['unicorn'],
      rules: {
        'object-shorthand': 'error',
        'unicorn/prefer-string-replace-all': 'error',
        'unicorn/prefer-set-has': 'error',
      },
    },
  ],
});
