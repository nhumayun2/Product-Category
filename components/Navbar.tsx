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
    <nav>
      <div className="nav-left">
        <Link className="nav-logo" href="/">
          Earth Fashion <span>B2B Portal</span>
        </Link>
        <div className="nav-links">
          <Link 
            href="/dashboard" 
            className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            href="/products/all" 
            className={`nav-link ${pathname.startsWith('/products') ? 'active' : ''}`}
          >
            Products
          </Link>
          <Link 
            href="/orders" 
            className={`nav-link ${pathname === '/orders' ? 'active' : ''}`}
          >
            My Orders
          </Link>
          <Link 
            href="/invoices" 
            className={`nav-link ${pathname === '/invoices' ? 'active' : ''}`}
          >
            Invoices
          </Link>
        </div>
      </div>
      <div className="nav-right">
        <button className="cart-btn" onClick={toggleCart}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Cart
          <span className="cart-badge" id="cartCount">0</span>
        </button>
        <Link href="/support">Support</Link>
        <div className="nav-user">
          <div className="nav-avatar">AK</div>
          Anik&apos;s Account
        </div>
      </div>
    </nav>
  );
}