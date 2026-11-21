'use client';

import type { ReactNode } from 'react';

import { CodeBlock } from '@/components/ui/CodeBlock';
import { cn } from '@/lib/utils';

const notFocusable = -1;

type Props = {
  lines: ReactNode[];
  label: string;
  className: string;
  labelClassName: string;
};

export function CodePane({ lines, label, className, labelClassName }: Props) {
  return (
    <div className={cn('relative px-3 pt-11 pb-3 text-sm', className)}>
      <span
        className={cn(
          'absolute start-4 top-4 rounded-full px-2.5 py-0.5 font-sans text-xs font-semibold tracking-widest text-background uppercase',
          labelClassName,
        )}
      >
        {label}
      </span>
      <CodeBlock.Content wrap tabIndex={notFocusable}>
        {lines.map((line, index) => (
          <CodeBlock.Line key={index}>{line}</CodeBlock.Line>
        ))}
      </CodeBlock.Content>
    </div>
  );
}
