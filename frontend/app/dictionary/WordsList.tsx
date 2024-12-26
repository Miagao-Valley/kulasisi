import getWords from '@/lib/words/getWords';
import getWordRevisions from '@/lib/words/getWordRevisions';
import WordContent from './WordContent';
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

export default async function WordsList({
  searchTerm = '',
  sortOption = 'content',
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;

  const words = await getWords({
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
        {words &&
        words.results &&
        words.results.length > 0 ? (
          words.results.map(async (word) => {
            const revisions = await getWordRevisions(word.id);
            return (
              <li
                className="px-4 py-3 border rounded-lg flex flex-col"
                key={word.id}
              >
                <WordContent
                  word={word}
                  revisions={revisions.results}
                />
                <EntryFooter entry={word} type="words" />
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
        numPages={words?.num_pages || 1}
        currentPage={page}
        next={!!words?.next}
        prev={!!words?.previous}
      />
    </>
  );
}

interface SkeletonProps {
  className?: string;
}

export function WordsListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: 10 }, (_, i) => (
        <li className="skeleton rounded-lg w-full h-24" key={i}></li>
      ))}
    </ul>
  );
}
