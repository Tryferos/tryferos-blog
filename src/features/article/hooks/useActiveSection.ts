import { useEffect, useState } from 'react';

import type { Section } from '@/types/content.types';

const readingLineRatio = 0.3;
const belowReadingLine = `0px 0px -${String((1 - readingLineRatio) * 100)}% 0px`;

export function useActiveSection(sections: Section[]) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const headings = sections.flatMap(section => {
      const heading = document.getElementById(section.id);
      return heading ? [heading] : [];
    });

    const update = () => {
      const readingLine = window.innerHeight * readingLineRatio;
      const passed = headings.filter(
        heading => heading.getBoundingClientRect().top <= readingLine,
      );
      setActiveId(passed.at(-1)?.id ?? sections[0]?.id);
    };

    const observer = new IntersectionObserver(update, {
      rootMargin: belowReadingLine,
    });
    for (const heading of headings) observer.observe(heading);
    update();
    return () => {
      observer.disconnect();
    };
  }, [sections]);

  return activeId;
}
