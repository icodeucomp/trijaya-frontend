"use client";

import * as React from "react";

import { useGetApi, useMediaQuery } from "@/hooks";

import { useDebounce } from "use-debounce";

import { DeleteAlbum } from "./delete-album";
import { AddAlbum } from "./add-album";
import { ShowAlbum } from "./show-album";
import { EditAlbum } from "./edit-album";

import { Filter } from "../filter";
import { Img, Pagination } from "@/components";

import { AlbumTypes, ResponseAlbumsTypes } from "@/types";

const Content = ({ data }: { data: AlbumTypes[] | undefined }) => {
  return (
    <menu className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 place-items-center xl:grid-cols-3">
      {!data?.length ? (
        <h3 className="w-full col-span-1 m-8 text-lg font-semibold text-center sm:text-2xl md:text-3xl sm:col-span-2 xl:col-span-3 text-gray/50">
          The albums is not found
        </h3>
      ) : (
        data?.map((item, index) => (
          <article key={index} className="relative w-full max-w-xs duration-300 rounded-md card-shadow text-dark-blue bg-light">
            <Img src={item.header || "/temp-business.webp"} alt={item.name} className="rounded-t-lg aspect-video w-80" cover />
            <div className="relative h-20 pt-3 pb-6 text-center">
              <h4 className="text-xl font-semibold line-clamp-2">{item.name}</h4>
            </div>
            <div className="flex items-center justify-center gap-4 mb-2">
              <ShowAlbum slug={item.slug} />
              <EditAlbum slug={item.slug} />
              <DeleteAlbum slug={item.slug} />
            </div>
          </article>
        ))
      )}
    </menu>
  );
};

export const Albums = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(9);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const { response: albums, loading } = useGetApi<ResponseAlbumsTypes>({
    path: "/albums",
    searchQuery: debouncedSearchTerm,
    page: page.toString(),
    limit: limit.toString(),
  });

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  React.useEffect(() => {
    if (albums?.total && albums?.total > 0) {
      setTotalPage(Math.ceil(albums.total / limit));
    } else {
      setTotalPage(0);
    }
  }, [albums, limit]);

  React.useEffect(() => {
    if (isDesktop) {
      setLimit(9);
    } else if (isTablet) {
      setLimit(2);
    } else if (isMobile) {
      setLimit(1);
    }
  }, [isDesktop, isTablet, isMobile]);

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">#LifeatTBM</h1>
        <span className="text-sm text-gray">Last Updated at: {albums?.newest}</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <Filter setSearchTerm={(e) => setSearchTerm(e.target.value)} />
        <AddAlbum />
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="loader"></div>
        </div>
      ) : (
        <Content data={albums?.data} />
      )}
      <div className="pt-8">
        <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumbering />
      </div>
    </>
  );
};
