'use client';

import { useState } from 'react';

export default function WishlistButton() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div 
      className={`absolute top-2.5 right-2.5 w-[28px] h-[28px] rounded-full bg-white/90 border flex items-center justify-center cursor-pointer transition-all duration-150 backdrop-blur-[4px] text-[14px] hover:bg-white hover:border-border2 hover:scale-110 ${isWishlisted ? 'text-[#c0392b] border-border-main' : 'border-border-main'}`}
      onClick={toggleWishlist}
    >
      {isWishlisted ? '❤️' : '🤍'}
    </div>
  );
}