import Link from 'next/link';
import { TextEntry, PaginationDetails } from '@/types';
import TextEntryFooter from './TextEntryFooter';

interface Props {
  textEntries: (PaginationDetails & { results: TextEntry[] }) | undefined;
  className?: string;
}

export default function TextEntriesList({
  textEntries,
  className = '',
}: Props) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {textEntries?.results?.map((textEntry) => {
        return (
          <li
            className="px-4 py-3 border rounded-lg flex flex-col"
            key={textEntry.id}
          >
            <Link href={`/posts/${textEntry.id}/`}>
              <p className="mb-2 hover:text-primary">{textEntry.content}</p>
            </Link>
            <TextEntryFooter textEntry={textEntry} />
          </li>
        );
      })}
    </ul>
  );
}

interface SkeletonProps {
  className?: string;
}

export function TextEntriesListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: 10 }, (_, i) => i).map((i) => {
        return <li className="skeleton rounded-lg w-full h-24" key={i}></li>;
      })}
    </ul>
  );
}
