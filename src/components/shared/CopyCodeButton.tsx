'use client';

import { CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/copy-to-clipboard';
import { cn } from '@/lib/utils';

type Props = { code: string; className?: string };

export function CopyCodeButton({ code, className }: Props) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Copy code"
      className={cn(
        'text-muted-foreground group-hover:opacity-100 focus-visible:opacity-100 pointer-fine:opacity-0',
        className,
      )}
      onClick={() => {
        void copyToClipboard(code, 'Copied to clipboard');
      }}
    >
      <CopyIcon />
    </Button>
  );
}
