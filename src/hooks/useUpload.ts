"use client";

import { useState } from "react";

import axios from "axios";

import { useCookies } from "next-client-cookies";

import toast from "react-hot-toast";

import { baseUrlApi } from "@/utils";

interface UseFileUpload<T> {
  uploading: boolean;
  error: string | null;
  uploadFile: (files: File | File[], query: string) => Promise<void>;
  response: T | null | undefined;
}

export const useUpload = <T>(): UseFileUpload<T> => {
  const [response, setResponse] = useState<T | null>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cookies = useCookies();

  const uploadFile = async (files: File | File[], query: string) => {
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append("uploads", file);
      });
    } else {
      formData.append("upload", files);
    }

    setUploading(true);
    setError(null);

    const endpoint = Array.isArray(files) ? `/uploads?${query}` : `/upload?${query}`;

    await axios
      .post(endpoint, formData, {
        baseURL: baseUrlApi,
        headers: {
          Authorization: `Bearer ${cookies.get("jwt")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Success upload file");
        setResponse(response.data);
      })
      .catch((error) => {
        toast.error("Upload file error");
        setError(error instanceof Error ? error.message : "There was an error");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return { response, uploading, error, uploadFile };
};
