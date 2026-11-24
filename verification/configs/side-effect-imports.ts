// WHY: An import without bindings runs code only for its side effects, which the reader cannot see from the import line.
// SOLVES: Requires every import to bind a name, except stylesheets, which are imported for their side effect.
import { defineConfig } from 'oxlint';

export default defineConfig({
  overrides: [
    {
      files: ['**/*'],
      plugins: ['import'],
      rules: {
        'import/no-unassigned-import': ['warn', { allow: ['**/*.css'] }],
      },
    },
  ],
});
