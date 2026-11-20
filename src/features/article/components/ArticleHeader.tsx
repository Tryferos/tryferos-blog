import Link from 'next/link';

import { ArticleActions } from './ArticleActions';
import { PublishedDate } from '@/components/shared/PublishedDate';
import { Row } from '@/components/shared/Row';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as topicModel from '@/models/topic.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article };

export function ArticleHeader({ topic, article }: Props) {
  const { icon: ArticleIcon } = article;

  return (
    <header className="max-w-3xl">
      <ArticleBreadcrumb topic={topic} />
      <Row asChild align="center" justify="center">
        <div className="mt-6 size-12 rounded-lg bg-primary/10 text-primary">
          <ArticleIcon aria-hidden className="size-6" />
        </div>
      </Row>
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
