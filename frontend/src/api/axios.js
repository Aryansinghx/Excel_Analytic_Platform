import axios from "axios";

// Read from Vite env (client-visible vars must start with VITE_)
const ENV = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// Fallback to localhost if env is missing
const BASE_URL = ENV || "http://localhost:5000";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // keep only if backend uses cookies; otherwise remove
});

// Attach token on each request
api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("token");
    const token = adminToken || userToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
