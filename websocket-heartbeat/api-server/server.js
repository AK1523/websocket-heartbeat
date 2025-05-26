import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  const heartbeat = setInterval(() => {
    ws.send(JSON.stringify({ type: 'pong' }));
  }, 10000);

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    console.log('data :', data);
    if (data.type === 'ping') {
      ws.send(JSON.stringify({ type: 'pong' }));
    } else {
      console.log('Message from client:', data);
    }
  });

  ws.on('close', () => {
    clearInterval(heartbeat);
    console.log('Client disconnected');
  });
});

server.listen(8080, () => console.log('WebSocket server running on ws://localhost:8080'));
