// WHY: The automatic JSX runtime imports React by itself, so asking every JSX file to import it only adds noise.
// SOLVES: Lets JSX files leave React out of scope.
import { defineConfig } from 'oxlint';

export default defineConfig({
  overrides: [
    {
      files: ['**/*.{jsx,tsx}'],
      plugins: ['react'],
      rules: { 'react/react-in-jsx-scope': 'off' },
    },
  ],
});
