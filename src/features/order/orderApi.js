import axiosInstance from "../../util/axios";

export const addOrder = async (data) => {
  const response = await axiosInstance.post("/add-order", data);

  return response.data;
};
