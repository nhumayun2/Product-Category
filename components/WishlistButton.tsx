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
      className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
      onClick={toggleWishlist}
    >
      {isWishlisted ? '❤️' : '🤍'}
    </div>
  );
}