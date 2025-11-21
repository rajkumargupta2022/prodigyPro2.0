import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import AxiosInstance from './AxiosInstance';

type RequestOptions = AxiosRequestConfig & {
  showLoader?: boolean;
  retry?: number;
  retryDelayMs?: number;
};

const shouldRetry = (error: AxiosError) => {
  const status = error.response?.status;
  if (!status) return true; // network/timeout
  return status >= 500 && status < 600;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getRequest = async <T>(endPoint: string, options: RequestOptions = {}): Promise<T> => {
  const retry = options.retry ?? 0;
  const retryDelayMs = options.retryDelayMs ?? 500;
  let attempt = 0;
  while (true) {
    try {
      const response: AxiosResponse<T> = await AxiosInstance.get(endPoint, options);
      return response.data;
    } catch (error: any) {
      if (attempt < retry && error?.isAxiosError && shouldRetry(error)) {
        attempt += 1;
        await delay(retryDelayMs * attempt);
        continue;
      }
      throw error;
    }
  }
};

export const postRequest = async <T>(endPoint: string, body: any, options: RequestOptions = {}): Promise<T> => {
  const response: AxiosResponse<T> = await AxiosInstance.post(endPoint, body, options);
  return response.data;
};

export const putRequest = async <T>(endPoint: string, body: any, options: RequestOptions = {}): Promise<T> => {
  const response: AxiosResponse<T> = await AxiosInstance.put(endPoint, body, options);
  return response.data;
};

export const deleteRequest = async <T>(endPoint: string, options: RequestOptions = {}): Promise<T> => {
  const response: AxiosResponse<T> = await AxiosInstance.delete(endPoint, options);
  return response.data;
};
