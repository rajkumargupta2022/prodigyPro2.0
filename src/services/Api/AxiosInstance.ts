import axios, { AxiosError } from "axios";
import { baseUrl } from "../utils/urls";
import { showLoader, hideLoader } from "../Loader/LoaderController";

let activeRequests = 0;

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const shouldShow = (config as any).showLoader !== false;
    if (shouldShow) {
      activeRequests += 1;
      if (activeRequests === 1) showLoader();
    }
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any)["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    const shouldShow = (response.config as any).showLoader !== false;
    if (shouldShow) {
      activeRequests = Math.max(0, activeRequests - 1);
      if (activeRequests === 0) hideLoader();
    }
    return response;
  },
  (error: AxiosError) => {
    const config = (error.config || {}) as any;
    const shouldShow = config.showLoader !== false;
    if (shouldShow) {
      activeRequests = Math.max(0, activeRequests - 1);
      if (activeRequests === 0) hideLoader();
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
