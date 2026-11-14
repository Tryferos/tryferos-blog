// WHY: A component file whose name differs from its component, or that opens with something else, is hard to find and read from the JSX that uses it.
// SOLVES: Requires each file in a components/ folder to export a component named after the file, start with it, keep its helpers small, leave utility types to src/types and type each component's destructured props right above it: Props for the main component, <Name>Props for others.
import path from 'node:path';
import { createFileComposition } from 'eslint-plugin-project-structure';
import { defineConfig } from 'oxlint';

const componentFiles = 'src/**/components/**/*.tsx';
const componentsPlugin = path.join(
  import.meta.dirname,
  '../plugins/components.plugin.ts',
);

const fileComposition = createFileComposition({
  projectRoot: path.join(import.meta.dirname, '../..'),
  filesRules: [
    {
      filePattern: [
        'src/**/components/!(*.shared).tsx',
        'src/components/ui/*.tsx',
      ],
      rules: [
        {
          selector: ['function', 'arrowFunction'],
          scope: 'fileExport',
          format: '{FileName}',
        },
      ],
    },
  ],
});

export default defineConfig({
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      jsPlugins: ['eslint-plugin-project-structure'],
      rules: {
        'project-structure/file-composition': ['error', fileComposition],
      },
    },
    {
      files: [componentFiles],
      jsPlugins: [componentsPlugin],
      rules: {
        'components/main-component-first': 'error',
        'components/no-utility-types': 'error',
        'components/props-above-component': 'error',
      },
    },
  ],
});
