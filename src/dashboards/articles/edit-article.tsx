"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const CKEditor = dynamic(() => import("../ckeditor"), { ssr: false });

import { useRouter } from "next/navigation";

import { useGetApi, usePost } from "@/hooks";

import { Button } from "@/components";

import { MdOutlineFileUpload } from "react-icons/md";
import { PiCaretLeftLight } from "react-icons/pi";

import { ResponseArticleTypes } from "@/types";

export const EditArticle = ({ slug }: { slug: string }) => {
  // define back route
  const { back } = useRouter();

  // get and set data to manipulate or store data to database
  const [content, setContent] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

  // fetch api to show data article / blog by slug
  const { response: article, loading } = useGetApi<ResponseArticleTypes>({ path: `/blogs/${slug}` });
  // use post hook to send PATCH request to server to edit article
  const { execute, loading: loadData } = usePost("PATCH", `article`);

  // handle back button if the data is not empty
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (article?.data.title !== title || article?.data.content !== content) {
      if (confirm("Are you sure to back to previous page? Your data will not be saved!")) {
        setTitle(article?.data.title || "");
        setContent(article?.data.content || "");
        back();
        return;
      } else {
        return;
      }
    }
    back();
  };

  // handle form submission to edit article from server database
  const handleSubmitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title === "" || content === "") {
      setError(true);
      return;
    }
    execute(`/blogs/${slug}`, { title, content });
  };

  // to set data article by slug after first render
  React.useEffect(() => {
    if (article?.data !== null) {
      setTitle(article?.data.title || "");
      setContent(article?.data.content || "");
    }
  }, [article]);

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <span className="flex items-center gap-2 text-dark-blue">
          <button onClick={handleBack}>
            <PiCaretLeftLight size={24} />
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl">Edit Article</h1>
        </span>
        {article?.data.title !== title || article?.data.content !== content ? (
          <Button onClick={handleSubmitForm} className="flex items-center gap-2 btn-primary">
            <MdOutlineFileUpload size={20} />
            Publish
          </Button>
        ) : null}
      </div>
      {loadData || loading ? (
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
          <CKEditor setContent={setContent} content={content} error={error} />
        </div>
      )}
    </>
  );
};
