import type { Toc } from '@stefanprobst/rehype-extract-toc';
import type { MDXContent } from 'mdx/types';
import type { StaticImageData } from 'next/image';

import type { articleStatuses } from '@/data/article.statuses';

export type ArticleModule = {
  default: MDXContent;
  tableOfContents: Toc;
};

type ArticleSummary = {
  slug: string;
  title: string;
  description: string;
  illustration: { src: StaticImageData; alt: string };
};

export type PublishedArticle = ArticleSummary & {
  status: typeof articleStatuses.published;
  publishedAt: string;
  prompt: string;
  load: () => Promise<ArticleModule>;
};

export type UpcomingArticle = ArticleSummary & {
  status: typeof articleStatuses.upcoming;
};

export type Article = PublishedArticle | UpcomingArticle;

export type ArticleLink = {
  href: string;
  title: string;
  description: string;
  illustration: ArticleSummary['illustration'];
  publishedAt?: string;
};

export type SearchGroup = {
  title: string;
  links: ArticleLink[];
};

export type ComparisonChange = {
  before: string;
  after: string;
};

export type Section = {
  id: string;
  title: string;
};

export type Topic = {
  slug: string;
  title: string;
  articles: Article[];
};
