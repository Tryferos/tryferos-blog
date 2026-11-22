import * as m from 'motion/react-m';

import { ArticleListItem } from './ArticleListItem';
import { Row } from '@/components/shared/Row';
import { Separator } from '@/components/ui/Separator';
import {
  firstSectionDelaySeconds,
  sectionReveal,
  sectionStaggerSeconds,
} from '@/data/motion.tokens';
import * as topicModel from '@/models/topic.model';
import type { Topic } from '@/types/content.types';

type Props = { topic: Topic; position: number };

export function TopicSection({ topic, position }: Props) {
  const titleId = `${topic.slug}-title`;
  return (
    <m.section
      id={topic.slug}
      aria-labelledby={titleId}
      {...sectionReveal}
      transition={{
        delay: firstSectionDelaySeconds + sectionStaggerSeconds * position,
      }}
      className="scroll-mt-16"
    >
      <Row align="center" gap="md">
        <h2 id={titleId} className="shrink-0 text-2xl font-semibold">
          {topic.title}
        </h2>
        <Separator className="flex-1" />
        <span className="shrink-0 text-sm text-muted-foreground">
          {topic.articles.length} articles
        </span>
      </Row>
      <ol className="mt-8 grid gap-x-9 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {topicModel.articlesByReleaseStatus(topic).map(article => (
          <ArticleListItem key={article.slug} topic={topic} article={article} />
        ))}
      </ol>
    </m.section>
  );
}
