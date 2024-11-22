import getTextEntries from '@/lib/textEntries/getTextEntries';
import getTextEntryRevisions from '@/lib/textEntries/getTextEntryRevisions';
import TextEntryContent from './TextEntryContent';
import PostFooter from './PostFooter';
import Pagination from '../components/Pagination';
import { Filter } from '../components/FilterMenu';

interface Props {
  searchTerm?: string;
  sortOption?: string;
  isDescending?: boolean;
  filters?: Filter;
  page?: number;
  className?: string;
}

export default async function TextEntriesList({
  searchTerm = '',
  sortOption = 'content',
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;

  const textEntries = await getTextEntries({
    search: searchTerm,
    ordering: sortOption,
    lang__code: filters?.lang || '',
    author__username: filters?.author || '',
    limit: limit,
    offset: limit * (page - 1),
  });

  return (
    <>
      <ul className={`flex flex-col gap-3 ${className}`}>
        {textEntries &&
        textEntries.results &&
        textEntries.results.length > 0 ? (
          textEntries.results.map(async (textEntry) => {
            const revisions = await getTextEntryRevisions(textEntry.id);
            return (
              <li
                className="px-4 py-3 border rounded-lg flex flex-col"
                key={textEntry.id}
              >
                <TextEntryContent
                  textEntry={textEntry}
                  revisions={revisions.results}
                />
                <PostFooter entry={textEntry} type="text-entries" />
              </li>
            );
          })
        ) : (
          <li className="w-full col-span-full p-3 text-center">
            <div>No posts found</div>
          </li>
        )}
      </ul>
      <Pagination
        className="my-5 flex justify-center"
        numPages={textEntries?.num_pages || 1}
        currentPage={page}
        next={!!textEntries?.next}
        prev={!!textEntries?.previous}
      />
    </>
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
