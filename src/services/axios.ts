import axios from "axios";
import * as qs from "qs";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./tokens";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  params: {},
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "comma" });
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  () => Promise.reject(),
);

axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const prevReq = error.config;

    if (error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !prevReq._retry) {
        prevReq._retry = true;

        try {
          const rs = await axiosInstance.post("/api/auth/token/refresh/", {
            refresh: getRefreshToken(),
          });
          const { access, refresh } = rs.data;
          setAccessToken(access);
          setRefreshToken(refresh);
          prevReq.headers.Authorization = `Bearer ${access}`;

          return axiosInstance(prevReq);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  },
);
