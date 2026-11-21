import avoidDuplicationIllustration from '@/content/codebase-conventions/avoid-duplication.webp';
import errorsNameTheFixIllustration from '@/content/codebase-conventions/errors-name-the-fix.webp';
import ignoreGeneratedFilesIllustration from '@/content/codebase-conventions/ignore-generated-files.webp';
import keepAgentsMdShortIllustration from '@/content/codebase-conventions/keep-agents-md-short.webp';
import oneVerificationCommandIllustration from '@/content/codebase-conventions/one-verification-command.webp';
import { articleStatuses } from '@/data/article.statuses';
import type { Topic } from '@/types/content.types';

const upcoming = articleStatuses.upcoming;

export const spendFewerTokens: Topic = {
  slug: 'spend-fewer-tokens',
  title: 'Spend fewer tokens',
  articles: [
    {
      status: upcoming,
      slug: 'keep-agents-md-short',
      title: 'Keep AGENTS.md short',
      description:
        'It loads every session, so every line costs on every task. Write only what no check verifies.',
      illustration: {
        src: keepAgentsMdShortIllustration,
        alt: 'Scissors cut a single short note from a long ticked-off list.',
      },
    },
    {
      status: upcoming,
      slug: 'one-verification-command',
      title: 'Provide one fast verification command',
      description:
        'One check with terse output on success beats several commands with noisy logs.',
      illustration: {
        src: oneVerificationCommandIllustration,
        alt: 'One lever lowers three inspection probes and raises a single check flag.',
      },
    },
    {
      status: upcoming,
      slug: 'ignore-generated-files',
      title: 'Keep generated files out of the search path',
      description:
        'Lockfiles, build output and snapshots should never come back from a grep.',
      illustration: {
        src: ignoreGeneratedFilesIllustration,
        alt: 'A sieve retains engraved blocks while small scraps fall through.',
      },
    },
    {
      status: upcoming,
      slug: 'avoid-duplication',
      title: 'Avoid duplication',
      description: 'Three near-copies mean three reads and three edits.',
      illustration: {
        src: avoidDuplicationIllustration,
        alt: 'A red master key stands out on a ring of near-identical keys.',
      },
    },
    {
      status: upcoming,
      slug: 'errors-name-the-fix',
      title: 'Make error messages name the fix',
      description:
        'A lint rule that says where the file should go saves a round of investigation.',
      illustration: {
        src: errorsNameTheFixIllustration,
        alt: 'A printed hand points to the exact bolt that needs a wrench.',
      },
    },
  ],
};
