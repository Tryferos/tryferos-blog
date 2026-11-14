'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
} from '@ui-sdk/react/command';
import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogShortcut,
  DialogTitle,
  DialogTrigger,
} from '@ui-sdk/react/dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { SearchGroup } from '@/types/content.types';

type Props = { groups: SearchGroup[] };

export function ArticleSearch({ groups }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        shortcut="mod+k"
        className="ml-auto h-10.5 min-w-11 shrink basis-90 justify-start gap-2.5 border-border bg-card pr-2 pl-3.5 text-sm font-normal text-muted-foreground shadow-xs hover:border-primary/40"
      >
        <SearchIcon />
        <span className="flex-1 truncate text-left max-sm:sr-only">
          Search articles…
        </span>
        <DialogShortcut className="rounded-sm border bg-muted px-1.5 py-0.5 font-mono text-xs max-sm:hidden" />
      </DialogTrigger>
      <DialogBackdrop />
      <DialogContent className="w-full max-w-xl p-0">
        <DialogTitle className="sr-only">Search articles</DialogTitle>
        <Command
          onAction={href => {
            setOpen(false);
            router.push(href);
          }}
        >
          <div className="flex items-center gap-2 border-b px-3">
            <SearchIcon />
            <CommandInput
              aria-label="Search articles"
              placeholder="Search articles…"
              className="flex-1 border-0"
            />
          </div>
          <CommandEmpty className="p-4 text-sm text-muted-foreground">
            No articles found.
          </CommandEmpty>
          <CommandList className="p-2">
            {groups.map(group => (
              <CommandGroup key={group.title}>
                <CommandGroupLabel>{group.title}</CommandGroupLabel>
                {group.links.map(link => (
                  <CommandItem
                    key={link.href}
                    value={link.href}
                    label={link.title}
                    keywords={[link.description]}
                    className="flex-col items-start gap-0.5"
                  >
                    <span className="font-medium">{link.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {link.description}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
