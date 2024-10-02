import { useEffect, useState } from "react";

import { request } from "@/utils";

interface UseGetParamsProps {
  path: string;
  searchQuery: string;
  sort?: string;
  order?: string;
  dateStart?: string;
  dateEnd?: string;
}

export const useGetSearchApi = <T>({ path, searchQuery, sort, order, dateStart, dateEnd }: UseGetParamsProps) => {
  const [response, setResponse] = useState<T | null>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await request({
        path,
        method: "GET",
        options: {
          params: {
            title: searchQuery,
            sort,
            order,
            dateStart,
            dateEnd,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sort, order, dateStart, dateEnd]);

  return { response, error, loading };
};
