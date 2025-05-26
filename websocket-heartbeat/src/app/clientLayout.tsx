'use client';

import React, { useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('ServiceWorker registered'))
        .catch(err => console.error('ServiceWorker registration failed:', err));
    }
  }, []);

  return <>{children}</>;
}
