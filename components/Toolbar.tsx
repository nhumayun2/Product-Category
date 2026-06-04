'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Toolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [view, setView] = useState('grid');

  const activeCert = searchParams.get('cert');
  const activeMoq = searchParams.get('moq');
  const activeSort = searchParams.get('sort') || 'popular';

  // Removes a filter by deleting it from the URL
  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleView = (newView: string) => {
    setView(newView);
    const grid = document.getElementById('productGrid');
    
    if (grid) {
      if (newView === 'list') {
        grid.classList.add('list-view');
        const cards = grid.querySelectorAll('.product-card');
        cards.forEach(c => c.classList.add('list-view'));
      } else {
        grid.classList.remove('list-view');
        const cards = grid.querySelectorAll('.product-card');
        cards.forEach(c => c.classList.remove('list-view'));
      }
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
      <div className="flex items-center gap-3">
        <div className="text-[13px] text-text2">Showing <strong className="text-text-main">results</strong></div>
        <div className="flex flex-wrap gap-1.5">
          {/* Dynamically render chips if the filter exists in the URL */}
          {activeCert && (
            <span 
              className="flex items-center gap-[5px] text-[11.5px] bg-info-bg border border-[#B0CEDF] text-accent2 rounded-full py-[3px] px-[10px] cursor-pointer hover:bg-[#D8E8F0] transition-colors" 
              onClick={() => removeFilter('cert')}
            >
              {activeCert === 'grs' ? 'GRS Recycled' : activeCert === 'oeko' ? 'OEKO-TEX' : 'Fair Trade'} 
              <span className="text-[14px] leading-none opacity-70">×</span>
            </span>
          )}
          
          {activeMoq && activeMoq !== '50' && (
            <span 
              className="flex items-center gap-[5px] text-[11.5px] bg-info-bg border border-[#B0CEDF] text-accent2 rounded-full py-[3px] px-[10px] cursor-pointer hover:bg-[#D8E8F0] transition-colors" 
              onClick={() => removeFilter('moq')}
            >
              MOQ: {activeMoq} pcs <span className="text-[14px] leading-none opacity-70">×</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <select 
          className="py-[7px] px-3 border border-border2 rounded-[10px] text-[12.5px] text-text-main bg-surface font-dm-sans outline-none cursor-pointer focus:border-accent2" 
          value={activeSort} 
          onChange={handleSort}
        >
          <option value="popular">Most Popular</option>
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="moq-asc">MOQ: Low to High</option>
        </select>
        
        <div className="flex border border-border2 rounded-[10px] overflow-hidden">
          <button 
            className={`py-[7px] px-2.5 flex items-center transition-all duration-150 cursor-pointer ${view === 'grid' ? 'bg-accent text-white' : 'bg-surface text-text3 hover:bg-surface2 hover:text-text2'}`} 
            onClick={() => toggleView('grid')} 
            title="Grid view"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </button>
          <button 
            className={`py-[7px] px-2.5 flex items-center transition-all duration-150 cursor-pointer ${view === 'list' ? 'bg-accent text-white' : 'bg-surface text-text3 hover:bg-surface2 hover:text-text2'}`} 
            onClick={() => toggleView('list')} 
            title="List view"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="4" width="18" height="3" rx="1"/>
              <rect x="3" y="10.5" width="18" height="3" rx="1"/>
              <rect x="3" y="17" width="18" height="3" rx="1"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}