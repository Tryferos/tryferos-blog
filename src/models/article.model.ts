import type { Toc } from '@stefanprobst/rehype-extract-toc';

import type { Section } from '@/types/content.types';

export function sectionsOf(tableOfContents: Toc): Section[] {
  return tableOfContents.flatMap(entry =>
    entry.id ? [{ id: entry.id, title: entry.value }] : [],
  );
}
