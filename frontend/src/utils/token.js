// src/utils/token.js

const TOKEN_KEY = "luxzera_token";

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    removeToken();
  }
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
  return !!getToken();
};
