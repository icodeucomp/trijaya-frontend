"use client";

import { ChangeEvent } from "react";

import { CiSearch } from "react-icons/ci";

import { IoFunnelOutline } from "react-icons/io5";

export const Filter = ({ setSearchTerm }: { setSearchTerm: (e: ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className="flex items-center h-full font-semibold border rounded-lg border-gray/50">
      <span className="hidden px-4 py-2 border-r md:block border-gray/50">
        <IoFunnelOutline size={24} />
      </span>
      <span className="hidden px-4 py-2 border-r sm:block text-nowrap border-gray/50">Search name</span>
      <div className="relative w-full">
        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
          <CiSearch size={20} />
        </div>
        <input
          type="search"
          className="block w-full py-2 text-sm duration-300 rounded-lg outline-none pl-10 pr-4 text-dark-blue"
          onChange={setSearchTerm}
          placeholder="Search"
        />
      </div>
    </div>
  );
};