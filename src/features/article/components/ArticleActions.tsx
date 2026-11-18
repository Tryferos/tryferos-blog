'use client';

import { DownloadIcon, LinkIcon, TerminalIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/copy-to-clipboard';

type Props = { prompt: string };

export function ArticleActions({ prompt }: Props) {
  return (
    <div className="mt-7 flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="lg"
        onClick={() => {
          void copyToClipboard(window.location.href, 'Link copied');
        }}
      >
        <LinkIcon data-icon="inline-start" />
        Copy link
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => {
          void copyToClipboard(prompt, 'Prompt copied');
        }}
      >
        <TerminalIcon data-icon="inline-start" />
        Copy prompt
      </Button>
      <Button
        size="lg"
        onClick={() => {
          toast.error('The MCP server isn’t available yet');
        }}
      >
        <DownloadIcon data-icon="inline-start" />
        Install MCP
      </Button>
    </div>
  );
}
