import type { Article, SearchGroup, Topic } from '@/types/content.types';

const firstPart = 1;
const partLabelDigits = 2;

export function sectionHref(topic: Topic) {
  return `/#${topic.slug}`;
}

export function articleHref(topic: Topic, article: Article) {
  return `/${topic.slug}/${article.slug}`;
}

export function partOf(topic: Topic, article: Article) {
  return topic.articles.indexOf(article) + firstPart;
}

export function partLabel(topic: Topic, article: Article) {
  return String(partOf(topic, article)).padStart(partLabelDigits, '0');
}

export function neighboursOf(topic: Topic, article: Article) {
  const index = topic.articles.indexOf(article);
  return {
    previous: topic.articles[index - 1],
    next: topic.articles[index + 1],
  };
}

export function findArticle(
  topics: Topic[],
  topicSlug: string,
  articleSlug: string,
) {
  const topic = topics.find(candidate => candidate.slug === topicSlug);
  const article = topic?.articles.find(
    candidate => candidate.slug === articleSlug,
  );
  return topic && article ? { topic, article } : undefined;
}

export function keepReading(topic: Topic, article: Article) {
  const { next } = neighboursOf(topic, article);
  return {
    upNext: next,
    more: topic.articles.filter(
      candidate => candidate !== article && candidate !== next,
    ),
  };
}

export function searchGroup(topic: Topic): SearchGroup {
  return {
    title: topic.title,
    links: topic.articles.map(article => ({
      href: articleHref(topic, article),
      title: article.title,
      description: article.description,
    })),
  };
}

export function articleParams(topics: Topic[]) {
  return topics.flatMap(topic =>
    topic.articles.map(article => ({
      topic: topic.slug,
      article: article.slug,
    })),
  );
}
