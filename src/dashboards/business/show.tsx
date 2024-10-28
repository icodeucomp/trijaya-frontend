"use client";

import { useGetApi, useToggleState } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Img } from "@/components";
import { Modal } from "@/dashboards/modal";

import { BiShowAlt } from "react-icons/bi";
import { ResponseBusinessTypes } from "@/types";

export const Show = ({ slug }: { slug: string }) => {
  const [ref, modal, toggleModal] = useToggleState();

  const { response: business, loading } = useGetApi<ResponseBusinessTypes>({ path: `/business/${slug}` });

  return (
    <div ref={ref} className="absolute top-2.5 right-1.5">
      <button onClick={toggleModal} className="p-1.5 duration-300 border rounded-full border-primary bg-light hover:bg-primary group">
        <BiShowAlt size={20} className="text-primary group-hover:text-light" />
      </button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={toggleModal} className="max-w-2xl">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="loader"></div>
              </div>
            ) : (
              <div className="space-y-4 text-dark-blue">
                <h3 className="text-lg font-semibold text-center sm:text-start text-primary">Information Business</h3>
                <Img
                  src={business?.data.header.url || "/temp-business.webp"}
                  alt={business?.data.title || ""}
                  className="mx-auto rounded-lg w-80 aspect-square"
                  cover
                />
                <div className="space-y-2">
                  <h3 className="heading">{business?.data.title}</h3>
                  <p className="text-sm text-justify sm:text-base">{business?.data.description}</p>
                </div>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
