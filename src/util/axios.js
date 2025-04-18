import axios from "axios";
const local = "http://localhost:4000/";
const production = "https://order-handler-dashboard-back.vercel.app/";
const axiosInstance = axios.create({
  baseURL: production,
  withCredentials: true,
});

export default axiosInstance;
