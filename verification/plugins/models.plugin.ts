import type { Plugin } from '@oxlint/plugins';
import { modelNamespaceImports } from '../custom-rules/model-namespace-imports.ts';
import { modelsWithoutClasses } from '../custom-rules/models-without-classes.ts';

export default {
  meta: { name: 'models' },
  rules: {
    'namespace-import': modelNamespaceImports,
    'no-classes': modelsWithoutClasses,
  },
} satisfies Plugin;
