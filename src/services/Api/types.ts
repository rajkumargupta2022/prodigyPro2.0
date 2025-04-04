import { AxiosRequestConfig } from "axios";

export type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
};

export type RequestConfig = AxiosRequestConfig & {
  retries?: number;
  retryDelay?: number;
};
