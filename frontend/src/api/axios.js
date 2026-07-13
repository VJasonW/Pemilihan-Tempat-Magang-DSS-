// ============================================================
// Instance Axios global dengan interceptor untuk menyisipkan
// JWT token secara otomatis ke setiap request.
// ============================================================
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('internmatch_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      // Token invalid/expired -> biarkan komponen pemanggil menangani redirect
    }
    return Promise.reject(err);
  }
);

export default api;
