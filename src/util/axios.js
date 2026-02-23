import axios from "axios";

const local = "http://localhost:4000/";
const production = "https://order-handler-dashboard-back.vercel.app/";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? local : production);

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
