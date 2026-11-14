import { defineConfig } from 'oxlint';
import concernFolders from './verification/configs/concern-folders.ts';
import designSystem from './verification/configs/design-system.ts';
import modularCode from './verification/configs/modular-code.ts';
import strictTypes from './verification/configs/strict-types.ts';

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
  extends: [strictTypes, modularCode, concernFolders, designSystem],
});
