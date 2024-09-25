"use client";

import { useEffect } from "react";

import { motion } from "framer-motion";

import { Slider } from "./slider";
import { ImageSlider } from "./image-slider";

import { ModalProps } from "@/types";
import { RxCross1 } from "react-icons/rx";

export const Modal = ({ isVisible, onClose, images, category }: ModalProps) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full min-h-screen p-4 bg-opacity-50 bg-dark-blue z-1000">
      <motion.div
        className="relative max-w-screen-lg px-6 pb-6 mx-auto overflow-hidden rounded-lg shadow-lg max-h-custom-modal bg-light pt-14 md:p-14"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button className="btn-cross-border group" onClick={onClose}>
          <RxCross1 size={20} className="text-primary group-hover:text-light" />
        </button>
        <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
          <ImageSlider images={images} imgClassName="w-full max-w-xs md:max-w-full mx-auto h-64 md:h-72 lg:h-96" />
          <Slider slidesPerView={1} title={category} className="space-y-2 md:space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2 md:space-y-4">
                <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">Alat bor {index + 1}</h4>

                <p className="overflow-y-auto text-sm leading-tight text-justify h-28 md:h-52 lg:h-64 sm:text-base xl:text-lg scrollbar">
                  Our scope of work encompasses a wide range of services, including the construction and repair of industrial buildings tailored to
                  meet the unique needs of various sectors. We specialize in the installation of diverse roofing systems, such as Spandek models,
                  Bitumen models, and other advanced materials designed for durability and efficiency. Additionally, we provide comprehensive
                  partitioning solutions to optimize space and functionality. Beyond construction, our expertise extends to all aspects of fabrication
                  work, ensuring precise and high-quality outcomes for every project we undertake.
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>
    </div>
  );
};
