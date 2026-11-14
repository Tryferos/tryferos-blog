import type { Node, Rule } from '@oxlint/plugins';

const modelFile = /\/models\/(?:[a-z0-9-]+\/)?[a-z0-9-]+\.model\.ts$/;

export const modelsWithoutClasses: Rule = {
  meta: {
    type: 'problem',
    schema: [],
    messages: {
      noClasses:
        'Write models as plain functions that take the data as their first argument, not classes.',
    },
  },
  create(context) {
    if (!modelFile.test(context.filename)) return {};
    const report = (node: Node) => {
      context.report({ node, messageId: 'noClasses' });
    };
    return { ClassDeclaration: report, ClassExpression: report };
  },
};
