import type { MDXContent } from "mdx/types";

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
    slug: "agentic-development",
    title: "Agentic development",
    description:
      "Working alongside coding agents: how to shape a codebase, its rules and its workflows so agents do the right thing by default.",
    articles: [
      {
        slug: "codebase-conventions",
        title: "Codebase conventions for agentic development",
        description:
          "The rules, files and habits that make a repository easy for an agent to work in.",
        publishedAt: "2026-11-14",
        load: () => import("./agentic-development/codebase-conventions.mdx"),
      },
    ],
  },
];

export function partNumber(index: number) {
  return index + 1;
}

export function getTopic(topicSlug: string) {
  return topics.find((topic) => topic.slug === topicSlug);
}

export function getArticle(topicSlug: string, articleSlug: string) {
  const topic = getTopic(topicSlug);
  const article = topic?.articles.find((candidate) => candidate.slug === articleSlug);
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
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}
