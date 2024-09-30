"use client";

import { useEffect, useState } from "react";

import { useCookies } from "next-client-cookies";

import { request } from "@/utils";

export const useGet = <T>(path: string) => {
  const [response, setResponse] = useState<T | null>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const cookies = useCookies();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await request({
        path,
        method: "GET",
        options: {
          headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`,
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      })
        .then((response) => setResponse(response.data))
        .catch((error) => setError(error instanceof Error ? error.message : "There was an error where fetching"))
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, [path, cookies]);

  return { response, error, loading };
};
