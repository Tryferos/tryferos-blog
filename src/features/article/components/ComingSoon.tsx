import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

import { ArticleLayout } from '../article.layout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageMain } from '@/components/shared/PageMain';
import { Row } from '@/components/shared/Row';
import * as topicModel from '@/models/topic.model';
import type { Topic, UpcomingArticle } from '@/types/content.types';

type Props = { topic: Topic; article: UpcomingArticle };

export function ComingSoon({ topic, article }: Props) {
  return (
    <PageMain>
      <ArticleLayout topic={topic} article={article}>
        <Row wrap align="center" gap="md">
          <Button asChild variant="outline" size="pill">
            <Link href={topicModel.sectionHref(topic)}>
              <IconArrowLeft data-icon="inline-start" />
              Back to all articles
            </Link>
          </Button>
          <Badge variant="secondary">Coming soon</Badge>
        </Row>
      </ArticleLayout>
      <p className="mt-8 text-body text-prose">
        This article is still being written. Check back soon, or read one that
        is already out.
      </p>
    </PageMain>
  );
}
