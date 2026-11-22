import type {
  ArticleModule,
  PublishedArticle,
  Topic,
} from '@/types/content.types';

import { ArticleCodeBlock } from './components/ArticleCodeBlock';
import { ComparisonCodeSection } from './components/comparison-code-section/ComparisonCodeSection';
import { IntendedAudience } from './components/IntendedAudience';
import { SectionHeading } from './components/SectionHeading';
import { SeriesNavigation } from './components/SeriesNavigation';

type Props = {
  topic: Topic;
  article: PublishedArticle;
  Content: ArticleModule['default'];
};

const articleComponents = {
  h2: SectionHeading,
  pre: ArticleCodeBlock,
  IntendedAudience,
  ComparisonCodeSection,
};

export function ArticleBody({ topic, article, Content }: Props) {
  return (
    <div className="min-w-0 max-w-article flex-1">
      <article className="text-body text-prose">
        <Content components={articleComponents} />
      </article>
      <SeriesNavigation topic={topic} article={article} />
    </div>
  );
}
