import { IconCheck, IconX } from '@tabler/icons-react';
import type { ReactNode } from 'react';

import { InlineCode } from '@/components/shared/InlineCode';
import { Row } from '@/components/shared/Row';
import { Table } from '@/components/ui/Table';
import { inlineCodeParts } from '@/lib/inline-code';
import { cn } from '@/lib/utils';
import type { ComparisonChange } from '@/types/content.types';

type Props = { changes: ComparisonChange[] };

export function ChangeTable({ changes }: Props) {
  return (
    <Table columns="divided" className="table-fixed">
      <Table.Header>
        <Table.Row>
          <Table.Head scope="col">
            <span className="text-xs font-semibold tracking-widest text-before uppercase">
              Before
            </span>
          </Table.Head>
          <Table.Head scope="col">
            <span className="text-xs font-semibold tracking-widest text-after uppercase">
              After
            </span>
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {changes.map(change => (
          <Table.Row key={change.before}>
            <Table.Cell className="align-top">
              <ChangeCell
                icon={
                  <IconX
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-before"
                  />
                }
                textClassName="text-muted-foreground"
              >
                {change.before}
              </ChangeCell>
            </Table.Cell>
            <Table.Cell className="align-top">
              <ChangeCell
                icon={
                  <IconCheck
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-after"
                  />
                }
                textClassName="text-foreground"
              >
                {change.after}
              </ChangeCell>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

type ChangeCellProps = {
  icon: ReactNode;
  textClassName: string;
  children: string;
};

function ChangeCell({ icon, textClassName, children }: ChangeCellProps) {
  return (
    <Row align="start" gap="sm">
      {icon}
      <span
        className={cn(
          'min-w-0 text-base/relaxed whitespace-normal',
          textClassName,
        )}
      >
        {inlineCodeParts(children).map((part, index) =>
          part.isCode ? (
            <InlineCode key={index}>{part.text}</InlineCode>
          ) : (
            part.text
          ),
        )}
      </span>
    </Row>
  );
}
