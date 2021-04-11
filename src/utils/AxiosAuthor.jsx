import axios from "axios";
import { BASE_URL } from "../redux/URL";
const AxiosAuthor = axios.create({
  baseURL: BASE_URL,
});

AxiosAuthor.interceptors.request.use((request) => {
  return request;
});

AxiosAuthor.interceptors.response.use((response) => {
  return response;
});

export const refreshHeader = (jwtToken) => {
  AxiosAuthor.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;
};

AxiosAuthor.CancelToken = axios.CancelToken;

export default AxiosAuthor;
