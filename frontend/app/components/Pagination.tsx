'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';

interface Props {
  numPages: number;
  currentPage: number;
  next: boolean;
  prev: boolean
  className: string;
}

export default function Pagination({
  numPages,
  currentPage,
  next,
  prev,
  className = '',
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
    if (page && page > 1) {
      currentSearchParams.set('page', String(page))
    } else {
      currentSearchParams.delete('page')
    }
    router.push(`?${currentSearchParams.toString()}`);
  }, [page, searchParams, router])

  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = 5;
    const halfRange = Math.floor(totalPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(numPages, currentPage + halfRange);

    if (currentPage <= halfRange) {
      endPage = Math.min(totalPagesToShow, numPages);
    } else if (currentPage + halfRange > numPages) {
      startPage = Math.max(1, numPages - totalPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  if (numPages <= 1) {
    return;
  }

  return (
    <div className={`join ${className}`}>
      <button
        className={`join-item btn btn-sm`}
        onClick={() => setPage(1)}
        disabled={currentPage === 1}
      >
        <MdFirstPage />
      </button>
      <button
        className={`join-item btn btn-sm ${!prev && 'btn-disabled'}`}
        onClick={() => setPage(page - 1)}
        disabled={!prev}
      >
        <MdNavigateBefore />
      </button>
      {pageNumbers.map((n) => (
        <button
          className={`join-item btn btn-sm ${
            n === currentPage ? 'btn-active btn-primary' : ''
          }`}
          key={n}
          onClick={() => setPage(n)}
        >
          {n}
        </button>
      ))}
      <button
        className={`join-item btn btn-sm ${!next && 'btn-disabled'}`}
        onClick={() => setPage(page + 1)}
        disabled={!next}
      >
        <MdNavigateNext />
      </button>
      <button
        className={`join-item btn btn-sm`}
        onClick={() => setPage(numPages)}
        disabled={currentPage === numPages}
      >
        <MdLastPage />
      </button>
    </div>
  );
}
