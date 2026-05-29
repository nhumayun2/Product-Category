import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair", 
});

export const metadata: Metadata = {
  title: "Earth Fashion B2B Portal",
  description: "Sustainable Apparel Range",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>
        <nav>
          <div className="nav-left">
            <Link className="nav-logo" href="/">
              Earth Fashion <span>B2B Portal</span>
            </Link>
            <div className="nav-links">
              <Link className="nav-link" href="#">Dashboard</Link>
              <Link className="nav-link active" href="/products/all">Products</Link>
              <Link className="nav-link" href="#">My Orders</Link>
              <Link className="nav-link" href="#">Invoices</Link>
            </div>
          </div>
          <div className="nav-right">
            <button className="cart-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Cart
              <span className="cart-badge" id="cartCount">0</span>
            </button>
            <Link href="#">Support</Link>
            <div className="nav-user">
              <div className="nav-avatar">AK</div>
              Anik's Account
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}