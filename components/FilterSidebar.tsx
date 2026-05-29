'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Always reset to page 1 when filters change
    params.set('page', '1'); 
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const currentMoq = searchParams.get('moq') || '50';
  const currentCert = searchParams.get('cert') || '';

  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <div className="sidebar-header">
          <h4>Filters</h4>
          <button className="sidebar-clear" onClick={clearFilters}>Clear all</button>
        </div>
        <div className="sidebar-body">

          {/* Certifications (Wired to URL) */}
          <div className="filter-group">
            <span className="filter-label">Certifications</span>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <span 
                className={`cert-badge grs ${currentCert === 'grs' ? 'active' : ''}`} 
                onClick={() => updateFilter('cert', currentCert === 'grs' ? null : 'grs')}
              >
                {currentCert === 'grs' ? '✓ ' : ''}GRS Recycled
              </span>
              <span 
                className={`cert-badge oeko ${currentCert === 'oeko' ? 'active' : ''}`} 
                onClick={() => updateFilter('cert', currentCert === 'oeko' ? null : 'oeko')}
              >
                {currentCert === 'oeko' ? '✓ ' : ''}OEKO-TEX
              </span>
              <span 
                className={`cert-badge fair ${currentCert === 'fair' ? 'active' : ''}`} 
                onClick={() => updateFilter('cert', currentCert === 'fair' ? null : 'fair')}
              >
                {currentCert === 'fair' ? '✓ ' : ''}Fair Trade
              </span>
            </div>
          </div>

          {/* Static UI for Visual Match (Fabric, Gender, Colors) */}
          <div className="filter-group">
            <span className="filter-label">Fabric</span>
            <label className="filter-check"><input type="checkbox" defaultChecked /> Organic Cotton <span className="filter-check-count">38</span></label>
            <label className="filter-check"><input type="checkbox" /> Recycled Polyester <span className="filter-check-count">22</span></label>
            <label className="filter-check"><input type="checkbox" /> Bamboo Blend <span className="filter-check-count">11</span></label>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <span className="filter-label">Price (USD / pc)</span>
            <div className="price-range">
              <div className="range-row">
                <input type="number" className="range-inp" placeholder="$2.00" defaultValue="2" />
                <span className="range-sep">–</span>
                <input type="number" className="range-inp" placeholder="$30.00" defaultValue="30" />
              </div>
            </div>
          </div>

          {/* MOQ Slider (Wired to URL) */}
          <div className="filter-group">
            <span className="filter-label">Min Order Qty (pcs)</span>
            <input 
              type="range" 
              className="moq-slider" 
              min="50" max="500" step="50" 
              value={currentMoq}
              onChange={(e) => updateFilter('moq', e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>
              <span>50 pcs</span>
              <span id="moqVal" style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{currentMoq} pcs</span>
              <span>500 pcs</span>
            </div>
          </div>

        </div>
      </div>

      <div className="sidebar-card">
        <div className="sidebar-header"><h4>Need Help?</h4></div>
        <div className="sidebar-body">
          <p style={{ fontSize: '12px', color: 'var(--text2)', lineHeight: 1.6, marginBottom: '10px' }}>
            Not finding what you need? Our team can source custom styles or suggest alternatives.
          </p>
          <a href="mailto:orders@earthfashionltd.com" style={{ display: 'block', textAlign: 'center', background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 'var(--radius)', padding: '8px', fontSize: '12px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
            📧 Contact Sales Team
          </a>
        </div>
      </div>
    </aside>
  );
}