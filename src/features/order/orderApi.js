import axiosInstance from "../../util/axios";

export const addOrder = async (data) => {
  const response = await axiosInstance.post("/add-order", data);
  return response.data;
};
export const getAllOrder = async ({ pageNo, perPage }) => {
  const response = await axiosInstance.get(`all-order/${pageNo}/${perPage}`);
  return response.data;
};
export const getSingleOrder = async (orderNumber) => {
  const response = await axiosInstance.get(`order/${orderNumber}`);
  return response.data;
};
