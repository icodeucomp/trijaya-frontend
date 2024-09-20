import { Dropdown } from "@/components";

import { CiSearch } from "react-icons/ci";

export const SearchFilter = () => {
  return (
    <div className="flex justify-between gap-8 px-2">
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
          <CiSearch size={20} />
        </div>
        <input
          type="search"
          className="block w-full p-4 text-sm duration-300 border rounded-lg outline-none ps-10 text-dark-blue border-gray focus:border-primary"
          placeholder="Search"
          required
        />
      </div>
      <div className="flex w-full max-w-lg gap-4">
        <Dropdown parentClassName="w-full" className="top-16" />
        <Dropdown parentClassName="w-full" className="top-16" />
      </div>
    </div>
  );
};
