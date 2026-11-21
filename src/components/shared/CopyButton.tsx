'use client';

import { IconCheck, IconCopy } from '@tabler/icons-react';
import { AnimatePresence, LazyMotion, domAnimation } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import {
  copiedConfirmationMilliseconds,
  copyIconHidden,
  copyIconShown,
  copyIconTransition,
} from '@/data/motion.tokens';
import { playCopiedSound } from '@/lib/sounds';

type Props = { value: string };

export function CopyButton({ value }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      clearTimeout(resetTimeout.current);
    },
    [],
  );

  const copy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setIsCopied(true);
        playCopiedSound();
        clearTimeout(resetTimeout.current);
        resetTimeout.current = setTimeout(() => {
          setIsCopied(false);
        }, copiedConfirmationMilliseconds);
      })
      .catch(() => toast.error('Couldn’t copy to the clipboard'));
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <Button
        variant="plain"
        size="icon-xs"
        aria-label={isCopied ? 'Copied' : 'Copy'}
        onClick={copy}
      >
        <span className="grid *:col-start-1 *:row-start-1">
          <AnimatePresence initial={false}>
            <m.span
              key={isCopied ? 'copied' : 'copy'}
              initial={copyIconHidden}
              animate={copyIconShown}
              exit={copyIconHidden}
              transition={copyIconTransition}
            >
              {isCopied ? <IconCheck /> : <IconCopy />}
            </m.span>
          </AnimatePresence>
        </span>
      </Button>
      <span aria-live="polite" className="sr-only">
        {isCopied ? 'Copied' : ''}
      </span>
    </LazyMotion>
  );
}
