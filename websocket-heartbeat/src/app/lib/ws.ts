let socket: WebSocket | null = null;
let heartbeatInterval: NodeJS.Timeout;
const reconnectInterval = 5000;
let isReconnecting = false;

export const connectWebSocket = (onMessage: (msg: any) => void): void => {
  if (socket && socket.readyState === WebSocket.OPEN) return;

  socket = new WebSocket('ws://localhost:8080');

  socket.onopen = () => {
    console.log('WebSocket connected');
    isReconnecting = false;
    localStorage.setItem('wsStatus', 'connected');
    heartbeatInterval = setInterval(() => {
      socket?.send(JSON.stringify({ type: 'ping' }));
    }, 10000);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('data :', data);
    if (data.type !== 'pong') onMessage(data);
  };

  socket.onclose = () => {
    if (!isReconnecting) {
      isReconnecting = true;
      console.log('WebSocket closed. Reconnecting...');
      localStorage.setItem('wsStatus', 'disconnected');
      clearInterval(heartbeatInterval);
      setTimeout(() => connectWebSocket(onMessage), reconnectInterval);
    }
  };

  socket.onerror = () => {
    socket?.close();
  };
};