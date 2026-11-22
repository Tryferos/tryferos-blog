import type { ReactNode } from 'react';

import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/site-header/SiteHeader';

type Props = { children: ReactNode };

export function SiteLayout({ children }: Props) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
