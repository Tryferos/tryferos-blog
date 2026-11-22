// WHY: components/ui and its helpers in lib hold shadcn code, which follows shadcn's shape, styling and typing rather than the app's conventions.
// SOLVES: Keeps shadcn code flexible by turning off the app's style, structure, strictness and size rules there, while correctness checks, unknown Tailwind classes and module boundaries still apply.
import path from 'node:path';
import { defineConfig } from 'oxlint';
import { typescriptStrict } from '../rule-sets/typescript.strict.ts';

const pluginsDir = path.join(import.meta.dirname, '../plugins');

const shadcnFiles = [
  'src/components/ui/**',
  'src/lib/code-block/highlighter.tsx',
  'src/lib/code-block/use-highlighted-code.ts',
  'src/lib/use-mobile.ts',
];

const strictTypesOff = Object.fromEntries(
  Object.keys(typescriptStrict).map(rule => [rule, 'off' as const]),
);

export default defineConfig({
  overrides: [
    {
      files: shadcnFiles,
      jsPlugins: [
        'eslint-plugin-project-structure',
        'eslint-plugin-sonarjs',
        path.join(pluginsDir, 'components.plugin.ts'),
        path.join(pluginsDir, 'naming.plugin.ts'),
        path.join(pluginsDir, 'shadcn.plugin.ts'),
      ],
      rules: {
        ...strictTypesOff,
        'typescript/no-unsafe-type-assertion': 'off',
        'typescript/consistent-return': 'off',
        'project-structure/file-composition': 'off',
        'components/main-component-first': 'off',
        'components/no-utility-types': 'off',
        'components/props-above-component': 'off',
        'naming/identifier-casing': 'off',
        'shadcn/no-restyle': 'off',
        'shadcn/no-arbitrary-values': 'off',
        'shadcn/no-inline-styles': 'off',
        'shadcn/require-static-classes': 'off',
        'no-restricted-imports': 'off',
        complexity: 'off',
        'sonarjs/cognitive-complexity': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'no-nested-ternary': 'off',
        'no-param-reassign': 'off',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'react/no-unstable-nested-components': 'off',
        'react/set-state-in-effect': 'off',
        'jsx-a11y/prefer-tag-over-role': 'off',
        'jsx-a11y/no-noninteractive-tabindex': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/anchor-has-content': 'off',
      },
    },
  ],
});
