import { useState } from "react";

import toast from "react-hot-toast";

import { request } from "@/utils";

export const usePostApi = <T>(path: string, method: "GET" | "POST" | "PATCH" | "DELETE", contentType?: string) => {
  const [response, setResponse] = useState<T | null>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const execute = async (body: any) => {
    setLoading(true);
    await request({ path, method, body, contentType })
      .then((response) => {
        toast.success(response?.data.message);
        setResponse(response.data);
      })
      .catch((error) => {
        toast.error(error.response?.data.message || "There was an error");
        setError(error instanceof Error ? error.message : "There was an error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { response, loading, error, execute };
};
