import commentsIllustration from '@/content/illustrations/comments.webp';
import explicitDataFlowIllustration from '@/content/illustrations/explicit-data-flow.webp';
import nameConditionsIllustration from '@/content/illustrations/name-conditions.webp';
import smallFilesIllustration from '@/content/illustrations/small-files.webp';
import typesAsDocumentationIllustration from '@/content/illustrations/types-as-documentation.webp';
import { articleStatuses } from '@/data/article.statuses';
import type { Topic } from '@/types/content.types';

const upcoming = articleStatuses.upcoming;

export const understandBetter: Topic = {
  slug: 'understand-better',
  title: 'Understand better',
  articles: [
    {
      status: upcoming,
      slug: 'types-as-documentation',
      title: 'Use types as documentation',
      description:
        'Explicit schemas and satisfies state intent, and unlike comments they are verified.',
      illustration: {
        src: typesAsDocumentationIllustration,
        alt: 'A gauge’s shaped opening shows the required profile and checks the part’s fit.',
      },
    },
    {
      status: upcoming,
      slug: 'name-conditions',
      title: 'Name conditions and numbers',
      description:
        'roles.admin carries meaning that === 2 and a three-clause boolean do not.',
      illustration: {
        src: nameConditionsIllustration,
        alt: 'A flame marker gives one tick on a temperature dial a recognizable meaning.',
      },
    },
    {
      status: upcoming,
      slug: 'small-files',
      title: 'Keep files small and single-purpose',
      description:
        'A file you can read whole is a file you can trust you understand.',
      illustration: {
        src: smallFilesIllustration,
        alt: 'An entire pocket-sized proof fits beneath one loupe.',
      },
    },
    {
      status: upcoming,
      slug: 'explicit-data-flow',
      title: 'Keep data flow explicit',
      description:
        'Arguments in and return values out beat ambient state and mutation at a distance.',
      illustration: {
        src: explicitDataFlowIllustration,
        alt: 'A hand-cranked pasta machine takes in a sheet and sends ribbons out the other side.',
      },
    },
    {
      status: articleStatuses.published,
      slug: 'comments',
      title: "Comments are for what the code can't say",
      description:
        'Stop using comments as a justification for bad naming conventions',
      illustration: {
        src: commentsIllustration,
        alt: 'A hand plane lifts a curling strip of comments from a block of code.',
      },
      publishedAt: '2026-11-14',
      prompt:
        'Add this rule to AGENTS.md: "No comments unless necessary. Make the code clearer instead." Then apply it to the codebase: remove every comment that doesn\'t carry a reason the code can\'t express, like a workaround or a platform quirk, and make the code clearer where a comment was explaining it.',
      load: () => import('@/content/articles/comments.mdx'),
    },
  ],
};
