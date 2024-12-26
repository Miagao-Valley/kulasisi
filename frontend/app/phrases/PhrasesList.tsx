import getPhrases from '@/lib/phrases/getPhrases';
import getPhraseRevisions from '@/lib/phrases/getPhraseRevisions';
import PhraseContent from './PhraseContent';
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

export default async function PhrasesList({
  searchTerm = '',
  sortOption = 'content',
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;

  const phrases = await getPhrases({
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
        {phrases && phrases.results && phrases.results.length > 0 ? (
          phrases.results.map(async (phrase) => {
            const revisions = await getPhraseRevisions(phrase.id);
            return (
              <li
                className="px-4 py-3 border rounded-lg flex flex-col"
                key={phrase.id}
              >
                <PhraseContent phrase={phrase} revisions={revisions.results} />
                <EntryFooter entry={phrase} type="phrases" />
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
        numPages={phrases?.num_pages || 1}
        currentPage={page}
        next={!!phrases?.next}
        prev={!!phrases?.previous}
      />
    </>
  );
}

interface SkeletonProps {
  className?: string;
}

export function PhrasesListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: 10 }, (_, i) => (
        <li className="skeleton rounded-lg w-full h-24" key={i}></li>
      ))}
    </ul>
  );
}
