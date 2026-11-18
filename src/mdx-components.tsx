import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type { ComponentProps } from 'react';

import { CodeBlock } from '@/components/shared/CodeBlock';
import { Column } from '@/components/shared/Column';
import { Separator } from '@/components/ui/Separator';
import { Table } from '@/components/ui/Table';
import { nodeText } from '@/lib/node-text';
import { cn } from '@/lib/utils';

const linkClasses =
  'text-link underline decoration-link/40 underline-offset-4 transition-colors hover:decoration-link';

const trailingNewline = /\n$/;

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
    <Column asChild gap="sm" className="my-5">
      <ul className="list-disc pl-6 marker:text-primary" {...props} />
    </Column>
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <Column asChild gap="sm" className="my-5">
      <ol className="list-decimal pl-6 marker:text-primary" {...props} />
    </Column>
  ),
  li: (props: ComponentProps<'li'>) => <li className="pl-1" {...props} />,
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote
      className="my-6 border-l-2 border-primary pl-5 text-muted-foreground italic"
      {...props}
    />
  ),
  hr: () => <Separator className="my-12" />,
  code: ({ className, ...props }: ComponentProps<'code'>) => (
    <code
      className={cn(
        'rounded-sm bg-code px-1.5 py-0.5 font-mono text-inline-code text-code-foreground',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ children }: ComponentProps<'pre'>) => (
    <CodeBlock code={nodeText(children).replace(trailingNewline, '')} />
  ),
  table: (props: ComponentProps<'table'>) => (
    <div className="my-6">
      <Table {...props} />
    </div>
  ),
  thead: Table.Header,
  tbody: Table.Body,
  tr: Table.Row,
  th: Table.Head,
  td: Table.Cell,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
