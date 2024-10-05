"use client";

import * as React from "react";

import { useGetSearchApi } from "@/hooks";

import { useDebounce } from "use-debounce";

import { Filter } from "../filter";
import { Img } from "@/components";
import { DeleteMedia } from "./delete-media";
import { AddMedia } from "./add-media";

import { MediaTypes, ResponseMediaTypes } from "@/types";

const Content = ({ data }: { data: MediaTypes[] | undefined }) => {
  return (
    <menu className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 place-items-center xl:grid-cols-3">
      {!data?.length ? (
        <h3 className="w-full col-span-1 m-8 text-3xl font-semibold text-center sm:col-span-2 xl:col-span-3 text-gray/50">The media is not found</h3>
      ) : (
        data?.map((item, index) => (
          <article key={index} className="relative w-full max-w-xs p-2 duration-300 rounded-md card-shadow text-dark-blue bg-light">
            <Img src={item.url || "/temp-business.webp"} alt={item.name} className="w-full rounded-lg h-72" cover />
            <DeleteMedia slug={item.slug} />
          </article>
        ))
      )}
    </menu>
  );
};

export const Media = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [page, setPage] = React.useState<string>("1");
  const [splitData, setSplitData] = React.useState<number>(0);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const { response: medias, loading } = useGetSearchApi<ResponseMediaTypes>({
    path: "/media",
    searchQuery: debouncedSearchTerm,
    page,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleNextPage = () => {
    setPage((prevPage) => (parseInt(prevPage) + 1).toString());
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (parseInt(prevPage) > 1 ? (parseInt(prevPage) - 1).toString() : prevPage));
  };

  React.useEffect(() => {
    if (medias?.total && medias?.total > 1) {
      setSplitData(Math.ceil(medias.total / 9));
    }
  }, [medias]);

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">Media</h1>
        <span className="text-sm text-gray">Last Updated at: {medias?.newest}</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <Filter setSearchTerm={handleSearch} />
        <AddMedia />
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="loader"></div>
        </div>
      ) : (
        <Content data={medias?.data} />
      )}
      <div className="flex items-center justify-center gap-2 mt-6 mb-3">
        <button className="pagination-button" onClick={handlePreviousPage} disabled={page === "1"}>
          Prev
        </button>
        {Array.from({ length: splitData }, (_, index) => (
          <button key={index} className={`pagination-number ${index + 1 === Number(page) ? "bg-primary text-light" : "bg-light text-dark-blue"}`}>
            {index + 1}
          </button>
        ))}
        <button className="pagination-button" onClick={handleNextPage} disabled={splitData === Number(page)}>
          Next
        </button>
      </div>
    </>
  );
};
