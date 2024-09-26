"use client";

import { useRouter } from "next/navigation";
import { Products, Projects, Services } from "./adding-business";

import { MdOutlineAddAPhoto } from "react-icons/md";
import { PiCaretLeftLight } from "react-icons/pi";

export const EditBusiness = () => {
  const router = useRouter();
  return (
    <>
      <div className="px-2 py-4">
        <span className="flex items-center gap-2">
          <button onClick={() => router.back()}>
            <PiCaretLeftLight size={24} />
          </button>
          <h1 className="heading">Edit Category</h1>
        </span>
      </div>
      <div className="w-full max-w-screen-sm px-4 pt-8 mx-auto space-y-4 sm:px-8">
        <div className="relative text-center">
          <label htmlFor="category" className="container-border cursor-pointer w-72">
            <MdOutlineAddAPhoto className="size-10 fill-gray" />
          </label>
          <label htmlFor="category" className="text-xl duration-300 cursor-pointer text-primary hover:text-primary/80">
            Upload Photo
          </label>
          <input type="file" id="category" className="sr-only" />
        </div>
        <input type="text" className="input_form" placeholder="Description" required />
      </div>
      <Products />
      <Projects />
      <Services />
    </>
  );
};
