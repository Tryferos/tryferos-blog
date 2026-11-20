'use client';

import type { ReactNode } from 'react';

import { CodeBlock as CodeBlockFrame } from '@/components/ui/CodeBlock';

type Props = { code: string; lines: ReactNode[] };

export function CodeBlock({ code, lines }: Props) {
  return (
    <CodeBlockFrame variant="prose" className="my-6">
      <CodeBlockFrame.Actions>
        <CodeBlockFrame.CopyButton value={code} />
      </CodeBlockFrame.Actions>
      <CodeBlockFrame.Content>
        {lines.map((line, index) => (
          <CodeBlockFrame.Line key={index}>{line}</CodeBlockFrame.Line>
        ))}
      </CodeBlockFrame.Content>
    </CodeBlockFrame>
  );
}
