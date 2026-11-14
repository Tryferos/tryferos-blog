'use client';

import { Button } from '@ui-sdk/react/button';
import { toast } from '@ui-sdk/react/toast';
import type { ReactNode } from 'react';

import { Icon } from '@/components/ui/Icon';
import { copyToClipboard } from '@/lib/copy-to-clipboard';
import { cn } from '@/lib/utils';

type Props = { prompt: string };

export function ArticleActions({ prompt }: Props) {
  return (
    <div className="mt-7 flex flex-wrap gap-2">
      <ActionButton
        onClick={() => copyToClipboard(window.location.href, 'Link copied')}
      >
        <Icon name="link" />
        Copy link
      </ActionButton>
      <ActionButton onClick={() => copyToClipboard(prompt, 'Prompt copied')}>
        <Icon name="terminal" />
        Copy prompt
      </ActionButton>
      <ActionButton
        primary
        onClick={() => toast.error('The MCP server isn’t available yet')}
      >
        <Icon name="download" />
        Install MCP
      </ActionButton>
    </div>
  );
}

type ActionButtonProps = {
  primary?: boolean;
  onClick: () => unknown;
  children: ReactNode;
};

function ActionButton({ primary, onClick, children }: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'h-9.5 gap-2 px-3.5 text-sm font-medium',
        primary
          ? 'border-primary bg-primary text-primary-foreground hover:bg-primary/90'
          : 'border-border bg-card text-prose hover:bg-accent',
      )}
    >
      {children}
    </Button>
  );
}
