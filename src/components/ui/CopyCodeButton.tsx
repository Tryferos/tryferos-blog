'use client';

import { Button } from '@ui-sdk/react/button';
import { toast } from '@ui-sdk/react/toast';

import { cn } from '@/lib/utils';

type Props = { code: string; className?: string };

export function CopyCodeButton({ code, className }: Props) {
  return (
    <Button
      aria-label="Copy code"
      className={cn('bg-background', className)}
      onClick={() =>
        navigator.clipboard.writeText(code).then(
          () => toast.success('Copied to clipboard'),
          () => toast.error('Couldn’t copy the code'),
        )
      }
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="14" height="14" x="8" y="8" rx="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    </Button>
  );
}
