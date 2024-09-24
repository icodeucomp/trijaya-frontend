"use client";

import { useToggleState } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import Select from "react-select";

import { Button } from "@/components";
import { Modal } from "../modal";

import { StyleTypes } from "../types";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const AddDocument = ({ stylesOptions }: { stylesOptions: StyleTypes }) => {
  const [ref, modal, toggleModal] = useToggleState();

  return (
    <div ref={ref}>
      <Button onClick={toggleModal} className="btn-primary">
        Add Document
      </Button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={toggleModal} className="max-w-xl">
            <form className="space-y-4 md:min-w-xl" encType="multipart/form-data">
              <h1 className="text-lg font-semibold text-center sm:text-start text-primary">Add Document</h1>
              <div className="relative text-center">
                <label htmlFor="file" className="text-sm font-semibold duration-300 cursor-pointer text-primary hover:text-secondary">
                  Upload Photo
                </label>
                <input type="file" id="file" className="sr-only" />
              </div>
              <div className="space-y-4">
                <Select placeholder="Document type" isMulti options={options} styles={stylesOptions} />
                <div className="relative">
                  <input autoComplete="off" type="text" className="input_form" placeholder="Document title" />
                </div>
                <div className="relative">
                  <input autoComplete="off" type="text" className="input_form" placeholder="Document description" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="btn-primary">
                  Save
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
