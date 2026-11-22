import { Column } from '@/components/shared/Column';
import { Separator } from '@/components/ui/Separator';
import { PageMain } from '@/components/shared/PageMain';
import * as articleModel from '@/models/article.model';
import type { PublishedArticle, Topic } from '@/types/content.types';

import { ArticleCodeBlock } from './components/ArticleCodeBlock';
import { ArticleHeader } from './components/ArticleHeader';
import { ComparisonCodeSection } from './components/comparison-code-section/ComparisonCodeSection';
import { IntendedAudience } from './components/IntendedAudience';
import { KeepReading } from './components/KeepReading';
import { ReadingProgress } from './components/ReadingProgress';
import { SectionHeading } from './components/SectionHeading';
import { SeriesNavigation } from './components/SeriesNavigation';
import { TableOfContents } from './components/TableOfContents';

type Props = { topic: Topic; article: PublishedArticle };

type LoadedArticle = Awaited<ReturnType<PublishedArticle['load']>>;

const articleComponents = {
  h2: SectionHeading,
  pre: ArticleCodeBlock,
  IntendedAudience,
  ComparisonCodeSection,
};

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

function ArticleBody({
  topic,
  article,
  Content,
}: Props & { Content: LoadedArticle['default'] }) {
  return (
    <div className="min-w-0 max-w-article flex-1">
      <article className="text-body text-prose">
        <Content components={articleComponents} />
      </article>
      <SeriesNavigation topic={topic} article={article} />
    </div>
  );
}

function ArticleSidebar({
  topic,
  article,
  tableOfContents,
}: Props & { tableOfContents: LoadedArticle['tableOfContents'] }) {
  return (
    <Column
      asChild
      gap="lg"
      className="shrink-0 lg:sticky lg:top-8 lg:w-fit lg:max-w-58"
    >
      <aside aria-label="Article navigation">
        <TableOfContents sections={articleModel.sectionsOf(tableOfContents)} />
        <KeepReading topic={topic} article={article} />
      </aside>
    </Column>
  );
}
