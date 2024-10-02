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
      className="relative bg-light border border-gray rounded-lg flex justify-between w-full gap-4 flex-col sm:flex-row md:gap-8 px-2 sm:px-4 py-6 mt-6"
    >
      {loadData ? (
        <div className="flex items-center justify-center w-full py-8">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <>
            <button onClick={() => handleSubmitDelete(slug)} className="absolute -top-4 -right-4 border border-secondary p-1 rounded-full bg-light">
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
            {!images.length ? (
              <div className="container-border w-60 cursor-pointer" onClick={toggleModal}>
                <MdAdd className="size-8 fill-gray" />
              </div>
            ) : (
              <Img
                src={images[0] || "/temp-article.webp"}
                alt={title}
                className="w-full h-40 sm:w-60 sm:aspect-video rounded-lg overflow-hidden"
                cover
              />
            )}
            <button className="text-lg duration-300 cursor-pointer text-primary hover:text-primary/80" onClick={toggleModal}>
              {!images.length ? "Upload images" : "Show images"}
            </button>
            <AnimatePresence>
              {modal && (
                <Modal isVisible={modal} onClose={toggleModal} className="max-w-2xl">
                  <div className="space-y-4 md:min-w-xl">
                    <h1 className="text-lg font-semibold text-center sm:text-start text-primary">Add Images</h1>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => onImagesChange(slug, e)}
                      className="block w-full text-sm border rounded-lg cursor-pointer text-gray border-gray bg-light-gray focus:outline-none focus:border-primary"
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <button
                            onClick={() => handleDeleteImage(slug, index)}
                            className="absolute -top-2 -right-2 w-4 h-4 z-1 rounded-full bg-secondary"
                          ></button>
                          <Img src={image || "/temp-business.webp"} alt={title} className="w-full h-36 rounded-lg overflow-hidden" cover />
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
          <div className="space-y-4 w-full">
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
