'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const toggleCart = () => {
    const cart = document.getElementById('floatCart');
    if (cart) {
      cart.classList.toggle('visible');
    }
  };

  return (
    <nav className="bg-accent px-4 sm:px-8 flex items-center justify-between h-[56px] sticky top-0 z-[200] shadow-[0_2px_12px_rgba(0,0,0,0.18)]">
      <div className="flex items-center gap-10">
        <Link className="font-playfair text-white text-lg tracking-[0.02em] no-underline whitespace-nowrap" href="/">
          Earth Fashion <span className="opacity-55 text-[11px] font-dm-sans ml-2.5 tracking-[0.12em] uppercase">B2B Portal</span>
        </Link>
        <div className="hidden sm:flex gap-0">
          <Link 
            href="/dashboard" 
            className={`text-white/65 text-[12.5px] no-underline px-3.5 h-[56px] flex items-center border-b-2 transition-all duration-150 tracking-[0.03em] hover:text-white ${pathname === '/dashboard' ? 'text-white border-white/50' : 'border-transparent'}`}
          >
            Dashboard
          </Link>
          <Link 
            href="/products/all" 
            className={`text-white/65 text-[12.5px] no-underline px-3.5 h-[56px] flex items-center border-b-2 transition-all duration-150 tracking-[0.03em] hover:text-white ${pathname.startsWith('/products') ? 'text-white border-white/50' : 'border-transparent'}`}
          >
            Products
          </Link>
          <Link 
            href="/orders" 
            className={`text-white/65 text-[12.5px] no-underline px-3.5 h-[56px] flex items-center border-b-2 transition-all duration-150 tracking-[0.03em] hover:text-white ${pathname === '/orders' ? 'text-white border-white/50' : 'border-transparent'}`}
          >
            My Orders
          </Link>
          <Link 
            href="/invoices" 
            className={`text-white/65 text-[12.5px] no-underline px-3.5 h-[56px] flex items-center border-b-2 transition-all duration-150 tracking-[0.03em] hover:text-white ${pathname === '/invoices' ? 'text-white border-white/50' : 'border-transparent'}`}
          >
            Invoices
          </Link>
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <button 
          className="flex items-center gap-1.5 bg-white/12 border border-white/20 text-white text-xs py-1.5 px-3.5 rounded-full cursor-pointer transition-colors duration-150 font-dm-sans hover:bg-white/20" 
          onClick={toggleCart}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Cart
          <span className="bg-[#E8A838] text-white text-[10px] font-bold rounded-full py-[1px] px-1.5 min-w-[18px] text-center" id="cartCount">0</span>
        </button>
        <Link href="/support" className="text-white/70 text-[12.5px] no-underline hover:text-white hidden sm:block">Support</Link>
        <div className="flex items-center gap-2 text-white text-[12.5px] cursor-pointer">
          <div className="w-[30px] h-[30px] rounded-full bg-white/20 flex items-center justify-center text-[11px] font-semibold text-white">AK</div>
          <span className="hidden sm:inline">Anik&apos;s Account</span>
        </div>
      </div>
    </nav>
  );
}