import { readdirSync } from 'node:fs';
import path from 'node:path';
import type { Rule } from '@oxlint/plugins';

const minimumFiles = 2;

type Options = { kindFolders: string[] };

const isOptions = (value: unknown): value is Options =>
  typeof value === 'object' &&
  value !== null &&
  'kindFolders' in value &&
  Array.isArray(value.kindFolders);

export const concernFolderSize: Rule = {
  meta: {
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {
          kindFolders: { type: 'array', items: { type: 'string' } },
        },
        required: ['kindFolders'],
        additionalProperties: false,
      },
    ],
    messages: {
      tooFew:
        "The concern folder '{{folder}}' holds one file. Move it back to '{{kind}}/', or add the files that share its concern.",
    },
  },
  create(context) {
    const [options] = context.options;
    if (!isOptions(options)) return {};
    const { kindFolders } = options;
    const folder = path.dirname(context.filename);
    const kind = path.basename(path.dirname(folder));
    const isKindFolder = kindFolders.includes(path.basename(folder));
    if (isKindFolder || !kindFolders.includes(kind)) return {};
    const files = readdirSync(folder, { withFileTypes: true }).filter(entry =>
      entry.isFile(),
    );
    if (files.length >= minimumFiles) return {};
    return {
      Program(program) {
        context.report({
          node: program,
          messageId: 'tooFew',
          data: { folder: path.basename(folder), kind },
        });
      },
    };
  },
};
