"use client";

import { useState } from "react";

import { useToggleState } from "@/hooks";

import { Button } from "./button";

import { PiCaretDownBold } from "react-icons/pi";

import { DropdownProps } from "@/types";

export const Dropdown = ({ parentClassName, className, data, setFiltered, dropdownKey }: DropdownProps) => {
  const [select, setSelect] = useState<string>(dropdownKey === "services" ? data?.[0]?.display : "All");

  const [ref, popover, togglePopover] = useToggleState(false);

  const handleClick = (dropdownKey: string, value: string, display: string) => {
    setFiltered(dropdownKey, value);
    setSelect(display);
  };

  return (
    <span ref={ref} className={`dropdown ${parentClassName ?? ""} ${popover ? "border-primary" : "border-gray"}`} onClick={togglePopover}>
      {select}
      <PiCaretDownBold size={20} className={`duration-300 absolute right-2 fill-dark ${popover && "rotate-180"}`} />
      {popover && (
        <div className={`popover ${className ?? ""}`}>
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
