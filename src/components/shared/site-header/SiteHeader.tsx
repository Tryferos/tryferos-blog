import Link from 'next/link';

import { ArticleSearch } from './ArticleSearch';
import { ThemeToggle } from './ThemeToggle';
import { BrandMark } from '@/components/shared/BrandMark';
import { Row } from '@/components/shared/Row';
import { topics } from '@/data/topics/content.topics';
import { siteHandle } from '@/data/site.config';
import * as topicModel from '@/models/topic.model';

export function SiteHeader() {
  return (
    <header className="border-b">
      <Row
        asChild
        align="center"
        gap="lg"
        className="mx-auto h-18 w-full max-w-page"
      >
        <div className="px-6">
          <Row asChild align="center" gap="sm" className="shrink-0">
            <Link href="/">
              <BrandMark />
              <span className="font-header text-lg font-semibold tracking-tight">
                {siteHandle}
              </span>
            </Link>
          </Row>
          <ArticleSearch groups={topics.map(topicModel.searchGroup)} />
          <ThemeToggle />
        </div>
      </Row>
    </header>
  );
}
