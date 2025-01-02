'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface Props {
  numPages: number;
  currentPage: number;
  next: boolean;
  prev: boolean;
  className: string;
}

export default function ListPagination({
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
    const currentSearchParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );
    if (page && page > 1) {
      currentSearchParams.set('page', String(page));
    } else {
      currentSearchParams.delete('page');
    }
    router.push(`?${currentSearchParams.toString()}`);
  }, [page, searchParams, router]);

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
    <div className={cn(className, '')}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button variant="ghost" size="icon" onClick={() => setPage(1)}>
              <ChevronsLeft />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button variant="ghost" size="icon" disabled={!prev} onClick={() => setPage(page - 1)}>
              <ChevronLeft />
            </Button>
          </PaginationItem>
          {pageNumbers.map((n) => (
            <PaginationItem key={n} onClick={() => setPage(n)}>
              <PaginationLink isActive={n == currentPage}>
                <Button variant="ghost">{n}</Button>
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <Button variant="ghost" size="icon" disabled={!next} onClick={() => setPage(page + 1)}>
              <ChevronRight />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button variant="ghost" size="icon" onClick={() => setPage(numPages)}>
              <ChevronsRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
