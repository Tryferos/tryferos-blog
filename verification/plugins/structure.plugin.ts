import type { Plugin } from '@oxlint/plugins';
import { concernFolderSize } from '../custom-rules/concern-folder-size.ts';
import { singleUseFileGrouping } from '../custom-rules/single-use-file-grouping.ts';

export default {
  meta: { name: 'structure' },
  rules: {
    'concern-folder-size': concernFolderSize,
    'single-use-file-grouping': singleUseFileGrouping,
  },
} satisfies Plugin;
