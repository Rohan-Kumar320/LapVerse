import api from "./api";

export const getMySellerApplication =
  async () => {

    const { data } =
      await api.get(
        "/seller/application"
      );

    return data;

};

export const applySellerApplication =
  async (formData) => {

    const { data } =
      await api.post(
        "/seller/apply",
        formData
      );

    return data;

};

export const switchSellerMode = async (
  activeMode
) => {

  const { data } = await api.put(

    "/seller/switch",

    {
      activeMode,
    }

  );

  return data;

};

export const updateStock = async (id, stock) => {
  const { data } = await api.put(
    `/products/${id}/stock`,
    { stock }
  );

  return data;
};