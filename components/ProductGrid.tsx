import Link from 'next/link';
import Image from 'next/image';
import WishlistButton from './WishlistButton';

const allProducts = [
  { id: 1, catSlug: 'tshirts', cat: 'T-Shirts', name: 'Classic Crew Tee — Heavy Weight', sku: 'EFL-TS-001', price: '$4.80', weight: '220 GSM', fabric: 'Organic Cotton', sizes: 'XS – 3XL', certs: 'GRS · OEKO-TEX', moq: '50 pcs', desc: 'A bestselling unisex crew-neck T-shirt crafted from 100% certified organic ring-spun cotton. Pre-shrunk, side-seamed for a clean fit, available in 9 colourways with full custom branding options.' },
  { id: 2, catSlug: 'tshirts', cat: 'T-Shirts', name: "Women's Fitted Tee — Bamboo Blend", sku: 'EFL-TS-004', price: '$5.40', weight: '180 GSM', fabric: 'Bamboo / Organic Cotton', sizes: 'XS – 2XL', certs: 'OEKO-TEX · Fair Trade', moq: '50 pcs', desc: 'A feminine fitted silhouette in a luxuriously soft bamboo-cotton blend. Naturally moisture-wicking and odour-resistant — ideal for active lifestyle brands and wellness labels.' },
  { id: 3, catSlug: 'hoodies', cat: 'Hoodies & Sweatshirts', name: 'Pullover Hoodie — Organic Fleece', sku: 'EFL-HD-002', price: '$10.20', weight: '320 GSM', fabric: 'Organic Cotton Fleece', sizes: 'XS – 3XL', certs: 'GRS · OEKO-TEX', moq: '50 pcs', desc: 'A heavyweight pullover hoodie with a double-lined hood, kangaroo pocket, and ribbed cuffs and hem. Perfect for streetwear, outdoor, and corporate gifting programmes.' },
  { id: 4, catSlug: 'bags', cat: 'Bags & Totes', name: 'Circular Tote Bag — Recycled Canvas', sku: 'EFL-BG-007', price: '$3.60', weight: '340 GSM Canvas', fabric: 'RPET Recycled Canvas', sizes: 'One Size', certs: 'GRS · Fair Trade', moq: '100 pcs', desc: 'A spacious and durable tote bag made from recycled PET canvas. Features long carry handles, a flat base, and is available with screen-print or embroidery branding.' },
  { id: 5, catSlug: 'polo', cat: 'Polo Shirts', name: 'Piqué Polo — Organic Cotton', sku: 'EFL-PL-003', price: '$6.90', weight: '220 GSM Piqué', fabric: 'Organic Cotton', sizes: 'XS – 3XL', certs: 'OEKO-TEX · Fair Trade', moq: '50 pcs', desc: 'A classic piqué polo with a 3-button placket, rib collar, and side splits. The go-to for corporate uniforms and sports teams — available in 8 professional colourways.' },
  { id: 6, catSlug: 'jackets', cat: 'Jackets', name: 'Softshell Jacket — Recycled Shell', sku: 'EFL-JK-005', price: '$18.50', weight: '3-Layer Bonded', fabric: 'Recycled Polyester', sizes: 'XS – 2XL', certs: 'GRS Recycled', moq: '50 pcs', desc: 'A windproof, water-resistant softshell jacket built from 3-layer GRS-certified recycled shell. Ideal for outdoor brands, corporate workwear, and branded event apparel.' },
  { id: 7, catSlug: 'caps', cat: 'Caps & Headwear', name: '6-Panel Cap — Organic Twill', sku: 'EFL-CP-001', price: '$4.20', weight: 'Structured Front', fabric: 'Organic Cotton Twill', sizes: 'One Size (adj.)', certs: 'OEKO-TEX · Fair Trade', moq: '50 pcs', desc: 'A clean, structured 6-panel cap with a pre-curved peak, adjustable back strap, and sweatband. Optimised for embroidery branding on the front panel.' },
  { id: 8, catSlug: 'hoodies', cat: 'Hoodies & Sweatshirts', name: 'Zip-Up Hoodie — Hemp Cotton Blend', sku: 'EFL-HD-006', price: '$12.80', weight: '350 GSM', fabric: 'Hemp / Organic Cotton', sizes: 'XS – 2XL', certs: 'GRS · OEKO-TEX', moq: '50 pcs', desc: 'A premium zip-up hoodie in a robust hemp-cotton fleece blend. Hemp fibres add natural antimicrobial properties and a distinctive texture — a standout sustainable choice.' },
  { id: 9, catSlug: 'bags', cat: 'Bags & Totes', name: 'Drawstring Bag — RPET Fabric', sku: 'EFL-BG-010', price: '$1.90', weight: '190T RPET', fabric: 'Recycled PET', sizes: 'One Size', certs: 'GRS Recycled', moq: '100 pcs', desc: 'A lightweight, budget-friendly drawstring bag in 190T RPET fabric. Ideal for event giveaways, gym bags, and retail packaging. Minimum 100 pcs per colourway.' },
];

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
  const page = parseInt(searchParams.page || "1");
  const limit = 9;

  let filteredProducts = allProducts;
  if (category !== "all") {
    filteredProducts = allProducts.filter(p => p.catSlug === category);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const rawProductsSlice = filteredProducts.slice(startIndex, endIndex);

  const products: Product[] = rawProductsSlice.map((p: any) => {
    if (p.sku === 'EFL-TS-001') {
      return { ...p, swatches: ['#1A1814', '#F5F5F0', '#1B3A4B', '#1A6B3C', '#8B2020'], moreSwatches: 4 };
    }
    if (p.sku === 'EFL-TS-004') {
      return { ...p, swatches: ['#1A1814', '#D4A5A5', '#A3C4BC', '#C2A882'], moreSwatches: 3 };
    }
    return { ...p, swatches: ['#1A1814', '#1B3A4B', '#4A4A4A', '#6B5B45'], moreSwatches: 5 };
  });

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