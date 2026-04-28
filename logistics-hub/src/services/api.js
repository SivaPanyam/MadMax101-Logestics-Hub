import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Configure automatic retries for network errors or idempotent 5xx errors
axiosRetry(api, { 
  retries: 3, 
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED';
  }
});

// Global response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.detail || error.message || 'An unexpected error occurred',
      status: error.response?.status,
      code: error.code
    };
    console.error('[API Error]:', customError);
    return Promise.reject(customError);
  }
);

export const fetchShipments = () => api.get('/shipments/');
export const fetchAlerts = () => api.get('/alerts');
export const fetchMetrics = () => api.get('/metrics');
export const getRiskPrediction = (id) => api.get(`/risk/${id}`);
export const optimizeRoute = (params) => api.post('/optimize-route', params);
export const runSimulation = (params) => api.post('/simulate', params);

export default api;
