"use client";

import * as React from "react";

import { useGetApi, useToggleState } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Modal } from "@/dashboards/modal";
import { Img } from "@/components";

import { BiShowAlt } from "react-icons/bi";

import { ResponseBusinessSectorTypes } from "@/types";

export const ShowProject = ({ slugProject }: { slugProject: string }) => {
  const [ref, modal, toggleModal] = useToggleState();

  const { response: project } = useGetApi<ResponseBusinessSectorTypes>({ path: `/projects/${slugProject}` });

  return (
    <div ref={ref}>
      <button onClick={toggleModal} className="p-2 duration-300 border rounded-full border-primary bg-light hover:bg-primary group">
        <BiShowAlt size={20} className="text-primary group-hover:text-light" />
      </button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={toggleModal} className="max-w-screen-md">
            <div className="w-full px-4 pt-4 space-y-4 sm:pt-0 sm:px-8">
              <Img src={project?.data.header?.url || "/temp-business.webp"} alt={project?.data.header.slug || slugProject} className="w-64 mx-auto rounded-lg aspect-square" cover />

              <div className="space-y-2">
                <h4 className="text-xl font-semibold sm:text-2xl text-primary">{project?.data.title}</h4>
                <p className="h-full text-sm leading-tight text-justify sm:text-base">{project?.data.description}</p>
              </div>

              <div className="grid grid-cols-3">
                {project?.data.media && project.data.media.length > 0 ? (
                  project?.data.media?.map((image, index) => <Img key={index} src={image.url || "/temp-business.webp"} alt={image.slug} className="mx-auto rounded-lg w-52 aspect-square" cover />)
                ) : (
                  <Img src={"/temp-business.webp"} alt={slugProject} className="mx-auto rounded-lg w-52 aspect-square" cover />
                )}
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
