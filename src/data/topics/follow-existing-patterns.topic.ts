import canonicalExampleIllustration from '@/content/codebase-conventions/canonical-example.webp';
import colocateIllustration from '@/content/codebase-conventions/colocate.webp';
import enforceWithChecksIllustration from '@/content/codebase-conventions/enforce-with-checks.webp';
import oneWayPerThingIllustration from '@/content/codebase-conventions/one-way-per-thing.webp';
import { articleStatuses } from '@/data/article.statuses';
import type { Topic } from '@/types/content.types';

const upcoming = articleStatuses.upcoming;

export const followExistingPatterns: Topic = {
  slug: 'follow-existing-patterns',
  title: 'Follow existing patterns',
  articles: [
    {
      status: upcoming,
      slug: 'one-way-per-thing',
      title: 'Keep one way to do each thing',
      description:
        'Agents imitate what they see, so finish migrations or delete the old style.',
      illustration: {
        src: oneWayPerThingIllustration,
        alt: 'A railway worker sets a switch to establish one route.',
      },
    },
    {
      status: upcoming,
      slug: 'enforce-with-checks',
      title: 'Enforce with checks',
      description:
        'Lint rules and type checks correct every time; a prose rule only works if it is recalled.',
      illustration: {
        src: enforceWithChecksIllustration,
        alt: 'Every blank passes under the same fixed-height inspection bar.',
      },
    },
    {
      status: upcoming,
      slug: 'canonical-example',
      title: 'Keep a canonical example',
      description:
        'One clean feature folder to mirror is worth more than a description of the layout.',
      illustration: {
        src: canonicalExampleIllustration,
        alt: 'A carpenter traces one template onto a row of matching boards.',
      },
    },
    {
      status: upcoming,
      slug: 'colocate',
      title: 'Colocate',
      description:
        'When a feature’s component, query and action are siblings, the pattern is visible from anywhere.',
      illustration: {
        src: colocateIllustration,
        alt: 'A fitted tool roll gives each related tool its own adjacent pocket.',
      },
    },
  ],
};
