import Image from 'next/image';
import type { ReactNode } from 'react';

import { ArticleBreadcrumb } from './ArticleBreadcrumb';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article; children: ReactNode };

export function ArticleHeaderLayout({ topic, article, children }: Props) {
  return (
    <header>
      <ArticleBreadcrumb topic={topic} />
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:gap-8 lg:gap-12">
        <div className="min-w-0 flex-1">{children}</div>
        <Image
          src={article.illustration.src}
          alt={article.illustration.alt}
          sizes="(min-width: 68rem) 32.5rem, (min-width: 64rem) calc(50vw - 1.5rem), (min-width: 48rem) calc(40vw - 1.2rem), calc(100vw - 3rem)"
          loading="eager"
          className="h-auto w-full shrink-0 rounded-lg md:aspect-2/1 md:w-2/5 md:object-cover md:object-right lg:w-1/2"
        />
      </div>
    </header>
  );
}
