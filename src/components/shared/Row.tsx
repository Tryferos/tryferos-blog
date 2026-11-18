import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps } from 'react';

import { alignments, gaps, justifications } from '@/data/layout.tokens';
import { cn } from '@/lib/utils';

type Props = ComponentProps<'div'> &
  VariantProps<typeof rowVariants> & { asChild?: boolean };

export function Row({
  className,
  gap,
  align,
  justify,
  wrap,
  asChild = false,
  ...props
}: Props) {
  const Comp = asChild ? Slot.Root : 'div';
  return (
    <Comp
      data-slot="row"
      className={cn(rowVariants({ gap, align, justify, wrap, className }))}
      {...props}
    />
  );
}

const rowVariants = cva('flex flex-row', {
  variants: {
    gap: gaps,
    align: alignments,
    justify: justifications,
    wrap: { true: 'flex-wrap', false: 'flex-nowrap' },
  },
  defaultVariants: { gap: 'none' },
});
