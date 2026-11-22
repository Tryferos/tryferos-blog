'use client';

import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Column } from '@/components/shared/Column';
import { Button } from '@/components/ui/Button';
import { Command } from '@/components/ui/Command';
import { Kbd } from '@/components/ui/Kbd';
import { useModLabel, useModShortcut } from '@/lib/keyboard-shortcut';
import type { ArticleLink, SearchGroup } from '@/types/content.types';

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
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        title="Search articles"
        description="Find an article by its title or description."
        className="max-w-xl sm:max-w-xl"
      >
        <SearchResults groups={groups} onSelect={goTo} />
      </Command.Dialog>
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

type SearchResultsProps = {
  groups: SearchGroup[];
  onSelect: (href: string) => void;
};

function SearchResults({ groups, onSelect }: SearchResultsProps) {
  return (
    <Command>
      <Command.Input placeholder="Search articles…" />
      <Command.List>
        <Command.Empty>No articles found.</Command.Empty>
        {groups.map(group => (
          <Command.Group key={group.title} heading={group.title}>
            {group.links.map(link => (
              <SearchResult key={link.href} link={link} onSelect={onSelect} />
            ))}
          </Command.Group>
        ))}
      </Command.List>
    </Command>
  );
}

type SearchResultProps = {
  link: ArticleLink;
  onSelect: (href: string) => void;
};

function SearchResult({ link, onSelect }: SearchResultProps) {
  return (
    <Command.Item
      value={link.href}
      keywords={[link.title, link.description]}
      onSelect={onSelect}
      className="*:[svg]:hidden"
    >
      <Column gap="xs">
        <span className="font-medium">{link.title}</span>
        <span className="text-xs text-muted-foreground">
          {link.description}
        </span>
      </Column>
    </Command.Item>
  );
}
