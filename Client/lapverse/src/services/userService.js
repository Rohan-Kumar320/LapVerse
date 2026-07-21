import api from "./api";

/* ---------------- Profile ---------------- */

export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

export const updateProfile = async (profileData) => {
  const { data } = await api.put(
    "/users/profile",
    profileData
  );
  return data;
};

export const uploadAvatar = async (formData) => {
  const { data } = await api.put(
    "/users/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const removeAvatar = async () => {
  const { data } = await api.delete(
    "/users/avatar"
  );

  return data;
};

/* ---------------- Addresses ---------------- */

/* ---------------- Addresses ---------------- */

export const getAddresses = async () => {
  const { data } = await api.get(
    "/users/addresses"
  );

  return data;
};

export const addAddress = async (
  addressData
) => {
  const { data } = await api.post(
    "/users/addresses",
    addressData
  );

  return data;
};

export const updateAddress = async (
  id,
  addressData
) => {
  const { data } = await api.put(
    `/users/addresses/${id}`,
    addressData
  );

  return data;
};

export const deleteAddress = async (
  id
) => {
  const { data } = await api.delete(
    `/users/addresses/${id}`
  );

  return data;
};

export const setDefaultAddress = async (
  id
) => {
  const { data } = await api.put(
    `/users/addresses/${id}/default`
  );

  return data;
};

export const requestAccountDeletion = async () => {

  const { data } = await api.delete(
    "/users/profile"
  );

  return data;

};

export const restoreAccount = async () => {
  const { data } = await api.put("/users/profile/restore");
  return data;
};