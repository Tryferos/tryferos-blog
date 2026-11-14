import * as articleModel from '@/models/article.model';
import type { Article, Topic } from '@/types/content.types';

import { ArticleHeader } from './components/ArticleHeader';
import { KeepReading } from './components/KeepReading';
import { ReadingProgress } from './components/ReadingProgress';
import { SeriesNavigation } from './components/SeriesNavigation';
import { TableOfContents } from './components/TableOfContents';

type Props = { topic: Topic; article: Article };

export async function ArticleScreen({ topic, article }: Props) {
  const { default: Content, tableOfContents } = await article.load();

  return (
    <main className="mx-auto w-full max-w-page flex-1 px-6 pt-14 pb-24">
      <ReadingProgress />
      <ArticleHeader topic={topic} article={article} />
      <div className="mt-10 flex flex-col gap-12 border-t pt-10 lg:flex-row lg:items-start lg:gap-24">
        <div className="min-w-0 max-w-article flex-1">
          <article className="text-body text-prose">
            <Content />
          </article>
          <SeriesNavigation topic={topic} article={article} />
        </div>
        <aside
          aria-label="Article navigation"
          className="flex shrink-0 flex-col gap-9 lg:sticky lg:top-8 lg:w-58"
        >
          <TableOfContents
            sections={articleModel.sectionsOf(tableOfContents)}
          />
          <KeepReading topic={topic} article={article} />
        </aside>
      </div>
    </main>
  );
}
