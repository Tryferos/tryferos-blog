import Image from 'next/image';
import type { ReactNode } from 'react';

import { ArticleBreadcrumb } from './components/ArticleBreadcrumb';
import { headerFade, headerPaper } from '@/data/article-header.images';
import * as articleModel from '@/models/article.model';
import type { Article, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: Article; children: ReactNode };

const cardSizes =
  '(min-width: 80rem) 73rem, (min-width: 48rem) calc(100vw - 1rem), calc(100vw - 3rem)';

export function ArticleLayout({ topic, article, children }: Props) {
  const headline = articleModel.headlineParts(article);

  return (
    <header>
      <ArticleBreadcrumb topic={topic} />
      <div className="relative isolate mt-6 overflow-hidden rounded-2xl bg-hero-paper md:-mx-4 xl:-mx-16">
        <Image
          src={headerPaper.light}
          alt=""
          fill
          sizes={cardSizes}
          className="-z-10 object-cover object-bottom dark:hidden"
        />
        <Image
          src={headerPaper.dark}
          alt=""
          fill
          sizes={cardSizes}
          className="-z-10 hidden object-cover object-bottom dark:block"
        />
        <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden mask-b-from-45% mask-b-to-100% lg:mask-b-from-85%">
          <Image
            src={article.illustration.src}
            alt={article.illustration.alt}
            sizes={cardSizes}
            loading="eager"
            className="aspect-2/1 w-full scale-110 object-cover object-right lg:aspect-3/1"
          />
        </div>
        <Image
          src={headerFade.light}
          alt=""
          fill
          sizes={cardSizes}
          className="-z-10 hidden object-cover object-left-bottom lg:block dark:lg:hidden"
        />
        <Image
          src={headerFade.dark}
          alt=""
          fill
          sizes={cardSizes}
          className="-z-10 hidden object-cover object-left-bottom dark:lg:block"
        />
        <div className="flex flex-col px-6 pt-hero-title-tall pb-6 md:px-10 md:pb-8 lg:pt-hero-title">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-x-10 -inset-y-8 -z-10 max-w-3xl rounded-full bg-hero-paper/80 blur-2xl lg:hidden"
            />
            <h1 className="relative max-w-2xl pl-5 before:absolute before:inset-y-2 before:left-0 before:w-1 before:rounded-full before:bg-ink-red font-sans text-3xl/tight font-bold tracking-tight text-balance text-foreground sm:text-4xl/tight lg:text-5xl/tight">
              {headline.lead}{' '}
              <span className="text-ink-red">{headline.emphasis}</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg/relaxed text-muted-foreground">
              {article.description}
            </p>
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </header>
  );
}
