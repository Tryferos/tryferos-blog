import type { Toc } from '@stefanprobst/rehype-extract-toc';

import { articleStatuses } from '@/data/article.statuses';
import type { Article, PublishedArticle, Section } from '@/types/content.types';

export function isPublished(article: Article): article is PublishedArticle {
  return article.status === articleStatuses.published;
}

export function sectionsOf(tableOfContents: Toc): Section[] {
  return tableOfContents.flatMap(entry =>
    entry.id ? [{ id: entry.id, title: entry.value }] : [],
  );
}

export function headlineParts(article: Article) {
  const lastSpace = article.title.lastIndexOf(' ');
  return {
    lead: article.title.slice(0, lastSpace),
    emphasis: article.title.slice(lastSpace + 1),
  };
}
