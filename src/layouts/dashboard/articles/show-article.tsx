import React from "react";

export const ShowArticle = () => {
  return (
    <div className="max-w-screen-md px-4 mx-auto leading-loose text-dark-blue">
      <div className="pb-2 mb-4 space-y-6 tracking-wide border-b-4 border-b-gray">
        <menu className="flex items-center">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, nisi.</h1>
        </menu>
        <menu className="flex flex-col justify-between sm:flex-row">
          <h1 className="text-base font-bold sm:text-lg">IFL Chapter Malang</h1>
          <p className="text-sm font-medium tracking-normal text-gray-500 sm:text-base">Published at :</p>
        </menu>
      </div>
      <div className="dangerous_html" />
    </div>
  );
};
