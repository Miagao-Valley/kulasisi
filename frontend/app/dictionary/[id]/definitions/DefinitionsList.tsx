import React from 'react';
import { DefinitionsContent } from './DefinitionContent';
import getDefinitions from '@/lib/definitions/getDefinitions';
import getDefinitionRevisions from '@/lib/definitions/getDefinitionRevisions';
import EntryFooter from '../../../components/EntryFooter';
import Pagination from '@/app/components/Pagination';
import { Filter } from '@/app/components/FilterMenu';

interface Props {
  dictEntryId?: number;
  searchTerm?: string;
  sortOption?: string;
  isDescending?: boolean;
  filters?: Filter;
  page?: number;
  className?: string;
}

export default async function DefinitionsList({
  dictEntryId,
  searchTerm = '',
  sortOption = 'content',
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;
  const definitions = await getDefinitions(
    {
      search: searchTerm,
      ordering: sortOption,
      lang__code: filters?.lang || '',
      contributor__username: filters?.contributor || '',
      limit: limit,
      offset: limit * (page - 1),
    },
    dictEntryId,
  );

  return (
    <>
      <ul className={`flex flex-col gap-3 ${className}`}>
        {definitions &&
        definitions.results &&
        definitions.results.length > 0 ? (
          definitions.results.map(async (definition) => {
            const revisions = await getDefinitionRevisions(definition.id);
            return (
              <li
                className="px-4 py-3 border rounded-lg flex flex-col"
                key={definition.id}
              >
                <div id={`definition-${definition.id}`}>
                  <DefinitionsContent
                    definition={definition}
                    revisions={revisions.results}
                  />
                  <EntryFooter entry={definition} type="definitions" />
                </div>
              </li>
            );
          })
        ) : (
          <li className="w-full col-span-full p-3 text-center">
            <div>No definitions found</div>
          </li>
        )}
      </ul>
      <Pagination
        className="my-5 flex justify-center"
        numPages={definitions?.num_pages || 1}
        currentPage={page}
        next={!!definitions?.next}
        prev={!!definitions?.previous}
      />
    </>
  );
}

interface SkeletonProps {
  className?: string;
}

export function DefinitionsListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: 10 }, (_, i) => (
        <li className="skeleton rounded-lg w-full h-24" key={i}></li>
      ))}
    </ul>
  );
}
