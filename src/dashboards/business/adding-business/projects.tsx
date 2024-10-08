"use client";

import * as React from "react";

import { usePost, useUpload } from "@/hooks";

import toast from "react-hot-toast";

import { Button } from "@/components";
import { InputBusiness } from "@/dashboards/input-business";

import { MdAdd } from "react-icons/md";

import { BusinessSectorTypes } from "@/types";
import { UploadTypes } from "@/dashboards/types";

interface ProjectTypes extends BusinessSectorTypes {
  newFiles?: File[];
}
interface UploadsTypes {
  uploadedFiles: UploadTypes[];
}

export const Projects = ({ data, slugBusiness, id }: { slugBusiness: string; data: BusinessSectorTypes[] | undefined; id: number }) => {
  const [elements, setElements] = React.useState<ProjectTypes[]>([]);

  const { uploading, uploadFile, response: dataImage } = useUpload<UploadsTypes>();
  const { execute: executeAdd, loading: loadAddData } = usePost("POST", `/business/edit/${slugBusiness}`);
  const { execute: executeUpdate, loading: loadUpdateData } = usePost("PATCH", `/business/edit/${slugBusiness}`);
  const { execute: executeDelete, loading: loadDeleteData } = usePost("DELETE", `/business/edit/${slugBusiness}`);

  const addElement = () => {
    setElements((prev) => [...prev, { title: "", description: "", media: [], slug: "", newFiles: [], business: { title: "" } }]);
  };

  const deleteElement = (slug: string) => {
    if (slug) {
      executeDelete(`/projects/${slug}`, {});
      setElements((prev) => prev.filter((el) => el.slug !== slug));
      return;
    } else {
      setElements((prev) => prev.filter((el) => el.slug !== slug));
      return;
    }
  };

  const handleInputChange = (slug: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setElements((prev) => prev.map((el) => (el.slug === slug ? { ...el, [e.target.id]: e.target.value } : el)));
  };

  const handleImagesChange = (slug: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    const filePreviews = files.map((file) => URL.createObjectURL(file));

    setElements((prev) =>
      prev.map((el) =>
        el.slug === slug
          ? {
              ...el,
              newFiles: [...(el.newFiles || []), ...files],
              media: [...el.media.map((mediaObj) => ({ ...mediaObj })), ...filePreviews.map((previewUrl) => ({ slug: "", url: previewUrl }))],
            }
          : el
      )
    );
  };

  const handleDeleteImage = (slug: string, index: number) => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.slug === slug) {
          const totalMedia = el.media?.length || 0;
          const totalNewFiles = Array.isArray(el.newFiles) ? el.newFiles.length : 1;

          const isNewFile = index >= totalMedia - totalNewFiles;

          if (isNewFile) {
            const newFiles = Array.isArray(el.newFiles) ? el.newFiles.filter((_, i) => i !== index - (totalMedia - totalNewFiles)) : [];
            const media = el.media.filter((_, i) => i !== index);
            return { ...el, newFiles: newFiles.length > 0 ? newFiles : undefined, media };
          } else {
            return { ...el, media: el.media.filter((_, i) => i !== index) };
          }
        }
        return el;
      })
    );
  };

  const handleSubmitImage = async (slug: string) => {
    const element = elements.find((el) => el.slug === slug);
    const files = element?.newFiles;
    if (!files) {
      toast.error("You not change the images!");
      return;
    }
    if (element) {
      await uploadFile(files!, `type=business&category=${slugBusiness}&business-type=project`);
    }
  };

  const handleSubmitForm = (slug: string) => {
    const element = elements.find((el) => el.slug === slug);
    const prevImage = element?.media.filter((prev) => prev.url.includes("icodeu-storage")).map((upload) => ({ url: upload.url, slug: upload.slug }));
    const uploadImage = dataImage?.uploadedFiles.map((upload) => ({ url: upload.url, slug: upload.name }));
    const images = [...(prevImage || []), ...(uploadImage || [])];
    const body = { title: element?.title, description: element?.description, media: images, businessId: id };
    if (!element?.slug) {
      executeAdd(`/projects`, body);
      return;
    } else {
      executeUpdate(`/projects/${element?.slug}`, body);
      return;
    }
  };

  React.useEffect(() => {
    if (data && data.length > 0) {
      setElements(data);
    }
  }, [data]);

  return (
    <div className="w-full px-4 pt-20 mx-auto sm:px-8">
      <h3 className="subheading mb-8">Add Projects</h3>

      {elements.map((item, index) => (
        <InputBusiness
          key={index}
          slug={item.slug}
          description={item.description}
          title={item.title}
          images={item.media}
          newFiles={item.newFiles}
          onDelete={deleteElement}
          onInputChange={handleInputChange}
          onImagesChange={handleImagesChange}
          handleDeleteImage={handleDeleteImage}
          handleSubmitImage={handleSubmitImage}
          handleSubmitForm={handleSubmitForm}
          uploading={uploading}
          loadData={loadAddData || loadUpdateData || loadDeleteData}
        />
      ))}

      <Button onClick={addElement} className="w-full btn-primary flex items-center justify-center gap-2 mt-6">
        <MdAdd className="fill-light size-6 border border-light rounded" /> Add
      </Button>
    </div>
  );
};
