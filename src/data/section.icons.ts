import {
  type Icon,
  IconArrowsLeftRight,
  IconBug,
  IconHash,
  IconHeartBroken,
  IconTool,
} from '@tabler/icons-react';

export const sectionIcons: Partial<Record<string, Icon>> = {
  'the-problem': IconBug,
  'why-it-hurts': IconHeartBroken,
  'the-fix': IconTool,
  'before--after': IconArrowsLeftRight,
};

export const defaultSectionIcon = IconHash;
