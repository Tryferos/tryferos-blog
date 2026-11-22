import { IconCalendar } from '@tabler/icons-react';

import { ArticleActions } from './ArticleActions';
import { ArticleLayout } from '../../article.layout';
import { PublishedDate } from '@/components/shared/PublishedDate';
import { Row } from '@/components/shared/Row';
import { Separator } from '@/components/ui/Separator';
import type { PublishedArticle, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: PublishedArticle };

export function ArticleHeader({ topic, article }: Props) {
  return (
    <ArticleLayout topic={topic} article={article}>
      <Row wrap align="center" justify="between" gap="md">
        <ArticleActions prompt={article.prompt} />
        <Row align="center" gap="md" className="h-10">
          <Separator
            orientation="vertical"
            variant="strong"
            className="hidden md:block"
          />
          <Row align="center" gap="sm">
            <IconCalendar className="size-4 text-foreground" />
            <PublishedDate
              date={article.publishedAt}
              className="text-foreground"
            />
          </Row>
        </Row>
      </Row>
    </ArticleLayout>
  );
}
