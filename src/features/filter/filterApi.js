import axiosInstance from "../../util/axios";


export const totalOrder = async () => {
  const response = await axiosInstance.get("status-order");
  return response.data;
};