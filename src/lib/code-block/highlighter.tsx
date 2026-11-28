import * as React from 'react';
import {
  createCssVariablesTheme,
  createHighlighterCore,
  getTokenStyleObject,
  type GrammarState,
  type HighlighterCore,
  type ThemedToken,
} from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

const languages = {
  bash: () => import('shiki/langs/shellscript.mjs'),
  css: () => import('shiki/langs/css.mjs'),
  diff: () => import('shiki/langs/diff.mjs'),
  html: () => import('shiki/langs/html.mjs'),
  javascript: () => import('shiki/langs/javascript.mjs'),
  json: () => import('shiki/langs/json.mjs'),
  jsx: () => import('shiki/langs/jsx.mjs'),
  markdown: () => import('shiki/langs/markdown.mjs'),
  python: () => import('shiki/langs/python.mjs'),
  sql: () => import('shiki/langs/sql.mjs'),
  tsx: () => import('shiki/langs/tsx.mjs'),
  typescript: () => import('shiki/langs/typescript.mjs'),
  yaml: () => import('shiki/langs/yaml.mjs'),
};

const aliases = {
  js: 'javascript',
  md: 'markdown',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  shellscript: 'bash',
  ts: 'typescript',
  yml: 'yaml',
  zsh: 'bash',
} satisfies Record<string, keyof typeof languages>;

function isLanguage(name: string): name is keyof typeof languages {
  return Object.hasOwn(languages, name);
}

function isAlias(name: string): name is keyof typeof aliases {
  return Object.hasOwn(aliases, name);
}

const syntaxTheme = createCssVariablesTheme({
  name: 'syntax',
  variablePrefix: '--syntax-',
});

let highlighter: Promise<HighlighterCore> | undefined;

function getHighlighter() {
  highlighter ??= createHighlighterCore({
    themes: [syntaxTheme],
    langs: [],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  });

  return highlighter;
}

function getLanguage(language: string) {
  const name = language.toLowerCase();

  if (name === 'ansi') {
    return name;
  }

  if (isLanguage(name)) {
    return name;
  }

  if (isAlias(name)) {
    return aliases[name];
  }

  return null;
}

export async function loadHighlighter(language: string) {
  const lang = getLanguage(language);

  if (!lang) {
    return null;
  }

  const shiki = await getHighlighter();

  if (lang !== 'ansi' && !shiki.getLoadedLanguages().includes(lang)) {
    await shiki.loadLanguage(languages[lang]);
  }

  return {
    highlight(code: string, state?: GrammarState) {
      const tokenize = (text: string) =>
        shiki.codeToTokens(text, {
          lang,
          theme: syntaxTheme,
          grammarState: state,
        }).tokens;

      const hasGrammarState = lang !== 'ansi';
      const tokens = hasGrammarState
        ? tokenize(code)
        : code.split('\n').flatMap(line => tokenize(line));

      return {
        lines: tokens.map(line =>
          line.map((token, index) => (
            <span key={index} style={tokenStyle(token)}>
              {token.content}
            </span>
          )),
        ),
        state: shiki.getLastGrammarState(tokens),
      };
    },
  };
}

const kebabSegment = /-(\w)/g;

function tokenStyle(token: ThemedToken): React.CSSProperties {
  return Object.fromEntries(
    Object.entries(getTokenStyleObject(token)).map(([property, value]) => [
      property.replaceAll(kebabSegment, (_, letter: string) =>
        letter.toUpperCase(),
      ),
      value,
    ]),
  );
}

export async function highlightCode(code: string, language: string) {
  const highlighter = await loadHighlighter(language);

  return highlighter ? highlighter.highlight(code).lines : null;
}
