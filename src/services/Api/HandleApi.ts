import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
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

const getToken = (): string | null => {
  return localStorage.getItem('token'); // or sessionStorage
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
// export const encodeBase64 = (data: any): string => {
//   const jsonString = JSON.stringify(data);

//   const bytes = new TextEncoder().encode(jsonString);

//   let binary = "";
//   bytes.forEach((byte) => {
//     binary += String.fromCharCode(byte);
//   });

//   return btoa(binary);
// };

export const postRequest = async <T>(endPoint: string, body: any, options: RequestOptions = {}): Promise<T> => {
  const response: AxiosResponse<T> = await AxiosInstance.post(endPoint, body, options);
  return response.data;
};
// export const postRequest = async <T>(
//   endPoint: string,
//   body: any,
//   options: RequestOptions = {}
// ): Promise<T> => {
//   const encodedData = encodeBase64(body);

//   const response: AxiosResponse<T> = await AxiosInstance.post(
//     endPoint,
//     {
//       data: encodedData,
//     },
//     options
//   );

//   return response.data;
// };

export const putRequest = async <T>(endPoint: string, body: any, options: RequestOptions = {}): Promise<T> => {
  const response: AxiosResponse<T> = await AxiosInstance.put(endPoint, body, options);
  return response.data;
};

export const deleteRequest = async <T>(endPoint: string, options: RequestOptions = {}): Promise<T> => {
  const response: AxiosResponse<T> = await AxiosInstance.delete(endPoint, options);
  return response.data;
};




export const getRequestSimple = async <T>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  const token = getToken();
  const response: AxiosResponse<T> = await axios.get(import.meta.env.VITE_API_BASE_URL + url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return response.data;
};
export const postRequestSimple = async <T>(
  url: string,
  body: any,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  const token = getToken();

  const response: AxiosResponse<T> = await axios.post(
    import.meta.env.VITE_API_BASE_URL + url,
    body,
    {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );

  return response.data;
};