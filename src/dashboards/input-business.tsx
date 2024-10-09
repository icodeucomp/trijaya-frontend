"use client";

import { AnimatePresence } from "framer-motion";

import { useToggleState } from "@/hooks";
import { Button, Img } from "@/components";
import { Modal } from "./modal";

import { MdAdd } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";

import { InputBusinessProps } from "./types";

export const InputBusiness = ({
  slug,
  title,
  description,
  images,
  onInputChange,
  onImagesChange,
  onDelete,
  handleDeleteImage,
  handleSubmitImage,
  uploading,
  handleSubmitForm,
  loadData,
}: InputBusinessProps) => {
  const [ref, modal, toggleModal] = useToggleState();
  const [refDeleteModal, deleteModal, toggleDeleteModal] = useToggleState();

  const handleSubmitDelete = (slug: string) => {
    if (slug) {
      toggleDeleteModal();
      return;
    } else {
      onDelete(slug);
      return;
    }
  };

  return (
    <div
      ref={refDeleteModal}
      className="relative flex flex-col justify-between items-center w-full gap-4 px-2 py-6 mt-6 border rounded-lg bg-light border-gray sm:flex-row md:gap-8 sm:px-4"
    >
      {loadData ? (
        <div className="flex items-center justify-center w-full py-8">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <>
            <button onClick={() => handleSubmitDelete(slug)} className="absolute p-1 border rounded-full -top-4 -right-4 border-secondary bg-light">
              <FaMinusCircle className="size-5 sm:size-6 fill-secondary" />
            </button>
            <Modal isVisible={deleteModal} onClose={toggleDeleteModal} className="max-w-sm">
              {loadData ? (
                <div className="flex justify-center py-16">
                  <div className="loader"></div>
                </div>
              ) : (
                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <h1 className="mb-4 text-sm font-semibold text-center sm:text-start text-primary-1 sm:text-lg">Delete {title}</h1>
                    <p className="text-sm text-medium text-dark-1 sm:text-base">Are you sure you want to permanently delete this {title}?</p>
                  </div>
                  <Button onClick={() => onDelete(slug)} type="submit" className="btn-primary">
                    Delete
                  </Button>
                </div>
              )}
            </Modal>
          </>

          <div className="relative text-center" ref={ref}>
            {!images?.length ? (
              <div className="cursor-pointer container-border w-52" onClick={toggleModal}>
                <MdAdd className="size-8 fill-gray" />
              </div>
            ) : (
              <Img src={images[0].url || "/temp-business.webp"} alt={title} className="w-60 rounded-lg aspect-square" cover />
            )}
            <button className="text-lg duration-300 cursor-pointer text-primary hover:text-primary/80" onClick={toggleModal}>
              {!images?.length ? "Upload images" : "Show images"}
            </button>
            <AnimatePresence>
              {modal && (
                <Modal isVisible={modal} onClose={toggleModal} className="max-w-2xl">
                  <div className="space-y-4 md:min-w-xl">
                    <h1 className="text-lg font-semibold text-center sm:text-start text-primary">Add Images</h1>
                    <div className="relative flex flex-row items-center overflow-hidden border rounded-lg border-gray/50">
                      <input type="file" id="images" onChange={(e) => onImagesChange(slug, e)} hidden accept="image/*" multiple />
                      <label
                        htmlFor="images"
                        className="block px-4 py-2 mr-4 text-sm font-semibold border-0 cursor-pointer rounded-s-lg whitespace-nowrap bg-light-gray text-primary hover:bg-blue-200"
                      >
                        Choose file
                      </label>
                      <label className="text-sm text-slate-500 whitespace-nowrap">{images.length} Images</label>
                      <div className="absolute top-0 right-0 w-4 h-full bg-light"></div>
                    </div>
                    <small className="pl-2 text-gray/70">maximum image size 5mb. (aspect ratio of 1:1)</small>
                    <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <button
                            onClick={() => handleDeleteImage(slug, index)}
                            className="absolute w-4 h-4 rounded-full -top-2 -right-2 z-1 bg-secondary"
                          ></button>
                          <Img src={image.url || "/temp-business.webp"} alt={title} className="h-48 mx-auto rounded-lg w-full" cover />
                        </div>
                      ))}
                    </div>
                    {uploading ? (
                      <div className="flex justify-end">
                        <div className="loader"></div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <Button type="button" className="btn-primary" onClick={() => handleSubmitImage(slug)}>
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                </Modal>
              )}
            </AnimatePresence>
          </div>
          <div className="w-full space-y-4">
            <div className="relative w-full">
              <input type="text" id="title" className="floating-input peer" placeholder=" " value={title} onChange={(e) => onInputChange(slug, e)} />
              <label
                htmlFor="title"
                className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
              >
                Title
              </label>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                id="description"
                className="floating-input peer"
                placeholder=" "
                value={description}
                onChange={(e) => onInputChange(slug, e)}
              />
              <label
                htmlFor="description"
                className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
              >
                Description
              </label>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => handleSubmitForm(slug)} type="submit" className="btn-primary">
                Submit Product
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
