"use client";

import * as React from "react";

import { useGetApi } from "@/hooks";

import { useDebounce } from "use-debounce";

import { useTranslations } from "next-intl";

import { Background, BigSlider, Container, ImageSlider, Modal, Motion, SmallSlider } from "@/components";

import { AnimatePresence } from "framer-motion";

import { BusinessesTypes, ResponseBusinessesTypes } from "@/types";

export const Products = () => {
  const t = useTranslations("business");

  const [productsData, setProductsData] = React.useState<BusinessesTypes[]>();
  const [filteredProduct, setFilteredProduct] = React.useState<BusinessesTypes>();
  const [openModalIndex, setOpenModalIndex] = React.useState<string | null>(null);
  const [selectImages, setSelectImages] = React.useState<number>(0);

  const [categoryFilter] = useDebounce(openModalIndex, 300);

  const { response: products, loading } = useGetApi<ResponseBusinessesTypes>("/business");

  const openModal = (index: string) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    setOpenModalIndex(null);
  };

  const colorLabel = ["bg-red-600", "bg-green-600", "bg-blue-600", "bg-yellow-600", "bg-rose-600", "bg-orange-600", "bg-teal-600"];

  React.useEffect(() => {
    if (openModalIndex !== "") {
      setFilteredProduct(products?.data.find((item) => item.slug === categoryFilter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  React.useEffect(() => {
    if (products?.data && products.data.length > 0) {
      setProductsData(products.data.filter((item) => item.Product.length > 0));
    }
  }, [products]);

  return (
    <Container id="product" className="pt-10 pb-16 sm:pb-20">
      <BigSlider
        className="space-y-8"
        title={`${t("products")}`}
        isButton
        loadData={loading as boolean}
        linkButton="/business/sector"
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{ 0: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
      >
        {productsData?.map((item, index) => (
          <div key={index} onClick={() => openModal(item.slug)} className="cursor-pointer">
            <Motion tag="div" initialY={40} animateY={0} duration={1} delay={index * 0.1}>
              <Background
                src={item.productHeader.url || "/temp-business.webp"}
                className="flex-col justify-between w-full py-4 sm:py-6 min-h-300 filter-image"
                parentClassName="rounded-lg"
              >
                <div className={`px-4 py-1 sm:px-6 rounded-3xl w-max ${colorLabel[index]}`}>
                  <label className="text-xs sm:text-sm">{item.title}</label>
                </div>
                <div className="space-y-1 text-light">
                  <h5 className="text-sm sm:text-base lg:text-lg">PT Trijaya Berkah Mandiri</h5>
                  <h6 className="text-base font-semibold lg:text-xl">{item.Product.length} Products</h6>
                </div>
              </Background>
            </Motion>
          </div>
        ))}
      </BigSlider>
      <AnimatePresence>
        {openModalIndex !== null && (
          <Modal isVisible={openModalIndex !== null} onClose={closeModal}>
            {filteredProduct && filteredProduct?.Product[selectImages].media.length > 0 ? (
              <ImageSlider
                images={filteredProduct?.Product[selectImages].media?.map((item) => item.url)}
                imgClassName="w-full max-w-xs md:max-w-full mx-auto h-64 md:h-72 lg:h-96"
              />
            ) : (
              <ImageSlider images={["/temp-business.webp"]} imgClassName="w-full max-w-xs md:max-w-full mx-auto h-64 md:h-72 lg:h-96" />
            )}
            <SmallSlider slidesPerView={1} setIndex={setSelectImages} title={filteredProduct?.title || ""} className="space-y-2 md:space-y-4">
              {filteredProduct?.Product.map((item, index) => (
                <div key={index} className="space-y-2 md:space-y-4">
                  <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{item.title}</h4>

                  <p className="overflow-y-auto text-sm leading-tight text-justify h-36 md:h-52 lg:h-64 sm:text-base xl:text-lg scrollbar">
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
