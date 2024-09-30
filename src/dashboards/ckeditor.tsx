"use client";

import { Dispatch, SetStateAction } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const api = "https://trijaya-backend-423887735295.asia-southeast2.run.app/api/v1";

interface CustomEditorProps {
  setContent: Dispatch<SetStateAction<string>>;
  title: string;
  data?: any;
}

class CustomUploadAdapter {
  loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", file);

          fetch(`${api}/uploads`, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => resolve({ default: data.url }))
            .catch((error) => reject(error));
        })
    );
  }

  abort() {
    // Handle the abort logic if needed
  }
}

function CustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new CustomUploadAdapter(loader);
  };
}

const CustomEditor = ({ setContent, data }: CustomEditorProps) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        extraPlugins: [CustomUploadAdapterPlugin],
      }}
      onChange={(_, editor) => {
        setContent(editor.getData());
      }}
      data={data?.content}
    />
  );
};

export default CustomEditor;
