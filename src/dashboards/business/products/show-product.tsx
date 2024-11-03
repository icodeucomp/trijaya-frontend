"use client";

import * as React from "react";

import { useGetApi, useToggleState } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Modal } from "@/dashboards/modal";
import { ImageSlider } from "@/components";

import { BiShowAlt } from "react-icons/bi";

import { ResponseBusinessSectorTypes } from "@/types";

export const ShowProduct = ({ slugProduct }: { slugProduct: string }) => {
  const [ref, modal, toggleModal] = useToggleState();

  const { response: product } = useGetApi<ResponseBusinessSectorTypes>({ path: `/products/${slugProduct}` });

  return (
    <div ref={ref}>
      <button onClick={toggleModal} className="p-2 duration-300 border rounded-full border-primary bg-light hover:bg-primary group">
        <BiShowAlt size={20} className="text-primary group-hover:text-light" />
      </button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={toggleModal} className="max-w-screen-lg">
            <div className="grid grid-cols-1 w-full gap-4 px-4 pt-10 md:grid-cols-2 sm:px-8">
              {product?.data && product?.data.media.length > 0 ? (
                <ImageSlider images={product?.data.media?.map((item) => item.url)} imgClassName="w-72 sm:w-80 mx-auto lg:w-96 aspect-square rounded-lg" />
              ) : (
                <ImageSlider images={["/temp-business.webp"]} imgClassName="w-72 sm:w-80 mx-auto lg:w-96 aspect-square rounded-lg" />
              )}

              <div className="space-y-4">
                <h4 className="text-xl font-semibold sm:text-2xl text-primary">{product?.data.title}</h4>
                <p className="h-full pr-2 overflow-y-auto text-sm leading-tight text-justify md:h-64 sm:text-base scrollbar">{product?.data.description}</p>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
