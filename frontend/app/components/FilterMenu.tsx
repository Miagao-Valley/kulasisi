'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaFilter } from 'react-icons/fa';

export interface Filter {
  [key: string]: boolean | string;
}

export interface FilterOption {
  label: string;
  value: string;
  type: 'checkbox' | 'select';
  options?: { label: string; value: string }[];
}

interface Props {
  currentFilters: Filter;
  filterOptions: FilterOption[];
  className?: string;
}

export default function FilterMenu({
  filterOptions,
  currentFilters,
  className,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(currentFilters);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        let processedValue = value;
        if (typeof processedValue === 'boolean') {
          processedValue = processedValue ? 'true' : 'false';
        }
        currentSearchParams.set(key, processedValue);
      } else {
        currentSearchParams.delete(key);
      }
    }

    router.push(`?${currentSearchParams.toString()}`);
  }, [filters, searchParams, router]);

  return (
    <div className={`dropdown dropdown-hover dropdown-end ${className}`}>
      <div tabIndex={0} role="button" className="btn btn-outline btn-sm">
        <FaFilter />
        Filter
      </div>
      <div className="dropdown-content w-80 p-4 rounded-box bg-base-100 shadow">
        {filterOptions.map(({ label, value, type, options }) => {
          if (type === 'checkbox') {
            return (
              <label className="label cursor-pointer" key={value}>
                <span className="label-text">{label}</span>
                <input
                  className="checkbox checkbox-sm"
                  type="checkbox"
                  checked={!!currentFilters[value]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      [value]: e.target.checked,
                    }))
                  }
                />
              </label>
            );
          }

          if (type === 'select' && options) {
            return (
              <div className="form-control" key={value}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                <select
                  className="select select-sm select-bordered"
                  value={(currentFilters[value] as string) || ''}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, [value]: e.target.value }))
                  }
                >
                  <option value="">All</option>
                  {options.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
