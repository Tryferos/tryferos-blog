import type { ComponentProps } from 'react';

import { CodeBlock } from '@/components/shared/code-block/CodeBlock';
import { codeLanguage } from '@/lib/code-language';
import { highlightedLines } from '@/lib/highlighted-lines';
import { nodeText } from '@/lib/node-text';

const trailingNewline = /\n$/;

type Props = ComponentProps<'pre'>;

export async function ArticleCodeBlock({ children }: Props) {
  const code = nodeText(children).replace(trailingNewline, '');
  const lines = await highlightedLines(code, codeLanguage(children));
  return <CodeBlock code={code} lines={lines} />;
}
