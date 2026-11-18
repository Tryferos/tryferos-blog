'use client';

import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  IconLoader2,
} from '@tabler/icons-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

type Props = ToasterProps;

export function Toaster({ ...props }: Props) {
  return (
    <Sonner
      icons={{
        success: <IconCircleCheck className="size-4" />,
        info: <IconInfoCircle className="size-4" />,
        warning: <IconAlertTriangle className="size-4" />,
        error: <IconAlertOctagon className="size-4" />,
        loading: <IconLoader2 className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'rounded-lg! border-border! bg-popover! font-sans! text-popover-foreground!',
        },
      }}
      {...props}
    />
  );
}
