"use client";

import { useGet } from "@/hooks";

import { Filter } from "../filter";
import { Img } from "@/components";
import { DeleteMedia } from "./delete-media";
import { AddMedia } from "./add-media";

import { MediaTypes, ResponseMediaTypes } from "@/types";

const Content = ({ data }: { data: MediaTypes[] | undefined }) => {
  return (
    <menu className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 place-items-center xl:grid-cols-3">
      {!data?.length ? (
        <h1 className="w-full col-span-1 m-8 text-3xl font-semibold text-center sm:col-span-2 xl:col-span-3 text-gray/50">The media is not found</h1>
      ) : (
        data?.map((item, index) => (
          <article key={index} className="relative w-full max-w-xs p-2 duration-300 rounded-md card-shadow text-dark-blue bg-light">
            <Img src={item.url || `/temp-image-5.png`} alt={item.name} className="w-full overflow-hidden rounded-lg h-72" cover />
            <DeleteMedia slug={item.slug} />
          </article>
        ))
      )}
    </menu>
  );
};

export const Media = () => {
  const { response: medias, loading } = useGet<ResponseMediaTypes>("/media");
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
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="loader"></div>
        </div>
      ) : (
        <Content data={medias?.data} />
      )}
    </>
  );
};
