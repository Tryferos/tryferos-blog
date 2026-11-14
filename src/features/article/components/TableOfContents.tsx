'use client';

import { Eyebrow } from '@/components/ui/Eyebrow';
import type { Section } from '@/types/content.types';

import { useActiveSection } from '../hooks/useActiveSection';

type Props = { sections: Section[] };

export function TableOfContents({ sections }: Props) {
  const activeId = useActiveSection(sections);
  if (sections.length === 0) return null;

  return (
    <nav aria-labelledby="toc-title" className="max-lg:hidden">
      <Eyebrow id="toc-title" className="mb-3.5">
        On this page
      </Eyebrow>
      <ol className="flex flex-col border-l">
        {sections.map(section => (
          <li key={section.id} className="-ml-px">
            <a
              href={`#${section.id}`}
              aria-current={section.id === activeId ? 'location' : undefined}
              className="block border-l-2 border-transparent py-1.5 pl-3.5 text-sm text-muted-foreground hover:text-foreground current:border-primary current:font-medium current:text-foreground"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
