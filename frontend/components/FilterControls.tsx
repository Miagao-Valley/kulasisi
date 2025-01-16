import React from 'react';
import SearchInput from './SearchInput';
import SortDropdown, { SortOption } from './SortDropdown';
import FilterMenu, { Filter, FilterOption } from './FilterMenu';
import { cn } from '@/lib/utils';

interface Props {
  searchTerm?: string;
  sortOption?: string;
  sortingOptions?: SortOption[];
  filters?: Filter;
  filterOptions?: FilterOption[];
  className?: string;
}

export default function FilterControls({
  searchTerm,
  sortOption,
  sortingOptions,
  filters,
  filterOptions,
  className,
}: Props) {
  return (
    <div className={cn(className, 'w-full flex flex-row gap-2 items-center')}>
      {searchTerm !== undefined && (
        <SearchInput
          currentSearchTerm={searchTerm}
          className="me-auto max-w-64"
        />
      )}
      <div className="flex gap-2 items-center">
        {sortOption !== undefined && sortingOptions && (
          <SortDropdown
            currentSortOption={sortOption}
            sortingOptions={sortingOptions}
          />
        )}
        {filters !== undefined && filterOptions && (
          <FilterMenu currentFilters={filters} filterOptions={filterOptions} />
        )}
      </div>
    </div>
  );
}
