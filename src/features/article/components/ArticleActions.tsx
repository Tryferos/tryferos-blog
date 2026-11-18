'use client';

import type { ReactNode } from 'react';
import { toast } from 'sonner';

import { Icon } from '@/components/shared/Icon';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/copy-to-clipboard';

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
      variant={primary ? 'default' : 'outline'}
      size="lg"
      onClick={onClick}
      className="h-9.5 gap-2 px-3.5"
    >
      {children}
    </Button>
  );
}
