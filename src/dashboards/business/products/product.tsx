"use client";

import * as React from "react";

import { useGetApi, useMediaQuery } from "@/hooks";

import { useDebounce } from "use-debounce";

import { Filter } from "@/dashboards/filter";
import { Img, Pagination } from "@/components";

import { BusinessSectorTypes, ResponseBusinessesSectorTypes } from "@/types";
import { AddProduct } from "./add-product";
import { EditProduct } from "./edit-product";
import { ShowProduct } from "./show-product";
import { DeleteProduct } from "./delete-product";

const Content = ({ data, slug }: { data: BusinessSectorTypes[] | undefined; slug: string }) => {
  return (
    <menu className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 place-items-center xl:grid-cols-3">
      {!data?.length ? (
        <h3 className="w-full col-span-1 m-8 text-lg font-semibold text-center sm:text-2xl md:text-3xl sm:col-span-2 xl:col-span-3 text-gray/50">
          The products is not found
        </h3>
      ) : (
        data?.map((item, index) => (
          <article key={index} className="w-full max-w-xs p-2 duration-300 rounded-lg card-shadow text-dark-blue bg-light">
            <Img src={item.media?.[0]?.url || "/temp-business.png"} alt={item.title} className="w-full rounded-lg h-72" cover />
            <div className="relative h-20 pt-3 pb-6 text-center">
              <h4 className="text-xl font-semibold line-clamp-2">{item.title}</h4>
            </div>
            <div className="flex items-center justify-between mb-2">
              <DeleteProduct slug={slug} title={item.title} slugProduct={item.slug} />
              <EditProduct slug={slug} businessId={item.businessId} slugProduct={item.slug} />
              <ShowProduct slugProduct={item.slug} />
            </div>
          </article>
        ))
      )}
    </menu>
  );
};

export const Products = ({ slug }: { slug: string }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(9);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const { response: products, loading } = useGetApi<ResponseBusinessesSectorTypes>({
    path: `/products?business=${slug}`,
    searchQuery: debouncedSearchTerm,
    limit: limit.toString(),
    page: page.toString(),
  });

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  React.useEffect(() => {
    if (products && products.total > 0) {
      setTotalPage(Math.ceil(products.total / limit));
    } else {
      setTotalPage(0);
    }
  }, [products, limit]);

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
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">Products from {products?.data[0].business.title}</h1>
        <span className="text-sm text-gray">Last Updated at: {products?.newest}</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <Filter setSearchTerm={handleSearch} />
        <AddProduct businessId={products?.data[0].businessId || 0} slug={slug} />
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="loader"></div>
        </div>
      ) : (
        <Content data={products?.data} slug={slug} />
      )}
      <div className="pt-8">
        <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumbering />
      </div>
    </>
  );
};
