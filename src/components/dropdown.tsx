"use client";

import { useToggleState } from "@/hooks";

import { PiCaretDown } from "react-icons/pi";

import { DropdownProps } from "@/types";

export const Dropdown = ({ parentClassName, className }: DropdownProps) => {
  const data = ["title", "children", "isFilter"];
  const [ref, popover, togglePopover] = useToggleState(false);

  return (
    <span ref={ref} className={`dropdown ${parentClassName} ${popover ? "border-primary" : "border-gray"}`} onClick={togglePopover}>
      All
      <PiCaretDown size={16} className={`duration-300 absolute right-2 ${popover && "rotate-180"}`} />
      {popover && (
        <div className={`popover ${className}`}>
          {data?.map((item, index) => (
            <div key={index} className="whitespace-nowrap">
              {item}
            </div>
          ))}
        </div>
      )}
    </span>
  );
};
