import { useCommandState } from 'cmdk';

import { Command } from '@/components/ui/Command';
import { cn } from '@/lib/utils';
import type { SearchGroup } from '@/types/content.types';

import { SearchEmpty } from './SearchEmpty';
import { SearchResult } from './SearchResult';

type Props = {
  groups: SearchGroup[];
  search: string;
  onSelect: (href: string) => void;
  onTopicPick: (topic: string) => void;
};

export function SearchResults({
  groups,
  search,
  onSelect,
  onTopicPick,
}: Props) {
  const hasResults = useCommandState(state => state.filtered.count > 0);
  return (
    <Command.List
      variant="pane"
      className={cn(hasResults && 'md:w-96 md:flex-none')}
    >
      <Command.Empty variant="bare">
        <SearchEmpty
          search={search}
          topics={groups.map(group => group.title)}
          onTopicPick={onTopicPick}
        />
      </Command.Empty>
      {groups.map(group => (
        <Command.Group key={group.title} heading={group.title}>
          {group.links.map(link => (
            <SearchResult
              key={link.href}
              topic={group.title}
              link={link}
              search={search}
              onSelect={onSelect}
            />
          ))}
        </Command.Group>
      ))}
    </Command.List>
  );
}
