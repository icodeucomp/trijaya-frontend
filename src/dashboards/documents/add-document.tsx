"use client";

import * as React from "react";

import { useGet, usePost, useToggleState, useUpload } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Button } from "@/components";
import { Modal } from "../modal";

import { PiCaretUpDownFill } from "react-icons/pi";

import { UploadTypes } from "../types";
import { ResponseCategoriesDocumentTypes } from "@/types";

export const AddDocument = () => {
  const [ref, modal, toggleModal] = useToggleState();

  // call api
  const { response: categories, loading } = useGet<ResponseCategoriesDocumentTypes>("/documents/categories");
  const { loading: loadData, execute } = usePost("POST", "/document");
  const { uploading, uploadFile, response: dataUpload } = useUpload<UploadTypes>();

  // logic handle data
  const [name, setName] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  const [selectedFile, setSelectedFile] = React.useState<string>("Please select a file");
  const [errorFile, setErrorFile] = React.useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const ext = file?.name.split(".").pop();
    if (!category) {
      setError(true);
      return;
    }
    if (ext !== "pdf") {
      setErrorFile(true);
      return;
    }
    setSelectedFile(file?.name || "");
    setErrorFile(false);
    setError(false);
    await uploadFile(file!, `category=${category}`, true);
  };

  const handleClose = () => {
    if (name !== "" || category !== "" || selectedFile !== "Please select a file") {
      if (confirm("Are you sure you want to close? Your data will not be saved!")) {
        setName("");
        setCategory("");
        setSelectedFile("Please select a file");
        toggleModal();
        return;
      } else {
        return;
      }
    }
    toggleModal();
  };

  // submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category || !name) {
      setError(true);
      return;
    }
    const url = dataUpload?.url;
    const size = dataUpload?.size;

    const body = { name, category, url, size };
    setError(false);
    execute("/documents", body);
  };

  return (
    <div ref={ref}>
      <Button onClick={toggleModal} className="btn-primary">
        Add Document
      </Button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={handleClose} className="max-w-xl">
            {loadData ? (
              <div className="flex justify-center py-4">
                <div className="loader"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:min-w-xl">
                <h1 className="text-lg font-semibold text-center sm:text-start text-primary">Add Document</h1>
                <div className="space-y-4">
                  {loading ? (
                    <div className="flex justify-center py-4">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <div className="relative">
                      <select
                        onChange={(e) => setCategory(e.target.value)}
                        className={`select-input ${category === "" ? "text-gray" : "text-dark-blue"}`}
                        value={category}
                      >
                        <option value="" disabled>
                          Document category
                        </option>
                        {categories?.data.map((item, index) => (
                          <option key={index} value={item.slug} className="text-dark-blue">
                            {item.category}
                          </option>
                        ))}
                      </select>
                      <PiCaretUpDownFill className="size-6 fill-dark absolute top-2.5 right-2.5" />
                    </div>
                  )}
                  {error && !category && <small className="text-secondary">Select document category</small>}
                  <div className="relative w-full">
                    <input type="text" id="name" className="floating-input peer" placeholder=" " onChange={(e) => setName(e.target.value)} />
                    <label
                      htmlFor="name"
                      className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                    >
                      Document Name
                    </label>
                  </div>
                  {error && !name && <small className="text-secondary">Enter document name</small>}

                  <div className="relative flex flex-row items-center overflow-hidden border rounded-lg border-gray/50">
                    <input type="file" id="file-pdf" onChange={handleFileChange} hidden />
                    <label
                      htmlFor="file-pdf"
                      className="block px-4 py-2 mr-4 text-sm font-semibold border-0 cursor-pointer rounded-s-lg whitespace-nowrap bg-light-gray text-primary hover:bg-blue-200"
                    >
                      Choose file
                    </label>
                    <label className="text-sm text-slate-500 whitespace-nowrap">{selectedFile}</label>
                    <div className="absolute top-0 right-0 w-4 h-full bg-light"></div>
                  </div>
                  <small className="pl-2 text-gray/70">maximum file size 20mb.</small>
                  <div className="flex">{errorFile && <small className="text-secondary">Only a pdf! (MAX. 20mb)</small>}</div>
                </div>
                <div className="flex justify-end">
                  {uploading ? (
                    <div className="flex justify-end py-4">
                      <div className="loader"></div>
                    </div>
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
