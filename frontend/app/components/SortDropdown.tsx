import React from 'react';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';

export interface SortOption {
  label: string;
  value: string;
}

interface Props {
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  isDescending: boolean;
  setIsDescending: React.Dispatch<React.SetStateAction<boolean>>;
  sortingOptions: SortOption[];
  className?: string;
}

export default function SortDropdown({
  sortOption,
  setSortOption,
  isDescending,
  setIsDescending,
  sortingOptions,
  className,
}: Props) {
  return (
    <div className={`dropdown dropdown-hover dropdown-end ${className}`}>
      <div tabIndex={0} role="button" className="btn btn-outline btn-sm">
        <span onClick={() => setIsDescending((prev) => !prev)}>
          {isDescending ? <FaSortAmountDown /> : <FaSortAmountUp />}
        </span>
        Sort:{' '}
        {sortingOptions.find((option) => option.value === sortOption)?.label ||
          'None'}
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
