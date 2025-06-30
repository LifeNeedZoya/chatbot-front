import axios from "axios";

export const BASE_API_URL = "https://chat-backend-73fu.onrender.com/api";

const instanceAxios = axios.create({
  baseURL: BASE_API_URL,
  timeout: 100000,
});

export default instanceAxios;

instanceAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);
