"use client";

import * as React from "react";

import { useToggleState } from "@/hooks";

import { request } from "@/utils";

import { useCookies } from "next-client-cookies";

import toast from "react-hot-toast";

import { Button, Img } from "@/components";

import { FaCaretDown } from "react-icons/fa6";

import { IoMdMenu } from "react-icons/io";

import { UserTypes } from "@/types";

export const TopBar = ({ setOpenNav, data }: { setOpenNav: React.Dispatch<React.SetStateAction<boolean>>; data: UserTypes | undefined }) => {
  const [ref, dropdown, toggleDropdown] = useToggleState(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const cookies = useCookies();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    await request({
      method: "POST",
      path: "/auth/logout",
      options: {
        headers: {
          Authorization: `Bearer ${cookies.get("jwt")}`,
          "Access-Control-Allow-Origin": "*",
        },
      },
    })
      .then((response) => {
        cookies.remove("jwt");
        toast.success(response.data.message);
        window.location.href = "/admin/login";
      })
      .catch((error) => {
        toast.error(error.response?.data.message || "There was an error");
      })
      .finally(() => {
        setLoading(false);
      });
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
              <Img src="/logo-company.png" className="size-10" alt="user-profile" />
              <div className="mr-1">
                <p className="text-sm font-semibold sm:text-base">{data?.username}</p>
                <p className="text-xs tracking-tight sm:text-sm">{data?.email}</p>
              </div>
              <button className={`p-0.5 border rounded-full duration-300 ${dropdown && "rotate-180"}`}>
                <FaCaretDown size={16} />
              </button>
            </div>
            {dropdown && (
              <div className="w-full popover top-12">
                <Button onClick={handleLogout} className="btn-primary w-full">
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
