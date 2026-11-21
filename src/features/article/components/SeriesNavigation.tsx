import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

import { Row } from '@/components/shared/Row';
import { Item } from '@/components/ui/Item';
import * as topicModel from '@/models/topic.model';
import type { PublishedArticle, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: PublishedArticle };

export function SeriesNavigation({ topic, article }: Props) {
  const { previous, next } = topicModel.neighboursOf(topic, article);

  return (
    <Row asChild wrap justify="between" gap="lg" className="mt-18">
      <nav aria-label="More articles" className="border-t pt-7">
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
    </Row>
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
    <Item
      asChild
      variant="plain"
      size="flush"
      className={isNext ? 'flex-1 basis-55 justify-end' : 'flex-1 basis-55'}
    >
      <Link href={href} prefetch>
        <Item.Header className={isNext ? 'justify-end' : 'justify-start'}>
          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
        </Item.Header>
        <Item.Title size="lg">
          {!isNext && <IconArrowLeft className="size-4.5 text-primary" />}
          {title}
          {isNext && <IconArrowRight className="size-4.5 text-primary" />}
        </Item.Title>
      </Link>
    </Item>
  );
}
