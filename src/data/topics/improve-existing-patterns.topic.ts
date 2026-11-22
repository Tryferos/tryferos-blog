import pruneRulesIllustration from '@/content/illustrations/prune-rules.webp';
import repeatedInstructionsIllustration from '@/content/illustrations/repeated-instructions.webp';
import smallCommitsIllustration from '@/content/illustrations/small-commits.webp';
import stateTheReasonIllustration from '@/content/illustrations/state-the-reason.webp';
import welcomeDeviationIllustration from '@/content/illustrations/welcome-deviation.webp';
import { articleStatuses } from '@/data/article.statuses';
import type { Topic } from '@/types/content.types';

const upcoming = articleStatuses.upcoming;

export const improveExistingPatterns: Topic = {
  slug: 'improve-existing-patterns',
  title: 'Improve existing patterns',
  articles: [
    {
      status: upcoming,
      slug: 'state-the-reason',
      title: 'State the reason behind each rule',
      description:
        'Knowing why lets you apply a rule to new cases and notice when it no longer fits.',
      illustration: {
        src: stateTheReasonIllustration,
        alt: 'Lifting a machine guard reveals the meshing gears it protects the operator from.',
      },
    },
    {
      status: upcoming,
      slug: 'turn-corrections-into-checks',
      title: 'Turn a correction into a check or a rule',
      description:
        'Wrong twice? A lint rule fixes it for good; a note in AGENTS.md is the fallback.',
      illustration: {
        src: repeatedInstructionsIllustration,
        alt: 'A hand cranks a press that churns out identical pages.',
      },
    },
    {
      status: upcoming,
      slug: 'small-commits',
      title: 'Keep commits small and single-concern',
      description:
        'A clean history shows how a pattern evolved and keeps refactors easy to review or revert.',
      illustration: {
        src: smallCommitsIllustration,
        alt: 'A row of carved blocks shows a rosette taking shape one cut at a time.',
      },
    },
    {
      status: upcoming,
      slug: 'welcome-deviation',
      title: 'Say when deviation is welcome',
      description:
        'Otherwise a bad pattern is preserved for consistency instead of challenged.',
      illustration: {
        src: welcomeDeviationIllustration,
        alt: 'A draftsperson sets aside a square and uses a French curve to draw a new path.',
      },
    },
    {
      status: upcoming,
      slug: 'prune-rules',
      title: 'Prune rules',
      description:
        'Delete a rule once a check covers it, so the written ones stay few and get followed.',
      illustration: {
        src: pruneRulesIllustration,
        alt: 'A hand peels a paper reminder from a jig fitted with a mechanical stop.',
      },
    },
  ],
};
