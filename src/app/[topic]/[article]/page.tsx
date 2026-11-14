import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleHeader } from '@/components/article/ArticleHeader';
import { SeriesNavigation } from '@/components/article/SeriesNavigation';
import { topics } from '@/data/content.topics';
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
  };
}

export default async function ArticlePage({
  params,
}: PageProps<'/[topic]/[article]'>) {
  const { topic: topicSlug, article: articleSlug } = await params;
  const entry = topicModel.findArticle(topics, topicSlug, articleSlug);
  if (!entry) notFound();

  const { topic, article } = entry;
  const { default: Content } = await article.load();

  return (
    <main className="mx-auto w-full max-w-article flex-1 px-6 pt-12 pb-24">
      <ArticleHeader topic={topic} article={article} />
      <article className="text-body text-prose">
        <Content />
      </article>
      <SeriesNavigation topic={topic} article={article} />
    </main>
  );
}
