import Image from 'next/image';
import type { ReactNode } from 'react';

import { ArticleBreadcrumb } from './ArticleBreadcrumb';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article; children: ReactNode };

export function ArticleHeaderLayout({ topic, article, children }: Props) {
  return (
    <header>
      <ArticleBreadcrumb topic={topic} />
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start lg:gap-12">
        <div className="min-w-0 flex-1">{children}</div>
        <Image
          src={article.illustration.src}
          alt={article.illustration.alt}
          sizes="(min-width: 68rem) 26rem, (min-width: 48rem) calc(40vw - 1.2rem), calc(100vw - 3rem)"
          loading="eager"
          className="h-auto w-full shrink-0 rounded-lg md:w-2/5"
        />
      </div>
    </header>
  );
}
