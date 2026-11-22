import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { topics } from '@/data/topics/content.topics';
import { ArticleScreen } from '@/features/article';
import * as articleModel from '@/models/article.model';
import * as topicModel from '@/models/topic.model';

export function generateStaticParams() {
  return topicModel.articleParams(topics);
}

export async function generateMetadata({
  params,
}: PageProps<'/[topic]/[article]'>): Promise<Metadata> {
  const { topic, article } = await params;
  const entry = topicModel.findArticle(topics, topic, article);
  if (!entry) return {};

  return {
    title: entry.article.title,
    description: entry.article.description,
    robots: { index: articleModel.isPublished(entry.article) },
  };
}

export default async function ArticlePage({
  params,
}: PageProps<'/[topic]/[article]'>) {
  const { topic: topicSlug, article: articleSlug } = await params;
  const entry = topicModel.findArticle(topics, topicSlug, articleSlug);
  if (!entry) notFound();

  return <ArticleScreen topic={entry.topic} article={entry.article} />;
}
