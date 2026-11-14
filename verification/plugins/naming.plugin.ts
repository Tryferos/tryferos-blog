import type { Plugin } from '@oxlint/plugins';
import { identifierCasing } from '../custom-rules/identifier-casing.ts';

export default {
  meta: { name: 'naming' },
  rules: { 'identifier-casing': identifierCasing },
} satisfies Plugin;
