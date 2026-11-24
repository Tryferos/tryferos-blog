import type { Plugin } from '@oxlint/plugins';
import { rootConfigWithoutRules } from '../custom-rules/root-config-without-rules.ts';

export default {
  meta: { name: 'lint-config' },
  rules: {
    'root-config-without-rules': rootConfigWithoutRules,
  },
} satisfies Plugin;
