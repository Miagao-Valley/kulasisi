import { Phrase, Translation } from '@/types/phrases';
import { Word, Definition } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import VoteActions from './VoteActions';
import ShareButton from './ShareButton';
import CopyEntry from './CopyEntry';

interface Props {
  entry: Phrase | Translation | Word | Definition;
  className?: string;
}

export default function EntryFooter({ entry, className = '' }: Props) {
  return (
    <div className={cn(className, 'flex flex-row gap-1 items-center text-sm')}>
      <VoteActions entry={entry} />
      <ShareButton entry={entry} />
      <CopyEntry entry={entry} />
    </div>
  );
}
