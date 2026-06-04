export default function ProductGridSkeleton() {
  const skeletonCards = Array.from({ length: 9 });

  return (
    <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 gap-[1.1rem]">
      {skeletonCards.map((_, i) => (
        <div 
          key={i} 
          className="bg-surface border border-border-main rounded-[14px] shadow-DEFAULT overflow-hidden flex flex-col opacity-60 animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="aspect-[3/4] bg-border-main shrink-0"></div>
          
          {/* Details Placeholder */}
          <div className="p-4 flex-1 flex flex-col">
            <div className="h-[10px] w-[40%] bg-border-main mb-2 rounded"></div>
            <div className="h-[14px] w-[80%] bg-border-main mb-3 rounded"></div>
            <div className="h-[10px] w-[60%] bg-border-main mb-4 rounded"></div>
            
            {/* Footer Placeholder */}
            <div className="flex items-end justify-between mt-auto">
              <div className="h-[20px] w-[30%] bg-border-main rounded"></div>
              <div className="h-[30px] w-[30%] bg-border-main rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}