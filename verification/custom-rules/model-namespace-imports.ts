import type { ESTree, Rule } from '@oxlint/plugins';

const modelPath =
  /(?:^|\/)models\/(?:[a-z0-9-]+\/)?([a-z0-9-]+)\.model(?:\.ts)?$/;
const modelSuffix = 'Model';

function namespaceNameOf(source: unknown) {
  if (typeof source !== 'string') return undefined;
  const unit = modelPath.exec(source)?.[1];
  if (!unit) return undefined;
  const camelCaseUnit = unit.replaceAll(/-([a-z0-9])/g, (_, letter: string) =>
    letter.toUpperCase(),
  );
  return `${camelCaseUnit}${modelSuffix}`;
}

function nameOf(node: ESTree.ModuleExportName) {
  return node.type === 'Identifier' ? node.name : node.value;
}

export const modelNamespaceImports: Rule = {
  meta: {
    type: 'problem',
    schema: [],
    messages: {
      importNamespace:
        "Import a model as a namespace: import * as {{name}} from '{{source}}'.",
      exportNamespace:
        "Export a model as a namespace: export * as {{name}} from '{{source}}'.",
      keepName: 'Keep the model name {{name}} when importing it.',
      noDestructuring:
        'Call model rules through the namespace, {{name}}.rule(data). Do not destructure it.',
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        const name = namespaceNameOf(source);
        if (name) {
          const [specifier] = node.specifiers;
          const isExpectedNamespace =
            node.specifiers.length === 1 &&
            specifier?.type === 'ImportNamespaceSpecifier' &&
            specifier.local.name === name;
          if (!isExpectedNamespace) {
            context.report({
              node,
              messageId: 'importNamespace',
              data: { name, source },
            });
          }
          return;
        }
        for (const specifier of node.specifiers) {
          if (specifier.type !== 'ImportSpecifier') continue;
          const importedName = nameOf(specifier.imported);
          const isRenamedModel =
            importedName.endsWith(modelSuffix) &&
            specifier.local.name !== importedName;
          if (isRenamedModel) {
            context.report({
              node: specifier,
              messageId: 'keepName',
              data: { name: importedName },
            });
          }
        }
      },
      ExportNamedDeclaration(node) {
        const source = node.source?.value;
        const name = namespaceNameOf(source);
        if (name) {
          context.report({
            node,
            messageId: 'exportNamespace',
            data: { name, source: String(source) },
          });
        }
      },
      ExportAllDeclaration(node) {
        const source = node.source.value;
        const name = namespaceNameOf(source);
        const exportedName = node.exported && nameOf(node.exported);
        if (name && exportedName !== name) {
          context.report({
            node,
            messageId: 'exportNamespace',
            data: { name, source },
          });
        }
      },
      VariableDeclarator(node) {
        const isDestructuredModel =
          node.id.type === 'ObjectPattern' &&
          node.init?.type === 'Identifier' &&
          node.init.name.endsWith(modelSuffix);
        if (isDestructuredModel && node.init?.type === 'Identifier') {
          context.report({
            node,
            messageId: 'noDestructuring',
            data: { name: node.init.name },
          });
        }
      },
    };
  },
};
