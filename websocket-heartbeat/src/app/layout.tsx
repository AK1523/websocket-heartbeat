import './globals.css';
import React from 'react';
import ClientLayout from './clientLayout';

export const metadata = {
  title: 'WebSocket App',
  description: 'Realtime app with reconnect and offline support',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
