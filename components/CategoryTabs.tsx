'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryTabs({ currentCategory }: { currentCategory: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = [
    { id: 'all', label: 'All Products', icon: '🏷️', count: 96 },
    { id: 'tshirts', label: 'T-Shirts', icon: '👕', count: 24 },
    { id: 'hoodies', label: 'Hoodies & Sweatshirts', icon: '🧥', count: 18 },
    { id: 'polo', label: 'Polo Shirts', icon: '👔', count: 12 },
    { id: 'bags', label: 'Bags & Totes', icon: '👜', count: 16 },
    { id: 'caps', label: 'Caps & Headwear', icon: '🧢', count: 10 },
    { id: 'jackets', label: 'Jackets', icon: '🥼', count: 9 },
    { id: 'accessories', label: 'Accessories', icon: '🧤', count: 7 },
  ];

  const handleTabClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');

    router.push(`/products/${categoryId}?${params.toString()}`);
  };

  return (
    <div className="bg-surface border-b border-border-main sticky top-[56px] z-[150] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const isActive = currentCategory === tab.id;
          return (
            <div 
              key={tab.id}
              className={`flex items-center gap-2 px-[18px] h-[48px] border-b-2 text-[13px] cursor-pointer whitespace-nowrap transition-all duration-150 select-none hover:text-accent ${isActive ? 'text-accent border-accent font-semibold' : 'border-transparent text-text2 font-medium'}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <span className="text-[16px] opacity-80">{tab.icon}</span> 
              {tab.label} 
              <span className={`text-[10px] rounded-full py-[1px] px-[7px] font-semibold ${isActive ? 'bg-accent text-white' : 'bg-surface2 text-text3'}`}>
                {tab.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}