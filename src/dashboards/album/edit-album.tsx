"use client";

import * as React from "react";

import { useGetApi, usePost, useToggleState, useUpload } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Button, Img } from "@/components";
import { Modal } from "../modal";

import { FaMinus } from "react-icons/fa6";

import { UploadTypes } from "../types";
import { AlbumTypes, ResponseAlbumTypes } from "@/types";

interface UploadsTypes {
  uploadedFiles: UploadTypes[];
}

export const EditAlbum = ({ slug }: { slug: string }) => {
  const [ref, modal, toggleModal] = useToggleState();

  const initValue = { name: "", slug: "", header: "", medias: [] };

  const [album, setAlbum] = React.useState<Partial<AlbumTypes>>(initValue);
  const [errors, setErrors] = React.useState<boolean>(false);

  const { response: resAlbum } = useGetApi<ResponseAlbumTypes>({ path: `/albums/${slug}` });
  const { uploadFile: uploadImages, response: dataImages, uploading: loadImages } = useUpload<UploadsTypes>();
  const { execute: editAlbum, loading } = usePost("PATCH", "album");
  const { execute: addMedia } = usePost("POST");
  const { execute: deleteMedia } = usePost("DELETE");

  const handleClose = () => {
    if (album.name !== resAlbum?.data.name || album.medias !== resAlbum?.data.medias) {
      if (confirm("Are you sure you want to close? Your data has not saved in database!")) {
        setAlbum(initValue);
        toggleModal();
        return;
      } else {
        return;
      }
    }
    toggleModal();
  };

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    await uploadImages(files!, "type=media");

    const newMedia = files.map((file) => ({
      url: URL.createObjectURL(file),
      slug: file.name,
      name: file.name,
    }));

    setAlbum((prevImages) => ({ ...prevImages, medias: [...(prevImages.medias || []), ...newMedia] }));
  };

  const handleDeleteImage = (slugMedia: string) => {
    deleteMedia(`/albums/${slug}/media/${slugMedia}`, {});
    setAlbum((prevImages) => ({ ...prevImages, medias: prevImages.medias?.filter((media) => media.slug !== slugMedia) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updateFields: Partial<AlbumTypes> = {};

    const images = dataImages?.uploadedFiles.map((file) => ({ name: file.name, url: file.url, size: file.size }));

    if (album.name !== resAlbum?.data.name) {
      updateFields.name = album.name;
    }

    if (Object.keys(updateFields).length < 0) {
      setErrors(true);
      return;
    }

    if (album.medias && resAlbum?.data.medias) {
      if (album.medias?.length > resAlbum?.data.medias.length) {
        await addMedia(`/albums/${slug}/media`, images);
      }
    }

    editAlbum(`/albums/${slug}`, updateFields);
  };

  React.useEffect(() => {
    if (resAlbum) {
      setAlbum({
        name: resAlbum.data.name,
        header: resAlbum.data.header,
        medias: resAlbum.data.medias,
      });
    }
  }, [resAlbum]);

  return (
    <div ref={ref}>
      <Button onClick={toggleModal} className="btn-primary">
        Edit
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
                <h3 className="text-lg font-semibold text-center sm:text-start text-primary">Add Album</h3>
                <div className="relative text-center">
                  <Img src={album.header || "/temp-business.webp"} alt={"test"} className="mx-auto rounded-lg w-60 aspect-square" cover />
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="title"
                    className="floating-input peer"
                    placeholder=" "
                    value={album.name}
                    onChange={(e) => setAlbum((prev) => ({ ...prev, name: e.target.value }))}
                  />
                  <label
                    htmlFor="title"
                    className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                  >
                    Title
                  </label>
                </div>
                {errors && !album.name && <small className="w-full text-secondary">Enter name please!</small>}
                <div className="relative flex flex-row items-center overflow-hidden border rounded-lg border-gray/50">
                  <input type="file" id="images" onChange={handleImagesChange} hidden accept="image/*" multiple />
                  <label
                    htmlFor="images"
                    className="block px-4 py-2 mr-4 text-sm font-semibold border-0 cursor-pointer rounded-s-lg whitespace-nowrap bg-light-gray text-primary hover:bg-blue-200"
                  >
                    Choose file
                  </label>
                  <label className="text-sm text-slate-500 whitespace-nowrap">{album?.medias?.length} Images</label>
                  <div className="absolute top-0 right-0 w-4 h-full bg-light"></div>
                </div>
                <small className="pl-2 text-gray/70">maximum image size 5mb. (aspect ratio of 16:9)</small>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {album.medias?.map((image, index) => (
                    <div key={index} className="relative">
                      <button
                        onClick={() => handleDeleteImage(image.slug)}
                        type="button"
                        className="absolute flex items-center justify-center w-5 h-5 rounded-full -top-2 -right-2 z-1 bg-secondary"
                      >
                        <FaMinus className="fill-light" />
                      </button>
                      <Img src={image.url || "/temp-business.webp"} alt={`Selected image ${index + 1}`} className="w-full h-32 rounded-lg" cover />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end p-2">
                  {loading || loadImages ? (
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
