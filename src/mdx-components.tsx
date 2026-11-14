import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type { ComponentProps } from 'react';

import { CodeBlock } from '@/components/ui/CodeBlock';
import { cn } from '@/lib/utils';

const linkClasses =
  'text-link underline decoration-link/40 underline-offset-4 transition-colors hover:decoration-link';

const components: MDXComponents = {
  h2: ({ children, ...props }: ComponentProps<'h2'>) => (
    <h2
      className="mt-12 mb-4 scroll-mt-24 text-2xl font-semibold text-foreground"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps<'h3'>) => (
    <h3
      className="mt-8 mb-3 scroll-mt-24 text-xl font-semibold text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  p: (props: ComponentProps<'p'>) => <p className="my-5" {...props} />,
  a: ({ href = '', children, ...props }: ComponentProps<'a'>) =>
    href.startsWith('/') ? (
      <Link href={href} className={linkClasses} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} className={linkClasses} {...props}>
        {children}
      </a>
    ),
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul
      className="my-5 list-disc space-y-2 pl-6 marker:text-primary"
      {...props}
    />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol
      className="my-5 list-decimal space-y-2 pl-6 marker:text-primary"
      {...props}
    />
  ),
  li: (props: ComponentProps<'li'>) => <li className="pl-1" {...props} />,
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote
      className="my-6 border-l-2 border-primary pl-5 text-muted-foreground italic"
      {...props}
    />
  ),
  hr: (props: ComponentProps<'hr'>) => <hr className="my-12" {...props} />,
  code: ({ className, ...props }: ComponentProps<'code'>) => (
    <code
      className={cn(
        'rounded-sm bg-code px-1.5 py-0.5 font-mono text-inline-code text-code-foreground',
        className,
      )}
      {...props}
    />
  ),
  pre: CodeBlock,
  table: (props: ComponentProps<'table'>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-left text-base" {...props} />
    </div>
  ),
  th: (props: ComponentProps<'th'>) => (
    <th
      className="border-b px-3 py-2 font-semibold text-foreground"
      {...props}
    />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td className="border-b px-3 py-2" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
