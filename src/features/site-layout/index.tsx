import type { ReactNode } from 'react';

import { SiteLayoutFooter } from './site-layout.footer';
import { SiteLayoutHeader } from './site-layout.header';

type Props = { children: ReactNode };

export function SiteLayout({ children }: Props) {
  return (
    <>
      <SiteLayoutHeader />
      {children}
      <SiteLayoutFooter />
    </>
  );
}
