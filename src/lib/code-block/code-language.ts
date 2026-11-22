import { Children, isValidElement, type ReactNode } from 'react';

const languagePrefix = 'language-';
const plainText = 'text';

export function codeLanguage(node: ReactNode) {
  const [code] = Children.toArray(node);
  if (!isValidElement<{ className?: string }>(code)) return plainText;

  const languageClass = code.props.className
    ?.split(' ')
    .find(name => name.startsWith(languagePrefix));

  return languageClass?.slice(languagePrefix.length) ?? plainText;
}
