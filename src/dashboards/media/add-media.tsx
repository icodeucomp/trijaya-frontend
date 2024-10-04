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

  const handleClose = () => {
    if (selectedImages.length !== 0) {
      if (confirm("Are you sure you want to close? Your image has not saved in database!")) {
        setSelectedImages([]);
        toggleModal();
        return;
      } else {
        return;
      }
    }
    toggleModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedImages.length < 1) {
      return;
    }
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
          <Modal isVisible={modal} onClose={handleClose} className="max-w-xl">
            {loading ? (
              <div className="flex justify-center w-full py-16">
                <div className="loader"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:min-w-xl">
                <h1 className="text-lg font-semibold text-center sm:text-start text-primary">Add Media</h1>
                <div className="relative flex flex-row items-center overflow-hidden border rounded-lg border-gray/50">
                  <input type="file" id="images" onChange={handleFileChange} hidden accept="image/*" multiple />
                  <label
                    htmlFor="images"
                    className="block px-4 py-2 mr-4 text-sm font-semibold border-0 cursor-pointer rounded-s-lg whitespace-nowrap bg-light-gray text-primary hover:bg-blue-200"
                  >
                    Choose file
                  </label>
                  <label className="text-sm text-slate-500 whitespace-nowrap">{selectedImages?.length} Images</label>
                  <div className="absolute top-0 right-0 w-4 h-full bg-light"></div>
                </div>
                <small className="pl-2 text-gray/70">maximum image size 5mb.</small>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <button className="absolute w-4 h-4 rounded-full -top-2 -right-2 z-1 bg-secondary"></button>
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
