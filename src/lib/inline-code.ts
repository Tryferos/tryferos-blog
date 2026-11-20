const codeSpan = /(`[^`]+`)/;
const backtick = '`';

export function inlineCodeParts(text: string) {
  return text
    .split(codeSpan)
    .filter(Boolean)
    .map(part => {
      const isCode = part.startsWith(backtick) && part.endsWith(backtick);
      return { text: isCode ? part.slice(1, -1) : part, isCode };
    });
}
