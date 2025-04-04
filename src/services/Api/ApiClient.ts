import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { endPoints } from "../urls";
import { ApiResponse, RequestConfig } from "./types";
import { ApiError } from "./Error";

export class ApiClient {
  private axiosInstance: AxiosInstance;
  public static apis = endPoints;

  constructor(baseURL: string, config: AxiosRequestConfig = {}) {
    this.axiosInstance = axios.create({ baseURL, ...config });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add common request logic here (e.g., auth headers)
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Add common error handling logic here
        return Promise.reject(error);
      }
    );
  }

  public setBaseURL(baseURL: string): void {
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  public setHeader(key: string, value: string): void {
    this.axiosInstance.defaults.headers.common[key] = value;
  }

  public removeHeader(key: string): void {
    delete this.axiosInstance.defaults.headers.common[key];
  }

  public async request<T = unknown>(
    config: RequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      throw this.normalizeError(error as AxiosError);
    }
  }

  private normalizeError(error: AxiosError): ApiError {
    if (error.isAxiosError) {
      return new ApiError(
        error.message,
        error.response?.status,
        error.config?.url,
        error.response?.data,
        error
      );
    }
    return new ApiError(
      "An unknown error occurred",
      undefined,
      undefined,
      undefined,
      error
    );
  }
}
