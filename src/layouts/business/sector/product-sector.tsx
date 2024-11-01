"use client";

import * as React from "react";

import { useGetApi, useMediaQuery } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Background, ImageSlider, Modal, Motion, Slider } from "@/components";

import { BusinessSectorTypes, ResponseBusinessesSectorTypes } from "@/types";

export const ProductSector = ({ slug }: { slug: string }) => {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(4);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [openModal, setOpenModal] = React.useState<string | null>(null);

  const [products, setProducts] = React.useState<BusinessSectorTypes[]>();

  const { response: resProducts, loading } = useGetApi<ResponseBusinessesSectorTypes>({ path: `/products?business=${slug}`, limit: "1000000" });

  const filterData = resProducts?.data?.find((item) => item.slug === openModal);

  const isLargeDesktop = useMediaQuery("(min-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 767px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  React.useEffect(() => {
    const startIndex = (page - 1) * limit;
    if (resProducts?.data && resProducts?.data.length > 0) {
      setTotalPage(Math.ceil(resProducts.total / limit));
      setProducts(resProducts.data.slice(startIndex, startIndex + limit));
    } else {
      setTotalPage(0);
    }
  }, [resProducts, limit, page]);

  React.useEffect(() => {
    if (isLargeDesktop) {
      setLimit(4);
    } else if (isDesktop) {
      setLimit(3);
    } else if (isTablet) {
      setLimit(2);
    } else if (isMobile) {
      setLimit(1);
    }
  }, [isLargeDesktop, isDesktop, isTablet, isMobile]);

  if (resProducts?.data && resProducts?.data.length < 1) {
    return null;
  }

  return (
    <>
      <Slider
        page={page}
        setPage={setPage}
        title="Products"
        totalPage={totalPage}
        loading={loading}
        parentClassName="pb-16 space-y-8"
        className="grid gap-4 mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <>
          {products?.map((item, index) => (
            <div key={index} className="cursor-pointer" onClick={() => setOpenModal(item.slug)}>
              <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1}>
                <Background src={item.media[0]?.url || "/temp-business.webp"} className="flex-col justify-end w-full p-4 h-72 sm:h-80 filter-image" parentClassName="rounded-lg" isHover>
                  <div className="text-light">
                    <h5 className="text-base sm:text-lg line-clamp-1">{item.title}</h5>
                    <h6 className="text-lg font-semibold sm:text-xl">Products</h6>
                  </div>
                </Background>
              </Motion>
            </div>
          ))}
        </>
      </Slider>
      <AnimatePresence>
        {openModal !== null && (
          <Modal isVisible={openModal !== null} onClose={() => setOpenModal(null)}>
            <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
              {filterData && filterData?.media.length > 0 ? (
                <ImageSlider images={filterData?.media?.map((item) => item.url)} imgClassName="w-72 sm:w-80 mx-auto lg:w-96 aspect-square rounded-lg" />
              ) : (
                <ImageSlider images={["/temp-business.webp"]} imgClassName="w-72 sm:w-80 mx-auto lg:w-96 aspect-square rounded-lg" />
              )}
              <div className="relative w-full space-y-4 sm:space-y-8">
                <h3 className="text-xl font-medium sm:text-2xl md:text-3xl text-primary">Products</h3>
                <div className="space-y-2 md:space-y-4">
                  <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{filterData?.title}</h4>
                  <p className="h-40 overflow-y-auto text-sm leading-tight text-justify md:h-48 lg:h-60 sm:text-base xl:text-lg scrollbar">{filterData?.description}</p>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
