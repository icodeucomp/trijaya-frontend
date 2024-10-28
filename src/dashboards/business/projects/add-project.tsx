"use client";

import * as React from "react";

import { usePost, useToggleState, useUpload } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Modal } from "@/dashboards/modal";
import { Button, Img } from "@/components";

import { MdAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";

import { BusinessSectorTypes } from "@/types";
import { UploadTypes } from "@/dashboards/types";

interface UploadsTypes {
  uploadedFiles: UploadTypes[];
}

export const AddProject = ({ businessId, slug }: { businessId: number; slug: string }) => {
  const [ref, modal, toggleModal] = useToggleState();

  const initValue = { title: "", description: "", media: [], header: { url: "", slug: "" } };

  const { execute, loading } = usePost("POST", `/business/project/${slug}`);
  const { uploading: loadImgHead, uploadFile: uploadImageHeader, response: dataImageHeader } = useUpload<UploadTypes>();
  const { uploading: loadImages, uploadFile: uploadImages, response: dataImages } = useUpload<UploadsTypes>();

  const [project, setProject] = React.useState<Partial<BusinessSectorTypes>>(initValue);
  const [errors, setErrors] = React.useState<boolean>(false);

  const handleClose = () => {
    if (project.title !== "" || project.description !== "" || project.header?.url !== "" || (project.media && project.media?.length > 0)) {
      if (confirm("Are you sure you want to close? Your data will not be saved!")) {
        setProject(initValue);
        toggleModal();
        return;
      } else {
        return;
      }
    }
    toggleModal();
  };

  const handleHeaderImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    await uploadImageHeader(file!, `type=business&category=${slug}&business-type=project`);

    setProject((prevProject) => ({ ...prevProject, header: { url: URL.createObjectURL(file!), slug: file?.name || "" } }));
  };

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    await uploadImages(files!, `type=business&category=${slug}&business-type=project`);

    const newMedia = files.map((file) => ({ url: URL.createObjectURL(file), slug: file.name }));

    setProject((prevProject) => ({ ...prevProject, media: [...(prevProject.media || []), ...newMedia] }));
  };

  const handleDeleteImage = (index: number) => {
    setProject((prevProject) => ({ ...prevProject, media: prevProject.media?.filter((_, i) => i !== index) }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const prevImage = project?.media?.filter((prev) => prev.url.includes("icodeu-storage")).map((upload) => ({ url: upload.url, slug: upload.slug }));
    const uploadImage = dataImages?.uploadedFiles.map((upload) => ({ url: upload.url, slug: upload.name }));
    const images = [...(prevImage || []), ...(uploadImage || [])];

    if (project.title === "" || project.description === "" || images.length === 0 || project.header?.url === "") {
      setErrors(true);
      return;
    }

    const body = {
      title: project?.title,
      description: project?.description,
      media: images,
      businessId,
      header: { url: dataImageHeader?.url, slug: dataImageHeader?.name },
    };
    execute(`/projects`, body);
  };

  return (
    <div ref={ref}>
      <Button onClick={toggleModal} className="btn-primary">
        Add Project
      </Button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={handleClose} className="max-w-2xl">
            <h3 className="text-lg font-semibold text-center sm:text-start text-primary">Add Project</h3>
            <form onSubmit={handleSubmitForm} className="w-full mt-4 space-y-4">
              <div className="relative text-center">
                {errors && !project.header?.url ? (
                  <small className="w-full text-secondary">Enter image header please!</small>
                ) : (
                  <small className="w-full">maximum image size 5mb. (aspect ratio of 1:1)</small>
                )}
                {project.header && project.header.url !== "" ? (
                  <Img
                    src={project.header?.url || "/temp-business.webp"}
                    alt={project.header.slug}
                    className="mx-auto rounded-lg w-60 aspect-square"
                    cover
                  />
                ) : (
                  <>
                    <label htmlFor="image-header" className="cursor-pointer container-border w-60">
                      <MdAdd className="size-8 fill-gray" />
                    </label>

                    <label htmlFor="image-header" className="cursor-pointer text-primary hover:font-semibold hover:text-primary/80">
                      Upload Image Header
                    </label>
                  </>
                )}
                <input type="file" accept="image/*" id="image-header" className="sr-only" onChange={handleHeaderImageChange} />
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  id="title"
                  className="floating-input peer"
                  placeholder=" "
                  value={project.title}
                  onChange={(e) => setProject((prev) => ({ ...prev, title: e.target.value }))}
                />
                <label
                  htmlFor="title"
                  className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                >
                  Title
                </label>
              </div>
              {errors && !project.title && <small className="w-full text-secondary">Enter title please!</small>}
              <div className="relative w-full">
                <input
                  type="text"
                  id="description"
                  className="floating-input peer"
                  placeholder=" "
                  value={project.description}
                  onChange={(e) => setProject((prev) => ({ ...prev, description: e.target.value }))}
                />
                <label
                  htmlFor="description"
                  className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                >
                  Description
                </label>
              </div>
              {errors && !project.description && <small className="w-full text-secondary">Enter description please!</small>}
              <div className="space-y-4">
                <div className="relative flex flex-row items-center overflow-hidden border rounded-lg border-gray/50">
                  <input type="file" id="images" hidden accept="image/*" multiple onChange={handleImagesChange} />
                  <label
                    htmlFor="images"
                    className="block px-4 py-2 mr-4 text-sm font-semibold border-0 cursor-pointer rounded-s-lg whitespace-nowrap bg-light-gray text-primary hover:bg-blue-200"
                  >
                    Choose file
                  </label>
                  <label className="text-sm text-slate-500 whitespace-nowrap">{project.media?.length} Images</label>
                  <small className="pr-2 ms-auto text-gray/70">Max 5mb. (aspect ratio of 1:1)</small>
                </div>
                {errors && !project.media?.length && <small className="w-full text-secondary">Enter images please!</small>}
                <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3">
                  {project?.media?.map((image, index) => (
                    <div key={index} className="relative">
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="absolute flex items-center justify-center w-5 h-5 rounded-full -top-2 -right-2 z-1 bg-secondary"
                      >
                        <FaMinus className="fill-light" />
                      </button>
                      <Img src={image.url || "/temp-business.webp"} alt={image.slug} className="w-48 mx-auto rounded-lg aspect-square" cover />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end p-2">
                {loading || loadImages || loadImgHead ? (
                  <div className="loader"></div>
                ) : (
                  <Button type="submit" className="btn-primary">
                    Submit Project
                  </Button>
                )}
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
