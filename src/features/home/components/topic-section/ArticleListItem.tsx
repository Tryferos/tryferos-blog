import Image from 'next/image';
import Link from 'next/link';

import { PublishedDate } from '@/components/shared/PublishedDate';
import { Badge } from '@/components/ui/Badge';
import { Item } from '@/components/ui/Item';
import * as articleModel from '@/models/article.model';
import * as topicModel from '@/models/topic.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article };

export function ArticleListItem({ topic, article }: Props) {
  const isPublished = articleModel.isPublished(article);

  return (
    <li>
      <Item asChild variant="plain" size="flush" className="items-start">
        <Link href={topicModel.articleHref(topic, article)} prefetch>
          <Item.Header className="mb-2.5">
            <div className="relative w-full overflow-hidden rounded-lg">
              <Image
                src={article.illustration.src}
                alt={article.illustration.alt}
                sizes="(max-width: 40rem) calc(100vw - 3rem), (max-width: 64rem) 50vw, 21rem"
                className="h-auto w-full"
              />
              {!isPublished && (
                <Badge
                  variant="secondary"
                  className="absolute top-1.5 right-1.5"
                >
                  Coming soon
                </Badge>
              )}
            </div>
          </Item.Header>
          <Item.Content>
            <span className="text-xs font-semibold tracking-widest text-link uppercase">
              {topic.title}
            </span>
            <Item.Title size="lg">{article.title}</Item.Title>
            <Item.Description variant="prose">
              {article.description}
            </Item.Description>
            {isPublished && <PublishedDate date={article.publishedAt} />}
          </Item.Content>
        </Link>
      </Item>
    </li>
  );
}
