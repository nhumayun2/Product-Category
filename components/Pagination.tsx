'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Pagination() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = 11; // Matching the 11 pages from the HTML prototype

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());

    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pagination">
      <button 
        className="page-btn" 
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        ‹
      </button>
      
      <button 
        className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
      
      <button 
        className={`page-btn ${currentPage === 2 ? 'active' : ''}`}
        onClick={() => handlePageChange(2)}
      >
        2
      </button>
      
      <button 
        className={`page-btn ${currentPage === 3 ? 'active' : ''}`}
        onClick={() => handlePageChange(3)}
      >
        3
      </button>
      
      <span className="page-ellipsis">…</span>
      
      <button 
        className={`page-btn ${currentPage === 11 ? 'active' : ''}`}
        onClick={() => handlePageChange(11)}
      >
        11
      </button>
      
      <button 
        className="page-btn" 
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        ›
      </button>
    </div>
  );
}