import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { topics } from '@/data/content.topics';
import { formatDate } from '@/lib/format-date';
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
  const part = topicModel.partOf(topic, article);
  const { previous, next } = topicModel.neighboursOf(topic, article);
  const { default: Content } = await article.load();
  const hasSeriesNavigation = previous !== undefined || next !== undefined;

  return (
    <main className="mx-auto w-full max-w-article flex-1 px-6 pt-12 pb-24">
      <header className="mb-10 border-b pb-10">
        <p className="text-sm font-medium text-primary">
          <Link
            href={topicModel.sectionHref(topic)}
            className="hover:underline underline-offset-4"
          >
            {topic.title}
          </Link>
          <span className="text-muted-foreground">
            {' '}
            · Part {part} of {topic.articles.length}
          </span>
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-balance sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {article.description}
        </p>
        <time
          dateTime={article.publishedAt}
          className="mt-6 block text-sm text-muted-foreground"
        >
          {formatDate(article.publishedAt)}
        </time>
      </header>

      <article className="text-body text-prose">
        <Content />
      </article>

      {hasSeriesNavigation && (
        <nav
          aria-label="Series"
          className="mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2"
        >
          {previous && (
            <Link
              href={topicModel.articleHref(topic, previous)}
              className="group rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <span className="text-xs text-muted-foreground">Previous</span>
              <span className="mt-1 block font-header font-medium">
                {previous.title}
              </span>
            </Link>
          )}
          {next && (
            <Link
              href={topicModel.articleHref(topic, next)}
              className="group rounded-lg border p-4 text-right transition-colors hover:bg-accent sm:col-start-2"
            >
              <span className="text-xs text-muted-foreground">Next</span>
              <span className="mt-1 block font-header font-medium">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </main>
  );
}
