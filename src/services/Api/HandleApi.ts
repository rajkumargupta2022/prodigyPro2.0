import { AxiosResponse } from 'axios';
import AxiosInstance from './AxiosInstance';

export const postRequest = async <T>(endPoint: string, body: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await AxiosInstance.post(endPoint, body);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getRequest = async <T>(endPoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await AxiosInstance.get(endPoint);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
