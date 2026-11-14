import * as m from 'motion/react-m';

import { ArticleListItem } from './ArticleListItem';
import {
  firstSectionDelaySeconds,
  sectionReveal,
  sectionStaggerSeconds,
} from '@/data/motion.tokens';
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
      <h2 id={titleId} className="text-2xl font-semibold">
        {topic.title}
      </h2>
      <p className="mt-2 leading-relaxed text-muted-foreground">
        {topic.description}
      </p>
      <ol className="mt-6 divide-y border-y">
        {topic.articles.map(article => (
          <ArticleListItem key={article.slug} topic={topic} article={article} />
        ))}
      </ol>
    </m.section>
  );
}
