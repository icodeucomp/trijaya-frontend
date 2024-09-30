"use client";

import { useGet } from "@/hooks";

import { Img } from "@/components";
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
        <h1 className="w-full col-span-1 m-8 text-3xl font-semibold text-center sm:col-span-2 xl:col-span-3 text-gray/50">
          The document is not found
        </h1>
      ) : (
        data?.map((item, index) => (
          <article key={index} className="w-full max-w-xs p-4 duration-300 rounded-md card-shadow text-dark-blue bg-light">
            <Img src={`/temp-image-5.png`} alt={item.name} className="w-full overflow-hidden rounded-lg h-72" cover />
            <div className="flex gap-1 mt-2 text-sm text-dark-gray">
              <Img src={carbon_tag} alt="calendar icon" className="size-4" />
              {item.category}
            </div>
            <div className="mt-2 space-y-2 text-center h-14">
              <h5 className="text-xl font-semibold">{item.name}</h5>
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
  const { response: documents, loading } = useGet<ResponseDocumentsTypes>("/documents");
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">Documents</h1>
        <span className="text-sm text-gray">Last Updated at: 04/03/2024 17:00</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <Filter />
        <AddDocument />
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="loader"></div>
        </div>
      ) : (
        <Content data={documents?.data} />
      )}
    </>
  );
};
