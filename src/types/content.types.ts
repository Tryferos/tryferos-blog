import type { Toc } from '@stefanprobst/rehype-extract-toc';
import type { Icon } from '@tabler/icons-react';
import type { MDXContent } from 'mdx/types';

type ArticleModule = {
  default: MDXContent;
  tableOfContents: Toc;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  icon: Icon;
  publishedAt: string;
  prompt: string;
  load: () => Promise<ArticleModule>;
};

export type ArticleLink = {
  href: string;
  title: string;
  description: string;
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
  description: string;
  articles: Article[];
};
