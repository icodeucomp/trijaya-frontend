"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { useGetApi } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Background, BigSlider, Container, ImageSlider, Modal, Motion } from "@/components";

import { BusinessSectorTypes, ResponseBusinessTypes } from "@/types";

interface SectorBusinessTypes {
  title: string;
  data: BusinessSectorTypes[] | undefined;
  loading: boolean;
  openModalIndex: string | null;
  setOpenModalIndex: Dispatch<SetStateAction<string | null>>;
}

const SectorBusiness = ({ title, data, loading, openModalIndex, setOpenModalIndex }: SectorBusinessTypes) => {
  const filterData = data?.find((item) => item.slug === openModalIndex);

  const openModal = (index: string) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    setOpenModalIndex(null);
  };

  return (
    <>
      <BigSlider
        className="mt-16 space-y-8"
        title={title}
        loadData={loading as boolean}
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{ 0: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
      >
        {data?.map((item, index) => (
          <div key={index} className="cursor-pointer" onClick={() => openModal(item.slug)}>
            <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1}>
              {item.media.length > 0 ? (
                <Background
                  src={item.media[0].url}
                  className="flex-col justify-end w-full py-2 h-72 sm:h-80 filter-image"
                  parentClassName="rounded-lg"
                  isHover
                >
                  <div className="text-light">
                    <h5 className="text-base sm:text-lg line-clamp-1">{item.title}</h5>
                    <h6 className="text-lg font-semibold sm:text-xl">{title}</h6>
                  </div>
                </Background>
              ) : (
                <Background
                  src={"/temp-business.webp"}
                  className="flex-col justify-end w-full py-2 h-72 sm:h-80 filter-image"
                  parentClassName="rounded-lg"
                  isHover
                >
                  <div className="text-light">
                    <h5 className="text-base sm:text-lg line-clamp-1">{item.title}</h5>
                    <h6 className="text-lg font-semibold sm:text-xl">{title}</h6>
                  </div>
                </Background>
              )}
            </Motion>
          </div>
        ))}
      </BigSlider>
      <AnimatePresence>
        {openModalIndex !== null && (
          <Modal isVisible={openModalIndex !== null} onClose={closeModal}>
            {filterData && filterData?.media.length > 0 ? (
              <ImageSlider
                images={filterData?.media?.map((item) => item.url)}
                imgClassName="w-full max-w-xs md:max-w-full mx-auto h-64 md:h-72 lg:h-96"
              />
            ) : (
              <ImageSlider images={["/temp-business.webp"]} imgClassName="w-full max-w-xs md:max-w-full mx-auto h-64 md:h-72 lg:h-96" />
            )}
            <div className="relative w-full space-y-4 sm:space-y-8">
              <h3 className="text-xl font-medium sm:text-2xl md:text-3xl text-primary">{title}</h3>
              <div className="space-y-2 md:space-y-4">
                <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{filterData?.title}</h4>
                <p className="overflow-y-auto text-sm leading-tight text-justify h-28 md:h-52 lg:h-60 sm:text-base xl:text-lg scrollbar">
                  {filterData?.description}
                </p>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export const AllSectorBusiness = ({ slug }: { slug: string }) => {
  const [openModalProducts, setOpenModalProducts] = useState<string | null>(null);
  const [openModalServices, setOpenModalServices] = useState<string | null>(null);
  const [openModalProjects, setOpenModalProjects] = useState<string | null>(null);

  const { response: business, loading } = useGetApi<ResponseBusinessTypes>(`/business/${slug}`);

  return (
    <Container className="pb-20">
      <>
        {business?.data && business?.data.Product.length > 0 && (
          <SectorBusiness
            data={business?.data.Product}
            loading={loading as boolean}
            openModalIndex={openModalProducts}
            setOpenModalIndex={setOpenModalProducts}
            title="Products"
          />
        )}
      </>
      <>
        {business?.data && business?.data.Project.length > 0 && (
          <SectorBusiness
            data={business?.data.Project}
            loading={loading as boolean}
            openModalIndex={openModalProjects}
            setOpenModalIndex={setOpenModalProjects}
            title="Projects"
          />
        )}
      </>
      <>
        {business?.data && business?.data.Service.length > 0 && (
          <SectorBusiness
            data={business?.data.Service}
            loading={loading as boolean}
            openModalIndex={openModalServices}
            setOpenModalIndex={setOpenModalServices}
            title="Services"
          />
        )}
      </>
    </Container>
  );
};
