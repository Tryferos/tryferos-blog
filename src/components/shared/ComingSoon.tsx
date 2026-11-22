import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

import { ArticleHeaderLayout } from '@/components/shared/article-header/ArticleHeaderLayout.shared';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageMain } from '@/components/shared/PageMain';
import * as topicModel from '@/models/topic.model';
import type { Topic, UpcomingArticle } from '@/types/content.types';

type Props = { topic: Topic; article: UpcomingArticle };

export function ComingSoon({ topic, article }: Props) {
  return (
    <PageMain>
      <ArticleHeaderLayout topic={topic} article={article}>
        <Badge variant="secondary">Coming soon</Badge>
        <p className="mt-4 text-xl/relaxed text-muted-foreground">
          {article.description}
        </p>
        <p className="mt-6 text-body text-prose">
          This article is still being written. Check back soon, or read one that
          is already out.
        </p>
        <Button asChild variant="outline" size="lg" className="mt-8">
          <Link href={topicModel.sectionHref(topic)}>
            <IconArrowLeft />
            Back to all articles
          </Link>
        </Button>
      </ArticleHeaderLayout>
    </PageMain>
  );
}
