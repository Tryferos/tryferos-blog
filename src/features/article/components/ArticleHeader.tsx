import Image from 'next/image';

import { ArticleActions } from './ArticleActions';
import { ArticleBreadcrumb } from '@/components/shared/ArticleBreadcrumb';
import { PublishedDate } from '@/components/shared/PublishedDate';
import type { PublishedArticle, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: PublishedArticle };

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
