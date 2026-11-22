import { IconCornerDownLeft } from '@tabler/icons-react';
import { useCommandState } from 'cmdk';
import Image from 'next/image';
import Link from 'next/link';

import { Column } from '@/components/shared/Column';
import { Row } from '@/components/shared/Row';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Kbd } from '@/components/ui/Kbd';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Separator } from '@/components/ui/Separator';
import type { SearchGroup } from '@/types/content.types';

import { ArticleAvailability } from './ArticleAvailability.shared';

type Props = { groups: SearchGroup[] };

export function SearchPreview({ groups }: Props) {
  const activeHref = useCommandState(state => state.value);
  const hasResults = useCommandState(state => state.filtered.count > 0);
  const group = groups.find(candidate =>
    candidate.links.some(link => link.href === activeHref),
  );
  const link = group?.links.find(candidate => candidate.href === activeHref);
  if (!hasResults || !group || !link) return null;

  return (
    <>
      <Separator orientation="vertical" className="max-md:hidden" />
      <div className="flex min-w-0 flex-1 bg-muted/50 max-md:hidden">
        <ScrollArea className="min-h-0 flex-1">
          <div className="p-5">
            <Column gap="md">
              <Image
                src={link.illustration.src}
                alt={link.illustration.alt}
                sizes="28rem"
                className="h-auto w-full rounded-xl"
              />
              <Column gap="xs">
                <span className="text-xs font-semibold tracking-widest text-link uppercase">
                  {group.title}
                </span>
                <h2 className="text-xl font-semibold">{link.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {link.description}
                </p>
              </Column>
              <Row align="center" justify="between" gap="md">
                <ArticleAvailability publishedAt={link.publishedAt} />
                <Dialog.Close asChild>
                  <Button asChild size="lg">
                    <Link href={link.href}>
                      Open article
                      <Kbd variant="inverted">
                        <IconCornerDownLeft />
                      </Kbd>
                    </Link>
                  </Button>
                </Dialog.Close>
              </Row>
            </Column>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
