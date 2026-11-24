import path from 'node:path';
import type { Rule } from '@oxlint/plugins';
import { importersOf } from './source-importers.ts';

type Options = { kindFolders: string[]; exemptFolders: string[] };

const isOptions = (value: unknown): value is Options =>
  typeof value === 'object' &&
  value !== null &&
  'kindFolders' in value &&
  Array.isArray(value.kindFolders) &&
  'exemptFolders' in value &&
  Array.isArray(value.exemptFolders);

function folderNameFor(file: string) {
  const name = path.basename(file).split('.')[0] ?? '';
  return name
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replaceAll('_', '-')
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
