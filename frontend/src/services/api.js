import axios from 'axios';

// Central Axios API Service Instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Request Interceptor: Attach JWT Bearer Token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Catch global error status codes
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token on 401 Unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user_role');
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
  getAdminConsole: () => api.get('/auth/admin-dashboard')
};

// Weather API
export const weatherAPI = {
  getWeather: (location) => api.get('/weather', { params: { location } })
};

// Crop & Fertilizer API
export const cropAPI = {
  recommendCrop: (data) => api.post('/crops/recommend', data),
  recommendFertilizer: (data) => api.post('/crops/fertilizer', data)
};

// Leaf Disease Detection API
export const diseaseAPI = {
  detectDisease: (formData) => api.post('/disease/detect', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

// Mandi Commodity Prices API
export const mandiAPI = {
  getPrices: (params) => api.get('/mandi/prices', { params })
};

// Government Schemes API
export const schemeAPI = {
  getSchemes: (params) => api.get('/schemes', { params }),
  getSchemeById: (id) => api.get(`/schemes/${id}`)
};

// Blogs API
export const blogAPI = {
  getBlogs: (params) => api.get('/blogs', { params }),
  getBlogById: (id) => api.get(`/blogs/${id}`)
};

// Contact API
export const contactAPI = {
  submitMessage: (data) => api.post('/contact', data),
  getMessages: () => api.get('/contact/messages')
};

// AI Chat Assistant API
export const chatAPI = {
  sendMessage: (message) => api.post('/chat', { message })
};

export default api;
