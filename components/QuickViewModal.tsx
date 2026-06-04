'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Structure matching our API data model template
type Product = {
  cat: string;
  name: string;
  sku: string;
  price: string;
  weight: string;
  fabric: string;
  sizes: string;
  certs: string;
  moq: string;
  desc: string;
};

export default function QuickViewModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedSku = searchParams.get('modal');

  useEffect(() => {
    if (!selectedSku) {
      setProduct(null);
      document.body.style.overflow = ''; // Restore page scrolling
      return;
    }

    // Fetch the specific product specs based on the URL parameter
    const fetchModalProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=all`);
        if (res.ok) {
          const data = await res.json();
          const found = data.products.find((p: any) => p.sku === selectedSku);
          if (found) {
            setProduct(found);
            document.body.style.overflow = 'hidden'; 
          }
        }
      } catch (err) {
        console.error("Error loading modal product spec parameters", err);
      } finally {
        setLoading(false);
      }
    };

    fetchModalProduct();
  }, [selectedSku]);

  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('modal'); // Remove modal state from URL
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Close modal automatically if user presses the Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchParams]);

  if (!selectedSku) return null;

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
      <div 
        className={`fixed inset-0 bg-black/45 z-[500] items-center justify-center backdrop-blur-[4px] hidden [&.open]:flex ${product ? 'open' : ''}`}
        style={{ animation: 'fadeIn 0.2s ease' }}
        onClick={(e) => e.target === e.currentTarget && closeModal()}
      >
        <div 
          className="bg-surface rounded-[14px] max-w-[640px] w-[90%] max-h-[85vh] overflow-y-auto shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
          style={{ animation: 'slideUp 0.25s ease' }}
        >
          {/* Header */}
          <div className="py-5 px-6 border-b border-border-main flex items-center justify-between bg-surface2 rounded-t-[14px]">
            <div>
              <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-text3 mb-0.5">
                {product?.cat || 'Loading...'}
              </div>
              <div className="text-[15px] font-semibold text-text-main">
                {product?.name || 'Please wait...'}
              </div>
            </div>
            <button 
              className="w-[30px] h-[30px] rounded-full bg-border-main border-none cursor-pointer flex items-center justify-center text-[16px] text-text2 transition-colors duration-150 hover:bg-border2 hover:text-text-main" 
              onClick={closeModal}
            >
              ×
            </button>
          </div>
          
          {/* Body */}
          <div className="p-6">
            {loading ? (
              <div className="p-8 text-center text-text3">Loading product data specifications...</div>
            ) : product ? (
              <div className="grid grid-cols-[180px_1fr] max-[900px]:grid-cols-1 gap-6 items-start">
                <div className="aspect-[3/4] max-[900px]:aspect-[16/9] bg-surface2 rounded-[10px] border border-border-main flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(45deg,var(--color-accent)_0,var(--color-accent)_1px,transparent_0,transparent_50%)] bg-[size:12px_12px]"></div>
                  <svg className="opacity-12 text-accent" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-text3 mb-1">{product.cat}</div>
                  <div className="font-playfair text-[1.4rem] font-semibold text-text-main leading-[1.25] mb-1">{product.name}</div>
                  <div className="text-[11px] text-text3 mb-3">SKU: {product.sku}</div>
                  <div className="text-[13px] text-text2 leading-[1.65] mb-[14px]">{product.desc}</div>
                  
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-[14px]">
                    <div className="text-[12px]"><span className="text-text3 text-[10.5px] uppercase tracking-[0.07em] block mb-[1px]">Weight</span><span className="text-text-main font-medium">{product.weight}</span></div>
                    <div className="text-[12px]"><span className="text-text3 text-[10.5px] uppercase tracking-[0.07em] block mb-[1px]">Fabric</span><span className="text-text-main font-medium">{product.fabric}</span></div>
                    <div className="text-[12px]"><span className="text-text3 text-[10.5px] uppercase tracking-[0.07em] block mb-[1px]">Sizes</span><span className="text-text-main font-medium">{product.sizes}</span></div>
                    <div className="text-[12px]"><span className="text-text3 text-[10.5px] uppercase tracking-[0.07em] block mb-[1px]">Certifications</span><span className="text-text-main font-medium">{product.certs}</span></div>
                    <div className="text-[12px]"><span className="text-text3 text-[10.5px] uppercase tracking-[0.07em] block mb-[1px]">Lead Time</span><span className="text-text-main font-medium">28–35 days</span></div>
                    <div className="text-[12px]"><span className="text-text3 text-[10.5px] uppercase tracking-[0.07em] block mb-[1px]">MOQ</span><span className="text-text-main font-medium">{product.moq}</span></div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-4">
                    {product.certs.includes('GRS') && <span className="text-[9.5px] py-[2px] px-[7px] rounded-full font-medium bg-green-bg border border-green-border text-green">GRS Recycled</span>}
                    {product.certs.includes('OEKO-TEX') && <span className="text-[9.5px] py-[2px] px-[7px] rounded-full font-medium bg-amber-bg border border-amber-border text-amber">OEKO-TEX</span>}
                    {product.certs.includes('Fair Trade') && <span className="text-[9.5px] py-[2px] px-[7px] rounded-full font-medium bg-[#E8F0F5] border border-[#B0CEDF] text-accent2">Fair Trade</span>}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">Product specifications not available.</div>
            )}
          </div>
          
          {/* Footer */}
          <div className="py-4 px-6 border-t border-border-main flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-text3">From</div>
              <div className="text-[22px] font-bold text-accent">{product?.price || '$0.00'}</div>
              <div className="text-[11px] text-text3">per piece · excl. branding</div>
            </div>
            <div className="flex gap-2">
              <button 
                className="bg-surface2 text-text-main border border-border2 rounded-[10px] py-2.5 px-[18px] text-[13px] cursor-pointer font-dm-sans transition-all duration-150 hover:border-accent2 hover:text-accent" 
                onClick={closeModal}
              >
                Close
              </button>
              <button 
                className="bg-accent text-white border-none rounded-[10px] py-2.5 px-[22px] text-[13px] font-medium cursor-pointer font-dm-sans transition-colors duration-150 inline-flex items-center gap-[6px] hover:bg-accent2" 
                onClick={() => alert("Order added successfully to portal breakdown context setup.")}
              >
                Place Order
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}