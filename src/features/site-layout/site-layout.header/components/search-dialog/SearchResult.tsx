import Image from 'next/image';

import { Column } from '@/components/shared/Column';
import { Command } from '@/components/ui/Command';
import type { ArticleLink } from '@/types/content.types';

import { ArticleAvailability } from './ArticleAvailability.shared';

type Props = {
  topic: string;
  link: ArticleLink;
  search: string;
  onSelect: (href: string) => void;
};

export function SearchResult({ topic, link, search, onSelect }: Props) {
  return (
    <Command.Item
      value={link.href}
      keywords={[topic, link.title, link.description]}
      onSelect={onSelect}
      variant="card"
    >
      <Image
        src={link.illustration.src}
        alt=""
        sizes="calc(100vw - 2rem)"
        className="h-auto w-full md:hidden"
      />
      <div className="max-md:p-3.5">
        <Column gap="xs">
          <span className="text-base font-medium md:text-sm">
            <HighlightedText text={link.title} search={search} />
          </span>
          <span className="text-sm leading-relaxed text-muted-foreground md:hidden">
            {link.description}
          </span>
          <ArticleAvailability
            publishedAt={link.publishedAt}
            className="mt-1 md:hidden"
          />
        </Column>
      </div>
    </Command.Item>
  );
}

type HighlightedTextProps = { text: string; search: string };

function HighlightedText({ text, search }: HighlightedTextProps) {
  const query = search.trim().toLowerCase();
  const start = text.toLowerCase().indexOf(query);
  const hasMatch = query !== '' && start >= 0;
  if (!hasMatch) return text;
  const end = start + query.length;
  return (
    <>
      {text.slice(0, start)}
      <mark className="rounded-sm bg-highlight px-px text-inherit">
        {text.slice(start, end)}
      </mark>
      {text.slice(end)}
    </>
  );
}
