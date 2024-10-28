"use client";

import * as React from "react";

import { useGetApi, useToggleState } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Img } from "@/components";
import { Modal } from "../modal";

import { BiShowAlt } from "react-icons/bi";

import { ResponseAlbumTypes } from "@/types";

export const ShowAlbum = ({ slug }: { slug: string }) => {
  const [ref, modal, toggleModal] = useToggleState();

  const { response: album, loading } = useGetApi<ResponseAlbumTypes>({ path: `/albums/${slug}` });
  return (
    <div ref={ref}>
      <button onClick={toggleModal} className="p-2 duration-300 border rounded-full border-primary bg-light hover:bg-primary group">
        <BiShowAlt size={20} className="text-primary group-hover:text-light" />
      </button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={toggleModal} className="max-w-xl">
            {loading ? (
              <div className="flex justify-center w-full py-16">
                <div className="loader"></div>
              </div>
            ) : (
              <div className="space-y-4 md:min-w-xl">
                <h3 className="text-lg font-semibold text-center sm:text-start text-primary">Show Album</h3>
                <div className="relative text-center">
                  <Img
                    src={album?.data.header || "/temp-business.webp"}
                    alt={album?.data.name || slug}
                    className="w-64 mx-auto rounded-lg aspect-video"
                    cover
                  />
                </div>
                <div className="relative w-full">
                  <h4 className="text-xl font-semibold sm:text-2xl text-primary">{album?.data.name}</h4>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {album?.data.medias?.map((image, index) => (
                    <div key={index} className="relative">
                      <Img
                        src={image.url || "/temp-business.webp"}
                        alt={`Selected image ${index + 1}`}
                        className="w-40 rounded-lg aspect-video"
                        cover
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
