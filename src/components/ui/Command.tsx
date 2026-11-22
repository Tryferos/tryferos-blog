'use client';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@/lib/utils';

import { Dialog } from '@/components/ui/Dialog';
import { InputGroup } from '@/components/ui/InputGroup';
import { IconCheck, IconSearch } from '@tabler/icons-react';

function CommandRoot({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof CommandPrimitive> & {
  variant?: 'default' | 'bare';
}) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        'flex size-full flex-col overflow-hidden bg-popover text-popover-foreground',
        variant === 'default' && 'rounded-xl! p-1',
        variant === 'bare' && 'min-h-0 flex-1',
        className,
      )}
      {...props}
    />
  );
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = false,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  variant?: 'default' | 'search';
}) {
  return (
    <Dialog {...props}>
      <Dialog.Header className="sr-only">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Content
        className={cn(
          'top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0',
          variant === 'search' &&
            'top-16 flex h-140 max-h-[calc(100dvh-8rem)] flex-col gap-0 sm:max-w-4xl max-md:top-12 max-md:bottom-0 max-md:h-auto max-md:max-h-none max-md:max-w-full max-md:rounded-b-none!',
          className,
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </Dialog.Content>
    </Dialog>
  );
}

function CommandInput({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  variant?: 'default' | 'bare';
}) {
  if (variant === 'bare') {
    return (
      <div
        data-slot="command-input-wrapper"
        className="flex h-14 min-w-0 flex-1 items-center gap-3 px-4"
      >
        <IconSearch className="size-5 shrink-0 text-muted-foreground" />
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            'h-full w-full min-w-0 bg-transparent text-base outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        />
      </div>
    );
  }
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            'w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        />
        <InputGroup.Addon>
          <IconSearch className="size-4 shrink-0 opacity-50" />
        </InputGroup.Addon>
      </InputGroup>
    </div>
  );
}

function CommandList({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List> & {
  variant?: 'default' | 'pane';
}) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        'no-scrollbar overflow-x-hidden overflow-y-auto outline-none',
        variant === 'default' && 'max-h-72 scroll-py-1',
        variant === 'pane' && 'min-w-0 flex-1 scroll-py-2 p-2',
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty> & {
  variant?: 'default' | 'bare';
}) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        'text-center text-sm',
        variant === 'default' && 'py-6',
        variant === 'bare' && 'h-full',
        className,
      )}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn('-mx-1 h-px bg-border', className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  children,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item> & {
  variant?: 'default' | 'card';
}) {
  const isCard = variant === 'card';
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex cursor-default rounded-sm text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        !isCard &&
          'items-center gap-2 px-2 py-1.5 data-selected:bg-muted data-selected:text-foreground data-selected:*:[svg]:text-foreground',
        isCard &&
          'flex-col items-stretch overflow-hidden data-selected:bg-accent data-selected:text-accent-foreground max-md:mb-2.5 max-md:rounded-xl! max-md:border md:px-3 md:py-2.5',
        className,
      )}
      {...props}
    >
      {children}
      {!isCard && (
        <IconCheck className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
      )}
    </CommandPrimitive.Item>
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground',
        className,
      )}
      {...props}
    />
  );
}

export const Command = Object.assign(CommandRoot, {
  Dialog: CommandDialog,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Shortcut: CommandShortcut,
  Separator: CommandSeparator,
});
