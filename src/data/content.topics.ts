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
        description: "Don't let your agent spam comments",
        publishedAt: '2026-11-14',
        load: () => import('@/content/codebase-conventions/comments.mdx'),
      },
    ],
  },
];
