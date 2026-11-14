import Link from 'next/link';

import { PublishedDate } from '@/components/PublishedDate.shared';
import * as topicModel from '@/models/topic.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article };

export function ArticleHeader({ topic, article }: Props) {
  return (
    <header className="mb-10 border-b pb-10">
      <p className="text-sm font-medium text-primary">
        <Link
          href={topicModel.sectionHref(topic)}
          className="underline-offset-4 hover:underline"
        >
          {topic.title}
        </Link>
        <span className="text-muted-foreground">
          {' '}
          · Part {topicModel.partOf(topic, article)} of {topic.articles.length}
        </span>
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-balance sm:text-5xl">
        {article.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {article.description}
      </p>
      <PublishedDate date={article.publishedAt} className="mt-6 block" />
    </header>
  );
}
