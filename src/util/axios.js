import axios from "axios";
// http://localhost:4000
const axiosInstance = axios.create({
  baseURL: "https://order-handler-dashboard-back.vercel.app/",
  withCredentials: true,
});

export default axiosInstance