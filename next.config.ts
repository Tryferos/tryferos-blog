import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: '/codebase-conventions/comments',
        destination: '/understand-better/comments',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack can only receive plugins by name, not as imported functions.
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [
      'rehype-slug',
      '@stefanprobst/rehype-extract-toc',
      '@stefanprobst/rehype-extract-toc/mdx',
    ],
  },
});

export default withMDX(nextConfig);
