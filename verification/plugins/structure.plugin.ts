import type { Plugin } from '@oxlint/plugins';
import { concernFolderSize } from '../custom-rules/concern-folder-size.ts';

export default {
  meta: { name: 'structure' },
  rules: { 'concern-folder-size': concernFolderSize },
} satisfies Plugin;
