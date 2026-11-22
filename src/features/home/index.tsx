import * as m from 'motion/react-m';
import { LazyMotion, domAnimation } from 'motion/react';

import { Column } from '@/components/shared/Column';
import { PageMain } from '@/components/shared/PageMain';
import { topics } from '@/data/topics/content.topics';
import { headerReveal } from '@/data/motion.tokens';

import { TopicSection } from './components/topic-section/TopicSection';

export function HomeScreen() {
  return (
    <LazyMotion features={domAnimation}>
      <PageMain className="pt-16">
        <m.header {...headerReveal} className="mb-18 max-w-2xl">
          <h1 className="text-4xl/tight font-semibold text-balance sm:text-5xl/tight">
            Your AI writes code that works. Just not{' '}
            <span className="text-link">your</span> code.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-prose">
            Better prompts won’t fix it. Agents copy whatever they find, so the
            fix is a codebase they can search, read and imitate. These are the
            conventions that get you there.
          </p>
        </m.header>
        <Column gap="2xl">
          {topics.map((topic, position) => (
            <TopicSection key={topic.slug} topic={topic} position={position} />
          ))}
        </Column>
      </PageMain>
    </LazyMotion>
  );
}
