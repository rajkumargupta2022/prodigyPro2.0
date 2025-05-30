import axios from "axios"
import { baseUrl } from "../utils/urls"
import { showLoader,hideLoader } from "../Loader/LoaderController";

const AxiosInstance = axios.create({
  baseURL: baseUrl,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    showLoader()
    const token = localStorage.getItem('token'); // Use your token key here
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    hideLoader()
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    // Hide loader when response received
    hideLoader();
    return response;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);

export default AxiosInstance;