import { useCommandState } from 'cmdk';

import { Command } from '@/components/ui/Command';
import { ScrollArea } from '@/components/ui/ScrollArea';
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
    <>
      <ScrollArea
        className={cn(
          'min-h-0 min-w-0 flex-1',
          hasResults && 'md:w-96 md:flex-none',
          !hasResults && 'hidden',
        )}
      >
        <Command.List variant="pane">
          {groups.map(group => (
            <Command.Group
              key={group.title}
              heading={group.title}
              variant="strong"
            >
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
      </ScrollArea>
      <Command.Empty variant="bare" className="flex-1">
        <SearchEmpty
          search={search}
          topics={groups.map(group => group.title)}
          onTopicPick={onTopicPick}
        />
      </Command.Empty>
    </>
  );
}
