import { Column } from '@/components/shared/Column';
import { PageMain } from '@/components/shared/PageMain';
import { Separator } from '@/components/ui/Separator';
import type { PublishedArticle, Topic } from '@/types/content.types';

import { ArticleBody } from './article.body';
import { ArticleSidebar } from './article.sidebar';
import { ArticleHeader } from './components/article-header/ArticleHeader';
import { ReadingProgress } from './components/ReadingProgress';

type Props = { topic: Topic; article: PublishedArticle };

export async function ArticleScreen({ topic, article }: Props) {
  const { default: Content, tableOfContents } = await article.load();

  return (
    <Column asChild gap="xl">
      <PageMain>
        <ReadingProgress />
        <ArticleHeader topic={topic} article={article} />
        <Separator />
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-24">
          <ArticleBody topic={topic} article={article} Content={Content} />
          <ArticleSidebar
            topic={topic}
            article={article}
            tableOfContents={tableOfContents}
          />
        </div>
      </PageMain>
    </Column>
  );
}
