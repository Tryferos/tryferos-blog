import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

import { Column } from '@/components/shared/Column';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Row } from '@/components/shared/Row';
import { Item } from '@/components/ui/Item';
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
        <Item asChild variant="plain" size="flush">
          <Link href={topicModel.articleHref(topic, upNext)}>
            <Item.Header className="justify-start">
              <Row asChild align="center" gap="sm">
                <span className="text-xs font-semibold text-link">
                  Up next in this series
                  <IconArrowRight className="size-3.5" />
                </span>
              </Row>
            </Item.Header>
            <Item.Content>
              <Item.Title size="md">{upNext.title}</Item.Title>
              <Item.Description>{upNext.description}</Item.Description>
              <span className="text-xs text-muted-foreground">
                Part {topicModel.partOf(topic, upNext)}
              </span>
            </Item.Content>
          </Link>
        </Item>
      )}
      {more.length > 0 && (
        <>
          <p className="mt-6 mb-1 text-sm font-medium text-prose">
            More in this series
          </p>
          <Column asChild>
            <ul>
              {more.map(other => (
                <li key={other.slug} className="border-b py-3">
                  <Item asChild variant="plain" size="flush">
                    <Link href={topicModel.articleHref(topic, other)}>
                      <Item.Content>
                        <Item.Title size="sm">{other.title}</Item.Title>
                        <span className="text-xs text-muted-foreground">
                          Part {topicModel.partOf(topic, other)}
                        </span>
                      </Item.Content>
                    </Link>
                  </Item>
                </li>
              ))}
            </ul>
          </Column>
        </>
      )}
      <Row asChild align="center" gap="sm" className="mt-3.5 w-fit">
        <Link
          href={topicModel.sectionHref(topic)}
          className="text-sm font-medium text-link hover:text-foreground"
        >
          View the whole series
          <IconArrowRight className="size-3.5" />
        </Link>
      </Row>
    </section>
  );
}
