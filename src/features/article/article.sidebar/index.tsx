import { Column } from '@/components/shared/Column';
import * as articleModel from '@/models/article.model';
import type {
  ArticleModule,
  PublishedArticle,
  Topic,
} from '@/types/content.types';

import { KeepReading } from './components/KeepReading';
import { TableOfContents } from './components/TableOfContents';

type Props = {
  topic: Topic;
  article: PublishedArticle;
  tableOfContents: ArticleModule['tableOfContents'];
};

export function ArticleSidebar({ topic, article, tableOfContents }: Props) {
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
