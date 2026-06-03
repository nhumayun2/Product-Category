import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers'; // Used to dynamically detect live production URL
import WishlistButton from './WishlistButton';

type Product = {
  id: number;
  catSlug: string;
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
  swatches?: string[];
  moreSwatches?: number;
};

export default async function ProductGrid({ 
  category, 
  searchParams 
}: { 
  category: string;
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams.page || "1";
  
  // Dynamically resolve protocol and host name to guarantee server-side fetch succeeds on Vercel
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  
  let products: Product[] = [];
  
  try {
    const res = await fetch(`${baseUrl}/api/products?category=${category}&page=${page}`, {
      cache: 'no-store'
    });
    
    if (res.ok) {
      const data = await res.json();

      products = data.products.map((p: Product) => {
        if (p.sku === 'EFL-TS-001') {
          return { ...p, swatches: ['#1A1814', '#F5F5F0', '#1B3A4B', '#1A6B3C', '#8B2020'], moreSwatches: 4 };
        }
        if (p.sku === 'EFL-TS-004') {
          return { ...p, swatches: ['#1A1814', '#D4A5A5', '#A3C4BC', '#C2A882'], moreSwatches: 3 };
        }
        return { ...p, swatches: ['#1A1814', '#1B3A4B', '#4A4A4A', '#6B5B45'], moreSwatches: 5 };
      });
    }
  } catch (err) {
    console.error("Error fetching products on the server:", err);
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h3>No products found</h3>
        <p>Try adjusting your parameters or category selection.</p>
      </div>
    );
  }

  const currentParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) currentParams.set(key, value);
  });

  return (
    <div className="product-grid" id="productGrid">
      {products.map((product, index) => {

        const cardUrl = `?${currentParams.toString()}&modal=${product.sku}`;
        
        const renderThumbIcon = () => {
          if (product.cat.includes('Hoodies')) {
            return <path d="M16 4a2 2 0 01-4 0 2 2 0 01-4 0H2v2c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V4z"/>;
          }
          if (product.cat.includes('Bags')) {
            return (
              <>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </>
            );
          }
          return <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>;
        };
        
        return (
          <Link href={cardUrl} key={product.id} className="product-card" scroll={false}>
            <div className="product-thumb">
              <div className="thumb-pattern"></div>

              <svg className="thumb-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                {renderThumbIcon()}
              </svg>

              <Image 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3C/svg%3E"
                alt={product.name}
                width={300}
                height={400}
                priority={index < 3} 
                style={{ 
                  position: 'absolute',
                  inset: 0,
                  objectFit: 'contain', 
                  width: '100%', 
                  height: '100%', 
                  zIndex: 1
                }}
              />

              <span className="thumb-label">{product.sku}</span>
              
              <div className="product-badges">
                {index === 0 && <span className="product-badge best">Best Seller</span>}
                {index === 0 && <span className="product-badge eco">Organic</span>}
                {index === 1 && <span className="product-badge new">New</span>}
              </div>

              <WishlistButton />
            </div>

            <div className="product-info">
              <div className="product-cat">{product.cat}</div>
              <div className="product-name">{product.name}</div>
              <div className="product-sku">SKU: {product.sku} · {product.weight}</div>
              
              <div className="product-certs">
                {product.certs.includes('GRS') && <span className="mini-cert grs">GRS Recycled</span>}
                {product.certs.includes('OEKO-TEX') && <span className="mini-cert oeko">OEKO-TEX</span>}
                {product.certs.includes('Fair Trade') && <span className="mini-cert fair">Fair Trade</span>}
              </div>

              <div className="product-swatches">
                {product.swatches?.map((swatchColor, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="p-swatch" 
                    style={{ 
                      background: swatchColor, 
                      border: swatchColor === '#F5F5F0' ? '1.5px solid #ccc' : '1.5px solid rgba(0,0,0,0.08)' 
                    }}
                  ></div>
                ))}
                {product.moreSwatches && <span className="swatch-more">+{product.moreSwatches}</span>}
              </div>
              
              <div className="product-footer">
                <div className="price-block">
                  <div className="price-from">From</div>
                  <div className="price-val">{product.price}</div>
                  <div className="price-unit">per piece · excl. branding</div>
                  <div className="moq-note">MOQ {product.moq}</div>
                </div>
                
                <div className="order-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  Order
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}