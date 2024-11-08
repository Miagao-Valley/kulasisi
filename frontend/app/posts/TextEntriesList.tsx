'use client';

import { useRouter } from 'next/navigation';
import { TextEntry, PaginationDetails } from '@/types';
import TextEntryFooter from './TextEntryFooter';
import TextEntryContent from './TextEntryContent';

interface Props {
  textEntries?: PaginationDetails & { results: TextEntry[] };
  className?: string;
}

export default function TextEntriesList({
  textEntries,
  className = '',
}: Props) {
  const router = useRouter();

  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {textEntries && textEntries.results && textEntries.results.length > 0 ? (
        textEntries.results.map((textEntry) => (
          <li
            className="px-4 py-3 border rounded-lg flex flex-col hover:cursor-pointer"
            key={textEntry.id}
            onClick={() => router.push(`/posts/${textEntry.id}`)}
          >
            <TextEntryContent textEntry={textEntry} />
            <TextEntryFooter textEntry={textEntry} />
          </li>
        ))
      ) : (
        <li className="w-full col-span-full p-3 text-center">
          <div>No posts found</div>
        </li>
      )}
    </ul>
  );
}

interface SkeletonProps {
  className?: string;
}

export function TextEntriesListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: 10 }, (_, i) => (
        <li className="skeleton rounded-lg w-full h-24" key={i}></li>
      ))}
    </ul>
  );
}
