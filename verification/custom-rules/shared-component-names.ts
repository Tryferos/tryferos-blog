import path from 'node:path';
import type { Rule } from '@oxlint/plugins';
import { importersOf } from './source-importers.ts';

const projectRoot = path.join(import.meta.dirname, '../..');
const sharedSuffix = '.shared.tsx';
const minimumSharedImporters = 2;

type Options = { flatFolders: string[] };

const isOptions = (value: unknown): value is Options =>
  typeof value === 'object' &&
  value !== null &&
  'flatFolders' in value &&
  Array.isArray(value.flatFolders);

export const sharedComponentNames: Rule = {
  meta: {
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {
          flatFolders: { type: 'array', items: { type: 'string' } },
        },
        required: ['flatFolders'],
        additionalProperties: false,
      },
    ],
    messages: {
      markShared:
        "'{{file}}' is used by {{count}} files. Rename it to '{{name}}.shared.tsx'.",
      unmarkShared:
        "'{{file}}' is used by {{count}} file. Rename it to '{{name}}.tsx', or keep the suffix only for a component several files use.",
    },
  },
  create(context) {
    const [options] = context.options;
    if (!isOptions(options)) return {};
    const file = context.filename;
    const folder = path.relative(projectRoot, path.dirname(file));
    if (options.flatFolders.includes(folder)) return {};
    const fileName = path.basename(file);
    const isMarkedShared = fileName.endsWith(sharedSuffix);
    const name = fileName.replace(sharedSuffix, '').replace('.tsx', '');
    const count = importersOf(file).filter(user => user !== file).length;
    const isShared = count >= minimumSharedImporters;
    if (isShared === isMarkedShared) return {};
    return {
      Program(program) {
        context.report({
          node: program,
          messageId: isShared ? 'markShared' : 'unmarkShared',
          data: { file: fileName, count: String(count), name },
        });
      },
    };
  },
};
