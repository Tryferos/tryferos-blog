import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { Rule } from '@oxlint/plugins';

const sourceRoot = path.join(import.meta.dirname, '../../src');
const sourceExtensions = ['.ts', '.tsx', '.mdx'];
const resolvableSuffixes = ['', '.ts', '.tsx', '/index.ts', '/index.tsx'];
const aliasPrefix = '@/';
const moduleSpecifier = /(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g;

type Options = { kindFolders: string[]; exemptFolders: string[] };

const isOptions = (value: unknown): value is Options =>
  typeof value === 'object' &&
  value !== null &&
  'kindFolders' in value &&
  Array.isArray(value.kindFolders) &&
  'exemptFolders' in value &&
  Array.isArray(value.exemptFolders);

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

function importersOf(file: string) {
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

function folderNameFor(file: string) {
  const name = path.basename(file).split('.')[0] ?? '';
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}

export const singleUseFileGrouping: Rule = {
  meta: {
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {
          kindFolders: { type: 'array', items: { type: 'string' } },
          exemptFolders: { type: 'array', items: { type: 'string' } },
        },
        required: ['kindFolders', 'exemptFolders'],
        additionalProperties: false,
      },
    ],
    messages: {
      groupWithOwner:
        "'{{file}}' is only used by '{{owner}}', so both show the same thing. Move them into '{{kind}}/{{folder}}/', named after what the reader sees.",
    },
  },
  create(context) {
    const [options] = context.options;
    if (!isOptions(options)) return {};
    const file = context.filename;
    const folder = path.dirname(file);
    const kind = path.basename(folder);
    const isGroupedKind =
      options.kindFolders.includes(kind) &&
      !options.exemptFolders.includes(kind);
    if (!isGroupedKind) return {};
    const importers = importersOf(file).filter(user => user !== file);
    const [owner] = importers;
    const isSingleUse = importers.length === 1 && owner !== undefined;
    if (!isSingleUse || path.dirname(owner) !== folder) return {};
    return {
      Program(program) {
        context.report({
          node: program,
          messageId: 'groupWithOwner',
          data: {
            file: path.basename(file),
            owner: path.basename(owner),
            kind,
            folder: folderNameFor(owner),
          },
        });
      },
    };
  },
};
