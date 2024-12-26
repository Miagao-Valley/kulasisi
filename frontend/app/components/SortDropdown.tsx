'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';

export interface SortOption {
  label: string;
  value: string;
}

interface Props {
  currentSortOption: string;
  sortingOptions: SortOption[];
  className?: string;
}

export default function SortDropdown({
  currentSortOption,
  sortingOptions,
  className,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortOption, setSortOption] = useState(currentSortOption);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );
    if (sortOption) {
      currentSearchParams.set('sort', sortOption);
    } else {
      currentSearchParams.delete('sort');
    }
    router.push(`?${currentSearchParams.toString()}`);
  }, [sortOption, searchParams, router]);

  const toggleSort = () => {
    setSortOption(
      (prev) => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`), // Toggle the sort order
    );
  };

  return (
    <div className={`dropdown dropdown-hover dropdown-end ${className}`}>
      <div tabIndex={0} role="button" className="btn btn-outline btn-sm">
        <span onClick={toggleSort}>
          {sortOption.startsWith('-') ? (
            <FaSortAmountDown />
          ) : (
            <FaSortAmountUp />
          )}
        </span>
        Sort:{' '}
        {sortingOptions.find(
          (option) =>
            option.value.replace(/^-/g, '') === sortOption.replace(/^-/g, ''),
        )?.label || 'None'}
      </div>
      <div className="dropdown-content w-fit p-4 rounded-box bg-base-100 shadow">
        {sortingOptions.map(({ label, value }) => (
          <label className="label cursor-pointer" key={value}>
            <span className="label-text text-nowrap">{label}</span>
            <input
              className="radio radio-sm ms-2"
              type="radio"
              name="sort"
              checked={sortOption === value}
              onChange={() => setSortOption(value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
