'use client';

import dynamic from 'next/dynamic';

const QuickViewModalElement = dynamic(
  () => import('@/components/QuickViewModal'),
  { 
    ssr: false, 
    loading: () => <div className="hidden">Loading Modal Context...</div> 
  }
);

export default function ClientModalWrapper() {
  return <QuickViewModalElement />;
}