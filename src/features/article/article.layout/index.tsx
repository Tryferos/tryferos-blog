import Image from 'next/image';
import type { ReactNode } from 'react';

import { ArticleBreadcrumb } from './components/ArticleBreadcrumb';
import { headerExtension } from '@/data/article-header.illustrations';
import * as articleModel from '@/models/article.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article; children: ReactNode };

const illustrationSizes =
  '(min-width: 80rem) 73rem, (min-width: 48rem) calc(100vw - 1rem), calc(100vw - 3rem)';

export function ArticleLayout({ topic, article, children }: Props) {
  const headline = articleModel.headlineParts(article);

  return (
    <header>
      <ArticleBreadcrumb topic={topic} />
      <div className="mt-6 rounded-2xl bg-hero-paper p-2 md:-mx-4 xl:-mx-16">
        <div className="overflow-hidden rounded-xl bg-hero-paper">
          <Image
            src={article.illustration.src}
            alt={article.illustration.alt}
            sizes={illustrationSizes}
            loading="eager"
            className="aspect-2/1 w-full object-cover object-right lg:aspect-3/1 dark:origin-bottom dark:scale-105 dark:mask-t-from-85%"
          />
          <div className="relative isolate -mt-hero-overlap">
            <Image
              src={headerExtension.light}
              alt=""
              sizes={illustrationSizes}
              className="absolute inset-x-0 top-0 -z-10 w-full mask-b-from-70% dark:hidden"
            />
            <Image
              src={headerExtension.dark}
              alt=""
              sizes={illustrationSizes}
              className="absolute inset-x-0 top-0 -z-10 hidden w-full mask-b-from-70% dark:block"
            />
            <div className="flex flex-col px-6 pt-hero-band pb-6 md:px-10 md:pb-8">
              <h1 className="max-w-2xl border-l-4 border-primary pl-4 font-sans text-3xl/tight font-bold tracking-tight text-balance text-foreground sm:text-4xl/tight lg:text-5xl/tight">
                {headline.lead}{' '}
                <span className="text-primary">{headline.emphasis}</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg/relaxed text-muted-foreground">
                {article.description}
              </p>
              <div className="mt-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
