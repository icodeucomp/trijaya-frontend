"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from "ckeditor5";

const CustomEditor = () => {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: {
          items: ["undo", "redo", "|", "bold", "italic"],
        },
        plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
        initialData: "<p>Hello from CKEditor 5 in React!</p>",
      }}
    />
  );
};

export default CustomEditor;
