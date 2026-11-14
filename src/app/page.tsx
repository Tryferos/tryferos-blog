import * as m from 'motion/react-m';
import { LazyMotion, domAnimation } from 'motion/react';

import { TopicSection } from '@/components/home/TopicSection';
import { topics } from '@/data/content.topics';
import { headerReveal } from '@/data/motion.tokens';
import { siteDescription, siteName } from '@/data/site.config';

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 pt-16 pb-24">
        <m.header {...headerReveal} className="mb-16">
          <h1 className="text-3xl font-semibold sm:text-4xl">{siteName}</h1>
          <p className="mt-3 text-lg leading-relaxed text-prose">
            {siteDescription}
          </p>
        </m.header>
        <div className="space-y-16">
          {topics.map((topic, position) => (
            <TopicSection key={topic.slug} topic={topic} position={position} />
          ))}
        </div>
      </main>
    </LazyMotion>
  );
}
