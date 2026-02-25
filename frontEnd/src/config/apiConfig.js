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
    GET_PROFILE: '/api/user/profile',
    CHANGE_PASSWORD: '/api/user/change-password',
    NOTIFICATIONS: '/api/user/notifications',
    EDUCATION: '/api/user/education',
    PROJECTS: '/api/user/projects',
    SAVED_JOBS: '/api/user/saved-jobs',
  },
  COMPANY: {
    GET_ALL: '/api/company/get',
    CREATE: '/api/company/register',
    UPDATE: '/api/company/update',
    PUBLIC: '/api/company/public',
  },
  JOB: {
    GET_ALL: '/api/job/get',
    CREATE: '/api/job/post',
    UPDATE: '/api/job/update',
    ADMIN: '/api/job/getadminjobs',
  },
  APPLICATION: {
    GET_ALL: '/api/application/get',
    CREATE: '/api/application/apply',
    UPDATE: '/api/application/status',
    APPLICANTS: '/api/application',
  },
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
  },
};

export default apiConfig;
