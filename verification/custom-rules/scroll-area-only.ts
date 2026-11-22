import type { ESTree, Rule } from '@oxlint/plugins';

const scrollClass = /(^|\s|:)overflow-(x-|y-)?(auto|scroll)(?=\s|$)/;

export const scrollAreaOnly: Rule = {
  meta: {
    type: 'suggestion',
    schema: [],
    messages: {
      useScrollArea:
        'Wrap scrolling content in <ScrollArea> from @/components/ui/ScrollArea instead of an overflow-auto or overflow-scroll class, so every scrollbar looks the same.',
    },
  },
  create(context) {
    const reportScrollClass = (node: ESTree.Node, text: string) => {
      if (!scrollClass.test(text)) return;
      context.report({ node, messageId: 'useScrollArea' });
    };
    return {
      Literal(node) {
        if (typeof node.value === 'string') reportScrollClass(node, node.value);
      },
      TemplateElement(node) {
        reportScrollClass(node, node.value.raw);
      },
    };
  },
};
