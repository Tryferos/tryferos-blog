import { formatDate } from '@/lib/format-date';
import { cn } from '@/lib/utils';

type Props = { date: string; className?: string };

export function PublishedDate({ date, className }: Props) {
  return (
    <time
      dateTime={date}
      className={cn('text-sm text-muted-foreground', className)}
    >
      {formatDate(date)}
    </time>
  );
}
