import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export function useWebSocket() {
  const socketRef = useRef(null);
  const { updateShipment, addAlert, updateMetrics, fetchShipments, fetchAlerts, fetchMetrics } = useStore();

  useEffect(() => {
    const connect = () => {
      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:8000/ws';
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket Connected');
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Real-time update received:', message);

        switch (message.type) {
          case 'SHIPMENT_UPDATE':
            updateShipment(message.data);
            break;
          case 'NEW_ALERT':
            addAlert(message.data);
            break;
          case 'METRICS_UPDATE':
            updateMetrics(message.data);
            break;
          case 'DATA_RELOAD':
            console.log(`Reloading ${message.data.type} data due to file change...`);
            if (message.data.type === 'SHIPMENTS') fetchShipments();
            if (message.data.type === 'ALERTS') fetchAlerts();
            if (message.data.type === 'METRICS') fetchMetrics();
            break;
          default:
            console.warn('Unknown message type:', message.type);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket Disconnected. Reconnecting in 5s...');
        setTimeout(connect, 5000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        ws.close();
      };

      socketRef.current = ws;
    };

    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [updateShipment, addAlert, updateMetrics]);

  return socketRef.current;
}
