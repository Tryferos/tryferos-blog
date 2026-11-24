// WHY: Rules written straight into oxlint.config.ts lose the WHY and SOLVES that explain them, and the next rule lands there too.
// SOLVES: Keeps oxlint.config.ts to plugins, options and extends, so every rule lives in a config in verification/configs/.
import path from 'node:path';
import { defineConfig } from 'oxlint';

const lintConfigPlugin = path.join(
  import.meta.dirname,
  '../plugins/lint-config.plugin.ts',
);

export default defineConfig({
  overrides: [
    {
      files: ['oxlint.config.ts'],
      jsPlugins: [lintConfigPlugin],
      rules: { 'lint-config/root-config-without-rules': 'error' },
    },
  ],
});
