import axiosInstance from "./axios";

export const getProfileDetails = async (userId) => {
  const response = await axiosInstance.get(`/profile/${userId}`);
  return response.data;
};

export const updateProfile = async (userId, profile) => {
  const response = await axiosInstance.put(`/profile/${userId}`, {
    phoneNumber: profile.phoneNumber,
    gender: profile.gender,
    dateOfBirth: profile.dateOfBirth,
    bio: profile.bio,
  });
  return response.data;
};

export const saveMeasurements = async (userId, measurements) => {
  const response = await axiosInstance.put(`/measurements/${userId}`, {
    topSize: measurements.topSize,
    bottomSize: measurements.bottomSize,
    shoeSize: measurements.shoeSize,
    fitPreference: measurements.fitPreference,
  });
  return response.data;
};

export const getAddresses = async (userId) => {
  const response = await axiosInstance.get(`/addresses/${userId}`);
  return response.data;
};

export const createAddress = async (userId, address) => {
  const response = await axiosInstance.post(`/addresses/${userId}`, address);
  return response.data;
};

export const updateAddress = async (userId, address) => {
  const addressId = address.id || address.addressId;
  const response = await axiosInstance.put(`/addresses/${userId}`, {
    ...address,
    id: addressId,
  });
  return response.data;
};

export const setDefaultAddress = async (userId, addressId) => {
  const response = await axiosInstance.patch(`/addresses/${userId}/${addressId}/default`);
  return response.data;
};
