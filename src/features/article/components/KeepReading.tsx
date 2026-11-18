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
  const hasMore = more.length > 0;
  if (!upNext && !hasMore) return null;

  return (
    <section aria-labelledby="keep-reading-title">
      <Eyebrow id="keep-reading-title" className="mb-3.5">
        Keep reading
      </Eyebrow>
      {upNext && <UpNext topic={topic} article={upNext} />}
      {hasMore && <MoreInSeries topic={topic} articles={more} />}
      <WholeSeriesLink topic={topic} />
    </section>
  );
}

type UpNextProps = { topic: Topic; article: Article };

function UpNext({ topic, article }: UpNextProps) {
  return (
    <Item asChild variant="plain" size="flush">
      <Link href={topicModel.articleHref(topic, article)}>
        <Item.Header className="justify-start">
          <Row asChild align="center" gap="sm">
            <span className="text-xs font-semibold text-link">
              Up next in this series
              <IconArrowRight className="size-3.5" />
            </span>
          </Row>
        </Item.Header>
        <Item.Content>
          <Item.Title size="md">{article.title}</Item.Title>
          <Item.Description>{article.description}</Item.Description>
          <PartLabel topic={topic} article={article} />
        </Item.Content>
      </Link>
    </Item>
  );
}

type MoreInSeriesProps = { topic: Topic; articles: Article[] };

function MoreInSeries({ topic, articles }: MoreInSeriesProps) {
  return (
    <>
      <p className="mt-6 mb-1 text-sm font-medium text-prose">
        More in this series
      </p>
      <Column asChild>
        <ul>
          {articles.map(article => (
            <li key={article.slug} className="border-b py-3">
              <SeriesArticleLink topic={topic} article={article} />
            </li>
          ))}
        </ul>
      </Column>
    </>
  );
}

type SeriesArticleLinkProps = { topic: Topic; article: Article };

function SeriesArticleLink({ topic, article }: SeriesArticleLinkProps) {
  return (
    <Item asChild variant="plain" size="flush">
      <Link href={topicModel.articleHref(topic, article)}>
        <Item.Content>
          <Item.Title size="sm">{article.title}</Item.Title>
          <PartLabel topic={topic} article={article} />
        </Item.Content>
      </Link>
    </Item>
  );
}

type PartLabelProps = { topic: Topic; article: Article };

function PartLabel({ topic, article }: PartLabelProps) {
  return (
    <span className="text-xs text-muted-foreground">
      Part {topicModel.partOf(topic, article)}
    </span>
  );
}

type WholeSeriesLinkProps = { topic: Topic };

function WholeSeriesLink({ topic }: WholeSeriesLinkProps) {
  return (
    <Row asChild align="center" gap="sm" className="mt-3.5 w-fit">
      <Link
        href={topicModel.sectionHref(topic)}
        className="text-sm font-medium text-link hover:text-foreground"
      >
        View the whole series
        <IconArrowRight className="size-3.5" />
      </Link>
    </Row>
  );
}
