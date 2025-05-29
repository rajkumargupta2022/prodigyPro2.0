import axios from "axios"
import { baseUrl } from "../urls"

const AxiosInstance = axios.create({
  baseURL: baseUrl,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Use your token key here
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;