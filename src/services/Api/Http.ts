import { ApiClient } from "./ApiClient";
import { RequestConfig } from "./types";
import { AxiosRequestConfig } from "axios";
import { baseUrl } from "../urls";
import { ApiError } from "./Error";

class Http extends ApiClient {
  private static instance: Http;

  public get<T = unknown>(url: string, config?: RequestConfig) {
    return this.request<T>({ ...config, method: "GET", url });
  }

  public static getInstance(
    baseURL?: string,
    config?: AxiosRequestConfig
  ): Http {
    if (!Http.instance) {
      if (!baseURL)
        throw new Error("Base URL is required for initial instantiation");
      Http.instance = new Http(baseURL, config);
    }
    return Http.instance;
  }

  public post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: RequestConfig
  ) {
    return this.request<T>({ ...config, method: "POST", url, data });
  }

  public put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: RequestConfig
  ) {
    return this.request<T>({ ...config, method: "PUT", url, data });
  }

  public patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: RequestConfig
  ) {
    return this.request<T>({ ...config, method: "PATCH", url, data });
  }

  public delete<T = unknown>(url: string, config?: RequestConfig) {
    return this.request<T>({ ...config, method: "DELETE", url });
  }
}

const instance = Http.getInstance(baseUrl);

export { Http, ApiError, instance as http };
