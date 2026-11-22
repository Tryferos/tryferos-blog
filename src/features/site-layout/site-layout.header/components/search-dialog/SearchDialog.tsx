'use client';

import { useState } from 'react';

import { Row } from '@/components/shared/Row';
import { Command } from '@/components/ui/Command';
import { Separator } from '@/components/ui/Separator';
import type { SearchGroup } from '@/types/content.types';

import { SearchClose } from './SearchClose';
import { SearchFooter } from './SearchFooter';
import { SearchPreview } from './SearchPreview';
import { SearchResults } from './SearchResults';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: SearchGroup[];
  onSelect: (href: string) => void;
};

export function SearchDialog({ open, onOpenChange, groups, onSelect }: Props) {
  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search articles"
      description="Find an article by its title, description or topic."
      variant="search"
    >
      <SearchPalette groups={groups} onSelect={onSelect} />
    </Command.Dialog>
  );
}

const isMatch = 1;
const isMiss = 0;

function matchScore(_value: string, search: string, keywords: string[] = []) {
  const query = search.trim().toLowerCase();
  const text = keywords.join(' ').toLowerCase();
  return text.includes(query) ? isMatch : isMiss;
}

type SearchPaletteProps = {
  groups: SearchGroup[];
  onSelect: (href: string) => void;
};

function SearchPalette({ groups, onSelect }: SearchPaletteProps) {
  const [search, setSearch] = useState('');
  return (
    <Command variant="bare" filter={matchScore}>
      <div className="shrink-0 pr-3">
        <Row align="center">
          <Command.Input
            variant="bare"
            value={search}
            onValueChange={setSearch}
            placeholder="Search articles…"
          />
          <SearchClose />
        </Row>
      </div>
      <Separator />
      <div className="flex min-h-0 flex-1">
        <SearchResults
          groups={groups}
          search={search}
          onSelect={onSelect}
          onTopicPick={setSearch}
        />
        <SearchPreview groups={groups} />
      </div>
      <SearchFooter />
    </Command>
  );
}
