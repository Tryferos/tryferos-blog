import { playSound } from 'react-sounds';
import { toast } from 'sonner';

export function playCopiedSound() {
  playSound('notification/success').catch(() => null);
}

export function copyToClipboard(text: string, confirmation: string) {
  return navigator.clipboard.writeText(text).then(
    () => {
      playCopiedSound();
      toast.success(confirmation);
    },
    () => toast.error('Couldn’t copy to the clipboard'),
  );
}
