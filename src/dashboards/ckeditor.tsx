"use client";

import { Dispatch, SetStateAction } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";

import { baseUrlApi } from "@/utils";

interface CustomEditorProps {
  setContent: Dispatch<SetStateAction<string>>;
  error: boolean;
  content?: string;
}

class CustomUploadAdapter {
  loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("upload", file);

          const cookies = this.getCookie("jwt");

          fetch(`${baseUrlApi}/upload?type=blog`, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${cookies}`, // Set the Authorization header
            },
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

const CustomEditor = ({ setContent, content, error }: CustomEditorProps) => {
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={{
          extraPlugins: [CustomUploadAdapterPlugin],
          link: {
            decorators: {
              openInNewTab: {
                mode: "automatic",
                callback: (url: string | null) => (url?.startsWith("http") as boolean) || (url?.startsWith("https") as boolean),
                attributes: {
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
              },
            },
          },
        }}
        onChange={(_, editor: any) => {
          let data = editor.getData();
          data = data.replace(/href="(?!https?:\/\/)([^"]*)"/g, (_key: any, p1: any) => {
            return `href="http://${p1}"`;
          });
          setContent(data);
        }}
        data={content}
      />
      {error && !content && <small className="text-secondary">please input content</small>}
    </>
  );
};

export default CustomEditor;
