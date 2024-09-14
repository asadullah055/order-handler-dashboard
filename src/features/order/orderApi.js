import axiosInstance from "../../util/axios";

export const addOrder = async (data) => {
  const response = await axiosInstance.post("add-order", data);
  return response.data;
};
export const getAllOrder = async ({
  pageNo = 1,
  perPage = 20,
  orderStatus = "",
  claim = "",
  claimType = "",
  orderNumber = "",
}) => {
  const response = await axiosInstance.get("/all-order", {
    params: {
      pageNo,
      perPage,
      orderStatus,
      claim,
      claimType,
      orderNumber,
    },
  });
  return response.data;
};
export const getSingleOrder = async (orderNumber) => {
  const response = await axiosInstance.get(`order/${orderNumber}`);
  return response.data;
};
export const updateSingleOrder = async ({ orderNumber, data }) => {
  const response = await axiosInstance.put(
    `update-single-order/${orderNumber}`,
    data
  );
  return response.data;
};
export const updateBulkOrder = async (data) => {
  const response = await axiosInstance.put(
    `update-bulk-order/`,
    data
  );
  return response.data;
};
