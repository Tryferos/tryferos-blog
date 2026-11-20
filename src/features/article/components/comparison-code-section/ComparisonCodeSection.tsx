import { IconArrowsLeftRight, IconFileCode } from '@tabler/icons-react';

import { Separator } from '@/components/ui/Separator';
import { highlightedLines } from '@/lib/highlighted-lines';
import type { ComparisonChange } from '@/types/content.types';

import { ChangeTable } from './ChangeTable';
import { CodePane } from './CodePane';
import { RevealSlider } from './RevealSlider';

type Props = {
  file: string;
  language: string;
  before: string;
  after: string;
  changes: ComparisonChange[];
};

export async function ComparisonCodeSection({
  file,
  language,
  before,
  after,
  changes,
}: Props) {
  const [beforeLines, afterLines] = await Promise.all([
    highlightedLines(before, language),
    highlightedLines(after, language),
  ]);

  return (
    <figure className="my-6 overflow-hidden rounded-xl border bg-card">
      <figcaption className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground">
        <IconFileCode aria-hidden className="size-4" />
        <span className="font-mono text-foreground">{file}</span>
        <span className="ms-auto flex items-center gap-1">
          <IconArrowsLeftRight aria-hidden className="size-4" />
          Drag to compare
        </span>
      </figcaption>
      <Separator />
      <RevealSlider
        before={
          <CodePane
            lines={beforeLines}
            label="Before"
            className="bg-before-surface"
            labelClassName="start-4 bg-before"
          />
        }
        after={
          <CodePane
            lines={afterLines}
            label="After"
            className="reveal-from-start bg-after-surface"
            labelClassName="end-4 bg-after"
          />
        }
      />
      <Separator />
      <ChangeTable changes={changes} />
    </figure>
  );
}
