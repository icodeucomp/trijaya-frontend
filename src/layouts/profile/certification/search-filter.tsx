"use client";

import { ChangeEvent } from "react";

import { Dropdown } from "@/components";

import { CiSearch } from "react-icons/ci";

interface SearchFilterProps {
  setFiltered: (dropdownKey: string, value: string) => void;
  setSearchTerm: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const SearchFilter = ({ setFiltered, setSearchTerm }: SearchFilterProps) => {
  const leftData = [
    { display: "Date", value: "date=uploadedAt&order=desc" },
    { display: "Time", value: "date=uploadedAt&order=asc" },
  ];
  const rightData = [
    { display: "Newest", value: "sort=uploadedAt&order=desc" },
    { display: "Oldest", value: "sort=uploadedAt&order=asc" },
    { display: "A - Z", value: "sort=name&order=asc" },
    { display: "Z - A", value: "sort=name&order=desc" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-2 lg:grid-cols-2 lg:gap-8">
      <div className="relative w-full">
        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
          <CiSearch size={20} />
        </div>
        <input
          type="search"
          className="block w-full py-2 lg:py-4 text-sm duration-300 border rounded-lg outline-none pl-10 pr-4 text-dark-blue border-gray focus:border-primary"
          onChange={setSearchTerm}
          placeholder="Search"
          required
        />
      </div>
      <div className="flex w-full gap-4">
        <Dropdown dropdownKey="left" parentClassName="w-full" className="top-10 lg:top-16" data={leftData} setFiltered={setFiltered} />
        <Dropdown dropdownKey="right" parentClassName="w-full" className="top-10 lg:top-16" data={rightData} setFiltered={setFiltered} />
      </div>
    </div>
  );
};
