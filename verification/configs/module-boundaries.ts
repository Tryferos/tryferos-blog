// WHY: Features that import each other or app internals cannot change without breaking each other.
// SOLVES: Limits each module to its own files and the entrypoints of the modules it may depend on.
import { createIndependentModules } from 'eslint-plugin-project-structure';
import { defineConfig } from 'oxlint';
import tsconfig from '../../tsconfig.json' with { type: 'json' };

const sharedFolders = ['components', 'data', 'lib', 'models', 'types'];

const independentModules = createIndependentModules({
  pathAliases: { baseUrl: '.', paths: tsconfig.compilerOptions.paths },
  reusableImportPatterns: {
    shared: sharedFolders.map(folder => `src/${folder}/**`),
    ui: ['src/components/ui/**'],
    content: ['src/content/**'],
    features: ['src/features/*/index.tsx', 'src/features/*'],
  },
  modules: [
    {
      name: 'UI components',
      pattern: 'src/components/ui/**',
      allowImportsFrom: ['{ui}', 'src/lib/**', 'src/data/**', 'src/types/**'],
      errorMessage:
        'UI components import only other UI components, lib, data and types. Pass app data in through props.',
    },
    {
      name: 'Shared code',
      pattern: sharedFolders.map(folder => `src/${folder}/**`),
      allowImportsFrom: ['{shared}', '{content}'],
      errorMessage:
        'Shared code in components, data, lib, models and types imports only shared code and content. It never imports a feature.',
    },
    {
      name: 'Features',
      pattern: 'src/features/**',
      allowImportsFrom: ['{family_3}/**', '{shared}'],
      errorMessage:
        'A feature imports its own files and shared code. It never imports another feature or the app.',
    },
    {
      name: 'App',
      pattern: 'src/app/**',
      allowImportsFrom: ['src/app/**', '{features}', '{shared}'],
      errorMessage:
        'Routes import their own files, feature entrypoints and shared code. Build screens inside a feature.',
    },
    {
      name: 'MDX components',
      pattern: 'src/mdx-components.tsx',
      allowImportsFrom: ['{shared}'],
      errorMessage: 'MDX components import only shared code.',
    },
    {
      name: 'Unknown files',
      pattern: 'src/**',
      allowImportsFrom: [],
      allowExternalImports: false,
      errorMessage:
        'This file belongs to no module. Add its module to verification/configs/module-boundaries.ts.',
    },
  ],
});

export default defineConfig({
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      jsPlugins: ['eslint-plugin-project-structure'],
      rules: {
        'project-structure/independent-modules': ['error', independentModules],
      },
    },
  ],
});
