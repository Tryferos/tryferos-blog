import {
  IconArrowDown,
  IconArrowUp,
  IconCornerDownLeft,
} from '@tabler/icons-react';
import { useCommandState } from 'cmdk';

import { Row } from '@/components/shared/Row';
import { Kbd } from '@/components/ui/Kbd';
import { Separator } from '@/components/ui/Separator';

const singleResult = 1;

export function SearchFooter() {
  const count = useCommandState(state => state.filtered.count);
  const isSingleResult = count === singleResult;
  return (
    <div className="shrink-0 max-md:hidden">
      <Separator />
      <div className="bg-muted/50 px-4 py-2.5 text-xs text-muted-foreground">
        <Row align="center" gap="md">
          <Row align="center" gap="xs">
            <Kbd.Group>
              <Kbd>
                <IconArrowUp />
              </Kbd>
              <Kbd>
                <IconArrowDown />
              </Kbd>
            </Kbd.Group>
            to move
          </Row>
          <Row align="center" gap="xs">
            <Kbd>
              <IconCornerDownLeft />
            </Kbd>
            to open
          </Row>
          <span className="ml-auto" aria-live="polite">
            {count} {isSingleResult ? 'article' : 'articles'}
          </span>
        </Row>
      </div>
    </div>
  );
}
