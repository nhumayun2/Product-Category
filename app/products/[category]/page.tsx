import { Suspense } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

import CategoryTabs from "@/components/CategoryTabs";
import FilterSidebar from "@/components/FilterSidebar";
import Toolbar from "@/components/Toolbar";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import FloatingCart from "@/components/FloatingCart";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";

const QuickViewModal = dynamic(
  () => import("@/components/QuickViewModal"),
  { ssr: false, loading: () => null }
);

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}): Promise<Metadata> {
  const { category } = await params;

  const formattedCategory = category === 'all' 
    ? 'All Products' 
    : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');

  return {
    title: `${formattedCategory} — EFL B2B Portal`,
    description: `Browse our sustainable ${formattedCategory.toLowerCase()} range. Ethically manufactured garments for brands that care.`,
    openGraph: {
      title: `${formattedCategory} — EFL B2B Portal`,
      description: `Browse our sustainable ${formattedCategory.toLowerCase()} range.`,
      type: 'website',
    },
  };
}

export default async function ProductCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {

  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <>
      {/* ── INFO STRIP ── */}
      <div className="info-strip">
        <div className="info-strip-inner">
          <div className="info-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            GRS & OEKO-TEX certified products available
          </div>
          <div className="info-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Free samples on orders over 100 pcs
          </div>
          <div className="info-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            28–35 day production lead time
          </div>
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Product Range</span>
          </div>
          <h1>Sustainable Apparel Range</h1>
          <p>Ethically manufactured, certified sustainable garments — crafted for brands that care. All styles available with custom branding options.</p>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <span><strong>96</strong> active styles</span>
            </div>
            <div className="hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span><strong>GRS · OEKO-TEX · Fair Trade</strong> certified</span>
            </div>
            <div className="hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <span>MOQ from <strong>50 pcs</strong> per style</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CATEGORY TABS ── */}
      <CategoryTabs currentCategory={category} />

      {/* ── MAIN LAYOUT ── */}
      <div className="main-layout">
        
        {/* ── SIDEBAR ── */}
        <FilterSidebar />

        {/* ── PRODUCT GRID AREA ── */}
        <div className="grid-area">
          
          {/* ── TOOLBAR ── */}
          <Toolbar />

          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid category={category} searchParams={resolvedSearchParams} />
          </Suspense>

          {/* ── PAGINATION ── */}
          <Pagination />

        </div>
      </div>

      {/* ── FLOATING CART ── */}
      <FloatingCart />

      {/* ── QUICK VIEW MODAL ── */}
      <QuickViewModal />
    </>
  );
}