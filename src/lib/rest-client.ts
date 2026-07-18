import { Injectable, Logger } from "@nestjs/common";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export type RestClientOptions = {
  baseUrl: string;
  accessToken?: string;
};

export type RestClientResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

@Injectable()
export class RestClient {
  private client: AxiosInstance;
  private logger = new Logger(RestClient.name);

  constructor(options: RestClientOptions) {
    this.client = axios.create({
      baseURL: options.baseUrl,
      headers: {
        ...(options?.accessToken && {
          authorization: `Bearer ${options?.accessToken}`,
        }),
        "Content-Type": "application/json",
      },
    });
  }

  async post<T>(
    url: string,
    data: any,
    options?: AxiosRequestConfig,
  ): Promise<RestClientResponse<T>> {
    return this.client
      .post<T>(url, data, options)
      .then((res) => {
        return {
          data: res.data,
          success: true,
          message: "success",
        };
      })
      .catch((err: any) => {
        if (err instanceof AxiosError) {
          return {
            success: false,
            message: err.response?.data?.message ?? "An error ocurred",
            data: err?.response?.data ?? {},
          };
        } else {
          this.logger.log(err);
          return {
            success: false,
            message: "An error ocurred",
            data: err?.response?.data ?? {},
          };
        }
      });
  }

  async get<T>(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<RestClientResponse<T>> {
    return this.client
      .get<T>(url, options)
      .then((res) => {
        return {
          data: res.data,
          success: true,
          message: "success",
        };
      })
      .catch((err: any) => {
        if (err instanceof AxiosError) {
          return {
            success: false,
            message: err.response?.data?.message ?? "An error ocurred",
            data: err?.response?.data ?? {},
          };
        } else {
          this.logger.log(err);
          return {
            success: false,
            message: "An error ocurred",
            data: err?.response?.data ?? {},
          };
        }
      });
  }
}
