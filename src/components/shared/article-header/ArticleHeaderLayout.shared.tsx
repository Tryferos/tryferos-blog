import Image from 'next/image';
import type { ReactNode } from 'react';

import { ArticleBreadcrumb } from './ArticleBreadcrumb';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article; children: ReactNode };

export function ArticleHeaderLayout({ topic, article, children }: Props) {
  return (
    <header>
      <ArticleBreadcrumb topic={topic} />
      <div className="mt-6 flex flex-col gap-6 md:isolate md:grid md:grid-cols-1 md:items-center">
        <div className="min-w-0 md:z-10 md:col-start-1 md:row-start-1 md:w-2/3 lg:w-3/5">
          {children}
        </div>
        <Image
          src={article.illustration.src}
          alt={article.illustration.alt}
          sizes="(min-width: 68rem) 32.5rem, (min-width: 64rem) calc(50vw - 1.5rem), (min-width: 48rem) calc(40vw - 1.2rem), calc(100vw - 3rem)"
          loading="eager"
          className="h-auto w-full rounded-lg md:col-start-1 md:row-start-1 md:aspect-2/1 md:w-2/5 md:justify-self-end md:rounded-l-none md:mask-l-from-48% md:mask-l-to-80% md:object-cover md:object-right lg:w-1/2"
        />
      </div>
    </header>
  );
}
