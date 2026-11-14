// WHY: A kind folder with many files is hard to scan, but a subfolder for a single file only adds depth.
// SOLVES: Requires each concern subfolder inside a kind folder, such as components/load/, to hold at least two files.
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
  'middleware',
  'models',
  'parsers',
  'providers',
  'queries',
  'schemas',
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
      rules: { 'structure/concern-folder-size': ['error', { kindFolders }] },
    },
  ],
});
