"use client";

import { useToggleState } from "@/hooks";

import { PiCaretDown } from "react-icons/pi";

import { DropdownProps } from "@/types";
import { Button } from "./button";
import { useState } from "react";

export const Dropdown = ({ parentClassName, className, data, setFiltered, dropdownKey }: DropdownProps) => {
  const [select, setSelect] = useState<string>("All");

  const [ref, popover, togglePopover] = useToggleState(false);

  const handleClick = (dropdownKey: string, value: string, display: string) => {
    setFiltered(dropdownKey, value);
    setSelect(display);
  };

  return (
    <span ref={ref} className={`dropdown ${parentClassName} ${popover ? "border-primary" : "border-gray"}`} onClick={togglePopover}>
      {select}
      <PiCaretDown size={16} className={`duration-300 absolute right-2 ${popover && "rotate-180"}`} />
      {popover && (
        <div className={`popover ${className}`}>
          {data?.map((item, index) => (
            <Button onClick={() => handleClick(dropdownKey, item.value, item.display)} key={index} className="w-full whitespace-nowrap btn-primary">
              {item.display}
            </Button>
          ))}
        </div>
      )}
    </span>
  );
};
