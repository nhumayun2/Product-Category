import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import CategoryTabs from "@/components/CategoryTabs";
import FilterSidebar from "@/components/FilterSidebar";
import Toolbar from "@/components/Toolbar";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import FloatingCart from "@/components/FloatingCart";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import ClientModalWrapper from "@/components/ClientModalWrapper";

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
      <div className="bg-green-bg border-y border-green-border py-[0.6rem] px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto flex gap-8 items-center flex-wrap">
          <div className="flex items-center gap-[7px] text-[12px] text-green">
            <svg className="shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            GRS & OEKO-TEX certified products available
          </div>
          <div className="flex items-center gap-[7px] text-[12px] text-green">
            <svg className="shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="1" y="3" width="15" height="13"/>
              <path d="M16 8h4l3 3v5h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            Free samples on orders over 100 pcs
          </div>
          <div className="flex items-center gap-[7px] text-[12px] text-green">
            <svg className="shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            28–35 day production lead time
          </div>
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <div className="bg-[linear-gradient(135deg,var(--color-accent)_0%,#0F2535_60%,#163344_100%)] py-12 px-4 sm:px-8 relative overflow-hidden before:content-[''] before:absolute before:-top-[80px] before:-right-[80px] before:w-[320px] before:h-[320px] before:rounded-full before:bg-white/[0.03] before:pointer-events-none after:content-[''] after:absolute after:-bottom-[60px] after:left-[20%] after:w-[200px] after:h-[200px] after:rounded-full after:bg-white/[0.02] after:pointer-events-none">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex items-center gap-[6px] text-[11.5px] text-white/45 mb-4 tracking-[0.04em]">
            <Link href="/" className="text-white/50 no-underline hover:text-white/80">Home</Link>
            <span className="text-white/30">›</span>
            <span>Product Range</span>
          </div>
          <h1 className="font-playfair text-[2.4rem] font-semibold text-white tracking-[-0.01em] mb-[0.6rem] leading-[1.2] max-[900px]:text-[1.8rem]">Sustainable Apparel Range</h1>
          <p className="text-white/60 text-[14px] max-w-[540px] leading-[1.65]">Ethically manufactured, certified sustainable garments — crafted for brands that care. All styles available with custom branding options.</p>
          <div className="flex gap-x-8 gap-y-3 mt-6 flex-wrap">
            <div className="flex items-center gap-2">
              <svg className="opacity-55 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
              </svg>
              <span className="text-[12px] text-white/60"><strong className="text-white/90 font-medium">96</strong> active styles</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="opacity-55 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className="text-[12px] text-white/60"><strong className="text-white/90 font-medium">GRS · OEKO-TEX · Fair Trade</strong> certified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="opacity-55 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              <span className="text-[12px] text-white/60">MOQ from <strong className="text-white/90 font-medium">50 pcs</strong> per style</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CATEGORY TABS ── */}
      <CategoryTabs currentCategory={category} />

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-[1200px] mx-auto py-6 px-4 sm:px-8 grid grid-cols-[240px_1fr] max-[900px]:grid-cols-1 gap-6 items-start">
        
        {/* ── SIDEBAR ── */}
        <FilterSidebar />

        {/* ── PRODUCT GRID AREA ── */}
        <div>
          
          {/* ── TOOLBAR ── */}
          <Toolbar />

          {/* Task 10: Loading UI with Suspense */}
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid category={category} searchParams={resolvedSearchParams} />
          </Suspense>

          {/* ── PAGINATION ── */}
          <Pagination />

        </div>
      </div>

      {/* ── FLOATING CART ── */}
      <FloatingCart />

      {/* ── QUICK VIEW MODAL WRAPPER ── */}
      <ClientModalWrapper />
    </>
  );
}