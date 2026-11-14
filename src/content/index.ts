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

export const topics: Topic[] = [
  {
    slug: 'codebase-conventions',
    title: 'Codebase conventions for agentic development',
    description: 'Rules that make a codebase work with coding agents.',
    articles: [
      {
        slug: 'comments',
        title: "Comments are for what the code can't say",
        description: "Don't let your agent spam comments",
        publishedAt: '2026-11-14',
        load: () => import('./codebase-conventions/comments.mdx'),
      },
    ],
  },
];

export function partNumber(index: number) {
  return index + 1;
}

export function getTopic(topicSlug: string) {
  return topics.find(topic => topic.slug === topicSlug);
}

export function getArticle(topicSlug: string, articleSlug: string) {
  const topic = getTopic(topicSlug);
  const article = topic?.articles.find(
    candidate => candidate.slug === articleSlug,
  );
  if (!topic || !article) return undefined;

  const index = topic.articles.indexOf(article);
  return {
    topic,
    article,
    part: partNumber(index),
    previous: topic.articles[index - 1],
    next: topic.articles[index + 1],
  };
}

export function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(isoDate));
}
