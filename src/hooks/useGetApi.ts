import { useEffect, useState } from "react";

import { request } from "@/utils";

export const useGetApi = <T>(path: string) => {
  const [response, setResponse] = useState<T | null>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await request({ path, method: "GET" })
        .then((response) => setResponse(response.data))
        .catch((error) => setError(error instanceof Error ? error.message : "There was an error where fetching"))
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, [path]);

  return { response, error, loading };
};
