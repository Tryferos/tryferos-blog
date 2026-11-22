import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type Props = ComponentProps<'main'>;

export function PageMain({ className, ...props }: Props) {
  return (
    <main
      className={cn(
        'mx-auto w-full max-w-page flex-1 px-6 pt-14 pb-24',
        className,
      )}
      {...props}
    />
  );
}
