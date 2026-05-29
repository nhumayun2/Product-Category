import Image from "next/image";
import Link from "next/link";

// Define the shape of our product data
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
};

export default async function ProductGrid({ 
  category, 
  searchParams 
}: { 
  category: string;
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams.page || "1";

  // Task 6: Data Fetching in Server Component
  // Using cache: 'no-store' ensures it fetches fresh data when filters/URL change
  const res = await fetch(`http://localhost:3000/api/products?category=${category}&page=${page}`, { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  const products: Product[] = data.products;

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h3>No products found</h3>
        <p>Try adjusting your filters or category selection.</p>
      </div>
    );
  }

  return (
    <div className="product-grid" id="productGrid">
      {products.map((product, index) => {
        // We use URL query parameters to trigger the Quick View Modal without needing client state
        const modalUrl = `?${new URLSearchParams({ ...searchParams, modal: product.sku }).toString()}`;
        
        return (
          // Link wraps the card to open modal via URL (Client component will intercept this)
          <Link href={modalUrl} scroll={false} key={product.id} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="product-thumb">
              {/* Task 7: Image Optimization with next/image */}
              <Image 
                src={`https://placehold.co/300x400/E2E8F0/1B3A4B.svg?text=${encodeURIComponent(product.sku)}`}
                alt={product.name}
                width={300}
                height={400}
                priority={index < 3} // Priority for above-the-fold images
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
              <span className="thumb-label">{product.sku}</span>
              <div className="product-badges">
                {index === 0 && <span className="product-badge best">Best Seller</span>}
                {index === 1 && <span className="product-badge new">New</span>}
              </div>
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
              
              <div className="product-footer">
                <div className="price-block">
                  <div className="price-from">From</div>
                  <div className="price-val">{product.price}</div>
                  <div className="price-unit">per piece</div>
                  <div className="moq-note">MOQ {product.moq}</div>
                </div>
                {/* Task 8: Navigation with next/link */}
                <span className="order-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  Details
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}