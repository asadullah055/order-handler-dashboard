import axiosInstance from "../../util/axios";


export const totalStatus = async () => {
  const response = await axiosInstance.get("status-order");
  return response.data;
};