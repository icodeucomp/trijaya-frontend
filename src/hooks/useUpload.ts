"use client";

import axios from "axios";

import { useCookies } from "next-client-cookies";

import { useState } from "react";

interface UseFileUpload<T> {
  uploading: boolean;
  error: string | null;
  uploadFile: (files: File | File[], type: string, category: string) => Promise<void>;
  response: T | null | undefined;
}

export const useUpload = <T>(): UseFileUpload<T> => {
  const [response, setResponse] = useState<T | null>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cookies = useCookies();

  const uploadFile = async (files: File | File[], type: string, category: string) => {
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append("uploads", file);
      });
    } else {
      formData.append("upload", files);
    }

    try {
      setUploading(true);
      setError(null);

      // Dynamically construct the endpoint
      const endpoint = Array.isArray(files) ? `/upload/media?business=${type}&type=${category}` : `/upload?type=${type}&category=${category}`;

      const response = await axios.post(endpoint, formData, {
        baseURL: "https://trijaya-backend-423887735295.asia-southeast2.run.app/api/v1",
        headers: {
          Authorization: `Bearer ${cookies.get("jwt")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(response.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "There was an error");
    } finally {
      setUploading(false);
    }
  };

  return { response, uploading, error, uploadFile };
};
