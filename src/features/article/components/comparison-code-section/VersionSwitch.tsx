'use client';

import { LazyMotion, domAnimation } from 'motion/react';
import * as m from 'motion/react-m';
import { type ReactNode, useState } from 'react';

import { Separator } from '@/components/ui/Separator';
import { ToggleGroup } from '@/components/ui/ToggleGroup';
import {
  codeVersionHidden,
  codeVersionShown,
  codeVersionSwitchSeconds,
} from '@/data/motion.tokens';

const versions = { before: 'before', after: 'after' } as const;

type Version = (typeof versions)[keyof typeof versions];

type Props = { caption: ReactNode; before: ReactNode; after: ReactNode };

export function VersionSwitch({ caption, before, after }: Props) {
  const [shownVersion, setShownVersion] = useState<Version>(versions.before);
  const isBeforeShown = shownVersion === versions.before;

  return (
    <LazyMotion features={domAnimation} strict>
      <figcaption className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
        {caption}
        <ToggleGroup
          type="single"
          size="sm"
          spacing={1}
          value={shownVersion}
          onValueChange={value => {
            if (isVersion(value)) setShownVersion(value);
          }}
          aria-label="Show the code before or after the change"
          className="ms-auto"
        >
          <ToggleGroup.Item value={versions.before}>Before</ToggleGroup.Item>
          <ToggleGroup.Item value={versions.after}>After</ToggleGroup.Item>
        </ToggleGroup>
      </figcaption>
      <Separator />
      <div className="grid">
        <VersionPane isShown={isBeforeShown}>{before}</VersionPane>
        <VersionPane isShown={!isBeforeShown}>{after}</VersionPane>
      </div>
    </LazyMotion>
  );
}

function isVersion(value: string): value is Version {
  return value === versions.before || value === versions.after;
}

type VersionPaneProps = { isShown: boolean; children: ReactNode };

function VersionPane({ isShown, children }: VersionPaneProps) {
  return (
    <m.div
      initial={false}
      animate={isShown ? codeVersionShown : codeVersionHidden}
      transition={{ duration: codeVersionSwitchSeconds }}
      inert={!isShown}
      aria-hidden={!isShown}
      className="col-start-1 row-start-1 grid"
    >
      {children}
    </m.div>
  );
}
