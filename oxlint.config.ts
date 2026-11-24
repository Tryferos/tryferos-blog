import { defineConfig } from 'oxlint';
import componentFileNames from './verification/configs/component-file-names.ts';
import concernFolders from './verification/configs/concern-folders.ts';
import designSystem from './verification/configs/design-system.ts';
import explicitBehavior from './verification/configs/explicit-behavior.ts';
import moduleBoundaries from './verification/configs/module-boundaries.ts';
import modelConventions from './verification/configs/model-conventions.ts';
import modernSyntax from './verification/configs/modern-syntax.ts';
import modularCode from './verification/configs/modular-code.ts';
import namedValues from './verification/configs/named-values.ts';
import reactCompiler from './verification/configs/react-compiler.ts';
import scrollAreas from './verification/configs/scroll-areas.ts';
import strictTypes from './verification/configs/strict-types.ts';
import uiComponents from './verification/configs/ui-components.ts';

export default defineConfig({
  plugins: ['typescript', 'react', 'nextjs', 'jsx-a11y', 'import', 'unicorn'],
  categories: { correctness: 'error', suspicious: 'warn' },
  env: { browser: true, node: true },
  options: { reportUnusedDisableDirectives: 'warn' },
  ignorePatterns: ['.agents/**', '.claude/**', 'next-env.d.ts'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-unassigned-import': ['warn', { allow: ['**/*.css'] }],
  },
  extends: [
    strictTypes,
    explicitBehavior,
    modernSyntax,
    modularCode,
    concernFolders,
    designSystem,
    componentFileNames,
    reactCompiler,
    modelConventions,
    moduleBoundaries,
    uiComponents,
    namedValues,
    scrollAreas,
  ],
});
