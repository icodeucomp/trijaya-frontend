"use client";

import { FormEvent } from "react";

import { usePost, useToggleState } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Button } from "@/components";
import { Modal } from "../modal";

import { GoTrash } from "react-icons/go";

export const DeleteMedia = ({ slug }: { slug: string }) => {
  const [ref, modal, toggleModal] = useToggleState();

  const { execute } = usePost("DELETE", "media");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute(`/media/${slug}`, {});
  };

  return (
    <div ref={ref}>
      <button
        onClick={toggleModal}
        className="absolute p-2 duration-300 border rounded-full top-4 right-4 border-secondary bg-light hover:bg-secondary group"
      >
        <GoTrash size={20} className="text-secondary group-hover:text-light" />
      </button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={toggleModal} className="max-w-sm">
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                <h1 className="mb-4 text-sm font-semibold text-center sm:text-start text-primary-1 sm:text-lg">Delete Media</h1>
                <p className="text-sm text-medium text-dark-1 sm:text-base">Are you sure you want to permanently delete this media?</p>
              </div>
              <Button type="submit" className="btn-primary">
                Delete
              </Button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
