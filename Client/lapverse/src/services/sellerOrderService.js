import api from "./api";

export const getSellerOrders = async () => {
  const { data } = await api.get("/orders/seller");
  return data;
};

export const getSellerOrder = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data.order;
};

export const updateSellerOrderStatus = async (
  id,
  status
) => {
  const { data } = await api.put(
    `/orders/${id}/status`,
    { status }
  );

  return data;
};