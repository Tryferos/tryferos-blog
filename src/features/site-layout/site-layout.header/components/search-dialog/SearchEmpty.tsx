import { IconSearchOff } from '@tabler/icons-react';

import { Row } from '@/components/shared/Row';
import { Button } from '@/components/ui/Button';
import { Empty } from '@/components/ui/Empty';

type Props = {
  search: string;
  topics: string[];
  onTopicPick: (topic: string) => void;
};

export function SearchEmpty({ search, topics, onTopicPick }: Props) {
  return (
    <Empty className="h-full">
      <Empty.Header>
        <Empty.Media variant="tile">
          <IconSearchOff />
        </Empty.Media>
        <Empty.Title>No articles match “{search.trim()}”</Empty.Title>
        <Empty.Description>
          Try a shorter word, or start from one of the topics below.
        </Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <Row asChild wrap justify="center" gap="sm" className="max-w-xl">
          <ul>
            {topics.map(topic => (
              <li key={topic}>
                <Button
                  variant="outline"
                  size="chip"
                  onClick={() => {
                    onTopicPick(topic);
                  }}
                >
                  {topic}
                </Button>
              </li>
            ))}
          </ul>
        </Row>
      </Empty.Content>
    </Empty>
  );
}
