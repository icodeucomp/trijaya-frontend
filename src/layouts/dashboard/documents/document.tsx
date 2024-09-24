"use client";

import { Img } from "@/components";
import { Filter } from "../filter";

import { DeleteDocument } from "./delete-document";
import { EditDocument } from "./edit-document";
import { ShowDocument } from "./show-document";
import { AddDocument } from "./add-document";

import { carbon_tag } from "@/icons";

import { StyleTypes } from "../types";

const stylesOptions: StyleTypes = {
  control: (_, state) => ({
    display: "inline-flex",
    borderBottom: "2px solid #313335b5",
    borderColor: state.isFocused ? "#0e2d65" : "#313335b5",
    fontSize: "14px",
    width: "100%",
  }),
};

const Content = () => {
  return (
    <menu className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 place-items-center xl:grid-cols-3">
      {!Array.from({ length: 6 }).length ? (
        <h1 className="w-full m-8 text-3xl font-semibold text-center text-gray/50">The document is not found</h1>
      ) : (
        Array.from({ length: 4 }).map((_, index) => (
          <article key={index} className="w-full max-w-xs p-4 duration-300 rounded-md card-shadow text-dark-blue bg-light">
            <Img
              src={`/images/home/profile-${index + 1}.png`}
              alt={`Profile ${index + 1}`}
              className="w-full overflow-hidden rounded-lg h-72"
              cover
            />
            <div className="flex gap-1 mt-2 text-sm text-dark-gray">
              <Img src={carbon_tag} alt="calendar icon" className="size-4" />
              Legality
            </div>
            <div className="mt-2 space-y-2 text-center">
              <h5 className="text-xl font-semibold">Akta Notaris</h5>
              <p className="text-xs line-clamp-3">No. 1, Tanggal 04 November Tahun 2015 (Akte Pendirian) No. 7, Tanggal 10 Januari Tahun 2024</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <ShowDocument />
              <EditDocument stylesOptions={stylesOptions} />
              <DeleteDocument />
            </div>
          </article>
        ))
      )}
    </menu>
  );
};

export const Document = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">Documents</h1>
        <span className="text-sm text-gray">Last Updated at: 04/03/2024 17:00</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <Filter />
        <AddDocument stylesOptions={stylesOptions} />
      </div>
      <Content />
    </>
  );
};
