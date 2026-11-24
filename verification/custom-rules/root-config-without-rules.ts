import type { ESTree, Rule } from '@oxlint/plugins';

const rootConfigFile = /(?:^|\/)oxlint\.config\.ts$/;
const configBuilder = 'defineConfig';
const ruleKeys = new Set(['rules', 'overrides', 'jsPlugins']);

function keyName(property: ESTree.ObjectProperty) {
  if (property.key.type === 'Identifier') return property.key.name;
  return property.key.type === 'Literal' ? String(property.key.value) : '';
}

export const rootConfigWithoutRules: Rule = {
  meta: {
    type: 'problem',
    schema: [],
    messages: {
      noRules:
        'Keep {{key}} out of oxlint.config.ts. Add the rule to the config in verification/configs/ for its concern, or create one there and list it in extends.',
    },
  },
  create(context) {
    if (!rootConfigFile.test(context.filename)) return {};
    return {
      CallExpression(node) {
        const isConfigBuilder =
          node.callee.type === 'Identifier' &&
          node.callee.name === configBuilder;
        const [config] = node.arguments;
        if (!isConfigBuilder || config?.type !== 'ObjectExpression') return;
        for (const property of config.properties) {
          if (property.type !== 'Property') continue;
          const key = keyName(property);
          if (!ruleKeys.has(key)) continue;
          context.report({
            node: property,
            messageId: 'noRules',
            data: { key },
          });
        }
      },
    };
  },
};
