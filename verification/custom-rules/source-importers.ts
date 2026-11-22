import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const sourceRoot = path.join(import.meta.dirname, '../../src');
const sourceExtensions = ['.ts', '.tsx', '.mdx'];
const resolvableSuffixes = ['', '.ts', '.tsx', '/index.ts', '/index.tsx'];
const aliasPrefix = '@/';
const moduleSpecifier = /(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g;

function sourceFilesIn(folder: string): string[] {
  return readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(folder, entry.name);
    if (entry.isDirectory()) return sourceFilesIn(entryPath);
    const isSource = sourceExtensions.includes(path.extname(entry.name));
    return isSource ? [entryPath] : [];
  });
}

function resolveSpecifier(specifier: string, importer: string) {
  const isAlias = specifier.startsWith(aliasPrefix);
  const isRelative = specifier.startsWith('.');
  if (!isAlias && !isRelative) return undefined;
  const target = isAlias
    ? path.join(sourceRoot, specifier.slice(aliasPrefix.length))
    : path.resolve(path.dirname(importer), specifier);
  return resolvableSuffixes.map(suffix => `${target}${suffix}`);
}

let importersByFile: Map<string, Set<string>> | undefined;

export function importersOf(file: string) {
  importersByFile ??= collectImporters();
  return [...(importersByFile.get(file) ?? [])];
}

function collectImporters() {
  const importers = new Map<string, Set<string>>();
  for (const importer of sourceFilesIn(sourceRoot)) {
    const code = readFileSync(importer, 'utf8');
    for (const [, specifier = ''] of code.matchAll(moduleSpecifier)) {
      for (const candidate of resolveSpecifier(specifier, importer) ?? []) {
        const users = importers.get(candidate) ?? new Set<string>();
        users.add(importer);
        importers.set(candidate, users);
      }
    }
  }
  return importers;
}
