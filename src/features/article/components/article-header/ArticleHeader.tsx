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
        <Row align="center" gap="xl" className="h-10">
          <Separator
            orientation="vertical"
            variant="strong"
            className="hidden md:block"
          />
          <div className="relative isolate">
            <div
              aria-hidden
              className="absolute -inset-x-8 -inset-y-4 -z-10 rotate-3 bg-hero-paper/15 mask-radial-from-20% backdrop-blur-xs"
            />
            <div
              aria-hidden
              className="absolute -top-6 -right-12 -bottom-2 -left-4 -z-10 -rotate-6 bg-hero-paper/10 mask-radial-from-10% backdrop-blur-xs"
            />
            <Row align="center" gap="sm">
              <IconCalendar className="size-5 text-foreground" />
              <PublishedDate
                date={article.publishedAt}
                className="text-base text-foreground"
              />
            </Row>
          </div>
        </Row>
      </Row>
    </ArticleLayout>
  );
}
