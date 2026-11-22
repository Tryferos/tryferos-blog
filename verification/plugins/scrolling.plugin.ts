import type { Plugin } from '@oxlint/plugins';
import { scrollAreaOnly } from '../custom-rules/scroll-area-only.ts';

export default {
  meta: { name: 'scrolling' },
  rules: { 'scroll-area-only': scrollAreaOnly },
} satisfies Plugin;
