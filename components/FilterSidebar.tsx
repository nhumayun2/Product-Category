'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedColors, setSelectedColors] = useState<string[]>(['#1A1814']);

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set('page', '1'); 
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedColors([]);
    router.push(pathname);
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const currentMoq = searchParams.get('moq') || '50';
  const currentCert = searchParams.get('cert') || '';

  const colors = [
    { bg: '#1A1814', title: 'Black' },
    { bg: '#F5F5F0', title: 'White', border: '1.5px solid #ccc' },
    { bg: '#1B3A4B', title: 'Navy' },
    { bg: '#2D5F78', title: 'Steel Blue' },
    { bg: '#1A6B3C', title: 'Forest Green' },
    { bg: '#C2A882', title: 'Sand' },
    { bg: '#8B2020', title: 'Burgundy' },
    { bg: '#6B5B45', title: 'Khaki' },
    { bg: '#92600A', title: 'Caramel' },
    { bg: '#A3C4BC', title: 'Sage' },
    { bg: '#D4A5A5', title: 'Dusty Rose' },
    { bg: '#4A4A4A', title: 'Charcoal' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <div className="sidebar-header">
          <h4>Filters</h4>
          <button className="sidebar-clear" onClick={clearFilters}>Clear all</button>
        </div>
        <div className="sidebar-body">
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

          {/* Fabric */}
          <div className="filter-group">
            <span className="filter-label">Fabric</span>
            <label className="filter-check"><input type="checkbox" defaultChecked /> Organic Cotton <span className="filter-check-count">38</span></label>
            <label className="filter-check"><input type="checkbox" /> Recycled Polyester <span className="filter-check-count">22</span></label>
            <label className="filter-check"><input type="checkbox" /> Bamboo Blend <span className="filter-check-count">11</span></label>
            <label className="filter-check"><input type="checkbox" /> Hemp Cotton <span className="filter-check-count">8</span></label>
            <label className="filter-check"><input type="checkbox" /> Tencel / Lyocell <span className="filter-check-count">6</span></label>
          </div>

          {/* Gender */}
          <div className="filter-group">
            <span className="filter-label">Gender</span>
            <label className="filter-check"><input type="checkbox" defaultChecked /> Unisex <span className="filter-check-count">54</span></label>
            <label className="filter-check"><input type="checkbox" /> Women&apos;s Fit <span className="filter-check-count">28</span></label>
            <label className="filter-check"><input type="checkbox" /> Men&apos;s Fit <span className="filter-check-count">14</span></label>
          </div>

          {/* Colours Available */}
          <div className="filter-group">
            <span className="filter-label">Colours Available</span>
            <div className="color-dots">
              {colors.map((color, index) => (
                <div 
                  key={index}
                  className={`color-dot ${selectedColors.includes(color.bg) ? 'selected' : ''}`} 
                  style={{ background: color.bg, border: color.border || '2px solid transparent' }} 
                  title={color.title}
                  onClick={() => toggleColor(color.bg)}
                ></div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <span className="filter-label">Price (USD / pc)</span>
            <div className="price-range">
              <div className="range-row">
                <input type="number" className="range-inp" placeholder="$2.00" defaultValue="2" id="priceMin" />
                <span className="range-sep">–</span>
                <input type="number" className="range-inp" placeholder="$30.00" defaultValue="30" id="priceMax" />
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

          {/* Availability */}
          <div className="filter-group">
            <span className="filter-label">Availability</span>
            <label className="filter-check"><input type="checkbox" defaultChecked /> In Stock <span className="filter-check-count">72</span></label>
            <label className="filter-check"><input type="checkbox" /> Made to Order <span className="filter-check-count">24</span></label>
            <label className="filter-check"><input type="checkbox" /> New Arrivals <span className="filter-check-count">11</span></label>
          </div>

        </div>
      </div>

      <div className="sidebar-card">
        <div className="sidebar-header"><h4>Need Help?</h4></div>
        <div className="sidebar-body">
          <p style={{ fontSize: '12px', color: 'var(--text2)', lineHeight: 1.6, marginBottom: '10px' }}>
            Not finding what you need? Our team can source custom styles or suggest alternatives.
          </p>
          <a href="mailto:orders@earthfashionltd.com" style={{ display: 'block', textAlign: 'center', background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 'var(--radius)', padding: '8px', fontSize: '12px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500, transition: 'all 0.15s' }}>
            📧 Contact Sales Team
          </a>
        </div>
      </div>
    </aside>
  );
}