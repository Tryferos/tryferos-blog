'use client';

import { Button } from '@ui-sdk/react/button';
import { usePreference } from '@ui-sdk/react/preferences';

import { colorScheme } from '@/lib/color-scheme';

const schemes = { light: 'light', dark: 'dark' } as const;

export function ThemeToggle() {
  const { resolved } = usePreference(colorScheme);
  const next = resolved === schemes.dark ? schemes.light : schemes.dark;

  return (
    <Button
      aria-label={`Switch to ${next} theme`}
      onClick={() => colorScheme.set(next)}
      className="-mr-2.5 size-11 border-0 bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5 dark:hidden"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden size-4.5 dark:block"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </Button>
  );
}
