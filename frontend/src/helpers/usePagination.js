// helpers/usePagination.js
import { useMemo } from 'react';

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Edge case handling
    if (totalPageCount === 0) {
      return [];
    }

    // Pages that will be displayed as page numbers
    let startPage = Math.max(1, currentPage - siblingCount);
    let endPage = Math.min(totalPageCount, currentPage + siblingCount);

    // Adjust startPage and endPage based on boundaries
    if (currentPage - siblingCount <= 1) {
      endPage = 1 + siblingCount * 2;
    }

    if (currentPage + siblingCount >= totalPageCount) {
      startPage = totalPageCount - siblingCount * 2;
    }

    // Handle special cases where startPage is negative or endPage exceeds totalPageCount
    startPage = Math.max(1, startPage);
    endPage = Math.min(totalPageCount, endPage);

    // Generate an array of page numbers to display in the pagination UI
    const pages = [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);

    return pages;
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
