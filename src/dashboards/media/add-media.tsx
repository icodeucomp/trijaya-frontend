"use client";

import * as React from "react";

import { usePost, useToggleState, useUpload } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Button, Img } from "@/components";
import { Modal } from "../modal";

interface UploadTypes {
  uploadedFiles: {
    name: string;
    url: string;
    size: string;
  }[];
}

export const AddMedia = () => {
  const [ref, modal, toggleModal] = useToggleState();

  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);

  const { uploadFile, response: dataImages, uploading } = useUpload<UploadTypes>();
  const { execute, loading } = usePost("POST", "media");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedImages(files);
    await uploadFile(files!, "type=media");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = dataImages?.uploadedFiles.map((file) => ({ name: file.name, url: file.url, size: file.size }));
    execute("/media", body);
  };

  return (
    <div ref={ref}>
      <Button onClick={toggleModal} className="btn-primary">
        Add Media
      </Button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={toggleModal} className="max-w-xl">
            {loading ? (
              <div className="flex justify-center py-16 w-full">
                <div className="loader"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:min-w-xl">
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
                      <button className="absolute -top-2 -right-2 w-4 h-4 z-1 rounded-full bg-secondary"></button>
                      <Img
                        src={URL.createObjectURL(image) || "/temp-business.webp"}
                        alt={`Selected image ${index + 1}`}
                        className="w-full h-32 rounded-lg"
                        cover
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  {uploading ? (
                    <div className="loader"></div>
                  ) : (
                    <Button type="submit" className="btn-primary">
                      Save
                    </Button>
                  )}
                </div>
              </form>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
