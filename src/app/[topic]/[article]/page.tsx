import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { formatDate, getArticle, topics } from '@/content';

export function generateStaticParams() {
  return topics.flatMap(topic =>
    topic.articles.map(article => ({
      topic: topic.slug,
      article: article.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<'/[topic]/[article]'>): Promise<Metadata> {
  const { topic, article } = await params;
  const entry = getArticle(topic, article);
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
  const entry = getArticle(topicSlug, articleSlug);
  if (!entry) notFound();

  const { topic, article, part, previous, next } = entry;
  const { default: Content } = await article.load();

  return (
    <main className="mx-auto w-full max-w-[68ch] flex-1 px-6 pt-12 pb-24">
      <header className="mb-10 border-b pb-10">
        <p className="text-sm font-medium text-primary">
          <Link
            href={`/#${topic.slug}`}
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

      <article className="text-[1.0625rem] leading-[1.75] text-prose">
        <Content />
      </article>

      {(previous || next) && (
        <nav
          aria-label="Series"
          className="mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2"
        >
          {previous && (
            <Link
              href={`/${topic.slug}/${previous.slug}`}
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
              href={`/${topic.slug}/${next.slug}`}
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
