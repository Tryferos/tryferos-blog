import path from 'node:path';
import type { ESTree, Rule } from '@oxlint/plugins';

type Statement = ESTree.Statement | ESTree.Directive;

type ComponentFunction = ESTree.Function | ESTree.ArrowFunctionExpression;

function declarationOf(statement: Statement) {
  const isExport =
    statement.type === 'ExportNamedDeclaration' ||
    statement.type === 'ExportDefaultDeclaration';
  return isExport && 'declaration' in statement
    ? statement.declaration
    : statement;
}

type Component = { name: string; fn: ComponentFunction };

const componentName = /^[A-Z]/;

function componentsIn(statement: Statement): Component[] {
  const declaration = declarationOf(statement);
  if (declaration?.type === 'FunctionDeclaration') {
    const name = declaration.id?.name ?? '';
    return componentName.test(name) ? [{ name, fn: declaration }] : [];
  }
  if (declaration?.type !== 'VariableDeclaration') return [];
  return declaration.declarations.flatMap(declarator => {
    const { id, init } = declarator;
    const isComponent =
      id.type === 'Identifier' &&
      componentName.test(id.name) &&
      (init?.type === 'ArrowFunctionExpression' ||
        init?.type === 'FunctionExpression');
    return isComponent ? [{ name: id.name, fn: init }] : [];
  });
}

function typeAliasName(statement: Statement | undefined) {
  if (!statement) return undefined;
  const declaration = declarationOf(statement);
  return declaration?.type === 'TSTypeAliasDeclaration'
    ? declaration.id.name
    : undefined;
}

function referencedTypeName(parameter: ESTree.ObjectPattern) {
  const annotation = parameter.typeAnnotation?.typeAnnotation;
  if (annotation?.type !== 'TSTypeReference') return undefined;
  return annotation.typeName.type === 'Identifier'
    ? annotation.typeName.name
    : undefined;
}

type Parameter = ComponentFunction['params'][number];

type PropsCheck = {
  body: Statement[];
  index: number;
  parameter: Parameter;
  props: string;
};

function propsProblem({ body, index, parameter, props }: PropsCheck) {
  if (parameter.type !== 'ObjectPattern') return 'destructure';
  if (referencedTypeName(parameter) !== props) return 'namedType';
  const declaredInFile = body.some(other => typeAliasName(other) === props);
  const declaredAbove = typeAliasName(body[index - 1]) === props;
  return declaredInFile && !declaredAbove ? 'typeAbove' : undefined;
}

export const propsAboveComponent: Rule = {
  meta: {
    type: 'suggestion',
    schema: [],
    messages: {
      destructure:
        'Destructure the props of {{component}}: function {{component}}({ a, b }: {{props}}).',
      namedType:
        "Type the props of {{component}} with a type named {{props}}. The file's main component uses Props; other components use <Name>Props.",
      typeAbove:
        'Declare type {{props}} directly above {{component}}, with nothing in between.',
    },
  },
  create(context) {
    const [main = ''] = path.basename(context.filename).split('.');
    return {
      Program(program) {
        program.body.forEach((statement, index) => {
          for (const { name, fn } of componentsIn(statement)) {
            const [parameter] = fn.params;
            if (!parameter) continue;
            const props = name === main ? 'Props' : `${name}Props`;
            const problem = propsProblem({
              body: program.body,
              index,
              parameter,
              props,
            });
            if (!problem) continue;
            context.report({
              node: problem === 'typeAbove' ? statement : parameter,
              messageId: problem,
              data: { component: name, props },
            });
          }
        });
      },
    };
  },
};
