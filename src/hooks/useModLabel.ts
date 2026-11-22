import { useSyncExternalStore } from 'react';

const applePlatform = /Mac|iPhone|iPad/;
const labels = { apple: '⌘', other: 'Ctrl' } as const;

export function useModLabel() {
  return useSyncExternalStore(subscribeToNothing, clientModLabel, () => null);
}

function subscribeToNothing() {
  return () => undefined;
}

function clientModLabel() {
  return applePlatform.test(navigator.userAgent) ? labels.apple : labels.other;
}
