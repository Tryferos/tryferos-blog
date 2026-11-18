import { useEffect, useSyncExternalStore } from 'react';

const applePlatform = /Mac|iPhone|iPad/;
const labels = { apple: '⌘', other: 'Ctrl' } as const;

export function useModShortcut(key: string, onTrigger: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModPressed = event.metaKey || event.ctrlKey;
      if (!isModPressed || event.key.toLowerCase() !== key) return;
      event.preventDefault();
      onTrigger();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, onTrigger]);
}

export function useModLabel() {
  return useSyncExternalStore(subscribeToNothing, clientModLabel, () => null);
}

function subscribeToNothing() {
  return () => undefined;
}

function clientModLabel() {
  return applePlatform.test(navigator.userAgent) ? labels.apple : labels.other;
}
