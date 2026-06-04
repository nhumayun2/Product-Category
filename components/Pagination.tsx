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

  const baseBtnClass = "w-[34px] h-[34px] rounded-[10px] border text-[13px] flex items-center justify-center transition-all duration-150 font-dm-sans disabled:opacity-35 disabled:cursor-not-allowed";
  const inactiveBtnClass = "border-border2 bg-surface text-text2 hover:border-accent2 hover:text-accent hover:bg-surface2 cursor-pointer";
  const activeBtnClass = "bg-accent text-white border-accent cursor-default";

  return (
    <div className="flex items-center justify-center gap-[6px] mt-8 pb-8">
      <button 
        className={`${baseBtnClass} ${inactiveBtnClass}`} 
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        ‹
      </button>
      
      <button 
        className={`${baseBtnClass} ${currentPage === 1 ? activeBtnClass : inactiveBtnClass}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
      
      <button 
        className={`${baseBtnClass} ${currentPage === 2 ? activeBtnClass : inactiveBtnClass}`}
        onClick={() => handlePageChange(2)}
      >
        2
      </button>
      
      <button 
        className={`${baseBtnClass} ${currentPage === 3 ? activeBtnClass : inactiveBtnClass}`}
        onClick={() => handlePageChange(3)}
      >
        3
      </button>
      
      <span className="text-text3 text-[13px] px-1">…</span>
      
      <button 
        className={`${baseBtnClass} ${currentPage === 11 ? activeBtnClass : inactiveBtnClass}`}
        onClick={() => handlePageChange(11)}
      >
        11
      </button>
      
      <button 
        className={`${baseBtnClass} ${inactiveBtnClass}`} 
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        ›
      </button>
    </div>
  );
}