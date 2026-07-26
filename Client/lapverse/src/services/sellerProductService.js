import api from "./api";

export const createProduct = async (formData) => {
  const { data } = await api.post(
    "/products",
    formData
  );

  return data;
};

export const getMyProducts = async () => {
  const { data } = await api.get(
    "/products/seller/my-products"
  );

  return data;
};

// NEW

export const getSellerProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`);

  return data.product;
};
// NEW

export const updateSellerProduct = async (
  id,
  formData
) => {

  const { data } = await api.put(

    `/products/${id}`,

    formData

  );

  return data;

};

export const deleteSellerProduct = async (id) => {

  const { data } = await api.delete(
    `/products/seller/${id}`
  );

  return data;

};