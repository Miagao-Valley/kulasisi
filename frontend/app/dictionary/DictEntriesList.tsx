import getDictEntries from '@/lib/dictEntries/getDictEntries';
import getDictEntryRevisions from '@/lib/dictEntries/getDictEntryRevisions';
import DictEntryContent from './DictEntryContent';
import EntryFooter from '../components/EntryFooter';
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

export default async function DictEntriesList({
  searchTerm = '',
  sortOption = 'content',
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;

  const dictEntries = await getDictEntries({
    search: searchTerm,
    ordering: sortOption,
    lang__code: filters?.lang || '',
    contributor__username: filters?.contributor || '',
    limit: limit,
    offset: limit * (page - 1),
  });

  return (
    <>
      <ul className={`flex flex-col gap-3 ${className}`}>
        {dictEntries &&
        dictEntries.results &&
        dictEntries.results.length > 0 ? (
          dictEntries.results.map(async (dictEntry) => {
            const revisions = await getDictEntryRevisions(dictEntry.id);
            return (
              <li
                className="px-4 py-3 border rounded-lg flex flex-col"
                key={dictEntry.id}
              >
                <DictEntryContent
                  dictEntry={dictEntry}
                  revisions={revisions.results}
                />
                <EntryFooter entry={dictEntry} type="dict-entries" />
              </li>
            );
          })
        ) : (
          <li className="w-full col-span-full p-3 text-center">
            <div>No entries found</div>
          </li>
        )}
      </ul>
      <Pagination
        className="my-5 flex justify-center"
        numPages={dictEntries?.num_pages || 1}
        currentPage={page}
        next={!!dictEntries?.next}
        prev={!!dictEntries?.previous}
      />
    </>
  );
}

interface SkeletonProps {
  className?: string;
}

export function DictEntriesListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: 10 }, (_, i) => (
        <li className="skeleton rounded-lg w-full h-24" key={i}></li>
      ))}
    </ul>
  );
}
