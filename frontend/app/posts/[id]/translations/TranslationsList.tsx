import React from 'react';
import { TranslationsContent } from './TranslationContent';
import getTranslations from '@/lib/translations/getTranslations';
import getTranslationRevisions from '@/lib/translations/getTranslationRevisions';
import PostFooter from '../../PostFooter';
import Pagination from '@/app/components/Pagination';
import { Filter } from '@/app/components/FilterMenu';

interface Props {
  textEntryId?: number;
  searchTerm?: string;
  sortOption?: string;
  isDescending?: boolean;
  filters?: Filter;
  page?: number;
  className?: string;
}

export default async function TranslationsList({
  textEntryId,
  searchTerm = '',
  sortOption = 'content',
  isDescending = false,
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;
  const translations = await getTranslations(
    {
      search: searchTerm,
      ordering: isDescending ? `-${sortOption}` : sortOption,
      lang__code: filters?.lang || '',
      author__username: filters?.author || '',
      limit: limit,
      offset: limit * (page - 1),
    },
    textEntryId,
  );

  return (
    <>
      <ul className={`flex flex-col gap-3 ${className}`}>
        {translations &&
        translations.results &&
        translations.results.length > 0 ? (
          translations.results.map(async (translation) => {
            const revisions = await getTranslationRevisions(translation.id);
            return (
              <li
                className="px-4 py-3 border rounded-lg flex flex-col"
                key={translation.id}
              >
                <div id={`translation-${translation.id}`}>
                  <TranslationsContent
                    translation={translation}
                    revisions={revisions.results}
                  />
                  <PostFooter entry={translation} type="translations" />
                </div>
              </li>
            );
          })
        ) : (
          <li className="w-full col-span-full p-3 text-center">
            <div>No translations found</div>
          </li>
        )}
      </ul>
      <Pagination
        className="my-5 flex justify-center"
        numPages={translations?.num_pages || 1}
        currentPage={page}
        next={!!translations?.next}
        prev={!!translations?.previous}
      />
    </>
  );
}

interface SkeletonProps {
  className?: string;
}

export function TranslationsListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: 10 }, (_, i) => (
        <li className="skeleton rounded-lg w-full h-24" key={i}></li>
      ))}
    </ul>
  );
}
