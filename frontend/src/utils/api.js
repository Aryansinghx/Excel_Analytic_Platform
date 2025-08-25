import axios from "axios";

// Read Vite env and normalize (remove trailing slash)
const ENV_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// Prefer Vite env if present; otherwise default to localhost:5000
const BASE_URL = ENV_URL ? `${ENV_URL}/api` : "http://localhost:5000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token on every request (if present)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
