import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Kbd } from '@/components/ui/Kbd';

export function SearchClose() {
  return (
    <Dialog.Close asChild>
      <Button variant="ghost" size="lg" aria-label="Close search">
        <Kbd className="max-md:hidden">Esc</Kbd>
        <span className="text-base font-medium text-link md:hidden">
          Cancel
        </span>
      </Button>
    </Dialog.Close>
  );
}
