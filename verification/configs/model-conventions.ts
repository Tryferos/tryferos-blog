// WHY: Models hold every rule derived from two or more fields, so callers must reach them the same way everywhere.
// SOLVES: Forces models to be plain functions imported as named namespaces.
import path from 'node:path';
import { defineConfig } from 'oxlint';

const modelsPlugin = path.join(
  import.meta.dirname,
  '../plugins/models.plugin.ts',
);

export default defineConfig({
  overrides: [
    {
      files: ['**/*'],
      jsPlugins: [modelsPlugin],
      rules: {
        'models/namespace-import': 'error',
        'models/no-classes': 'error',
      },
    },
  ],
});
