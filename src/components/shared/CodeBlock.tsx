import type { ComponentProps } from 'react';

import { CopyCodeButton } from '@/components/shared/CopyCodeButton';
import { nodeText } from '@/lib/node-text';

type Props = ComponentProps<'pre'>;

export function CodeBlock({ children, ...props }: Props) {
  return (
    <div className="group relative my-6">
      <pre
        className="overflow-x-auto rounded-lg border bg-code p-4 pr-14 font-mono text-sm leading-relaxed text-code-foreground [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit"
        {...props}
      >
        {children}
      </pre>
      <CopyCodeButton
        code={nodeText(children)}
        className="absolute top-2 right-2"
      />
    </div>
  );
}
