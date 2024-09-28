"use client";

import { useState } from "react";

import { useGetApi } from "@/hooks";

import { Background, BigSlider, Container, ImageSlider, Modal, SmallSlider } from "@/components";

import { AnimatePresence } from "framer-motion";

import { ResponseBusinessesTypes } from "@/types";

export const Products = () => {
  const [openModalIndex, setOpenModalIndex] = useState<string | null>(null);
  const [selectImages, setSelectImages] = useState<number>(0);

  const { response: products, loading } = useGetApi<ResponseBusinessesTypes>("/business");

  const openModal = (index: string) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    setOpenModalIndex(null);
  };

  const filterData = products?.data.find((item) => item.slug === openModalIndex);

  return (
    <Container className="pt-10 pb-16 sm:pb-20">
      <BigSlider
        className="space-y-8"
        title="Products"
        isButton
        loadData={loading as boolean}
        linkButton="/business/sector"
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{ 0: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
      >
        {products?.data.map((item, index) => (
          <div key={index} onClick={() => openModal(item.slug)} className="cursor-pointer">
            <Background
              src={item.productHeaderUrls || "/temp-image-3.png"}
              className="flex-col justify-between w-full py-4 sm:py-6 min-h-300 filter-image"
              parentClassName="rounded-lg"
            >
              <div className="px-4 py-1 sm:px-6 rounded-3xl bg-secondary w-max">
                <label className="text-xs sm:text-sm">{item.title}</label>
              </div>
              <div className="space-y-1 text-light">
                <h5 className="text-sm sm:text-base lg:text-lg">PT Trijaya Berkah Mandiri</h5>
                <h6 className="text-base font-semibold lg:text-xl">{item.Product.length} Products</h6>
              </div>
            </Background>
          </div>
        ))}
      </BigSlider>
      <AnimatePresence>
        {openModalIndex !== null && (
          <Modal isVisible={openModalIndex !== null} onClose={closeModal}>
            <ImageSlider
              images={filterData?.Product[selectImages].mediaUrls || ["/temp-image-3.png"]}
              imgClassName="w-full max-w-xs md:max-w-full mx-auto h-64 md:h-72 lg:h-96"
            />
            <SmallSlider slidesPerView={1} setIndex={setSelectImages} title={filterData?.title as string} className="space-y-2 md:space-y-4">
              {filterData?.Product.map((item, index) => (
                <div key={index} className="space-y-2 md:space-y-4">
                  <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{item.title}</h4>

                  <p className="overflow-y-auto text-sm leading-tight text-justify h-28 md:h-52 lg:h-64 sm:text-base xl:text-lg scrollbar">
                    {item.description}
                  </p>
                </div>
              ))}
            </SmallSlider>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};
