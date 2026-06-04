'use client';

import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Route Error Boundary caught an exception:", error);
  }, [error]);

  return (
    <div className="flex justify-center items-center min-h-[60vh] w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-6">
      <div className="bg-surface border border-border-main rounded-[14px] shadow-DEFAULT max-w-[500px] w-full text-center p-10">
        
        <div className="mb-6">
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            className="mx-auto text-amber"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        
        <h2 className="font-playfair text-[1.8rem] text-accent mb-4">
          Something went wrong!
        </h2>
        
        <p className="text-text2 text-[14px] leading-[1.6] mb-8">
          {error.message || "We encountered an unexpected issue while loading the apparel catalog. Please try reloading."}
        </p>
        
        <div className="flex gap-3 justify-center">
          <button 
            className="bg-surface2 text-text-main border border-border2 rounded-[10px] py-2.5 px-5 text-[13px] cursor-pointer font-dm-sans transition-all duration-150 hover:border-accent2 hover:text-accent" 
            onClick={() => window.location.href = '/products/all'}
          >
            Back to Catalog
          </button>
          
          <button 
            className="bg-accent text-white border-none rounded-[10px] py-2.5 px-6 text-[13px] font-medium cursor-pointer font-dm-sans transition-colors duration-150 hover:bg-accent2" 
            onClick={() => reset()}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}