import path from 'node:path';
import type { ESTree, Rule } from '@oxlint/plugins';

type TopLevelFunction = {
  name: string;
  node: ESTree.Node;
  lines: number;
  exported: boolean;
};

const defaultMaxHelperLines = 30;

const maxHelperLinesOf = (options: unknown) =>
  typeof options === 'object' &&
  options !== null &&
  'maxHelperLines' in options &&
  typeof options.maxHelperLines === 'number'
    ? options.maxHelperLines
    : defaultMaxHelperLines;

function linesOf(node: ESTree.Node) {
  return node.loc.end.line - node.loc.start.line + 1;
}

function isExport(statement: ESTree.Statement | ESTree.Directive) {
  return (
    statement.type === 'ExportNamedDeclaration' ||
    statement.type === 'ExportDefaultDeclaration'
  );
}

function declarationOf(statement: ESTree.Statement | ESTree.Directive) {
  return isExport(statement) && 'declaration' in statement
    ? statement.declaration
    : statement;
}

function functionsIn(
  statement: ESTree.Statement | ESTree.Directive,
): TopLevelFunction[] {
  const declaration = declarationOf(statement);
  const exported = isExport(statement);
  if (declaration?.type === 'FunctionDeclaration' && declaration.id) {
    return [
      {
        name: declaration.id.name,
        node: declaration,
        lines: linesOf(declaration),
        exported,
      },
    ];
  }
  if (declaration?.type !== 'VariableDeclaration') return [];
  return declaration.declarations.flatMap(declarator => {
    const isFunction =
      declarator.init?.type === 'ArrowFunctionExpression' ||
      declarator.init?.type === 'FunctionExpression';
    return isFunction && declarator.id.type === 'Identifier'
      ? [
          {
            name: declarator.id.name,
            node: declarator,
            lines: linesOf(declarator),
            exported,
          },
        ]
      : [];
  });
}

export const mainComponentFirst: Rule = {
  meta: {
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: { maxHelperLines: { type: 'integer', minimum: 1 } },
        additionalProperties: false,
      },
    ],
    messages: {
      mainFirst:
        'Start the file with its exported component {{component}}. Helpers go after it.',
      smallHelpers:
        '{{name}} is {{lines}} lines. Helpers next to a component stay under {{max}} lines; move it to its own component file or to utils/.',
    },
  },
  create(context) {
    const [component = ''] = path.basename(context.filename).split('.');
    const maxHelperLines = maxHelperLinesOf(context.options[0]);
    return {
      Program(program) {
        const functions = program.body.flatMap(functionsIn);
        const [first] = functions;
        if (first && (first.name !== component || !first.exported)) {
          context.report({
            node: first.node,
            messageId: 'mainFirst',
            data: { component },
          });
        }
        for (const helper of functions.slice(1)) {
          const isPartOfComponent =
            helper.exported && helper.name.startsWith(component);
          if (!isPartOfComponent && helper.lines > maxHelperLines) {
            context.report({
              node: helper.node,
              messageId: 'smallHelpers',
              data: {
                name: helper.name,
                lines: String(helper.lines),
                max: String(maxHelperLines),
              },
            });
          }
        }
      },
    };
  },
};
