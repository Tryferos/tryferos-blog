import Link from 'next/link';

import { ArticleSearch } from './ArticleSearch';
import { ThemeToggle } from './ThemeToggle';
import { BrandMark } from '@/components/shared/BrandMark';
import { topics } from '@/data/content.topics';
import { siteHandle } from '@/data/site.config';
import * as topicModel from '@/models/topic.model';

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-18 w-full max-w-page items-center gap-6 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <BrandMark />
          <span className="font-header text-lg font-semibold tracking-tight">
            {siteHandle}
          </span>
        </Link>
        <ArticleSearch groups={topics.map(topicModel.searchGroup)} />
        <ThemeToggle />
      </div>
    </header>
  );
}
