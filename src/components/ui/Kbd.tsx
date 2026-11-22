import { cn } from '@/lib/utils';

function KbdRoot({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'kbd'> & {
  variant?: 'default' | 'inverted' | 'raised';
}) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        variant === 'default' && 'bg-muted text-muted-foreground',
        variant === 'raised' && 'bg-background text-muted-foreground',
        variant === 'inverted' &&
          'bg-primary-foreground/20 text-primary-foreground',
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  );
}

export const Kbd = Object.assign(KbdRoot, {
  Group: KbdGroup,
});
