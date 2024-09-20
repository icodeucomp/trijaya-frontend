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
    <div className="fixed inset-0 flex items-center justify-center bg-dark-blue bg-opacity-50 z-1000">
      <motion.div
        className="bg-light p-14 rounded-lg shadow-lg relative max-w-screen-lg mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button className="btn-cross-border group" onClick={onClose}>
          <RxCross1 size={20} className="text-primary group-hover:text-light" />
        </button>
        <div className="grid grid-cols-2 gap-8">
          <ImageSlider images={images} imgClassName="aspect-square" />
          <Slider slidesPerView={1} title={category} className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-4xl font-semibold text-primary">Alat Bor</h4>
                <p className="leading-tight text-justify text-lg">
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
