import { IconArrowLeft } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { ArticleBreadcrumb } from '@/components/shared/ArticleBreadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import * as topicModel from '@/models/topic.model';
import type { Topic, UpcomingArticle } from '@/types/content.types';

type Props = { topic: Topic; article: UpcomingArticle };

export function ComingSoonScreen({ topic, article }: Props) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 pt-14 pb-24">
      <ArticleBreadcrumb topic={topic} />
      <Image
        src={article.illustration.src}
        alt={article.illustration.alt}
        sizes="(max-width: 816px) calc(100vw - 3rem), 768px"
        loading="eager"
        className="mt-6 h-auto w-full rounded-lg"
      />
      <Badge variant="secondary" className="mt-6">
        Coming soon
      </Badge>
      <h1 className="mt-3 text-4xl/tight font-semibold text-balance sm:text-5xl/tight">
        {article.title}
      </h1>
      <p className="mt-4.5 text-xl/relaxed text-muted-foreground">
        {article.description}
      </p>
      <p className="mt-6 text-body text-prose">
        This article is still being written. Check back soon, or read one that
        is already out.
      </p>
      <Button asChild variant="outline" size="lg" className="mt-8">
        <Link href={topicModel.sectionHref(topic)}>
          <IconArrowLeft />
          Back to all articles
        </Link>
      </Button>
    </main>
  );
}
