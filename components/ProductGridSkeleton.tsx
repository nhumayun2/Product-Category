export default function ProductGridSkeleton() {
  const skeletonCards = Array.from({ length: 9 });

  return (
    <div className="product-grid" id="productGrid">
      {skeletonCards.map((_, i) => (
        <div key={i} className="product-card" style={{ opacity: 0.6, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
          <div className="product-thumb" style={{ background: '#E0DDD6' }}></div>
          <div className="product-info">
            <div style={{ height: '10px', width: '40%', background: '#E0DDD6', marginBottom: '8px', borderRadius: '4px' }}></div>
            <div style={{ height: '14px', width: '80%', background: '#E0DDD6', marginBottom: '12px', borderRadius: '4px' }}></div>
            <div style={{ height: '10px', width: '60%', background: '#E0DDD6', marginBottom: '16px', borderRadius: '4px' }}></div>
            
            <div className="product-footer" style={{ marginTop: 'auto', borderTop: 'none' }}>
              <div style={{ height: '20px', width: '30%', background: '#E0DDD6', borderRadius: '4px' }}></div>
              <div style={{ height: '30px', width: '30%', background: '#E0DDD6', borderRadius: '8px' }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}