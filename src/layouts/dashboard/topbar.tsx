"use client";

import { Dispatch, SetStateAction } from "react";

import { useToggleState } from "@/hooks";

import { Img } from "@/components";

import { FaCaretDown } from "react-icons/fa6";

import { IoMdMenu } from "react-icons/io";

export const TopBar = ({ setOpenNav }: { setOpenNav: Dispatch<SetStateAction<boolean>> }) => {
  const [ref, dropdown, toggleDropdown] = useToggleState(false);

  return (
    <div className="sticky top-0 z-50 block w-full duration-300 bg-light">
      <div className="flex justify-between p-2 mx-6">
        <div className="flex gap-4">
          <button className="z-20 lg:hidden" onClick={() => setOpenNav((prev) => !prev)}>
            <IoMdMenu size={28} />
          </button>
        </div>
        <div ref={ref} className="relative flex gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
            <Img src="/logo-company.png" className="size-10" alt="user-profile" />
            <div className="mr-1">
              <p className="text-sm font-semibold sm:text-base">{"Asya Ismatullah"}</p>
              <p className="text-xs tracking-tight sm:text-sm">{"Admin"}</p>
            </div>
            <button className={`p-0.5 border rounded-full duration-300 ${dropdown && "rotate-180"}`}>
              <FaCaretDown size={16} />
            </button>
          </div>
          {dropdown && (
            <div className="w-full popover top-12">
              <p>Profile</p>
              <p>Logout</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
