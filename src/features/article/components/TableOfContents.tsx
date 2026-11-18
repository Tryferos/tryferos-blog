'use client';

import { Column } from '@/components/shared/Column';
import { Eyebrow } from '@/components/shared/Eyebrow';
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
      <Column asChild>
        <ol className="border-l">
          {sections.map(section => (
            <li key={section.id} className="-ml-px">
              <SectionLink
                section={section}
                isActive={section.id === activeId}
              />
            </li>
          ))}
        </ol>
      </Column>
    </nav>
  );
}

type SectionLinkProps = { section: Section; isActive: boolean };

function SectionLink({ section, isActive }: SectionLinkProps) {
  return (
    <a
      href={`#${section.id}`}
      aria-current={isActive ? 'location' : undefined}
      className="block border-l-2 border-transparent py-1.5 pl-3.5 text-sm text-muted-foreground hover:text-foreground current:border-primary current:font-medium current:text-foreground"
    >
      {section.title}
    </a>
  );
}
