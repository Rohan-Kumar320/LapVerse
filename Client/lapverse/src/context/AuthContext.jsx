import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile as updateProfileService,
  uploadAvatar as uploadAvatarService,
removeAvatar as removeAvatarService,
changePassword
} from "../services/authService";
import { requestAccountDeletion, restoreAccount } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const profile = await getProfile();
      setUser(profile);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
  const data = await updateProfileService(profileData);

  setUser(data.user);

  return data;
};

const uploadAvatar = async (file) => {
  const data = await uploadAvatarService(file);

  setUser(data.user);

  return data;
};

const login = async (credentials) => {

  const data = await loginUser(credentials);

  localStorage.setItem("token", data.token);

  // Fetch the latest profile
  await loadUser();

  return data;

};


  const register = async (userData) => {
    const data = await registerUser(userData);

    return data;
  };

  const removeAvatar = async () => {

  const data =
    await removeAvatarService();

  setUser(data.user);

  return data;

};

const updatePassword = async (passwordData) => {
  try {

    const data = await changePassword(passwordData);

    return {
      success: true,
      message: data.message,
    };

  } catch (error) {

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to change password.",
    };

  }
};

const deleteAccountRequest = async () => {

  try {

    const data = await requestAccountDeletion();

    // Refresh user immediately
    await loadUser();

    return {
      success: true,
      message: data.message,
    };

  } catch (error) {

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to submit deletion request.",
    };

  }

};

const restoreUserAccount = async () => {

  try {

    const data = await restoreAccount();

    await loadUser();

    return {
      success: true,
      message: data.message,
    };

  } catch (error) {

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to restore account.",
    };

  }

};

const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshUser: loadUser,
        updateProfile,
        uploadAvatar,
        removeAvatar,
        updatePassword,
        deleteAccountRequest,
        restoreUserAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);