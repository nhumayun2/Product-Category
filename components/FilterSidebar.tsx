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
    <aside className="sticky top-[116px] max-[900px]:hidden">
      
      {/* Filters Card */}
      <div className="bg-surface border border-border-main rounded-[14px] shadow-DEFAULT mb-4 overflow-hidden">
        
        {/* Header */}
        <div className="py-3 px-4 border-b border-border-main bg-surface2 flex items-center justify-between">
          <h4 className="text-[11px] font-bold tracking-[0.09em] uppercase text-accent">Filters</h4>
          <button 
            className="text-[11px] text-text3 cursor-pointer underline bg-none border-none font-dm-sans hover:text-accent" 
            onClick={clearFilters}
          >
            Clear all
          </button>
        </div>

        {/* Body */}
        <div className="py-[0.85rem] px-4">
          
          {/* Certifications */}
          <div className="mb-4 last:mb-0">
            <span className="text-[11px] font-semibold tracking-[0.07em] uppercase text-text3 mb-2 block">Certifications</span>
            <div className="flex flex-wrap">
              <span 
                className={`inline-flex items-center gap-[5px] text-[11px] py-[3px] px-[9px] rounded-full font-medium cursor-pointer m-[2px] transition-all duration-150 bg-green-bg border border-green-border text-green ${currentCert === 'grs' ? 'brightness-90' : ''}`} 
                onClick={() => updateFilter('cert', currentCert === 'grs' ? null : 'grs')}
              >
                {currentCert === 'grs' ? '✓ ' : ''}GRS Recycled
              </span>
              <span 
                className={`inline-flex items-center gap-[5px] text-[11px] py-[3px] px-[9px] rounded-full font-medium cursor-pointer m-[2px] transition-all duration-150 bg-amber-bg border border-amber-border text-amber ${currentCert === 'oeko' ? 'brightness-90' : ''}`} 
                onClick={() => updateFilter('cert', currentCert === 'oeko' ? null : 'oeko')}
              >
                {currentCert === 'oeko' ? '✓ ' : ''}OEKO-TEX
              </span>
              <span 
                className={`inline-flex items-center gap-[5px] text-[11px] py-[3px] px-[9px] rounded-full font-medium cursor-pointer m-[2px] transition-all duration-150 bg-[#E8F0F5] border border-[#B0CEDF] text-accent2 ${currentCert === 'fair' ? 'brightness-90' : ''}`} 
                onClick={() => updateFilter('cert', currentCert === 'fair' ? null : 'fair')}
              >
                {currentCert === 'fair' ? '✓ ' : ''}Fair Trade
              </span>
            </div>
          </div>

          {/* Fabric */}
          <div className="mb-4 last:mb-0">
            <span className="text-[11px] font-semibold tracking-[0.07em] uppercase text-text3 mb-2 block">Fabric</span>
            <label className="flex items-center gap-2 py-1 cursor-pointer text-[13px] text-text2 transition-colors duration-150 hover:text-text-main">
              <input type="checkbox" className="accent-accent w-[14px] h-[14px] cursor-pointer shrink-0" defaultChecked /> Organic Cotton 
              <span className="ml-auto text-[11px] text-text3">38</span>
            </label>
            <label className="flex items-center gap-2 py-1 cursor-pointer text-[13px] text-text2 transition-colors duration-150 hover:text-text-main">
              <input type="checkbox" className="accent-accent w-[14px] h-[14px] cursor-pointer shrink-0" /> Recycled Polyester 
              <span className="ml-auto text-[11px] text-text3">22</span>
            </label>
            <label className="flex items-center gap-2 py-1 cursor-pointer text-[13px] text-text2 transition-colors duration-150 hover:text-text-main">
              <input type="checkbox" className="accent-accent w-[14px] h-[14px] cursor-pointer shrink-0" /> Bamboo Blend 
              <span className="ml-auto text-[11px] text-text3">11</span>
            </label>
            <label className="flex items-center gap-2 py-1 cursor-pointer text-[13px] text-text2 transition-colors duration-150 hover:text-text-main">
              <input type="checkbox" className="accent-accent w-[14px] h-[14px] cursor-pointer shrink-0" /> Hemp Cotton 
              <span className="ml-auto text-[11px] text-text3">8</span>
            </label>
            <label className="flex items-center gap-2 py-1 cursor-pointer text-[13px] text-text2 transition-colors duration-150 hover:text-text-main">
              <input type="checkbox" className="accent-accent w-[14px] h-[14px] cursor-pointer shrink-0" /> Tencel / Lyocell 
              <span className="ml-auto text-[11px] text-text3">6</span>
            </label>
          </div>

          {/* Gender */}
          <div className="mb-4 last:mb-0">
            <span className="text-[11px] font-semibold tracking-[0.07em] uppercase text-text3 mb-2 block">Gender</span>
            <label className="flex items-center gap-2 py-1 cursor-pointer text-[13px] text-text2 transition-colors duration-150 hover:text-text-main">
              <input type="checkbox" className="accent-accent w-[14px] h-[14px] cursor-pointer shrink-0" defaultChecked /> Unisex 
              <span className="ml-auto text-[11px] text-text3">54</span>
            </label>
            <label className="flex items-center gap-2 py-1 cursor-pointer text-[13px] text-text2 transition-colors duration-150 hover:text-text-main">
              <input type="checkbox" className="accent-accent w-[14px] h-[14px] cursor-pointer shrink-0" /> Women&apos;s Fit 
              <span className="ml-auto text-[11px] text-text3">28</span>
            </label>
            <label className="flex items-center gap-2 py-1 cursor-pointer text-[13px] text-text2 transition-colors duration-150 hover:text-text-main">
              <input type="checkbox" className="accent-accent w-[14px] h-[14px] cursor-pointer shrink-0" /> Men&apos;s Fit 
              <span className="ml-auto text-[11px] text-text3">14</span>
            </label>
          </div>

          {/* Colours Available */}
          <div className="mb-4 last:mb-0">
            <span className="text-[11px] font-semibold tracking-[0.07em] uppercase text-text3 mb-2 block">Colours Available</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {colors.map((color, index) => {
                const isSelected = selectedColors.includes(color.bg);
                return (
                  <div 
                    key={index}
                    className={`w-5 h-5 rounded-full cursor-pointer border-2 transition-transform duration-150 relative hover:scale-[1.15] ${isSelected ? 'border-accent shadow-[0_0_0_2px_rgba(27,58,75,0.25)]' : 'border-transparent'}`} 
                    style={{ 
                      background: color.bg, 
                      ...(color.border && !isSelected ? { border: color.border } : {})
                    }} 
                    title={color.title}
                    onClick={() => toggleColor(color.bg)}
                  ></div>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-4 last:mb-0">
            <span className="text-[11px] font-semibold tracking-[0.07em] uppercase text-text3 mb-2 block">Price (USD / pc)</span>
            <div className="mt-1">
              <div className="flex items-center gap-2">
                <input type="number" className="flex-1 py-1.5 px-2 border border-border2 rounded-md text-xs font-dm-sans text-text-main bg-surface outline-none focus:border-accent2 focus:shadow-[0_0_0_3px_rgba(45,95,120,0.1)]" placeholder="$2.00" defaultValue="2" id="priceMin" />
                <span className="text-text3 text-xs">–</span>
                <input type="number" className="flex-1 py-1.5 px-2 border border-border2 rounded-md text-xs font-dm-sans text-text-main bg-surface outline-none focus:border-accent2 focus:shadow-[0_0_0_3px_rgba(45,95,120,0.1)]" placeholder="$30.00" defaultValue="30" id="priceMax" />
              </div>
            </div>
          </div>

          {/* MOQ Slider (Wired to URL) */}
          <div className="mb-4 last:mb-0">
            <span className="text-[11px] font-semibold tracking-[0.07em] uppercase text-text3 mb-2 block">Min Order Qty (pcs)</span>
            <input 
              type="range" 
              className="w-full mt-1.5 accent-accent" 
              min="50" max="500" step="50" 
              value={currentMoq}
              onChange={(e) => updateFilter('moq', e.target.value)}
            />
            <div className="flex justify-between text-[11px] text-text3 mt-1">
              <span>50 pcs</span>
              <span id="moqVal" className="font-bold text-accent">{currentMoq} pcs</span>
              <span>500 pcs</span>
            </div>
          </div>

          {/* Availability */}
          <div className="mb-4 last:mb-0">
            <span className="text-[11px] font-semibold tracking-[0.07em] uppercase text-text3 mb-2 block">Availability</span>
            <label className="flex items-center gap-2 py-1 cursor-pointer text-[13px] text-text2 transition-colors duration-150 hover:text-text-main">
              <input type="checkbox" className="accent-accent w-[14px] h-[14px] cursor-pointer shrink-0" defaultChecked /> In Stock 
              <span className="ml-auto text-[11px] text-text3">72</span>
            </label>
            <label className="flex items-center gap-2 py-1 cursor-pointer text-[13px] text-text2 transition-colors duration-150 hover:text-text-main">
              <input type="checkbox" className="accent-accent w-[14px] h-[14px] cursor-pointer shrink-0" /> Made to Order 
              <span className="ml-auto text-[11px] text-text3">24</span>
            </label>
            <label className="flex items-center gap-2 py-1 cursor-pointer text-[13px] text-text2 transition-colors duration-150 hover:text-text-main">
              <input type="checkbox" className="accent-accent w-[14px] h-[14px] cursor-pointer shrink-0" /> New Arrivals 
              <span className="ml-auto text-[11px] text-text3">11</span>
            </label>
          </div>

        </div>
      </div>

      {/* Help Card */}
      <div className="bg-surface border border-border-main rounded-[14px] shadow-DEFAULT mb-4 overflow-hidden">
        <div className="py-3 px-4 border-b border-border-main bg-surface2 flex items-center justify-between">
          <h4 className="text-[11px] font-bold tracking-[0.09em] uppercase text-accent">Need Help?</h4>
        </div>
        <div className="py-[0.85rem] px-4">
          <p className="text-[12px] text-text2 leading-[1.6] mb-2.5">
            Not finding what you need? Our team can source custom styles or suggest alternatives.
          </p>
          <a 
            href="mailto:orders@earthfashionltd.com" 
            className="block text-center bg-surface2 border border-border2 rounded-[10px] p-2 text-[12px] text-accent no-underline font-medium transition-all duration-150 hover:border-accent2"
          >
            📧 Contact Sales Team
          </a>
        </div>
      </div>

    </aside>
  );
}