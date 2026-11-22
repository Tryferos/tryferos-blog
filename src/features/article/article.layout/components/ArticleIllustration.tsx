'use client';

import { LazyMotion, domAnimation } from 'motion/react';
import * as m from 'motion/react-m';
import Image from 'next/image';
import { useState } from 'react';

import { thumbnailSizes } from '@/data/article-illustration.sizes';
import {
  illustrationHidden,
  illustrationRevealTransition,
  illustrationShown,
} from '@/data/motion.tokens';
import type { Article } from '@/types/content.types';

type Props = { illustration: Article['illustration']; sizes: string };

export function ArticleIllustration({ illustration, sizes }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <Image
        src={illustration.src}
        alt=""
        sizes={thumbnailSizes}
        loading="eager"
        decoding="sync"
        placeholder="blur"
        className="absolute inset-0 size-full scale-110 bg-right! object-cover object-right"
      />
      <m.div
        initial={illustrationHidden}
        animate={isLoaded ? illustrationShown : illustrationHidden}
        transition={illustrationRevealTransition}
        className="relative"
      >
        <Image
          src={illustration.src}
          alt={illustration.alt}
          sizes={sizes}
          loading="eager"
          onLoad={() => {
            setIsLoaded(true);
          }}
          className="aspect-2/1 w-full scale-110 object-cover object-right lg:aspect-3/1"
        />
      </m.div>
    </LazyMotion>
  );
}
