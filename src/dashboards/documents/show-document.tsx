"use client";

import { useGet, useToggleState } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Modal } from "../modal";

import { BiShowAlt } from "react-icons/bi";
import { ResponseDocumentTypes } from "@/types";
import { Button } from "@/components";

export const ShowDocument = ({ slug }: { slug: string }) => {
  const [ref, modal, toggleModal] = useToggleState();

  const { response: document, loading } = useGet<ResponseDocumentTypes>(`/documents/${slug}`);

  return (
    <div ref={ref}>
      <button onClick={toggleModal} className="p-2 duration-300 border rounded-full border-primary bg-light hover:bg-primary group">
        <BiShowAlt size={20} className="text-primary group-hover:text-light" />
      </button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={toggleModal} className="max-w-xl mt-8 space-y-4">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                <div className="flex font-medium text-dark-blue">
                  <p className="flex-shrink-0 w-36 md:w-40 whitespace-nowrap">Document type</p>
                  <p>: {document?.data.category}</p>
                </div>
                <div className="flex font-medium text-dark-blue">
                  <p className="flex-shrink-0 w-36 md:w-40 whitespace-nowrap">Document name</p>
                  <p>: {document?.data.name}</p>
                </div>
                <div className="flex font-medium text-center text-dark-blue">
                  <a href={document?.data.url} target="_blank" rel="noopener" className="block">
                    <Button className="btn-primary">Show full document</Button>
                  </a>
                </div>
              </>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
