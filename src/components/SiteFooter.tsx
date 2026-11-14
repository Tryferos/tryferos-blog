import Link from 'next/link';

import { BrandMark } from '@/components/BrandMark';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
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
        <div className="flex flex-wrap gap-x-16 gap-y-10">
          <div className="flex flex-2 basis-70 flex-col gap-3.5">
            <Link href="/" className="flex w-fit items-center gap-2.5">
              <BrandMark className="size-7 rounded-md text-base" />
              <span className="font-header font-semibold">
                {siteHandle}
                <span className="font-medium text-muted-foreground">
                  {' '}
                  / {siteSection}
                </span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteDescription}
            </p>
            <ul className="-ml-2.5 flex gap-1.5">
              {socialLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    className="flex size-11 items-center justify-center rounded-lg text-secondary-foreground hover:bg-accent hover:text-foreground"
                  >
                    <Icon name={link.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-labelledby="footer-series" className="flex-1 basis-50">
            <Eyebrow id="footer-series" className="mb-3.5">
              Series
            </Eyebrow>
            <ul className="flex flex-col gap-2.5 text-sm">
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
            </ul>
          </nav>
          <nav aria-labelledby="footer-project" className="flex-1 basis-50">
            <Eyebrow id="footer-project" className="mb-3.5">
              Project
            </Eyebrow>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a href={siteSourceUrl} className={footerLinkClass}>
                  Source on GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t pt-5 text-sm text-muted-foreground">
          <span>© {siteName}</span>
          <a
            href="#top"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
