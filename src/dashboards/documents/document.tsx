"use client";

import * as React from "react";

import { useGetSearchApi } from "@/hooks";

import { useDebounce } from "use-debounce";

import { DisplayThumbnail, Img } from "@/components";
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
        <h3 className="w-full col-span-1 m-8 text-3xl font-semibold text-center sm:col-span-2 xl:col-span-3 text-gray/50">
          The document is not found
        </h3>
      ) : (
        data?.map((item, index) => (
          <article key={index} className="w-full max-w-xs p-4 duration-300 rounded-md card-shadow text-dark-blue bg-light">
            <div className="preview-thumbnail">
              <DisplayThumbnail
                fileUrl={
                  item.url ||
                  "https://icodeu-storage.s3.ap-southeast-1.amazonaws.com/documents/award/surat-pernyataan-ambil-sertifikat-toeflmuhammad-helmy-fadlail-albab-1728069726585.pdf"
                }
              />
            </div>
            <div className="flex gap-1 mt-2 text-sm text-dark-gray">
              <Img src={carbon_tag} alt="calendar icon" className="size-4" />
              {item.category}
            </div>
            <div className="mt-2 space-y-2 text-center h-14">
              <h5 className="text-xl font-semibold line-clamp-2">{item.name}</h5>
            </div>
            <div className="flex items-center justify-between mt-4">
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

export const Document = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [page, setPage] = React.useState<string>("1");
  const [splitData, setSplitData] = React.useState<number>(0);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const { response: documents, loading } = useGetSearchApi<ResponseDocumentsTypes>({
    path: "/documents",
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
    if (documents?.total && documents?.total > 1) {
      setSplitData(Math.ceil(documents.total / 9));
    }
  }, [documents]);

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">Documents</h1>
        <span className="text-sm text-gray">Last Updated at: {documents?.newest}</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <Filter setSearchTerm={handleSearch} />
        <AddDocument />
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="loader"></div>
        </div>
      ) : (
        <Content data={documents?.data} />
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
