"use client";

import * as React from "react";

import { useToggleState } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Button, Img } from "@/components";
import { Modal } from "../modal";

export const AddMedia = () => {
  const [ref, modal, toggleModal] = useToggleState();

  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedImages(files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the bulk image upload logic here (e.g., sending to server)
  };

  return (
    <div ref={ref}>
      <Button onClick={toggleModal} className="btn-primary">
        Add Media
      </Button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={toggleModal} className="max-w-xl">
            <form className="space-y-4 md:min-w-xl" encType="multipart/form-data">
              <h1 className="text-lg font-semibold text-center sm:text-start text-primary">Add Media</h1>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm border rounded-lg cursor-pointer text-gray border-gray bg-light-gray focus:outline-none focus:border-primary"
              />
              <div className="grid grid-cols-3 gap-2 mt-4">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <Img src={URL.createObjectURL(image)} alt={`Selected image ${index + 1}`} className="w-full h-20 rounded-lg" cover />
                  </div>
                ))}
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
