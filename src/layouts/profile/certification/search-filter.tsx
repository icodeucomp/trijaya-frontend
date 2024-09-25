import { Dropdown } from "@/components";

import { CiSearch } from "react-icons/ci";

export const SearchFilter = () => {
  return (
    <div className="grid grid-cols-1 gap-4 px-2 lg:grid-cols-2 lg:gap-8">
      <div className="relative w-full">
        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
          <CiSearch size={20} />
        </div>
        <input
          type="search"
          className="block w-full p-2 text-sm duration-300 border rounded-lg outline-none lg:p-4 ps-10 text-dark-blue border-gray focus:border-primary"
          placeholder="Search"
          required
        />
      </div>
      <div className="flex w-full gap-4">
        <Dropdown parentClassName="w-full" className="top-10 lg:top-16" />
        <Dropdown parentClassName="w-full" className="top-10 lg:top-16" />
      </div>
    </div>
  );
};
