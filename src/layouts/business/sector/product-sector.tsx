"use client";

import * as React from "react";

import { useGetApi, useMediaQuery } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Background, Container, ImageSlider, Modal, Motion, Pagination } from "@/components";

import { ResponseBusinessesSectorTypes } from "@/types";

export const ProductSector = ({ slug }: { slug: string }) => {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(3);
  const [totalPage, setTotalPage] = React.useState<number>(0);
  const [openModal, setOpenModal] = React.useState<string | null>(null);

  const { response: products, loading } = useGetApi<ResponseBusinessesSectorTypes>({
    path: `/products?business=${slug}`,
    limit: limit.toString(),
    page: page.toString(),
  });

  const filterData = products?.data?.find((item) => item.slug === openModal);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 767px)");

  React.useEffect(() => {
    if (products && products.total > 0) {
      setTotalPage(Math.ceil(products.total / limit));
    } else {
      setTotalPage(0);
    }
  }, [products, limit]);

  React.useEffect(() => {
    if (isDesktop) {
      setLimit(4);
    } else if (isTablet) {
      setLimit(3);
    } else if (isMobile) {
      setLimit(2);
    }
  }, [isDesktop, isTablet, isMobile]);

  return (
    <Container className="pb-16">
      <div className="flex items-center justify-between">
        <Motion tag="h3" initialX={-50} animateX={0} duration={0.4} className="heading">
          Products
        </Motion>
        <Motion tag="div" initialX={50} animateX={0} duration={0.8} delay={0.4} className="relative flex items-center gap-4">
          <Pagination page={page} totalPage={totalPage} setPage={setPage} />
        </Motion>
      </div>
      {loading ? (
        <div className="flex justify-center w-full py-16 min-h-400">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.data.map((item, index) => (
            <div key={index} className="cursor-pointer" onClick={() => setOpenModal(item.slug)}>
              <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1}>
                <Background
                  src={item.media[0]?.url || "/temp-business.webp"}
                  className="flex-col justify-end w-full p-4 h-72 sm:h-80 filter-image"
                  parentClassName="rounded-lg"
                  isHover
                >
                  <div className="text-light">
                    <h5 className="text-base sm:text-lg line-clamp-1">{item.title}</h5>
                    <h6 className="text-lg font-semibold sm:text-xl">Products</h6>
                  </div>
                </Background>
              </Motion>
            </div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {openModal !== null && (
          <Modal isVisible={openModal !== null} onClose={() => setOpenModal(null)}>
            <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
              {filterData && filterData?.media.length > 0 ? (
                <ImageSlider
                  images={filterData?.media?.map((item) => item.url)}
                  imgClassName="w-72 sm:w-80 mx-auto lg:w-96 aspect-square rounded-lg"
                />
              ) : (
                <ImageSlider images={["/temp-business.webp"]} imgClassName="w-72 sm:w-80 mx-auto lg:w-96 aspect-square rounded-lg" />
              )}
              <div className="relative w-full space-y-4 sm:space-y-8">
                <h3 className="text-xl font-medium sm:text-2xl md:text-3xl text-primary">Products</h3>
                <div className="space-y-2 md:space-y-4">
                  <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{filterData?.title}</h4>
                  <p className="h-40 overflow-y-auto text-sm leading-tight text-justify md:h-48 lg:h-60 sm:text-base xl:text-lg scrollbar">
                    {filterData?.description}
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};
