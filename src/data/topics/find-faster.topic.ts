import avoidDynamicIndirectionIllustration from '@/content/illustrations/avoid-dynamic-indirection.webp';
import nameFilesAfterContentsIllustration from '@/content/illustrations/name-files-after-contents.webp';
import oneEntryPointIllustration from '@/content/illustrations/one-entry-point.webp';
import predictablePathsIllustration from '@/content/illustrations/predictable-paths.webp';
import searchableNamesIllustration from '@/content/illustrations/searchable-names.webp';
import { articleStatuses } from '@/data/article.statuses';
import type { Topic } from '@/types/content.types';

const upcoming = articleStatuses.upcoming;

export const findFaster: Topic = {
  slug: 'find-faster',
  title: 'Find faster',
  articles: [
    {
      status: upcoming,
      slug: 'searchable-names',
      title: 'Use searchable, unique names',
      description:
        'One concept gets one name everywhere, so a single grep finds every use.',
      illustration: {
        src: searchableNamesIllustration,
        alt: 'One needle lifts every index card marked with the same red diamond.',
      },
    },
    {
      status: upcoming,
      slug: 'predictable-paths',
      title: 'Make the path predictable from the feature',
      description:
        'When a file can only live in one place, you open it directly instead of searching.',
      illustration: {
        src: predictablePathsIllustration,
        alt: 'A carved track guides a marble to its matching drawer.',
      },
    },
    {
      status: upcoming,
      slug: 'name-files-after-contents',
      title: 'Name files after what they contain',
      description:
        'LoadChart.tsx beats a fifth index.tsx, and suffixes tell a file’s role before you open it.',
      illustration: {
        src: nameFilesAfterContentsIllustration,
        alt: 'A wrench-shaped drawer pull identifies the tool inside.',
      },
    },
    {
      status: upcoming,
      slug: 'avoid-dynamic-indirection',
      title: 'Avoid dynamic indirection',
      description:
        'String-built keys, re-export chains and magic registries hide the path from usage to definition.',
      illustration: {
        src: avoidDynamicIndirectionIllustration,
        alt: 'A hand pulls one cable taut above a tangle, making its connection easy to trace.',
      },
    },
    {
      status: upcoming,
      slug: 'one-entry-point',
      title: 'Keep one entry point per concern',
      description:
        'A single contract folder for everything that crosses the API ends the hunt for a shape.',
      illustration: {
        src: oneEntryPointIllustration,
        alt: 'A sheaf of lined pages passes through one mail slot.',
      },
    },
  ],
};
