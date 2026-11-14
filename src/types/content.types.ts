import type { MDXContent } from 'mdx/types';

export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  load: () => Promise<{ default: MDXContent }>;
};

export type Topic = {
  slug: string;
  title: string;
  description: string;
  articles: Article[];
};
