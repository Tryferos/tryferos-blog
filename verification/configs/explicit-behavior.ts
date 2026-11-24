// WHY: Loose equality converts types before comparing, and a button without a type submits its form, so the code does something it never says.
// SOLVES: Requires === and !== comparisons and an explicit type on every button element.
import { defineConfig } from 'oxlint';

export default defineConfig({
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['react'],
      rules: {
        eqeqeq: 'error',
        'react/button-has-type': 'error',
      },
    },
  ],
});
