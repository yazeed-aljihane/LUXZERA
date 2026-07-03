// src/services/axios.js
import axios from "axios";
import { getToken, removeToken } from "../utils/token";

export const API_BASE_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8081/api"
    : "https://zera-server.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT token if logged in
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    const url = config.url || "";
    const isAuthEndpoint = url.startsWith("/auth/");
    const isSearchEndpoint = url.startsWith("/search/");
    const requiresToken =
      token &&
      (!isAuthEndpoint || url.startsWith("/auth/complete-google-signup")) &&
      !isSearchEndpoint;

    if (requiresToken) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Clean up local auth session if token is invalid or expired
      if (error.response.status === 401) {
        removeToken();
        // Redirect to homepage/login if needed
        if (window.location.pathname !== "/" && window.location.pathname !== "/login") {
          window.location.href = "/";
        }
      }
      return Promise.reject(error.response.data || error.response);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
