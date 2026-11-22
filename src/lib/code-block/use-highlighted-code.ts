import * as React from 'react';

import { loadHighlighter } from '@/lib/code-block/highlighter';

const newline = '\n';

export function useHighlightedCode(value: string, language: string) {
  const code = withoutTrailingNewline(value);
  const [loaded, setLoaded] = React.useState<{
    language: string;
    highlighter: Awaited<ReturnType<typeof loadHighlighter>>;
  } | null>(null);
  const highlighter = loaded?.language === language ? loaded.highlighter : null;

  React.useEffect(() => {
    let cancelled = false;

    loadHighlighter(language)
      .then(next => {
        if (!cancelled) {
          setLoaded({ language, highlighter: next });
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [language]);

  const [completeLines, setCompleteLines] = React.useState<{
    highlighter: typeof highlighter;
    text: string;
    lines: React.ReactNode[];
    state?: Parameters<NonNullable<typeof highlighter>['highlight']>[1];
  }>({ highlighter: null, text: '', lines: [] });

  let next = completeLines;

  if (next.highlighter !== highlighter || !code.startsWith(next.text)) {
    next = { highlighter, text: '', lines: [] };
  }

  const end = code.lastIndexOf(newline) + 1;

  if (highlighter && end > next.text.length) {
    const result = highlighter.highlight(
      code.slice(next.text.length, end - 1),
      next.state,
    );

    next = {
      highlighter,
      text: code.slice(0, end),
      lines: [...next.lines, ...result.lines],
      state: result.state,
    };
  }

  if (next !== completeLines) {
    setCompleteLines(next);
  }

  const lineBeingWritten = code.slice(end);

  return React.useMemo(() => {
    if (!highlighter) {
      return code.split(newline);
    }

    return [
      ...next.lines,
      highlighter.highlight(lineBeingWritten, next.state).lines[0],
    ];
  }, [code, highlighter, next, lineBeingWritten]);
}

function withoutTrailingNewline(value: string) {
  return value.endsWith(newline) ? value.slice(0, -newline.length) : value;
}
