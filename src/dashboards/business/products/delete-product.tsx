"use client";

import { FormEvent } from "react";

import { usePost, useToggleState } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Modal } from "@/dashboards/modal";
import { Button } from "@/components";

import { GoTrash } from "react-icons/go";

export const DeleteProduct = ({ slugProduct, slug, title }: { slugProduct: string; slug: string; title: string }) => {
  const [ref, modal, toggleModal] = useToggleState();

  const { execute, loading } = usePost("DELETE", `business/product/${slug}`);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute(`/products/${slugProduct}`, {});
  };

  return (
    <div ref={ref}>
      <button onClick={toggleModal} className="p-2 duration-300 border rounded-full border-secondary bg-light hover:bg-secondary group">
        <GoTrash size={20} className="text-secondary group-hover:text-light" />
      </button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={toggleModal} className="max-w-sm">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="loader"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="space-y-2">
                  <h1 className="mb-4 text-sm font-semibold text-center sm:text-start text-primary-1 sm:text-lg">Delete Product</h1>
                  <p className="text-sm text-medium text-dark-1 sm:text-base">Are you sure you want to permanently delete this {title}?</p>
                </div>
                <Button type="submit" className="btn-primary">
                  Delete
                </Button>
              </form>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
