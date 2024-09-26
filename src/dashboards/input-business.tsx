import { AnimatePresence } from "framer-motion";

import { useToggleState } from "@/hooks";
import { Button, Img } from "@/components";
import { Modal } from "./modal";

import { MdAdd } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";

import { InputBusinessProps } from "./types";

export const InputBusiness = ({ id, title, description, images, onInputChange, onImagesChange, onDelete }: InputBusinessProps) => {
  const [ref, modal, toggleModal] = useToggleState();

  return (
    <div className="relative bg-light border border-gray rounded-lg flex gap-8 px-4 py-6 mt-6">
      <button onClick={() => onDelete(id)} className="absolute -top-4 -right-4 border border-secondary p-1 rounded-full bg-light">
        <FaMinusCircle className="size-6 fill-secondary" />
      </button>
      <div className="relative text-center" ref={ref}>
        <div className="container-border w-60 cursor-pointer" onClick={toggleModal}>
          <MdAdd className="size-8 fill-gray" />
        </div>
        <button className="text-lg duration-300 cursor-pointer text-primary hover:text-primary/80" onClick={toggleModal}>
          Upload media
        </button>
        <AnimatePresence>
          {modal && (
            <Modal isVisible={modal} onClose={toggleModal} className="max-w-xl">
              <form className="space-y-4 md:min-w-xl" encType="multipart/form-data">
                <h1 className="text-lg font-semibold text-center sm:text-start text-primary">Add Media</h1>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => onImagesChange(id, e.target.files)}
                  className="block w-full text-sm border rounded-lg cursor-pointer text-gray border-gray bg-light-gray focus:outline-none focus:border-primary"
                />
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {images.map((image, index) => (
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
      <div className="space-y-4 w-full">
        <div className="relative w-full">
          <input type="text" id="title" className="floating-input peer" placeholder=" " value={title} onChange={(e) => onInputChange(id, e)} />
          <label
            htmlFor="title"
            className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
          >
            Product title
          </label>
        </div>
        <div className="relative w-full">
          <input
            type="text"
            id="description"
            className="floating-input peer"
            placeholder=" "
            value={description}
            onChange={(e) => onInputChange(id, e)}
          />
          <label
            htmlFor="description"
            className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
          >
            Product description
          </label>
        </div>
      </div>
    </div>
  );
};
