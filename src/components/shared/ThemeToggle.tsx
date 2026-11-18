'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/Button';

const themes = { light: 'light', dark: 'dark' } as const;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const next = resolvedTheme === themes.dark ? themes.light : themes.dark;

  return (
    <Button
      variant="subtle"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => {
        setTheme(next);
      }}
      className="-mr-2.5 size-11"
    >
      <MoonIcon className="size-4.5 dark:hidden" />
      <SunIcon className="hidden size-4.5 dark:block" />
    </Button>
  );
}
