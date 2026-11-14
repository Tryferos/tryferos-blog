import Link from 'next/link';
import * as m from 'motion/react-m';
import { LazyMotion, domAnimation } from 'motion/react';

import { formatDate, partNumber, topics } from '@/content';

const firstSectionDelaySeconds = 0.05;
const sectionStaggerSeconds = 0.05;
const partNumberDigits = 2;

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 pt-16 pb-24">
        <m.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-3xl font-semibold sm:text-4xl">Tryferos</h1>
          <p className="mt-3 text-lg leading-relaxed text-prose">
            Writing on agentic development.
          </p>
        </m.header>

        <div className="space-y-16">
          {topics.map((topic, topicIndex) => (
            <m.section
              key={topic.slug}
              id={topic.slug}
              aria-labelledby={`${topic.slug}-title`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay:
                  firstSectionDelaySeconds + sectionStaggerSeconds * topicIndex,
              }}
              className="scroll-mt-16"
            >
              <h2 id={`${topic.slug}-title`} className="text-2xl font-semibold">
                {topic.title}
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {topic.description}
              </p>

              <ol className="mt-6 divide-y border-y">
                {topic.articles.map((article, index) => (
                  <li key={article.slug}>
                    <Link
                      href={`/${topic.slug}/${article.slug}`}
                      className="group flex gap-4 py-5 outline-none focus-visible:ring-3 focus-visible:ring-ring"
                    >
                      <span className="w-6 shrink-0 pt-0.5 font-mono text-sm text-primary tabular-nums">
                        {String(partNumber(index)).padStart(
                          partNumberDigits,
                          '0',
                        )}
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="font-header text-lg font-medium underline-offset-4 group-hover:underline">
                          {article.title}
                        </span>
                        <span className="text-prose">
                          {article.description}
                        </span>
                        <time
                          dateTime={article.publishedAt}
                          className="text-sm text-muted-foreground"
                        >
                          {formatDate(article.publishedAt)}
                        </time>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </m.section>
          ))}
        </div>
      </main>
    </LazyMotion>
  );
}
