import { FormEvent } from "react";

import { usePost, useToggleState } from "@/hooks";

import { Button } from "@/components";
import { Modal } from "../modal";

import { AnimatePresence } from "framer-motion";
import { GoTrash } from "react-icons/go";

export const DeleteArticle = ({ slug }: { slug: string }) => {
  const [ref, modal, toggleModal] = useToggleState();

  const { execute, loading } = usePost("DELETE", "article");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute(`/blogs/${slug}`, {});
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
              <div className="flex justify-center w-full py-16">
                <span className="loader"></span>
              </div>
            ) : (
              <form className="w-full space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <h1 className="mb-4 text-sm font-semibold text-center sm:text-start text-primary-1 sm:text-lg">Delete Article</h1>
                  <p className="text-sm text-medium text-dark-1 sm:text-base">Are you sure you want to permanently delete this article?</p>
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
