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
      <div className="relative isolate mt-6 overflow-hidden rounded-2xl md:-mx-4 xl:-mx-16">
        <Image
          src={article.illustration.src}
          alt={article.illustration.alt}
          sizes="(min-width: 80rem) 73rem, (min-width: 48rem) calc(100vw - 1rem), calc(100vw - 3rem)"
          loading="eager"
          className="absolute inset-0 -z-10 size-full object-cover object-right"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-t from-hero-fade from-45% via-hero-fade/85 via-65% to-transparent md:bg-linear-to-tr md:from-35% md:via-55% md:to-80%"
        />
        <div className="flex flex-col px-6 pt-40 pb-6 md:px-10 md:pt-48 md:pb-8 lg:pt-56">
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
    </header>
  );
}
