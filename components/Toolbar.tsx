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
    <div className="toolbar">
      <div className="toolbar-left">
        <div className="results-info">Showing results</div>
        <div className="active-filters">
          {/* Dynamically render chips if the filter exists in the URL */}
          {activeCert && (
            <span className="active-filter" onClick={() => removeFilter('cert')}>
              {activeCert === 'grs' ? 'GRS Recycled' : activeCert === 'oeko' ? 'OEKO-TEX' : 'Fair Trade'} 
              <span className="rm">×</span>
            </span>
          )}
          
          {activeMoq && activeMoq !== '50' && (
            <span className="active-filter" onClick={() => removeFilter('moq')}>
              MOQ: {activeMoq} pcs <span className="rm">×</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="toolbar-right">
        <select className="sort-select" value={activeSort} onChange={handleSort}>
          <option value="popular">Most Popular</option>
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="moq-asc">MOQ: Low to High</option>
        </select>
        
        <div className="view-toggle">
          <button 
            className={`view-btn ${view === 'grid' ? 'active' : ''}`} 
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
            className={`view-btn ${view === 'list' ? 'active' : ''}`} 
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