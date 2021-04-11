import axios from "axios";
import { BASE_URL } from "../redux/URL";
import { CookieManger } from "./CookieManager";
const axiosApp = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer "+CookieManger.GetRefreshCookie(),
  },
});

axiosApp.interceptors.request.use((request) => {
  return request;
});

axiosApp.interceptors.response.use((response) => {
  return response;
});

export default axiosApp;
