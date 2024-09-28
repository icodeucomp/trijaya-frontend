"use client";

import * as React from "react";

import { motion } from "framer-motion";

import { RxCross1 } from "react-icons/rx";

import { ModalProps } from "@/types";

export const Modal = ({ isVisible, onClose, children }: ModalProps) => {
  React.useEffect(() => {
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
        <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">{children}</div>
      </motion.div>
    </div>
  );
};
