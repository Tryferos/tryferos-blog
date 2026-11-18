import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps } from 'react';

import { alignments, gaps, justifications } from '@/data/layout.tokens';
import { cn } from '@/lib/utils';

type Props = ComponentProps<'div'> &
  VariantProps<typeof columnVariants> & { asChild?: boolean };

export function Column({
  className,
  gap,
  align,
  justify,
  asChild = false,
  ...props
}: Props) {
  const Comp = asChild ? Slot.Root : 'div';
  return (
    <Comp
      data-slot="column"
      className={cn(columnVariants({ gap, align, justify, className }))}
      {...props}
    />
  );
}

const columnVariants = cva('flex flex-col', {
  variants: {
    gap: gaps,
    align: alignments,
    justify: justifications,
  },
  defaultVariants: { gap: 'none' },
});
