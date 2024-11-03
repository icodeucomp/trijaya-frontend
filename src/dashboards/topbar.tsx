"use client";

import * as React from "react";

import { useLogout, useToggleState } from "@/hooks";

import { Button, Img } from "@/components";

import { user_profile } from "@/icons";
import { FaCaretDown } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";

import { UserTypes } from "@/types";

export const TopBar = ({ setOpenNav, data }: { setOpenNav: React.Dispatch<React.SetStateAction<boolean>>; data: UserTypes | undefined }) => {
  const [ref, dropdown, toggleDropdown] = useToggleState(false);
  const { execute, loading } = useLogout();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await execute();
  };

  return (
    <div className="sticky top-0 z-50 block w-full duration-300 bg-light">
      {loading ? (
        <div className="flex justify-center py-8 w-full">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex justify-between p-2 mx-6">
          <div className="flex gap-4">
            <button className="z-20 lg:hidden" onClick={() => setOpenNav((prev) => !prev)}>
              <IoMdMenu size={28} />
            </button>
          </div>
          <div ref={ref} className="relative flex gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
              <Img src={user_profile} className="size-8 sm:size-10 rounded-full border border-dark/80" alt="user-profile" cover />
              <div className="mr-1">
                <p className="text-sm font-semibold sm:text-base">{data?.username}</p>
                <p className="text-xs tracking-tight sm:text-sm">{data?.email}</p>
              </div>
              <p className={`p-0.5 border border-dark/80 rounded-full duration-300 ${dropdown && "rotate-180"}`}>
                <FaCaretDown size={16} />
              </p>
            </div>
            {dropdown && (
              <div className="w-full popover top-12">
                <Button onClick={handleLogout} disabled={loading} className={`btn-primary w-full ${loading && "animate-pulse"}`}>
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
