import axios from "axios";
import * as qs from "qs";

const requestConfig = (config: any) => {
    console.log(config);
    return config;
}

const responseConfig = (config: any) => {
    console.log(config);
    return config;
}

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  params: {},
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "comma" });
  },
});

axiosInstance.interceptors.request.use(
    (config) => requestConfig(config),
    (error) => Promise.reject(),
)

axiosInstance.interceptors.response.use(
    (config) => responseConfig(config),
    (error) => Promise.reject(),
)
