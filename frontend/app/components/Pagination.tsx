'use client';

import React from 'react';
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';

interface Props {
  num_pages: number;
  current_page: number;
  limit: number;
  next_offset: number | null;
  prev_offset: number | null;
  setOffset: React.Dispatch<React.SetStateAction<number | null>>;
  className: string;
}

export default function Pagination({
  num_pages,
  current_page,
  limit,
  next_offset,
  prev_offset,
  setOffset,
  className = '',
}: Props) {
  if (num_pages <= 1) {
    return;
  }

  const handlePageClick = (page: number) => {
    const newOffset = (page - 1) * limit;
    setOffset(newOffset);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = 5;
    const halfRange = Math.floor(totalPagesToShow / 2);

    let startPage = Math.max(1, current_page - halfRange);
    let endPage = Math.min(num_pages, current_page + halfRange);

    if (current_page <= halfRange) {
      endPage = Math.min(totalPagesToShow, num_pages);
    } else if (current_page + halfRange > num_pages) {
      startPage = Math.max(1, num_pages - totalPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`join ${className}`}>
      <button
        className={`join-item btn btn-sm`}
        onClick={() => setOffset(0)}
        disabled={current_page === 1}
      >
        <MdFirstPage />
      </button>
      <button
        className={`join-item btn btn-sm ${
          prev_offset == null ? 'btn-disabled' : ''
        }`}
        onClick={() => setOffset(prev_offset)}
        disabled={prev_offset == null}
      >
        <MdNavigateBefore />
      </button>
      {pageNumbers.map((n) => (
        <button
          className={`join-item btn btn-sm ${
            n === current_page ? 'btn-active btn-primary' : ''
          }`}
          key={n}
          onClick={() => handlePageClick(n)}
        >
          {n}
        </button>
      ))}
      <button
        className={`join-item btn btn-sm ${
          next_offset == null ? 'btn-disabled' : ''
        }`}
        onClick={() => setOffset(next_offset)}
        disabled={next_offset == null}
      >
        <MdNavigateNext />
      </button>
      <button
        className={`join-item btn btn-sm`}
        onClick={() => setOffset((num_pages - 1) * limit)}
        disabled={current_page === num_pages}
      >
        <MdLastPage />
      </button>
    </div>
  );
}
