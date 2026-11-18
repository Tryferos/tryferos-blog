'use client';

import { CodeBlock as CodeBlockFrame } from '@/components/ui/CodeBlock';

type Props = { code: string };

export function CodeBlock({ code }: Props) {
  return (
    <CodeBlockFrame variant="prose" className="my-6">
      <CodeBlockFrame.Actions>
        <CodeBlockFrame.CopyButton value={code} />
      </CodeBlockFrame.Actions>
      <CodeBlockFrame.Content>{code}</CodeBlockFrame.Content>
    </CodeBlockFrame>
  );
}
