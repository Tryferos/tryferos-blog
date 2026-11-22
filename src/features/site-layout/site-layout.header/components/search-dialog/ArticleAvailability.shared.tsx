import { PublishedDate } from '@/components/shared/PublishedDate';
import { Badge } from '@/components/ui/Badge';

type Props = { publishedAt?: string; className?: string };

export function ArticleAvailability({ publishedAt, className }: Props) {
  if (publishedAt) {
    return <PublishedDate date={publishedAt} className={className} />;
  }
  return (
    <Badge variant="secondary" className={className}>
      Coming soon
    </Badge>
  );
}
