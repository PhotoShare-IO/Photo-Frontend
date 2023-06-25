import axios from "axios";
import * as qs from "qs";

const requestConfig = (config: any) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  params: {},
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "comma" });
  },
});

axiosInstance.interceptors.request.use(
  (config) => requestConfig(config),
  (error) => Promise.reject()
);

axiosInstance.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject()
);
