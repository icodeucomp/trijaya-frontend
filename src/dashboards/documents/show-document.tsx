"use client";

import { useToggleState } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Modal } from "../modal";

import { BiShowAlt } from "react-icons/bi";

export const ShowDocument = () => {
  const [ref, modal, toggleModal] = useToggleState();

  return (
    <div ref={ref}>
      <button onClick={toggleModal} className="p-2 duration-300 border rounded-full border-primary bg-light hover:bg-primary group">
        <BiShowAlt size={20} className="text-primary group-hover:text-light" />
      </button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={toggleModal} className="max-w-xl space-y-4 mt-8">
            <div className="flex text-sm font-medium text-dark-blue">
              <p className="flex-shrink-0 w-36 md:w-40 whitespace-nowrap">Document type</p>
              <p>: legality</p>
            </div>
            <div className="flex text-sm font-medium text-dark-blue">
              <p className="flex-shrink-0 w-36 md:w-40 whitespace-nowrap">Document title</p>
              <p>: Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="flex text-sm font-medium text-dark-blue">
              <p className="flex-shrink-0 w-36 md:w-40 whitespace-nowrap">Document description</p>
              <p>
                : Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, debitis consectetur? Eos amet explicabo, eum repellat
                molestiae quae earum. Itaque?
              </p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
