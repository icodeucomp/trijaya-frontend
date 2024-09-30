"use client";

import * as React from "react";

import { useGet, usePost, useToggleState, useUpload } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Button } from "@/components";
import { Modal } from "../modal";

import { PiCaretUpDownFill } from "react-icons/pi";

import { UploadTypes } from "../types";
import { ResponseDocumentsTypes, ResponseDocumentTypes } from "@/types";

export const EditDocument = ({ slug }: { slug: string }) => {
  const [ref, modal, toggleModal] = useToggleState();

  // call api
  const { response: categories } = useGet<ResponseDocumentsTypes>("/documents");
  const { response: document, loading } = useGet<ResponseDocumentTypes>(`/documents/${slug}`);

  const { loading: loadData, execute } = usePost("PATCH", "/document");

  const { uploading, uploadFile, response: dataUpload } = useUpload<UploadTypes>();

  // logic handle data
  const [name, setName] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    await uploadFile(file!, "documents", "best");
  };

  //submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (category === "Document Type") {
      setError(true);
      return;
    }
    const url = dataUpload?.url;
    const size = dataUpload?.size;

    const body = { name, category, url, size };

    execute(`/documents/${slug}`, body);
  };

  React.useEffect(() => {
    if (document?.data !== null) {
      setName(document?.data.name || "");
      setCategory(document?.data.category || "");
    }
  }, [document]);

  return (
    <div ref={ref}>
      <Button onClick={toggleModal} className="btn-primary">
        Edit
      </Button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={toggleModal} className="max-w-xl">
            {loadData ? (
              <div className="flex justify-center py-4">
                <div className="loader"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:min-w-xl" encType="multipart/form-data">
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
                        className={`select-input ${category === "Document Type" ? "text-gray" : "text-dark-blue"}`}
                        value={category}
                      >
                        {categories?.data.map((item, index) => (
                          <option key={index} value={item.category}>
                            {item.category}
                          </option>
                        ))}
                      </select>
                      <PiCaretUpDownFill className="size-6 fill-dark absolute top-2.5 right-2.5" />
                    </div>
                  )}
                  {error && !category && <small className="text-secondary">Select your category</small>}
                  <div className="relative w-full">
                    <input
                      value={name}
                      type="text"
                      id="name"
                      className="floating-input peer"
                      placeholder=" "
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor="name"
                      className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                    >
                      Document Name
                    </label>
                  </div>
                  {error && !name && <small className="text-secondary">Enter document name</small>}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm border rounded-lg cursor-pointer text-gray border-gray bg-light-gray focus:outline-none focus:border-primary"
                  />
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
