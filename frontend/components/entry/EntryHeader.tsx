import { naturalTime } from '@/lib/utils/naturalTime';
import { Phrase, Translation } from '@/types/phrases';
import { Word, Definition } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import { LangHoverCard } from '../cards/LangCard';
import { UserHoverCard } from '../cards/UserCard';

interface Props {
  entry: Phrase | Translation | Word | Definition;
  className?: string;
}

export function EntryHeader({ entry, className = '' }: Props) {
  return (
    <div className={cn(className, 'flex flex-row gap-1 items-center text-sm')}>
      <LangHoverCard code={entry.lang} />
      •
      <UserHoverCard username={entry.contributor} />•
      <span className="text-sm text-muted-foreground truncate">
        {naturalTime(entry.updated_at)}
      </span>
    </div>
  );
}
