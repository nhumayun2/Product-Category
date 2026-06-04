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
      className="hidden [&.visible]:flex fixed bottom-6 right-6 bg-accent text-white rounded-[14px] py-3 px-5 items-center gap-3 cursor-pointer z-[999] transition-all duration-200 shadow-[0_8px_32px_rgba(27,58,75,0.3)] hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(27,58,75,0.35)] visible" 
      id="floatCart" 
      onClick={handleCartClick}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      <div className="leading-[1.3]">
        <div className="text-[10px] opacity-70 tracking-[0.05em] uppercase">Current Order</div>
        <div className="text-[14px] font-bold" id="floatCartCount">{cartCount} items selected</div>
      </div>
      <div className="opacity-70 text-[18px]">→</div>
    </div>
  );
}