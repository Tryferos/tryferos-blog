// WHY: A kind folder with many files is hard to scan, but a subfolder for a single file only adds depth.
// SOLVES: Requires each concern subfolder inside a kind folder, such as components/load/, to hold at least two files, and a file used only by one sibling to move into a concern subfolder with it. components/ui/ holds only shadcn components, so it stays flat.
import path from 'node:path';
import { defineConfig } from 'oxlint';

const structurePlugin = path.join(
  import.meta.dirname,
  '../plugins/structure.plugin.ts',
);

const kindFolders = [
  'actions',
  'components',
  'data',
  'errors',
  'hooks',
  'lib',
  'middleware',
  'models',
  'parsers',
  'providers',
  'queries',
  'schemas',
  'shared',
  'stores',
  'tables',
  'types',
  'ui',
  'utils',
];

export default defineConfig({
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      jsPlugins: [structurePlugin],
      rules: {
        'structure/concern-folder-size': ['error', { kindFolders }],
        'structure/single-use-file-grouping': [
          'error',
          { kindFolders, exemptFolders: ['ui'] },
        ],
      },
    },
  ],
});
