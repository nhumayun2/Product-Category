'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function FloatingCart() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const cartCount = searchParams.get('cartItems') || '0';

  const handleCartClick = () => {
    alert("Proceeding to order breakdown page with current configurations.");
  };

  return (
    <div 
      className={`float-cart visible`} 
      id="floatCart" 
      onClick={handleCartClick}
      style={{ display: 'flex' }} 
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      <div className="float-cart-info">
        <div className="float-cart-label">Current Order</div>
        <div className="float-cart-count" id="floatCartCount">{cartCount} items selected</div>
      </div>
      <div className="float-cart-arrow">→</div>
    </div>
  );
}