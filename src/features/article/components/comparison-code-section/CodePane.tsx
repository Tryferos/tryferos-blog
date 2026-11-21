'use client';

import type { ReactNode } from 'react';

import { CodeBlock } from '@/components/ui/CodeBlock';
import { cn } from '@/lib/utils';

const notFocusable = -1;

type Props = { lines: ReactNode[]; className: string };

export function CodePane({ lines, className }: Props) {
  return (
    <div className={cn('p-3 text-sm', className)}>
      <CodeBlock.Content wrap tabIndex={notFocusable}>
        {lines.map((line, index) => (
          <CodeBlock.Line key={index}>{line}</CodeBlock.Line>
        ))}
      </CodeBlock.Content>
    </div>
  );
}
