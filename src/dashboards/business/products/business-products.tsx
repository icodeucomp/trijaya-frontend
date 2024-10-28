"use client";

import Link from "next/link";

import { useGetApi } from "@/hooks";

import { Img } from "@/components";

import { BusinessesTypes, ResponseBusinessesTypes } from "@/types";

const Content = ({ data }: { data: BusinessesTypes[] | undefined }) => {
  return (
    <menu className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 place-items-center xl:grid-cols-3">
      {!data?.length ? (
        <h3 className="w-full col-span-1 m-8 text-lg font-semibold text-center sm:text-2xl md:text-3xl sm:col-span-2 xl:col-span-3 text-gray/50">
          The business is not found
        </h3>
      ) : (
        data?.map((item, index) => (
          <article key={index} className="w-full max-w-xs p-2 duration-300 rounded-lg card-shadow text-dark-blue bg-light">
            <Img src={item.header.url || "/temp-business.png"} alt={item.title} className="w-full rounded-lg h-72" cover />
            <Link href={`/admin/dashboard/business/product/${item.slug}`}>
              <h4 className="p-3 text-xl font-semibold text-center">{item.title}</h4>
            </Link>
          </article>
        ))
      )}
    </menu>
  );
};

export const BusinessProducts = () => {
  const { response: businesses, loading } = useGetApi<ResponseBusinessesTypes>({ path: "/business", limit: "10" });
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">Products</h1>
        <span className="text-sm text-gray">Last Updated at: {businesses?.newest}</span>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="loader"></div>
        </div>
      ) : (
        <Content data={businesses?.data} />
      )}
    </>
  );
};
