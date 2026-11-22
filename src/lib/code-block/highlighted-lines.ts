import { highlightCode } from '@/lib/code-block/highlighter';

export async function highlightedLines(code: string, language: string) {
  'use cache';
  return (await highlightCode(code, language)) ?? code.split('\n');
}
