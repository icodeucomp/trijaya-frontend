import { useEffect, useState } from "react";

import { request } from "@/utils";

export const useGetSearchApi = <T>(searchQuery: string, sort: string, order: string) => {
  const [response, setResponse] = useState<T | null>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await request({
        path: "/documents",
        method: "GET",
        options: {
          params: {
            name: searchQuery,
            sort,
            order,
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
  }, [searchQuery, sort, order]);

  return { response, error, loading };
};
