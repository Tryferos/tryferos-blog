import Link from 'next/link';

import { cn } from '@/lib/utils';
import * as topicModel from '@/models/topic.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article };

export function SeriesNavigation({ topic, article }: Props) {
  const { previous, next } = topicModel.neighboursOf(topic, article);
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Series"
      className="mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2"
    >
      {previous && (
        <SeriesLink
          href={topicModel.articleHref(topic, previous)}
          direction="Previous"
          title={previous.title}
        />
      )}
      {next && (
        <SeriesLink
          href={topicModel.articleHref(topic, next)}
          direction="Next"
          title={next.title}
        />
      )}
    </nav>
  );
}

type SeriesLinkProps = {
  href: string;
  direction: 'Previous' | 'Next';
  title: string;
};

function SeriesLink({ href, direction, title }: SeriesLinkProps) {
  const isNext = direction === 'Next';
  return (
    <Link
      href={href}
      className={cn(
        'rounded-lg border p-4 transition-colors hover:bg-accent',
        isNext && 'text-right sm:col-start-2',
      )}
    >
      <span className="text-xs text-muted-foreground">{direction}</span>
      <span className="mt-1 block font-header font-medium">{title}</span>
    </Link>
  );
}
