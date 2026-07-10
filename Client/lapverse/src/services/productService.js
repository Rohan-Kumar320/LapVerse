import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getLatestProducts = async () => {
  const response = await api.get("/products");

  const latest = response.data.products
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 8);

  return latest;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getRelatedProducts = async (
  category,
  currentProductId
) => {
  const response = await api.get("/products");

  const products = response.data.products.filter(
    (product) =>
      product.category === category &&
      product._id !== currentProductId
  );

  return products.slice(0, 4);
};