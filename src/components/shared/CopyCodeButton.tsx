'use client';

import { CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/copy-to-clipboard';
import { cn } from '@/lib/utils';

type Props = { code: string; className?: string };

export function CopyCodeButton({ code, className }: Props) {
  return (
    <div
      className={cn(
        'group-hover:opacity-100 has-focus-visible:opacity-100 pointer-fine:opacity-0',
        className,
      )}
    >
      <Button
        variant="subtle"
        size="icon"
        aria-label="Copy code"
        onClick={() => {
          void copyToClipboard(code, 'Copied to clipboard');
        }}
      >
        <CopyIcon />
      </Button>
    </div>
  );
}
