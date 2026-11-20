import { IconChevronsRight } from '@tabler/icons-react';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type { ComponentProps } from 'react';

import { Column } from '@/components/shared/Column';
import { InlineCode } from '@/components/shared/InlineCode';
import { Separator } from '@/components/ui/Separator';
import { Table } from '@/components/ui/Table';

const linkClasses =
  'text-link underline decoration-link/40 underline-offset-4 transition-colors hover:decoration-link';

const components: MDXComponents = {
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
      <ul {...props} />
    </Column>
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <Column asChild gap="sm" className="my-5">
      <ol className="list-decimal pl-6 marker:text-primary" {...props} />
    </Column>
  ),
  li: ({ children, ...props }: ComponentProps<'li'>) => (
    <li className="pl-1 [ul>&]:flex [ul>&]:gap-2 [ul>&]:pl-0" {...props}>
      <IconChevronsRight
        aria-hidden
        className="mt-1.5 hidden size-4.5 shrink-0 text-primary [ul>li>&]:block"
      />
      <div className="min-w-0">{children}</div>
    </li>
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote
      className="my-6 border-l-2 border-primary pl-5 text-muted-foreground italic"
      {...props}
    />
  ),
  hr: () => <Separator className="my-12" />,
  code: InlineCode,
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
