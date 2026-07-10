// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { 
  login as apiLogin, 
  getCurrentUser as apiGetCurrentUser, 
  logout as apiLogout 
} from "../services/auth/authService";
import { setToken, getToken, removeToken } from "../utils/token";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login on mount if a token is present
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          // Race: give the server max 5 seconds before we give up and show UI
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Auth timeout")), 5000)
          );
          const profile = await Promise.race([apiGetCurrentUser(), timeoutPromise]);
          setUser(profile);
        } catch (error) {
          // Either the token is invalid OR the server is slow (cold start).
          // Either way — show the UI immediately, user can sign in manually.
          console.warn("Auto-login skipped:", error.message);
        }
      }

      // Enforce 800ms minimum loader for smooth transitions
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      // Store JWT token
      setToken(data.accessToken || data.token);
      // Fetch profile details
      const profile = await apiGetCurrentUser();
      setUser(profile);
      setLoading(false);
      return profile;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const loginWithToken = async (jwtToken) => {
    setLoading(true);
    try {
      setToken(jwtToken);
      const profile = await apiGetCurrentUser();
      setUser(profile);
      setLoading(false);
      return profile;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiLogout();
    } catch (error) {
      // Ignore API logout error
    } finally {
      removeToken();
      setUser(null);
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const profile = await apiGetCurrentUser();
      setUser(profile);
      return profile;
    } catch (error) {
      console.error("Failed to refresh user:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        loginWithToken,
        logout,
        refreshUser,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
