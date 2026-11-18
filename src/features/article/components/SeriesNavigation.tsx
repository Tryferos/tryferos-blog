import Link from 'next/link';

import { Icon } from '@/components/shared/Icon';
import { cn } from '@/lib/utils';
import * as topicModel from '@/models/topic.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article };

export function SeriesNavigation({ topic, article }: Props) {
  const { previous, next } = topicModel.neighboursOf(topic, article);

  return (
    <nav
      aria-label="More articles"
      className="mt-18 flex flex-wrap justify-between gap-x-12 gap-y-6 border-t pt-7"
    >
      {previous ? (
        <PagerLink
          href={topicModel.articleHref(topic, previous)}
          label="Previous article"
          title={previous.title}
          direction="previous"
        />
      ) : (
        <PagerLink
          href={topicModel.sectionHref(topic)}
          label="All articles"
          title={topic.title}
          direction="previous"
        />
      )}
      {next && (
        <PagerLink
          href={topicModel.articleHref(topic, next)}
          label="Next article"
          title={next.title}
          direction="next"
        />
      )}
    </nav>
  );
}

type PagerLinkProps = {
  href: string;
  label: string;
  title: string;
  direction: 'previous' | 'next';
};

function PagerLink({ href, label, title, direction }: PagerLinkProps) {
  const isNext = direction === 'next';
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-1 basis-55 flex-col gap-2 leading-snug',
        isNext && 'items-end text-right',
      )}
    >
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2.5 text-primary">
        {!isNext && <Icon name="arrow-left" className="size-4.5" />}
        <span className="font-header text-lg font-semibold text-foreground decoration-primary underline-offset-4 group-hover:underline">
          {title}
        </span>
        {isNext && <Icon name="arrow-right" className="size-4.5" />}
      </span>
    </Link>
  );
}
