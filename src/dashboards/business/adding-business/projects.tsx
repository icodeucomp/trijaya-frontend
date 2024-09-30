"use client";

import * as React from "react";

import { usePost, useUpload } from "@/hooks";

import { Button } from "@/components";
import { InputBusiness } from "@/dashboards/input-business";

import { MdAdd } from "react-icons/md";

import { BusinessSectorTypes } from "@/types";

interface ProjectTypes extends BusinessSectorTypes {
  newFiles?: File | File[];
}
interface UploadTypes {
  uploadedFiles: {
    url: string;
    size: string;
  }[];
}

export const Projects = ({ data, slugBusiness, id }: { slugBusiness: string; data: BusinessSectorTypes[] | undefined; id: number }) => {
  const [elements, setElements] = React.useState<ProjectTypes[]>([]);

  const { uploading, uploadFile, response: dataImage } = useUpload<UploadTypes>();
  const { execute: executeAdd, loading: loadAddData } = usePost("POST", `/business/edit/${slugBusiness}`);
  const { execute: executeUpdate, loading: loadUpdateData } = usePost("PATCH", `/business/edit/${slugBusiness}`);
  const { execute: executeDelete, loading: loadDeleteData } = usePost("DELETE", `/business/edit/${slugBusiness}`);

  const addElement = () => {
    setElements((prev) => [...prev, { title: "", description: "", mediaUrls: [], slug: "", newFiles: [], business: { title: "" } }]);
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
      prev.map((el) => (el.slug === slug ? { ...el, newFiles: files, mediaUrls: [...(el.mediaUrls || []), ...filePreviews] } : el))
    );
  };

  const handleDeleteImage = (slug: string, index: number) => {
    setElements((prev) => prev.map((el) => (el.slug === slug ? { ...el, mediaUrls: el.mediaUrls.filter((_, i) => i !== index) } : el)));
  };

  const handleSubmitImage = async (slug: string) => {
    const element = elements.find((el) => el.slug === slug);
    const files = element?.newFiles;
    if (element) {
      await uploadFile(files!, slugBusiness, "project");
    }
  };

  const handleSubmitForm = (slug: string) => {
    const element = elements.find((el) => el.slug === slug);
    const prevImage = element?.mediaUrls.filter((prev) => prev.includes("icodeu-storage"));
    const uploadImage = dataImage?.uploadedFiles.map((upload) => upload.url);
    const images = [...(prevImage || []), ...(uploadImage || [])];
    const body = { title: element?.title, description: element?.description, mediaUrls: images, businessId: id };
    if (!element?.slug) {
      executeAdd(`/projects`, body);
      return;
    } else {
      executeUpdate(`/projects/${element?.slug}`, body);
      return;
    }
  };

  React.useEffect(() => {
    if (data && data.length > 1) {
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
          images={item.mediaUrls}
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
