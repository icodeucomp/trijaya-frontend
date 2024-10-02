"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useCookies } from "next-client-cookies";

import toast from "react-hot-toast";

import { request } from "@/utils";

export const useLogin = <T>(path: string) => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const { push } = useRouter();
  const cookies = useCookies();

  const execute = async (body: T) => {
    setLoading(true);
    await request({ path, method: "POST", body })
      .then((response) => {
        toast.success(response.data.message);
        cookies.set("jwt", response.data.data.accessToken);
        push("/admin/dashboard/article");
      })
      .catch((error) => {
        toast.error(error.response?.data.message || "There was an error");
        setError(error instanceof Error ? error.message : "There was an error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, error, execute };
};
