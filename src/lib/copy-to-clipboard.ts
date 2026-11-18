import { toast } from 'sonner';

export function copyToClipboard(text: string, confirmation: string) {
  return navigator.clipboard.writeText(text).then(
    () => toast.success(confirmation),
    () => toast.error('Couldn’t copy to the clipboard'),
  );
}
