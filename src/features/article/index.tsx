import type { Article, Topic } from '@/types/content.types';

import { ArticleHeader } from './components/ArticleHeader';
import { SeriesNavigation } from './components/SeriesNavigation';

type Props = { topic: Topic; article: Article };

export async function ArticleScreen({ topic, article }: Props) {
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
