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
  // console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

axiosApp.interceptors.response.use((response) => {
  // console.log("Response:", JSON.stringify(response, null, 2));
  return response;
});

export default axiosApp;
