import type { ESTree, Rule } from '@oxlint/plugins';

type Identifier = ESTree.BindingIdentifier;

const wordSeparator = '_';

const isCamelOrPascalCase = (name: string) => !name.includes(wordSeparator);

const isPascalCase = (name: string) =>
  name.startsWith(name.charAt(0).toUpperCase()) &&
  !name.includes(wordSeparator);

function identifiersIn(
  pattern: ESTree.BindingPattern | ESTree.BindingRestElement | null,
): Identifier[] {
  if (!pattern) return [];
  switch (pattern.type) {
    case 'Identifier':
      return [pattern];
    case 'ObjectPattern':
      return pattern.properties.flatMap(property =>
        identifiersIn(
          property.type === 'RestElement' ? property.argument : property.value,
        ),
      );
    case 'ArrayPattern':
      return pattern.elements.flatMap(identifiersIn);
    case 'AssignmentPattern':
      return identifiersIn(pattern.left);
    case 'RestElement':
      return identifiersIn(pattern.argument);
    default:
      return [];
  }
}

export const identifierCasing: Rule = {
  meta: {
    type: 'suggestion',
    schema: [],
    messages: {
      value: 'Name {{name}} in camelCase or PascalCase, without underscores.',
      type: 'Name the type {{name}} in PascalCase.',
    },
  },
  create(context) {
    const report = (identifier: Identifier, messageId: 'value' | 'type') => {
      context.report({
        node: identifier,
        messageId,
        data: { name: identifier.name },
      });
    };
    const checkValue = (identifier: Identifier | null) => {
      if (identifier && !isCamelOrPascalCase(identifier.name)) {
        report(identifier, 'value');
      }
    };
    const checkType = (identifier: Identifier | null) => {
      if (identifier && !isPascalCase(identifier.name)) {
        report(identifier, 'type');
      }
    };
    return {
      VariableDeclarator: node => {
        identifiersIn(node.id).forEach(checkValue);
      },
      FunctionDeclaration: node => {
        checkValue(node.id);
      },
      FunctionExpression: node => {
        checkValue(node.id);
      },
      TSDeclareFunction: node => {
        checkValue(node.id);
      },
      ClassDeclaration: node => {
        checkType(node.id);
      },
      ClassExpression: node => {
        checkType(node.id);
      },
      TSInterfaceDeclaration: node => {
        checkType(node.id);
      },
      TSTypeAliasDeclaration: node => {
        checkType(node.id);
      },
      TSEnumDeclaration: node => {
        checkType(node.id);
      },
      TSTypeParameter: node => {
        checkType(node.name);
      },
    };
  },
};
