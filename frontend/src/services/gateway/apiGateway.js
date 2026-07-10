import axios from "axios";
import { getToken, removeToken } from "../../utils/token";
import { config } from "./config";

// Base function to create configured Axios clients
const createClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request Interceptor: Attach JWT token if logged in
  client.interceptors.request.use(
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
  client.interceptors.response.use(
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

  return client;
};

// Export domain-specific clients
export const authClient = createClient(config.authApiUrl);
export const usersClient = createClient(config.usersApiUrl);
export const productsClient = createClient(config.productsApiUrl);
export const searchClient = createClient(config.searchApiUrl);

export const apiGateway = {
  auth: authClient,
  users: usersClient,
  products: productsClient,
  search: searchClient,
};
