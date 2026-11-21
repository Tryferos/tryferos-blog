import commentsIllustration from '@/content/codebase-conventions/comments.webp';
import type { Topic } from '@/types/content.types';

export const topics: Topic[] = [
  {
    slug: 'codebase-conventions',
    title: 'Codebase conventions for agentic development',
    description: 'Rules that make a codebase work with coding agents.',
    articles: [
      {
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
        load: () => import('@/content/codebase-conventions/comments.mdx'),
      },
    ],
  },
];
