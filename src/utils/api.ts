import axios, { AxiosRequestConfig } from "axios";

interface AxiosProps {
  path: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: any;
  contentType?: string;
  options?: AxiosRequestConfig;
}

const axiosInstance = axios.create({
  baseURL: "https://trijaya-backend-423887735295.asia-southeast2.run.app/api/v1",
});

export const request = async ({ path, method, body, contentType = "application/json", options = {} }: AxiosProps) => {
  const config: AxiosRequestConfig = {
    url: path,
    method,
    data: body,
    headers: {
      "Content-Type": contentType,
      Accept: "application/json",
    },
    ...options,
  };

  return axiosInstance(config);
};
