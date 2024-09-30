"use client";

import { useState } from "react";

import { useCookies } from "next-client-cookies";

import toast from "react-hot-toast";

import { request } from "@/utils";

export const usePost = (method: "GET" | "POST" | "PATCH" | "DELETE", linkHref: string) => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const cookies = useCookies();

  const execute = async (path: string, body: any) => {
    setLoading(true);
    await request({
      path,
      method,
      body,
      options: {
        headers: {
          Authorization: `Bearer ${cookies.get("jwt")}`,
          "Access-Control-Allow-Origin": "*",
        },
      },
    })
      .then((response) => {
        toast.success(response?.data.message);
        window.location.href = `/admin/dashboard/${linkHref}`;
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
