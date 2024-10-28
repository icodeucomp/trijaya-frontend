"use client";

import * as React from "react";

import { notFound } from "next/navigation";
import { Link, useRouter } from "@/i18n/routing";

import { useGetApi, useToggleState } from "@/hooks";

import { AnimatePresence } from "framer-motion";
import { Background, ImageSlider, Modal, Motion } from "@/components";

import { FaArrowLeft } from "react-icons/fa6";
import { PiCaretDownBold } from "react-icons/pi";

import { BusinessSectorTypes, ResponseBusinessesSectorTypes, ResponseBusinessTypes } from "@/types";

export const Products = ({ slug }: { slug: string }) => {
  const { back } = useRouter();

  const [ref, popover, togglePopover] = useToggleState(false);

  const [filteredProduct, setFilteredProduct] = React.useState<BusinessSectorTypes>();
  const [openModalIndex, setOpenModalIndex] = React.useState<string | null>(null);

  const { response: business, loading, error } = useGetApi<ResponseBusinessTypes>({ path: `/business/${slug}` });
  const { response: businessName } = useGetApi<ResponseBusinessesSectorTypes>({ path: "/business/metadata" });

  const openModal = (index: string) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    setOpenModalIndex(null);
  };

  React.useEffect(() => {
    if (openModalIndex !== "") {
      setFilteredProduct(business?.data.Product.find((item) => item.slug === openModalIndex));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalIndex]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-8 lg:hidden">
        <span ref={ref} className={`dropdown w-full min-h-12 ${popover ? "border-primary" : "border-gray"}`} onClick={togglePopover}>
          {business?.data.title}
          <PiCaretDownBold size={20} className={`duration-300 absolute right-2 fill-dark ${popover && "rotate-180"}`} />
          {popover && (
            <div className={`popover top-14`}>
              {businessName?.data.map((item, index) => (
                <Link href={item.slug} key={index} className="block w-full px-4 py-2.5 rounded-lg whitespace-nowrap btn-primary">
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </span>
      </div>
      <div className="flex items-center gap-4 mb-4 lg:hidden">
        <button
          className="flex items-center justify-center duration-300 border rounded-lg size-10 sm:size-12 bg-light border-primary hover:bg-primary group"
          type="button"
          onClick={() => back()}
        >
          <FaArrowLeft size={20} className="duration-300 fill-secondary group-hover:fill-light" />
        </button>
        <span className="text-xl font-medium sm:text-2xl text-primary">Back</span>
      </div>
      <h2 className="mb-4 sm:mb-8 heading">{business?.data.title}</h2>
      <div className="lg:pr-4 lg:overflow-y-auto lg:max-h-custom-modal scrollbar">
        <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
          {business?.data.Product?.map((item, index) => (
            <div key={index} onClick={() => openModal(item.slug)} className="cursor-pointer">
              <Motion tag="div" initialY={40} animateY={0} duration={1} delay={index * 0.1}>
                <Background
                  src={item.media?.[0].url || "/temp-business.webp"}
                  className="items-center justify-center w-full min-h-200 sm:min-h-300 filter-image"
                  parentClassName="rounded-lg"
                  isHover
                >
                  <label className="text-base font-semibold text-center sm:text-lg md:text-xl">{item.title}</label>
                </Background>
              </Motion>
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {openModalIndex !== null && (
          <Modal isVisible={openModalIndex !== null} onClose={closeModal}>
            <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
              {filteredProduct && filteredProduct?.media.length > 0 ? (
                <ImageSlider
                  images={filteredProduct?.media?.map((item) => item.url)}
                  imgClassName="w-72 sm:w-80 mx-auto lg:w-96 aspect-square rounded-lg"
                />
              ) : (
                <ImageSlider images={["/temp-business.webp"]} imgClassName="w-72 sm:w-80 mx-auto lg:w-96 aspect-square rounded-lg" />
              )}
              <div className="relative w-full space-y-4 sm:space-y-8">
                <h3 className="text-xl font-medium sm:text-2xl md:text-3xl text-primary">{business?.data.title}</h3>
                <div className="space-y-2 md:space-y-4">
                  <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{filteredProduct?.title}</h4>
                  <p className="h-40 overflow-y-auto text-sm leading-tight text-justify md:h-48 lg:h-60 sm:text-base xl:text-lg scrollbar">
                    {filteredProduct?.description}
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
