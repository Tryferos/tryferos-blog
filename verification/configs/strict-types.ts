// WHY: Pages render content at build time, where an unchecked type becomes a broken page or a failed deploy.
// SOLVES: Applies strict type-aware TypeScript rules, bans deprecated APIs and keeps one naming and type style.
import path from 'node:path';
import { defineConfig } from 'oxlint';
import { typescriptStrict } from '../rule-sets/typescript.strict.ts';

const namingPlugin = path.join(
  import.meta.dirname,
  '../plugins/naming.plugin.ts',
);

export default defineConfig({
  options: { typeAware: true },
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['typescript'],
      rules: { 'typescript/no-deprecated': 'error' },
    },
    {
      files: ['src/**/*.{ts,tsx}'],
      jsPlugins: [namingPlugin],
      rules: {
        ...typescriptStrict,
        'typescript/consistent-type-definitions': ['error', 'type'],
        'naming/identifier-casing': 'error',
        'no-void': ['error', { allowAsStatement: true }],
      },
    },
  ],
});
