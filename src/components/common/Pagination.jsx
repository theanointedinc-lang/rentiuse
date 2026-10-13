import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  hasMore = false,
  onLoadMore,
  mode = 'pages', // 'pages' | 'load-more'
  isLoading = false
}) {
  if (mode === 'load-more') {
    if (!hasMore) return null;
    return (
      <div style={{ textAlign: 'center', marginTop: '36px' }}>
        <Button 
          variant="outline-purple" 
          size="lg" 
          onClick={onLoadMore}
          isLoading={isLoading}
        >
          Load More Resources
        </Button>
      </div>
    );
  }

  if (totalPages <= 1) return null;

  return (
    <nav 
      aria-label="Pagination Navigation" 
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '40px' }}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="btn btn-outline btn-sm"
        aria-label="Previous Page"
      >
        <ChevronLeft size={16} />
        <span>Previous</span>
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNum = i + 1;
        const isActive = pageNum === currentPage;
        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
            style={{ minWidth: '36px', height: '36px', padding: 0 }}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="btn btn-outline btn-sm"
        aria-label="Next Page"
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
