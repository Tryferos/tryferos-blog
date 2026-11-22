import * as articleModel from '@/models/article.model';
import type {
  Article,
  PublishedArticle,
  SearchGroup,
  Topic,
} from '@/types/content.types';

const firstPart = 1;

export function sectionHref(topic: Topic) {
  return `/#${topic.slug}`;
}

export function articleHref(topic: Topic, article: Article) {
  return `/${topic.slug}/${article.slug}`;
}

export function partOf(topic: Topic, article: Article) {
  return topic.articles.indexOf(article) + firstPart;
}

function publishedArticles(topic: Topic) {
  return topic.articles.filter(articleModel.isPublished);
}

export function articlesByReleaseStatus(topic: Topic) {
  return topic.articles.toSorted((first, second) => {
    const firstIsPublished = articleModel.isPublished(first);
    const secondIsPublished = articleModel.isPublished(second);
    return Number(secondIsPublished) - Number(firstIsPublished);
  });
}

export function neighboursOf(topic: Topic, article: PublishedArticle) {
  const published = publishedArticles(topic);
  const index = published.indexOf(article);
  return {
    previous: published[index - 1],
    next: published[index + 1],
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

export function keepReading(topic: Topic, article: PublishedArticle) {
  const { next } = neighboursOf(topic, article);
  return {
    upNext: next,
    more: publishedArticles(topic).filter(
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
