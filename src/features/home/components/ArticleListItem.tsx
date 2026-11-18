import Link from 'next/link';

import { PublishedDate } from '@/components/shared/PublishedDate';
import * as topicModel from '@/models/topic.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article };

export function ArticleListItem({ topic, article }: Props) {
  return (
    <li>
      <Link
        href={topicModel.articleHref(topic, article)}
        className="group flex gap-4 py-5 outline-none focus-visible:ring-3 focus-visible:ring-ring"
      >
        <span className="w-6 shrink-0 pt-0.5 font-mono text-sm text-primary tabular-nums">
          {topicModel.partLabel(topic, article)}
        </span>
        <span className="flex flex-col gap-1">
          <span className="font-header text-lg font-medium underline-offset-4 group-hover:underline">
            {article.title}
          </span>
          <span className="text-prose">{article.description}</span>
          <PublishedDate date={article.publishedAt} />
        </span>
      </Link>
    </li>
  );
}
