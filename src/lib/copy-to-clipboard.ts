import { toast } from 'sonner';

import { playSound } from '@/lib/sounds';

export function copyToClipboard(text: string, confirmation: string) {
  return navigator.clipboard.writeText(text).then(
    () => {
      playSound('copied');
      toast.success(confirmation);
    },
    () => toast.error('Couldn’t copy to the clipboard'),
  );
}
