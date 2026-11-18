import Link from 'next/link';

import { Eyebrow } from '@/components/shared/Eyebrow';
import { Icon } from '@/components/shared/Icon';
import * as topicModel from '@/models/topic.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article };

export function KeepReading({ topic, article }: Props) {
  const { upNext, more } = topicModel.keepReading(topic, article);
  if (!upNext && more.length === 0) return null;

  return (
    <section aria-labelledby="keep-reading-title">
      <Eyebrow id="keep-reading-title" className="mb-3.5">
        Keep reading
      </Eyebrow>
      {upNext && (
        <Link
          href={topicModel.articleHref(topic, upNext)}
          className="group flex flex-col gap-1.5"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-link">
            Up next in this series
            <Icon name="arrow-right" className="size-3.5" />
          </span>
          <span className="font-header leading-snug font-medium underline-offset-4 group-hover:underline">
            {upNext.title}
          </span>
          <span className="text-sm text-muted-foreground">
            {upNext.description}
          </span>
          <span className="text-xs text-muted-foreground">
            Part {topicModel.partOf(topic, upNext)}
          </span>
        </Link>
      )}
      {more.length > 0 && (
        <>
          <p className="mt-6 mb-1 text-sm font-medium text-prose">
            More in this series
          </p>
          <ul className="flex flex-col">
            {more.map(other => (
              <li key={other.slug} className="border-b">
                <Link
                  href={topicModel.articleHref(topic, other)}
                  className="group flex flex-col gap-1 py-3"
                >
                  <span className="font-header text-sm leading-snug font-medium text-prose underline-offset-4 group-hover:underline">
                    {other.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Part {topicModel.partOf(topic, other)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      <Link
        href={topicModel.sectionHref(topic)}
        className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-medium text-link hover:text-foreground"
      >
        View the whole series
        <Icon name="arrow-right" className="size-3.5" />
      </Link>
    </section>
  );
}
