import { Column } from '@/components/shared/Column';
import { PageMain } from '@/components/shared/PageMain';
import { Separator } from '@/components/ui/Separator';
import * as articleModel from '@/models/article.model';
import type { Article, PublishedArticle, Topic } from '@/types/content.types';

import { ArticleBody } from './article.body';
import { ArticleSidebar } from './article.sidebar';
import { ArticleHeader } from './components/article-header/ArticleHeader';
import { ComingSoon } from './components/ComingSoon';
import { ReadingProgress } from './components/ReadingProgress';

type Props = { topic: Topic; article: Article };

export function ArticleScreen({ topic, article }: Props) {
  if (!articleModel.isPublished(article)) {
    return <ComingSoon topic={topic} article={article} />;
  }
  return <PublishedArticleScreen topic={topic} article={article} />;
}

type PublishedArticleScreenProps = { topic: Topic; article: PublishedArticle };

async function PublishedArticleScreen({
  topic,
  article,
}: PublishedArticleScreenProps) {
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
