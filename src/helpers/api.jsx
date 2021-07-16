import axios from "axios";
import { getAccessToken } from "../utils"

const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:4000/" : "/";



const platformApi = axios.create({
  baseURL: baseUrl,
  headers: {
    "content-Type": "application/json"
  }
});


platformApi.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

platformApi.interceptors.response.use(
  config => config,
  error => {
    console.log(error)
  }
);
export { platformApi, baseUrl };
