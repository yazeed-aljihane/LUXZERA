// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { 
  login as apiLogin, 
  getCurrentUser as apiGetCurrentUser, 
  logout as apiLogout 
} from "../services/auth";
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
          const profile = await apiGetCurrentUser();
          setUser(profile);
        } catch (error) {
          console.error("Auto-login failed:", error);
        }
      }
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
        logout,
        refreshUser,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
