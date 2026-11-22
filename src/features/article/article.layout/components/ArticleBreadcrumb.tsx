import Link from 'next/link';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as topicModel from '@/models/topic.model';
import type { Topic } from '@/types/content.types';

type Props = { topic: Topic };

export function ArticleBreadcrumb({ topic }: Props) {
  return (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild>
            <Link href="/">Articles</Link>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild variant="accent">
            <Link href={topicModel.sectionHref(topic)}>{topic.title}</Link>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  );
}
