'use client';

import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Command } from '@/components/ui/Command';
import { Kbd } from '@/components/ui/Kbd';
import { useModLabel, useModShortcut } from '@/lib/keyboard-shortcut';
import type { SearchGroup } from '@/types/content.types';

const shortcutKey = 'k';

type Props = { groups: SearchGroup[] };

export function ArticleSearch({ groups }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const modLabel = useModLabel();
  useModShortcut(shortcutKey, () => {
    setOpen(isOpen => !isOpen);
  });

  const goTo = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <Button
        variant="field"
        size="field"
        onClick={() => {
          setOpen(true);
        }}
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
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        title="Search articles"
        description="Find an article by its title or description."
        className="max-w-xl sm:max-w-xl"
      >
        <Command>
          <Command.Input placeholder="Search articles…" />
          <Command.List>
            <Command.Empty>No articles found.</Command.Empty>
            {groups.map(group => (
              <Command.Group key={group.title} heading={group.title}>
                {group.links.map(link => (
                  <Command.Item
                    key={link.href}
                    value={link.href}
                    keywords={[link.title, link.description]}
                    onSelect={goTo}
                    className="*:[svg]:hidden"
                  >
                    <span className="flex flex-col gap-0.5">
                      <span className="font-medium">{link.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {link.description}
                      </span>
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </Command.Dialog>
    </>
  );
}
