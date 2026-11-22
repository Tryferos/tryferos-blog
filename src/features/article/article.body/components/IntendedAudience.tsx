import { IconUsers } from '@tabler/icons-react';
import type { ReactNode } from 'react';

import { Callout } from '@/components/shared/Callout';

type Props = { children: ReactNode };

export function IntendedAudience({ children }: Props) {
  return (
    <Callout icon={IconUsers} label="Who it’s for">
      {children}
    </Callout>
  );
}
