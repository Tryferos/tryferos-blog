import { siteMark } from '@/data/site.config';
import { cn } from '@/lib/utils';

type Props = { className?: string };

export function BrandMark({ className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-8.5 items-center justify-center rounded-lg bg-primary font-header text-lg font-semibold text-primary-foreground',
        className,
      )}
    >
      {siteMark}
    </span>
  );
}
