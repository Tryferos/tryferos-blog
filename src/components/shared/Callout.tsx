import type { Icon } from '@tabler/icons-react';
import { type ReactNode, useId } from 'react';

import { Row } from '@/components/shared/Row';

type Props = { icon: Icon; label: string; children: ReactNode };

export function Callout({ icon: LabelIcon, label, children }: Props) {
  const labelId = useId();

  return (
    <section
      aria-labelledby={labelId}
      className="my-8 rounded-r-xl border-l-3 border-primary bg-accent/40 px-5 py-4"
    >
      <Row asChild align="center" gap="sm">
        <h2
          id={labelId}
          className="font-sans text-base font-semibold text-foreground"
        >
          <LabelIcon aria-hidden className="size-4.5 text-primary" />
          {label}
        </h2>
      </Row>
      <div className="mt-1.5 text-base/relaxed *:my-0">{children}</div>
    </section>
  );
}
