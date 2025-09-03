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
  orderNumber = "",
  date = {},
  receivedDate = {},
  dfMailDate = {},
  settled = "",
}) => {
  const response = await axiosInstance.get("/all-order", {
    params: {
      pageNo,
      perPage,
      orderStatus,
      claim,
      orderNumber,
      date,
      receivedDate,
      dfMailDate,
      settled,
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
  const response = await axiosInstance.put(`update-bulk-order/`, data);
  return response.data;
};
export const getUnsettledOrder = async ({ pageNo = 1, perPage = 20 }) => {
  const response = await axiosInstance.get(`un-settled-order/`, {
    params: {
      pageNo,
      perPage,
    },
  });
  return response.data;
};
export const getReturnOrder = async ({ pageNo = 1, perPage = 20 }) => {
  const response = await axiosInstance.get(`return-order/`, {
    params: {
      pageNo,
      perPage,
    },
  });
  return response.data;
};
export const getTransitOrder = async ({ pageNo = 1, perPage = 20 }) => {
  const response = await axiosInstance.get(`transit-order/`, {
    params: {
      pageNo,
      perPage,
    },
  });
  return response.data;
};
export const getDfOrder = async ({ pageNo = 1, perPage = 20 }) => {
  const response = await axiosInstance.get(`delivery-failed-order/`, {
    params: {
      pageNo,
      perPage,
    },
  });
  return response.data;
};
