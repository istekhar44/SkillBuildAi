/**
 * API Configuration
 * Handles environment-specific API URLs and settings
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011';
const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development';

export const apiConfig = {
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getApiUrl = (endpoint) => {
  return `${API_URL}${endpoint}`;
};

export const isProduction = NODE_ENV === 'production';
export const isDevelopment = NODE_ENV === 'development';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/user/register',
    LOGIN: '/api/user/login',
    LOGOUT: '/api/user/logout',
    UPDATE_PROFILE: '/api/user/profile/update',
  },
  COMPANY: {
    GET_ALL: '/api/company/get',
    CREATE: '/api/company/register',
    UPDATE: '/api/company/update',
  },
  JOB: {
    GET_ALL: '/api/job/get',
    CREATE: '/api/job/post',
    UPDATE: '/api/job/update',
  },
  APPLICATION: {
    GET_ALL: '/api/application/get',
    CREATE: '/api/application/apply',
    UPDATE: '/api/application/status',
  },
};

export default apiConfig;
