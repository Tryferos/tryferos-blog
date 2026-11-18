import Link from 'next/link';
import type { ReactNode } from 'react';

import { BrandMark } from '@/components/shared/BrandMark';
import { Column } from '@/components/shared/Column';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Row } from '@/components/shared/Row';
import { topics } from '@/data/content.topics';
import { socialLinks } from '@/data/footer.links';
import {
  siteDescription,
  siteHandle,
  siteName,
  siteSection,
  siteSourceUrl,
} from '@/data/site.config';
import * as topicModel from '@/models/topic.model';

const footerLinkClass =
  'text-secondary-foreground underline-offset-4 hover:text-foreground hover:underline';

export function SiteFooter() {
  return (
    <footer className="border-t bg-sidebar">
      <div className="mx-auto w-full max-w-page px-6 pt-14 pb-8">
        <Row wrap gap="xl">
          <FooterBrand />
          <FooterNav id="footer-series" title="Series">
            {topics.map(topic => (
              <li key={topic.slug}>
                <Link
                  href={topicModel.sectionHref(topic)}
                  className={footerLinkClass}
                >
                  {topic.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/" className={footerLinkClass}>
                All articles
              </Link>
            </li>
          </FooterNav>
          <FooterNav id="footer-project" title="Project">
            <li>
              <a href={siteSourceUrl} className={footerLinkClass}>
                Source on GitHub
              </a>
            </li>
          </FooterNav>
        </Row>
        <FooterBottomBar />
      </div>
    </footer>
  );
}

function FooterBrand() {
  return (
    <Column gap="md" className="flex-2 basis-70">
      <Row asChild align="center" gap="sm" className="w-fit">
        <Link href="/">
          <BrandMark className="size-7 rounded-md text-base" />
          <span className="font-header font-semibold">
            {siteHandle}
            <span className="font-medium text-muted-foreground">
              {' '}
              / {siteSection}
            </span>
          </span>
        </Link>
      </Row>
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
        {siteDescription}
      </p>
      <SocialLinks />
    </Column>
  );
}

function SocialLinks() {
  return (
    <Row asChild gap="xs" className="-ml-2.5">
      <ul>
        {socialLinks.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              aria-label={link.label}
              className="flex size-11 items-center justify-center rounded-lg text-secondary-foreground hover:bg-accent hover:text-foreground"
            >
              <link.icon aria-hidden className="size-5" />
            </a>
          </li>
        ))}
      </ul>
    </Row>
  );
}

type FooterNavProps = { id: string; title: string; children: ReactNode };

function FooterNav({ id, title, children }: FooterNavProps) {
  return (
    <nav aria-labelledby={id} className="flex-1 basis-50">
      <Eyebrow id={id} className="mb-3.5">
        {title}
      </Eyebrow>
      <Column asChild gap="sm">
        <ul className="text-sm">{children}</ul>
      </Column>
    </nav>
  );
}

function FooterBottomBar() {
  return (
    <Row wrap justify="between" gap="md" asChild className="mt-12">
      <div className="border-t pt-5 text-sm text-muted-foreground">
        <span>© {siteName}</span>
        <a
          href="#top"
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          Back to top
        </a>
      </div>
    </Row>
  );
}
