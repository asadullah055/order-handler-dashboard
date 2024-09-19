import axiosInstance from "../../util/axios";

export const sellerRegistration = async (data) => {
  const response = await axiosInstance.post("registration", data);

  return response.data;
};
export const sellerLogin = async (data) => {
  const response = await axiosInstance.post("seller-login", data);

  return response.data;
};
export const getSeller = async () => {
  const response = await axiosInstance.get("get-seller");
 
  return response.data;
};
export const updateSellerProfile = async (data) => {

  
  const response = await axiosInstance.put("update-profile", data);
 
  return response.data;
};
