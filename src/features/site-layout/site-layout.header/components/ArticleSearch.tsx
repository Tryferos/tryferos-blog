'use client';

import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Kbd } from '@/components/ui/Kbd';
import { useModLabel, useModShortcut } from '@/lib/keyboard-shortcut';
import type { SearchGroup } from '@/types/content.types';

import { SearchDialog } from './search-dialog/SearchDialog';

const shortcutKey = 'k';

type Props = { groups: SearchGroup[] };

export function ArticleSearch({ groups }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useModShortcut(shortcutKey, () => {
    setOpen(isOpen => !isOpen);
  });

  const goTo = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <SearchTrigger
        onOpen={() => {
          setOpen(true);
        }}
      />
      <SearchDialog
        open={open}
        onOpenChange={setOpen}
        groups={groups}
        onSelect={goTo}
      />
    </>
  );
}

type SearchTriggerProps = { onOpen: () => void };

function SearchTrigger({ onOpen }: SearchTriggerProps) {
  const modLabel = useModLabel();
  return (
    <Button
      variant="field"
      size="field"
      onClick={onOpen}
      className="ml-auto min-w-11 shrink basis-90"
    >
      <IconSearch />
      <span className="flex-1 truncate text-left max-sm:sr-only">
        Search articles…
      </span>
      {modLabel && (
        <Kbd className="max-sm:hidden">
          {modLabel} {shortcutKey.toUpperCase()}
        </Kbd>
      )}
    </Button>
  );
}
