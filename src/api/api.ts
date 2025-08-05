// src/api/api.ts
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { API } from '../hooks/getEnv';

const cookies = new Cookies();

const API_GET = axios.create({
  baseURL: API, 
});

API_GET.interceptors.request.use((config) => {
  const token = cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API_GET.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = cookies.get('refreshToken');
        const res = await axios.post(`${API}/auth/refresh`, {
          refreshToken,
        });

        cookies.set('token', res.data.token, { path: '/' });
        originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
        return API_GET(originalRequest);
      } catch (err) {
        cookies.remove('token');
        cookies.remove('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API_GET;
