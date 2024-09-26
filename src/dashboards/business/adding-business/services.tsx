import * as React from "react";

import { Button } from "@/components";
import { InputBusiness } from "@/dashboards/input-business";

import { MdAdd } from "react-icons/md";

interface ElementData {
  id: number;
  title: string;
  description: string;
  images: File[];
}

export const Services = () => {
  const [elements, setElements] = React.useState<ElementData[]>([]);

  const addElement = () => {
    setElements((prev) => [...prev, { id: Date.now(), title: "", description: "", images: [] }]);
  };

  const deleteElement = (id: number) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  const handleInputChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, [e.target.id]: e.target.value } : el)));
  };

  const handleImagesChange = (id: number, fileList: FileList | null) => {
    if (fileList) {
      const files = Array.from(fileList);
      setElements((prev) => prev.map((el) => (el.id === id ? { ...el, files } : el)));
    }
  };

  return (
    <div className="w-full px-4 pt-20 mx-auto sm:px-8">
      <h3 className="subheading mb-10">Add Services</h3>
      {elements.map((item, index) => (
        <InputBusiness
          key={index}
          id={item.id}
          description={item.description}
          title={item.title}
          images={item.images}
          onDelete={deleteElement}
          onInputChange={handleInputChange}
          onImagesChange={handleImagesChange}
        />
      ))}
      <Button onClick={addElement} className="w-full btn-primary flex items-center justify-center gap-2 mt-6">
        <MdAdd className="fill-light size-6 border border-light rounded" /> Add
      </Button>
    </div>
  );
};
