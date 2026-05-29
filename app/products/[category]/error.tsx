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
    <div 
      className="main-layout" 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        width: '100%'
      }}
    >
      <div 
        className="sidebar-card" 
        style={{ 
          maxWidth: '500px', 
          width: '100%', 
          textAlign: 'center', 
          padding: '2.5rem' 
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="var(--amber)" 
            strokeWidth="1.5"
            style={{ margin: '0 auto' }}
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        
        <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '1rem' }}>
          Something went wrong!
        </h2>
        
        <p style={{ color: 'var(--text2)', fontSize: '14px', lineHeight: '1.6', marginBottom: '2rem' }}>
          {error.message || "We encountered an unexpected issue while loading the apparel catalog. Please try reloading."}
        </p>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button 
            className="btn-secondary" 
            onClick={() => window.location.href = '/products/all'}
            style={{ padding: '10px 20px' }}
          >
            Back to Catalog
          </button>
          
          <button 
            className="btn-primary" 
            onClick={() => reset()}
            style={{ padding: '10px 24px' }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}