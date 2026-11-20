import { createElement, type ComponentProps } from 'react';

import { Row } from '@/components/shared/Row';
import { defaultSectionIcon, sectionIcons } from '@/data/section.icons';

type Props = ComponentProps<'h2'>;

export function SectionHeading({ id, children, ...props }: Props) {
  const icon = (id ? sectionIcons[id] : undefined) ?? defaultSectionIcon;

  return (
    <Row asChild align="center" gap="sm">
      <h2
        id={id}
        className="mt-20 mb-4 scroll-mt-24 text-2xl font-semibold text-foreground"
        {...props}
      >
        {createElement(icon, {
          'aria-hidden': true,
          className: 'size-6 shrink-0 text-primary',
        })}
        {children}
      </h2>
    </Row>
  );
}
