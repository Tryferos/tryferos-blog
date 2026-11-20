import Link from 'next/link';

import { PublishedDate } from '@/components/shared/PublishedDate';
import { Item } from '@/components/ui/Item';
import * as topicModel from '@/models/topic.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article };

export function ArticleListItem({ topic, article }: Props) {
  return (
    <li className="py-5">
      <Item asChild variant="plain" size="flush">
        <Link href={topicModel.articleHref(topic, article)} prefetch>
          <Item.Media>
            <span className="w-6 font-mono text-sm text-primary tabular-nums">
              {topicModel.partLabel(topic, article)}
            </span>
          </Item.Media>
          <Item.Content>
            <Item.Title size="lg">{article.title}</Item.Title>
            <Item.Description variant="prose">
              {article.description}
            </Item.Description>
            <PublishedDate date={article.publishedAt} />
          </Item.Content>
        </Link>
      </Item>
    </li>
  );
}
