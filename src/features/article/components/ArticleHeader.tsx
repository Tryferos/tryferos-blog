import Image from 'next/image';
import Link from 'next/link';

import { ArticleActions } from './ArticleActions';
import { PublishedDate } from '@/components/shared/PublishedDate';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as topicModel from '@/models/topic.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article };

export function ArticleHeader({ topic, article }: Props) {
  return (
    <header className="max-w-3xl">
      <ArticleBreadcrumb topic={topic} />
      <Image
        src={article.illustration.src}
        alt={article.illustration.alt}
        sizes="(max-width: 816px) calc(100vw - 3rem), 768px"
        loading="eager"
        className="mt-6 h-auto w-full rounded-lg"
      />
      <h1 className="mt-5 text-4xl/tight font-semibold text-balance sm:text-5xl/tight">
        {article.title}
      </h1>
      <p className="mt-4.5 text-xl/relaxed text-muted-foreground">
        {article.description}
      </p>
      <ArticleActions prompt={article.prompt} />
      <PublishedDate date={article.publishedAt} className="mt-4 block" />
    </header>
  );
}

type ArticleBreadcrumbProps = { topic: Topic };

function ArticleBreadcrumb({ topic }: ArticleBreadcrumbProps) {
  return (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild>
            <Link href="/">Articles</Link>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild variant="accent">
            <Link href={topicModel.sectionHref(topic)}>{topic.title}</Link>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  );
}
