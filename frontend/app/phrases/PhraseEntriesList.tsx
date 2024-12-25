import getPhraseEntries from '@/lib/phraseEntries/getPhraseEntries';
import getPhraseEntryRevisions from '@/lib/phraseEntries/getPhraseEntryRevisions';
import PhraseEntryContent from './PhraseEntryContent';
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

export default async function PhraseEntriesList({
  searchTerm = '',
  sortOption = 'content',
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;

  const phraseEntries = await getPhraseEntries({
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
        {phraseEntries &&
        phraseEntries.results &&
        phraseEntries.results.length > 0 ? (
          phraseEntries.results.map(async (phraseEntry) => {
            const revisions = await getPhraseEntryRevisions(phraseEntry.id);
            return (
              <li
                className="px-4 py-3 border rounded-lg flex flex-col"
                key={phraseEntry.id}
              >
                <PhraseEntryContent
                  phraseEntry={phraseEntry}
                  revisions={revisions.results}
                />
                <EntryFooter entry={phraseEntry} type="phrase-entries" />
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
        numPages={phraseEntries?.num_pages || 1}
        currentPage={page}
        next={!!phraseEntries?.next}
        prev={!!phraseEntries?.previous}
      />
    </>
  );
}

interface SkeletonProps {
  className?: string;
}

export function PhraseEntriesListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: 10 }, (_, i) => (
        <li className="skeleton rounded-lg w-full h-24" key={i}></li>
      ))}
    </ul>
  );
}
