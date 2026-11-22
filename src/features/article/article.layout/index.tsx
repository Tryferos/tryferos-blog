import Image from 'next/image';
import type { ReactNode } from 'react';

import { ArticleBreadcrumb } from './components/ArticleBreadcrumb';
import * as articleModel from '@/models/article.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article; children: ReactNode };

export function ArticleLayout({ topic, article, children }: Props) {
  const headline = articleModel.headlineParts(article);

  return (
    <header>
      <ArticleBreadcrumb topic={topic} />
      <div className="mt-6 rounded-xl bg-paper p-2 md:-mx-4 xl:-mx-16">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={article.illustration.src}
            alt={article.illustration.alt}
            sizes="(min-width: 80rem) 73rem, (min-width: 48rem) calc(100vw - 1rem), calc(100vw - 3rem)"
            loading="eager"
            className="aspect-3/2 w-full object-cover object-right sm:aspect-2/1 lg:aspect-3/1"
          />
          <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6">
            <div className="relative max-w-3xl">
              <div
                aria-hidden
                className="absolute -inset-x-6 -inset-y-4 rounded-full bg-black/60 blur-2xl"
              />
              <h1 className="relative font-sans text-3xl/none font-bold tracking-tight text-balance text-white sm:text-5xl/none lg:text-7xl/none">
                {headline.lead}{' '}
                <span className="inline-block rounded-md bg-ink-red px-2 pb-1 lg:px-3 lg:pb-2">
                  {headline.emphasis}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </header>
  );
}
