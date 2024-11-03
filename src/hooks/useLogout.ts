"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useCookies } from "next-client-cookies";

import toast from "react-hot-toast";

import { request } from "@/utils";

export const useLogout = () => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const { push } = useRouter();

  const cookies = useCookies();

  const execute = async () => {
    setLoading(true);
    await request({
      path: "/auth/logout",
      method: "POST",
      options: {
        headers: {
          Authorization: `Bearer ${cookies.get("session")}`,
          "Access-Control-Allow-Origin": "*",
        },
      },
    })
      .then((response) => {
        toast.success(response.data.message);
        cookies.remove("session");
        push("/admin/login");
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
