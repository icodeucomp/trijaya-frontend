"use client";

import { Img } from "@/components";
import { Filter } from "../filter";

import { DeleteMedia } from "./delete-media";
import { AddMedia } from "./add-media";

const Content = () => {
  return (
    <menu className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 place-items-center xl:grid-cols-3">
      {!Array.from({ length: 6 }).length ? (
        <h1 className="w-full m-8 text-3xl font-semibold text-center text-gray/50">The media is not found</h1>
      ) : (
        Array.from({ length: 4 }).map((_, index) => (
          <article key={index} className="relative w-full max-w-xs p-2 duration-300 rounded-md card-shadow text-dark-blue bg-light">
            <Img src={`/temp-image-5.png`} alt={`Profile ${index + 1}`} className="w-full overflow-hidden rounded-lg h-72" cover />
            <DeleteMedia />
          </article>
        ))
      )}
    </menu>
  );
};

export const Media = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">Media</h1>
        <span className="text-sm text-gray">Last Updated at: 04/03/2024 17:00</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <Filter />
        <AddMedia />
      </div>
      <Content />
    </>
  );
};
