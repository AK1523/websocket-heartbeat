'use client';

import { useEffect, useState } from 'react';
import ErrorPage from './error';
import { connectWebSocket } from './lib/ws';
import { useOnlineStatus } from './customHook/useOnlineStatus';

export default function HomePage() {
  const isOnline = useOnlineStatus();
  console.log('isOnline :', isOnline);
  const [messages, setMessages] = useState<any[]>([]);
  const [wsConnected, setWsConnected] = useState<boolean | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  console.log('messages :', messages);

  useEffect(() => {
    setHasMounted(true);
    const status = localStorage.getItem('wsStatus');
    console.log('status :', status);
    setWsConnected(status === 'connected');
  }, []);

  useEffect(() => {
    if (isOnline) {
      connectWebSocket((msg) => {
        console.log('msg :', msg);
        setMessages((prev) => [...prev, msg]);
      });
    }
  }, [isOnline]);

  if (!hasMounted) {
    return null;
  }

  if (!isOnline && wsConnected !== true) {
    return <ErrorPage />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">WebSocket Messages</h1>
      <ul className="mt-4 space-y-2">
        {messages.map((msg, i) => (
          <li key={i} className="rounded bg-gray-100 p-2 shadow">
            {JSON.stringify(msg)}
          </li>
        ))}
      </ul>
    </div>
  );
}
