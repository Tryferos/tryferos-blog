import { ArticleActions } from './ArticleActions';
import { ArticleLayout } from '../../article.layout';
import { PublishedDate } from '@/components/shared/PublishedDate';
import type { PublishedArticle, Topic } from '@/types/content.types';

type Props = { topic: Topic; article: PublishedArticle };

export function ArticleHeader({ topic, article }: Props) {
  return (
    <ArticleLayout topic={topic} article={article}>
      <p className="text-xl/relaxed text-muted-foreground">
        {article.description}
      </p>
      <ArticleActions prompt={article.prompt} />
      <PublishedDate date={article.publishedAt} className="mt-4 block" />
    </ArticleLayout>
  );
}
