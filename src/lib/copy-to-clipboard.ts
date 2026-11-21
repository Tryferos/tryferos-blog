import { toast } from 'sonner';

import { playCopiedSound } from '@/lib/sounds';

export function copyToClipboard(text: string, confirmation: string) {
  return navigator.clipboard.writeText(text).then(
    () => {
      playCopiedSound();
      toast.success(confirmation);
    },
    () => toast.error('Couldn’t copy to the clipboard'),
  );
}
