"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const CKEditor = dynamic(() => import("../ckeditor"), { ssr: false });

import Select from "react-select";
import { Button } from "@/components";

// import { CustomImageUpload } from "@/utils/customImageUpload";

import { MdOutlineFileUpload } from "react-icons/md";
import { PiCaretLeftLight } from "react-icons/pi";

// interface InputTypes {
//   title: string;
//   content: string;
//   categories: {
//     value: string;
//     label: string;
//   }[];
// }

export const EditArticle = () => {
  // const [input, setInput] = React.useState<InputTypes>({
  //   title: "",
  //   content: "",
  //   categories: [],
  // });

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  // function MyCustomUploadAdapterPlugin(editor) {
  //   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
  //     const title = input.title;
  //     return new CustomImageUpload(loader, title);
  //   };
  // }
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <span className="flex items-center gap-2 text-dark-blue">
          <PiCaretLeftLight size={24} />
          <h1 className="text-xl sm:text-2xl md:text-3xl">Edit Article</h1>
        </span>
        <Button className="flex items-center gap-2 btn-primary">
          <MdOutlineFileUpload size={20} />
          Publish
        </Button>
      </div>
      <div className="relative w-full max-w-screen-sm px-4 py-10 mx-auto space-y-4 sm:px-8">
        <Select
          placeholder="Select categories for article..."
          className="z-20"
          isMulti
          options={options}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "#f3f4f6",
              primary: "#0e2d65",
            },
          })}
        />
        <input
          type="text"
          className="w-full p-3.5 text-2xl border border-gray/50 focus:border-primary outline-none"
          placeholder="Title..."
          required
        />
        <CKEditor />
      </div>
    </>
  );
};
