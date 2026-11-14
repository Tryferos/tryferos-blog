import type { Node, Rule } from '@oxlint/plugins';

export const noUtilityTypes: Rule = {
  meta: {
    type: 'suggestion',
    schema: [],
    messages: {
      utilityType:
        'Conditional and mapped types are reusable utility types. Move this one to src/types/<name>.types.ts.',
    },
  },
  create(context) {
    const report = (node: Node) => {
      context.report({ node, messageId: 'utilityType' });
    };
    return { TSConditionalType: report, TSMappedType: report };
  },
};
