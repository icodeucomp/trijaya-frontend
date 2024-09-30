"use client";

import * as React from "react";

import dynamic from "next/dynamic";

const CKEditor = dynamic(() => import("../ckeditor"), { ssr: false });

import { usePost, useUpload } from "@/hooks";

import { Button, Img } from "@/components";

import { MdOutlineFileUpload } from "react-icons/md";
import { PiCaretLeftLight } from "react-icons/pi";

import { UploadTypes } from "../types";

export const AddArticle = () => {
  const [content, setContent] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [imageHeader, setImageHeader] = React.useState<string>("");

  const { execute, loading } = usePost("POST", "article");
  const { uploadFile, response: dataImage, uploading } = useUpload<UploadTypes>();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    await uploadFile(file!, "blogs", "");
    setImageHeader(URL.createObjectURL(file!));
  };

  const handleSubmitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    execute("/blogs", { title, content, imageHeader });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <span className="flex items-center gap-2 text-dark-blue">
          <PiCaretLeftLight size={24} />
          <h1 className="text-xl sm:text-2xl md:text-3xl">Create New Article</h1>
        </span>
        {uploading ? (
          <div className="flex items-center w-full">
            <div className="loader"></div>
          </div>
        ) : (
          <Button onClick={handleSubmitForm} className="flex items-center gap-2 btn-primary">
            <MdOutlineFileUpload size={20} />
            Publish
          </Button>
        )}
      </div>
      {loading || dataImage ? (
        <div className="flex justify-center py-16 w-full">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="relative w-full max-w-screen-sm px-4 py-10 mx-auto space-y-4 sm:px-8">
          <input
            type="text"
            className="w-full p-3.5 text-2xl border border-gray/50 focus:border-primary outline-none"
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm border rounded-lg cursor-pointer text-gray border-gray bg-light-gray focus:outline-none focus:border-primary"
          />
          <div className="relative">{imageHeader && <Img src={imageHeader} alt={title} className="w-full h-20 rounded-lg" cover />}</div>

          <CKEditor setContent={setContent} title={title} />
        </div>
      )}
    </>
  );
};
