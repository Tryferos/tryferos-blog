'use client';

import { IconDownload, IconLink, IconTerminal } from '@tabler/icons-react';
import { toast } from 'sonner';

import { Row } from '@/components/shared/Row';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/copy-to-clipboard';

type Props = { prompt: string };

export function ArticleActions({ prompt }: Props) {
  return (
    <Row wrap gap="sm">
      <Button
        variant="outline"
        size="pill"
        onClick={() => {
          void copyToClipboard(window.location.href, 'Link copied');
        }}
      >
        <IconLink data-icon="inline-start" />
        Copy link
      </Button>
      <Button
        variant="outline"
        size="pill"
        onClick={() => {
          void copyToClipboard(prompt, 'Prompt copied');
        }}
      >
        <IconTerminal data-icon="inline-start" />
        Copy prompt
      </Button>
      <Button
        size="pill"
        onClick={() => {
          toast.error('The MCP server isn’t available yet');
        }}
      >
        <IconDownload data-icon="inline-start" />
        Install MCP
      </Button>
    </Row>
  );
}
