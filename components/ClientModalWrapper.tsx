'use client';

import dynamic from 'next/dynamic';

const QuickViewModalElement = dynamic(
  () => import('@/components/QuickViewModal'),
  { 
    ssr: false, 
    loading: () => <div style={{ display: 'none' }}>Loading Modal Context...</div> 
  }
);

export default function ClientModalWrapper() {
  return <QuickViewModalElement />;
}