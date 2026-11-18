import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = { id?: string; className?: string; children: ReactNode };

export function Eyebrow({ id, className, children }: Props) {
  return (
    <h2
      id={id}
      className={cn(
        'font-sans text-xs font-semibold tracking-widest text-muted-foreground uppercase',
        className,
      )}
    >
      {children}
    </h2>
  );
}
