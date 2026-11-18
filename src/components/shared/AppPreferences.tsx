'use client';

import { Preferences } from '@ui-sdk/react/preferences';
import type { ReactNode } from 'react';

import { colorScheme } from '@/lib/color-scheme';

type Props = { children: ReactNode };

export function AppPreferences({ children }: Props) {
  return <Preferences preferences={[colorScheme]}>{children}</Preferences>;
}
