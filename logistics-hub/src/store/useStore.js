import { create } from 'zustand';
import * as api from '../services/api';

export const useStore = create((set, get) => ({
  shipments: [],
  alerts: [],
  metrics: {
    total_active_shipments: 0,
    critical_alerts: 0,
    system_health: '100%',
  },
  
  isLoadingShipments: false,
  isLoadingAlerts: false,
  isLoadingMetrics: false,
  error: null,
  
  updateShipment: (data) => set((state) => ({
    shipments: state.shipments.map(s => s.id === data.id ? { ...s, ...data } : s)
  })),

  addAlert: (alert) => set((state) => ({
    alerts: [alert, ...state.alerts]
  })),

  updateMetrics: (newMetrics) => set((state) => ({
    metrics: { ...state.metrics, ...newMetrics }
  })),

  fetchShipments: async () => {
    set({ isLoadingShipments: true, error: null });
    try {
      const res = await api.fetchShipments();
      set({ shipments: res.data, isLoadingShipments: false });
    } catch (err) {
      set({ error: err.message, isLoadingShipments: false });
    }
  },

  fetchAlerts: async () => {
    set({ isLoadingAlerts: true, error: null });
    try {
      const res = await api.fetchAlerts();
      set({ alerts: res.data, isLoadingAlerts: false });
    } catch (err) {
      set({ error: err.message, isLoadingAlerts: false });
    }
  },

  fetchMetrics: async () => {
    set({ isLoadingMetrics: true, error: null });
    try {
      const res = await api.fetchMetrics();
      set({ metrics: res.data, isLoadingMetrics: false });
    } catch (err) {
      set({ error: err.message, isLoadingMetrics: false });
    }
  },

  clearError: () => set({ error: null })
}));
