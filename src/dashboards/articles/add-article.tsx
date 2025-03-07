"use client";

import * as React from "react";

import dynamic from "next/dynamic";

const CKEditor = dynamic(() => import("../ckeditor"), { ssr: false });

import { useRouter } from "next/navigation";

import { usePost } from "@/hooks";

import { Button } from "@/components";

import { MdOutlineFileUpload } from "react-icons/md";
import { PiCaretLeftLight } from "react-icons/pi";

export const AddArticle = () => {
  // define back route
  const { back } = useRouter();

  // get and set data to manipulate or store data to database
  const [content, setContent] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

  // use post hook to send POST request to server to add article
  const { execute, loading } = usePost("POST", "article");

  // handle back button if the data is not empty
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title !== "" || content !== "") {
      if (confirm("Are you sure to back to previous page? Your data will not be saved!")) {
        setTitle("");
        setContent("");
        back();
        return;
      } else {
        return;
      }
    }
    back();
  };

  // handle form submission to add article from server database
  const handleSubmitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title === "" || content === "") {
      setError(true);
      return;
    }
    execute("/blogs", { title, content });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <span className="flex items-center gap-2 text-dark-blue">
          <button onClick={handleBack}>
            <PiCaretLeftLight size={24} />
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl">Create New Article</h1>
        </span>
        {title !== "" && content !== "" && (
          <Button onClick={handleSubmitForm} className="flex items-center gap-2 btn-primary">
            <MdOutlineFileUpload size={20} />
            Publish
          </Button>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center w-full py-16">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="relative w-full max-w-screen-sm px-4 py-10 mx-auto space-y-4 sm:px-8">
          <div className="relative w-full">
            <input
              type="text"
              id="title"
              value={title}
              className="floating-input peer"
              placeholder=" "
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <label
              htmlFor="title"
              className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
              Title
            </label>
          </div>
          {error && !title && <small className="text-secondary">please input title</small>}
          <CKEditor setContent={setContent} error={error} />
        </div>
      )}
    </>
  );
};
