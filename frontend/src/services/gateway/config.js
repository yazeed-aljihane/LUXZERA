export const config = {
  authApiUrl: import.meta.env.VITE_AUTH_API_URL || "http://localhost:8081/api",
  usersApiUrl: import.meta.env.VITE_USERS_API_URL || "http://localhost:8081/api",
  productsApiUrl: import.meta.env.VITE_PRODUCTS_API_URL || "http://localhost:8081/api",
  searchApiUrl: import.meta.env.VITE_SEARCH_API_URL || "http://localhost:8081/api",
};
