// src/auth/authService.js
// All authentication API calls — centralised under the auth/ module
import axiosInstance from "../services/axios";

export const register = async (username, firstName, lastName, email, password) => {
  const response = await axiosInstance.post("/auth/register", {
    username,
    firstName,
    lastName,
    email,
    password,
  });
  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await axiosInstance.post("/auth/verify", {
    email,
    code: otp,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const googleLogin = async (idToken) => {
  const response = await axiosInstance.post("/auth/google", {
    idToken,
  });
  return response.data;
};

export const completeGoogleSignup = async (username, password, email) => {
  const response = await axiosInstance.post("/auth/complete-google-signup", {
    username,
    password,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password", {
    email,
  });
  return response.data;
};

export const resetPassword = async (email, otp, newPassword) => {
  const response = await axiosInstance.post("/auth/reset-password", {
    email,
    otpCode: otp,
    newPassword,
  });
  return response.data;
};

export const resendOtp = async (email) => {
  const response = await axiosInstance.post("/auth/resend-otp", {
    email,
  });
  return response.data;
};

export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch {
    // Fail silently — token cleared locally regardless
  }
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};
