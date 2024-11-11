"use client";

import * as React from "react";

import { useGetApi, usePost, useToggleState, useUpload } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Button } from "@/components";
import { Modal } from "../modal";

import { PiCaretUpDownFill } from "react-icons/pi";

import { UploadTypes } from "../types";
import { ResponseCategoriesDocumentTypes } from "@/types";

export const AddDocument = () => {
  // use modal state and toggle function to open and close modal
  const [ref, modal, toggleModal] = useToggleState();

  // get and set data to manipulate or store data to database
  const [name, setName] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [file, setFile] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  const [errorFile, setErrorFile] = React.useState<boolean[]>([false, false]);

  // use post hook to send POST request to server to add file and article, and then use get hook to get category documents
  const { loading: loadData, execute } = usePost("POST", "/document");
  const { uploading, uploadFile, response: dataUpload } = useUpload<UploadTypes>();
  const { response: categories, loading } = useGetApi<ResponseCategoriesDocumentTypes>({ path: "/documents/categories" });

  // handle file changes for file pdf and also add condition just only a pdf
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const ext = file?.name.split(".").pop();
    if (!category) {
      setErrorFile([true, false]);
      return;
    }
    if (ext !== "pdf") {
      setErrorFile([false, true]);
      return;
    }
    setFile(file?.name || "");
    setErrorFile([false, false]);
    setError(false);
    await uploadFile(file!, `category=${category}`, true);
  };

  // handle close button if the data is not empty
  const handleClose = () => {
    if (name !== "" || category !== "" || file !== "") {
      if (confirm("Are you sure you want to close? Your data will not be saved!")) {
        setName("");
        setCategory("");
        setFile("");
        toggleModal();
        return;
      } else {
        return;
      }
    }
    toggleModal();
  };

  // handle form submission to add document from server database
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category || !name || !file) {
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
                <h3 className="text-lg font-semibold text-center sm:text-start text-primary">Add Document</h3>
                <div className="space-y-4">
                  {loading ? (
                    <div className="flex justify-center py-4">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <div className="relative">
                      <select onChange={(e) => setCategory(e.target.value)} className={`select-input ${category === "" ? "text-gray" : "text-dark-blue"}`} value={category}>
                        <option value="" disabled>
                          Document category
                        </option>
                        {categories?.data.map((item, index) => (
                          <option key={index} value={item.category} className="text-dark-blue">
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
                    <label htmlFor="file-pdf" className="file-label">
                      Choose file
                    </label>
                    <label className="text-sm text-slate-500 whitespace-nowrap">{file !== "" ? file : "Please select a file"}</label>
                    <small className="absolute top-0 right-0 w-24 h-full flex items-center px-2 bg-light text-gray/70 whitespace-nowrap">Max. (20mb)</small>
                  </div>
                  {error && !file && errorFile[0] === false && errorFile[1] === false && <small className="text-red-500">Enter file a pdf document please</small>}
                  {errorFile[0] === true && <small className="text-red-500">To insert a file, you must be select the category</small>}
                  {errorFile[1] === true && <small className="text-red-500">The file is only a pdf!</small>}
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
