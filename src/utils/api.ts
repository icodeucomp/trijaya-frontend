import axios, { AxiosRequestConfig } from "axios";

interface AxiosProps {
  path: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: any;
  options?: AxiosRequestConfig;
}

export const baseUrlApi = "https://trijaya-bakti-mandiri-web-backend-vwixvuygpq-et.a.run.app/api/v1";

const axiosInstance = axios.create({ baseURL: baseUrlApi });

export const request = async ({ path, method, body, options = {} }: AxiosProps) => {
  const config: AxiosRequestConfig = {
    url: path,
    method,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...options,
  };

  return axiosInstance(config);
};
