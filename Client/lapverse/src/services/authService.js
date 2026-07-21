import api from "./api";

export const registerUser = async (userData) => {
  const { data } = await api.post("/users/register", userData);

  return data;
};

export const loginUser = async (userData) => {
  const { data } = await api.post("/users/login", userData);

  return data;
};

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

export const uploadAvatar = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

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

export const removeAvatar =
  async () => {

    const { data } =
      await api.delete(
        "/users/avatar"
      );

    return data;

};

export const changePassword = async (passwordData) => {
  const { data } = await api.put(
    "/users/change-password",
    passwordData
  );

  return data;
};