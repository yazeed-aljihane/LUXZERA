import { usersClient } from "../gateway/apiGateway";

export const getProfileDetails = async (userId) => {
  const response = await usersClient.get(`/profile/${userId}`);
  return response.data;
};

export const updateProfile = async (userId, profileData, fileInput) => {
  const formData = new FormData();

  // 1. Package the text profile data as a JSON blob for the @RequestPart handler
  formData.append(
    "profile",
    new Blob([JSON.stringify({
      phoneNumber: profileData.phoneNumber,
      gender: profileData.gender,
      dateOfBirth: profileData.dateOfBirth,
      bio: profileData.bio
    })], { type: "application/json" })
  );

  // 2. Append the actual raw binary image file from the input component
  if (fileInput && fileInput.files && fileInput.files[0]) {
    formData.append("image", fileInput.files[0]);
  }

  // 3. Dispatch straight to our cloud-connected Spring Boot server
  const response = await usersClient.put(`/profile/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  console.log("Image safely stored in the cloud:", response.data.profilePicture);
  return response.data;
};

export const getMeasurements = async (userId) => {
  const response = await usersClient.get(`/measurements/${userId}`);
  return response.data;
};

export const saveMeasurements = async (userId, measurements) => {
  const response = await usersClient.put(`/measurements/${userId}`, {
    topSize: measurements.topSize,
    bottomSize: measurements.bottomSize,
    shoeSize: measurements.shoeSize,
    fitPreference: measurements.fitPreference,
  });
  return response.data;
};

export const getAddresses = async (userId) => {
  const response = await usersClient.get(`/addresses/${userId}`);
  return response.data;
};

export const createAddress = async (userId, address) => {
  const response = await usersClient.post(`/addresses/${userId}`, address);
  return response.data;
};

export const updateAddress = async (userId, address) => {
  const addressId = address.id || address.addressId;
  const response = await usersClient.put(`/addresses/${userId}/${addressId}`, address);
  return response.data;
};

export const deleteAddress = async (userId, addressId) => {
  const response = await usersClient.delete(`/addresses/${userId}/${addressId}`);
  return response.data;
};

export const setDefaultAddress = async (userId, addressId) => {
  const response = await usersClient.patch(`/addresses/${userId}/${addressId}/default`);
  return response.data;
};

export const updateUserDetails = async (userId, userDetails) => {
  const response = await usersClient.put(`/users/${userId}`, {
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
  });
  return response.data;
};

export const deleteAccount = async (userId) => {
  const response = await usersClient.delete(`/users/${userId}`);
  return response.data;
};

export const getWishlist = async (userId) => {
  try {
    const response = await usersClient.get(`/wishlist/${userId}`);
    return response.data;
  } catch (err) {
    const stored = localStorage.getItem(`luxzera-wishlist-${userId}`);
    return stored ? JSON.parse(stored) : [];
  }
};

export const toggleWishlist = async (userId, product) => {
  try {
    await usersClient.post(`/wishlist/${userId}/${product.id || product.productId}`);
    const response = await usersClient.get(`/wishlist/${userId}`);
    return response.data;
  } catch (err) {
    const stored = localStorage.getItem(`luxzera-wishlist-${userId}`);
    let list = stored ? JSON.parse(stored) : [];
    const prodId = product.id || product.productId;
    if (list.some(p => p.productId === prodId)) {
      list = list.filter(p => p.productId !== prodId);
    } else {
      list.push({
        productId: prodId,
        productName: product.name || product.productName,
        imageUrl: product.image || product.imageUrl,
        price: product.price,
        salePrice: product.salePrice || null
      });
    }
    localStorage.setItem(`luxzera-wishlist-${userId}`, JSON.stringify(list));
    return list;
  }
};
