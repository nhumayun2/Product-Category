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
    <div 
      className={`modal-overlay ${product ? 'open' : ''}`} 
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '2px' }}>
              {product?.cat || 'Loading...'}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>
              {product?.name || 'Please wait...'}
            </div>
          </div>
          <button className="modal-close" onClick={closeModal}>×</button>
        </div>
        
        <div className="modal-body">
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text3)' }}>Loading product data specifications...</div>
          ) : product ? (
            <div className="modal-2col">
              <div className="modal-thumb">
                <div className="thumb-pattern"></div>
                <svg style={{ opacity: 0.12, color: 'var(--accent)' }} width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
                </svg>
              </div>
              <div className="modal-details">
                <div className="modal-cat">{product.cat}</div>
                <div className="modal-name">{product.name}</div>
                <div className="modal-sku">SKU: {product.sku}</div>
                <div className="modal-desc">{product.desc}</div>
                
                <div className="modal-specs">
                  <div className="modal-spec"><span className="modal-spec-label">Weight</span><span className="modal-spec-val">{product.weight}</span></div>
                  <div className="modal-spec"><span className="modal-spec-label">Fabric</span><span className="modal-spec-val">{product.fabric}</span></div>
                  <div className="modal-spec"><span className="modal-spec-label">Sizes</span><span className="modal-spec-val">{product.sizes}</span></div>
                  <div className="modal-spec"><span className="modal-spec-label">Certifications</span><span className="modal-spec-val">{product.certs}</span></div>
                  <div className="modal-spec"><span className="modal-spec-label">Lead Time</span><span className="modal-spec-val">28–35 days</span></div>
                  <div className="modal-spec"><span className="modal-spec-label">MOQ</span><span className="modal-spec-val">{product.moq}</span></div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center' }}>Product specifications not available.</div>
          )}
        </div>
        
        <div className="modal-footer">
          <div className="modal-price">
            <div className="modal-price-from">From</div>
            <div className="modal-price-val">{product?.price || '$0.00'}</div>
            <div className="modal-price-unit">per piece · excl. branding</div>
          </div>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={closeModal}>Close</button>
            <button className="btn-primary" onClick={() => alert("Order added successfully to portal breakdown context setup.")}>
              Place Order
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}