import axios from 'axios';

// Create a new axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // Set base URL for your API
});

// Add an interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Attach token to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default axiosInstance;
