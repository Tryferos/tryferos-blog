'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import { Tooltip } from '@/components/ui/Tooltip';

type Props = { children: ReactNode };

export function AppPreferences({ children }: Props) {
  return (
    <ThemeProvider
      attribute="data-color-scheme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Tooltip.Provider>{children}</Tooltip.Provider>
    </ThemeProvider>
  );
}
