import { IconFileCode } from '@tabler/icons-react';

import { Separator } from '@/components/ui/Separator';
import { highlightedLines } from '@/lib/highlighted-lines';
import type { ComparisonChange } from '@/types/content.types';

import { ChangeTable } from './ChangeTable';
import { CodePane } from './CodePane';
import { VersionSwitch } from './VersionSwitch';

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
      <VersionSwitch
        caption={
          <>
            <IconFileCode aria-hidden className="size-4" />
            <span className="font-mono text-foreground">{file}</span>
          </>
        }
        before={
          <CodePane
            lines={beforeLines}
            label="Before"
            className="bg-before-surface"
            labelClassName="bg-before"
          />
        }
        after={
          <CodePane
            lines={afterLines}
            label="After"
            className="bg-after-surface"
            labelClassName="bg-after"
          />
        }
      />
      <Separator />
      <ChangeTable changes={changes} />
    </figure>
  );
}
