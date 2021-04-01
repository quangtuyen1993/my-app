import axios from "axios";
import { BASE_URL } from "../redux/URL";
import { CookieManger } from "./CookieManager";




const AxiosAuthor = axios.create({
  baseURL: BASE_URL,
});

AxiosAuthor.interceptors.request.use((request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

AxiosAuthor.interceptors.response.use((response) => {
  console.log("Response:", JSON.stringify(response, null, 2));
  return response;
});

export const refreshHeader = (jwtToken) => {
  AxiosAuthor.defaults.headers.common['Authorization'] = "Bearer " + jwtToken;
};

export default AxiosAuthor;
