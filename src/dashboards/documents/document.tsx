"use client";

import * as React from "react";

import { useGetApi, useMediaQuery } from "@/hooks";

import { useDebounce } from "use-debounce";

import { DisplayThumbnail, Img, Pagination } from "@/components";
import { Filter } from "../filter";

import { DeleteDocument } from "./delete-document";
import { EditDocument } from "./edit-document";
import { ShowDocument } from "./show-document";
import { AddDocument } from "./add-document";

import { carbon_tag } from "@/icons";

import { DocumentsTypes, ResponseDocumentsTypes } from "@/types";

const Content = ({ data }: { data: DocumentsTypes[] | undefined }) => {
  return (
    <menu className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 place-items-center xl:grid-cols-3">
      {!data?.length ? (
        <h3 className="w-full col-span-1 my-8 text-lg font-semibold text-center sm:text-2xl md:text-3xl sm:col-span-2 xl:col-span-3 text-gray/50">The documents is not found</h3>
      ) : (
        data?.map((item, index) => (
          <article key={index} className="w-full max-w-xs p-4 duration-300 rounded-md card-shadow text-dark-blue bg-light">
            <div className="preview-thumbnail">
              <DisplayThumbnail
                fileUrl={item.url || "https://icodeu-storage.s3.ap-southeast-1.amazonaws.com/documents/award/surat-pernyataan-ambil-sertifikat-toeflmuhammad-helmy-fadlail-albab-1728069726585.pdf"}
              />
            </div>
            <div className="flex gap-1 mt-2 text-sm text-dark-gray">
              <Img src={carbon_tag} alt="calendar icon" className="size-4" />
              {item.category}
            </div>
            <div className="mt-2 space-y-2 text-center h-14">
              <h5 className="text-xl font-semibold line-clamp-2">{item.name}</h5>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <ShowDocument slug={item.slug} />
              <EditDocument slug={item.slug} />
              <DeleteDocument slug={item.slug} />
            </div>
          </article>
        ))
      )}
    </menu>
  );
};

export const Documents = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(9);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const { response: documents, loading } = useGetApi<ResponseDocumentsTypes>({
    path: "/documents",
    searchQuery: debouncedSearchTerm,
    page: page.toString(),
    limit: limit.toString(),
  });

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  React.useEffect(() => {
    if (documents?.total && documents?.total > 0) {
      setTotalPage(Math.ceil(documents.total / limit));
    } else {
      setTotalPage(0);
    }
  }, [documents, limit]);

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
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">Documents</h1>
        <span className="text-sm text-gray">Last Updated at: {documents?.newest}</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <Filter setSearchTerm={(e) => setSearchTerm(e.target.value)} />
        <AddDocument />
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="loader"></div>
        </div>
      ) : (
        <Content data={documents?.data} />
      )}
      <div className="pt-8">
        <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumbering />
      </div>
    </>
  );
};
