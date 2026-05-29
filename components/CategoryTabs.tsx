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
    <div className="cat-tabs-wrapper">
      <div className="cat-tabs" id="catTabs">
        {tabs.map((tab) => (
          <div 
            key={tab.id}
            className={`cat-tab ${currentCategory === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className="cat-tab-icon">{tab.icon}</span> 
            {tab.label} 
            <span className="cat-count">{tab.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}