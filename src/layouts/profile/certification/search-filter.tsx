"use client";

import * as React from "react";

import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Dropdown } from "@/components";

import { CiSearch } from "react-icons/ci";

interface SearchFilterProps {
  setFiltered: (dropdownKey: string, value: string) => void;
  setSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  date: DateValueType;
  setDate: (date: DateValueType) => void;
}

export const SearchFilter = ({ setFiltered, setSearchTerm, date, setDate }: SearchFilterProps) => {
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
          className="block w-full py-2 pl-10 pr-4 text-sm duration-300 border rounded-lg outline-none lg:py-4 text-dark-blue border-gray focus:border-primary"
          onChange={setSearchTerm}
          placeholder="Search"
          required
        />
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        <Datepicker
          inputClassName="w-full rounded-lg h-full outline-none border border-gray text-sm pl-4 focus:ring-0 font-medium bg-light placeholder:text-gray text-gray"
          popoverDirection="down"
          primaryColor={"indigo"}
          value={date}
          onChange={(newValue) => setDate(newValue)}
          showShortcuts={true}
        />
        <Dropdown dropdownKey="dropdownFilter" parentClassName="w-full" className="top-10 lg:top-16" data={rightData} setFiltered={setFiltered} />
      </div>
    </div>
  );
};
