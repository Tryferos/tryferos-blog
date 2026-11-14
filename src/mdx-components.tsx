import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

const components: MDXComponents = {
  h2: ({ children, className, ...props }: ComponentProps<'h2'>) => (
    <h2
      className={cn(
        'mt-12 mb-4 scroll-mt-24 text-2xl font-semibold text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }: ComponentProps<'h3'>) => (
    <h3
      className={cn(
        'mt-8 mb-3 scroll-mt-24 text-xl font-semibold text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ className, ...props }: ComponentProps<'p'>) => (
    <p className={cn('my-5', className)} {...props} />
  ),
  a: ({ href = '', children, className, ...props }: ComponentProps<'a'>) => {
    const classes = cn(
      'text-link underline decoration-link/40 underline-offset-4 transition-colors hover:decoration-link',
      className,
    );
    return href.startsWith('/') ? (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  },
  strong: ({ className, ...props }: ComponentProps<'strong'>) => (
    <strong
      className={cn('font-semibold text-foreground', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentProps<'ul'>) => (
    <ul
      className={cn(
        'my-5 list-disc space-y-2 pl-6 marker:text-primary',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentProps<'ol'>) => (
    <ol
      className={cn(
        'my-5 list-decimal space-y-2 pl-6 marker:text-primary',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: ComponentProps<'li'>) => (
    <li className={cn('pl-1', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentProps<'blockquote'>) => (
    <blockquote
      className={cn(
        'my-6 border-l-2 border-primary pl-5 text-muted-foreground italic',
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentProps<'hr'>) => (
    <hr className={cn('my-12', className)} {...props} />
  ),
  code: ({ className, ...props }: ComponentProps<'code'>) => (
    <code
      className={cn(
        'rounded-sm bg-code px-1.5 py-0.5 font-mono text-[0.875em] text-code-foreground',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps<'pre'>) => (
    <pre
      className={cn(
        'my-6 overflow-x-auto rounded-lg border bg-code p-4 font-mono text-sm leading-relaxed text-code-foreground [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit',
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: ComponentProps<'table'>) => (
    <div className="my-6 overflow-x-auto">
      <table
        className={cn('w-full text-left text-base', className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }: ComponentProps<'th'>) => (
    <th
      className={cn(
        'border-b px-3 py-2 font-semibold text-foreground',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentProps<'td'>) => (
    <td className={cn('border-b px-3 py-2', className)} {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
