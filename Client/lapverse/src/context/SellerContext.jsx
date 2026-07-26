import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  applySellerApplication,
  getMySellerApplication,
  switchSellerMode
} from "../services/sellerService";

import { useAuth } from "./AuthContext";

const SellerContext = createContext();

export const SellerProvider = ({
  children,
}) => {

  const {
    user,
    refreshUser
  } = useAuth();

  const [
    application,
    setApplication,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

const activeMode =
  user?.activeMode ||
  localStorage.getItem("activeMode") ||
  "user";

useEffect(() => {

const initSeller = async () => {

    if (!user) {
        setApplication(null);
        setLoading(false);
        return;
    }

    await refreshSeller();

};  initSeller();

}, [user]);
  const refreshSeller = async () => {

    if (!user) return;

    try {

      setLoading(true);

      const data =
        await getMySellerApplication();

      setApplication(
        data.application
      );

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  const submitApplication =
    async (formData) => {

      try {

        setLoading(true);

        const data =
          await applySellerApplication(
            formData
          );

        toast.success(
          data.message
        );

        await refreshSeller();

        return {

          success: true,

          message:
            data.message,

        };

      }

      catch (error) {

        toast.error(

          error.response?.data?.message ||

          "Unable to submit seller application."

        );

        return {

          success: false,

          message:

            error.response?.data?.message ||

            "Unable to submit seller application.",

        };

      }

      finally {

        setLoading(false);

      }

    };

const changeMode = async (
  mode
) => {

  try {

    setLoading(true);

    await switchSellerMode(mode);

    await refreshUser();

    localStorage.setItem(
      "activeMode",
      mode
    );

    toast.success(
      `Switched to ${mode} mode.`
    );

  }

  catch (error) {

toast.error(
  error.response?.data?.message ||
  "Unable to switch mode."
);
  }

  finally {

    setLoading(false);

  }

};



  const applicationStatus =
    application

      ? application.status

      : "not_applied";

  const isSeller =
    user?.roles?.includes(
      "seller"
    );

  return (

    <SellerContext.Provider

      value={{

        application,

        applicationStatus,

        loading,

        activeMode,

        isSeller,

        submitApplication,

        refreshSeller,

        changeMode,

      }}

    >

      {children}

    </SellerContext.Provider>

  );

};

export const useSeller = () =>
  useContext(SellerContext);