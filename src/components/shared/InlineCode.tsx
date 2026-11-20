import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type Props = ComponentProps<'code'>;

export function InlineCode({ className, ...props }: Props) {
  return (
    <code
      className={cn(
        'rounded-sm bg-code px-1.5 py-0.5 font-mono text-inline-code text-code-foreground',
        className,
      )}
      {...props}
    />
  );
}
