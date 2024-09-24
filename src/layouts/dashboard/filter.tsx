"use client";

import { Button } from "@/components";
import { useToggleState } from "@/hooks";

import { FaCaretDown } from "react-icons/fa6";
import { IoFunnelOutline } from "react-icons/io5";

export const Filter = () => {
  const [ref, dropdown, toggleDropdown] = useToggleState(false);

  const data = ["All", "Filter 1", "Filter 2", "Filter 3"];

  return (
    <div className="flex items-center h-full font-semibold border rounded-lg border-gray/50">
      <span className="hidden px-4 py-2 border-r sm:block border-gray/50">
        <IoFunnelOutline size={24} />
      </span>
      <span className="hidden px-4 py-2 border-r sm:block border-gray/50">Filter By</span>
      <span ref={ref} className={`events_dropdown text-dark`} onClick={toggleDropdown}>
        All
        <FaCaretDown size={16} className={`duration-300 absolute right-2 ${dropdown && "rotate-180"}`} />
        {dropdown && (
          <div className="w-full popover top-12">
            {data?.map((item, index) => (
              <Button key={index} className="w-full whitespace-nowrap btn-primary">
                {item}
              </Button>
            ))}
          </div>
        )}
      </span>
    </div>
  );
};
