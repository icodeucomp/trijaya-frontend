"use client";

import * as React from "react";

import { usePathname } from "next/navigation";

import { useGet, useMediaQuery } from "@/hooks";

import { useCookies } from "next-client-cookies";

import { Sidebar } from "./sidebar";

import { TopBar } from "./topbar";

import { ResponseUserTypes } from "@/types";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const isTabletMid = useMediaQuery("(max-width: 1024px)");

  const { error, loading, response: user } = useGet<ResponseUserTypes>("/profile");

  const [openNav, setOpenNav] = React.useState<boolean>(isTabletMid ? false : true);

  const pathname = usePathname();

  const cookies = useCookies();

  React.useEffect(() => {
    if (error) {
      cookies.remove("jwt");
      window.location.href = "/admin/login";
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  React.useEffect(() => {
    if (isTabletMid) setOpenNav(false);
    else setOpenNav(true);
  }, [isTabletMid, pathname]);

  if (loading) {
    <div className="flex justify-center min-h-screen items-center">
      <div className="loader"></div>
    </div>;
  }

  return (
    <div className="relative flex bg-light">
      <div onClick={() => setOpenNav(false)} className={`lg:hidden fixed inset-0 h-screen z-100 bg-dark/50 ${openNav ? "block" : "hidden"}`} />
      <Sidebar openNav={openNav} isTabletMid={isTabletMid} />
      <div className="flex-1 w-full duration-300 lg:pl-64">
        <TopBar setOpenNav={setOpenNav} data={user?.data} />
        <div className="w-full duration-300 text-primary">
          <div className="w-full min-h-screen p-2 sm:p-4 bg-light-gray">
            <div className="p-2 sm:p-4 rounded-lg shadow-lg bg-light">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
