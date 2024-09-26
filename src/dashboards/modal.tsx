"use client";

import { useEffect } from "react";

import { motion } from "framer-motion";

import { RxCross1 } from "react-icons/rx";

import { DashboardModalProps } from "./types";

export const Modal = ({ isVisible, onClose, children, className }: DashboardModalProps) => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-dark-blue z-1000">
      <motion.div
        className={`relative w-full p-6 mx-auto rounded-lg shadow-lg bg-light ${className ?? ""}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button className="btn-cross-border group" onClick={onClose}>
          <RxCross1 size={20} className="text-primary group-hover:text-light" />
        </button>
        {children}
      </motion.div>
    </div>
  );
};
