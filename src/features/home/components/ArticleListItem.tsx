import Image from 'next/image';
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
          <Item.Header className="mb-2">
            <Image
              src={article.illustration.src}
              alt={article.illustration.alt}
              sizes="(max-width: 42rem) calc(100vw - 3rem), 39rem"
              className="h-auto w-full rounded-lg"
            />
          </Item.Header>
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
