import Link from 'next/link';

import { ArticleActions } from './ArticleActions';
import { Icon } from '@/components/shared/Icon';
import { PublishedDate } from '@/components/shared/PublishedDate';
import * as topicModel from '@/models/topic.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article };

export function ArticleHeader({ topic, article }: Props) {
  return (
    <header className="max-w-3xl">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground">
              Articles
            </Link>
          </li>
          <li aria-hidden="true" className="flex">
            <Icon name="chevron-right" className="size-3.5" />
          </li>
          <li>
            <Link
              href={topicModel.sectionHref(topic)}
              className="font-medium text-link underline-offset-4 hover:underline"
            >
              {topic.title}
            </Link>
          </li>
        </ol>
      </nav>
      <h1 className="mt-5 text-4xl/tight font-semibold text-balance sm:text-5xl/tight">
        {article.title}
      </h1>
      <p className="mt-4.5 text-xl/relaxed text-muted-foreground">
        {article.description}
      </p>
      <ArticleActions prompt={article.prompt} />
      <PublishedDate date={article.publishedAt} className="mt-4 block" />
    </header>
  );
}
