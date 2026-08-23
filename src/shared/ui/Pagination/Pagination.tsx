// src/shared/ui/Pagination/Pagination.tsx

import type { ButtonHTMLAttributes } from 'react';
import styles from './Pagination.module.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

interface PageButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

function PageButton({
  active,
  className,
  children,
  ...rest
}: PageButtonProps) {
  const classes = [
    styles.pageButton,
    active ? styles.pageButtonActive : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

function createPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | 'dots')[] {
  const pages: (number | 'dots')[] = [];

  const startPage = Math.max(2, currentPage - siblingCount);
  const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

  pages.push(1);

  if (startPage > 2) {
    pages.push('dots');
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page);
  }

  if (endPage < totalPages - 1) {
    pages.push('dots');
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const pages = createPageRange(currentPage, totalPages, siblingCount);

  const handleChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const containerClasses = [
    styles.container,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={containerClasses} aria-label="Paginação">
      <PageButton
        disabled={!canGoPrev}
        onClick={() => handleChange(currentPage - 1)}
      >
        ‹
      </PageButton>

      {pages.map((page, index) =>
        page === 'dots' ? (
          <span key={`dots-${index}`} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <PageButton
            key={page}
            active={page === currentPage}
            onClick={() => handleChange(page)}
          >
            {page}
          </PageButton>
        )
      )}

      <PageButton
        disabled={!canGoNext}
        onClick={() => handleChange(currentPage + 1)}
      >
        ›
      </PageButton>
    </nav>
  );
}

export default Pagination;
