import type { ComponentProps } from 'react';

type Props = ComponentProps<'h2'>;

export function SectionHeading({ children, ...props }: Props) {
  return (
    <h2
      className="mt-20 mb-4 scroll-mt-24 text-2xl font-semibold text-foreground"
      {...props}
    >
      {children}
    </h2>
  );
}
