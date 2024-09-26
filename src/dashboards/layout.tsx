"use client";

import * as React from "react";

import { usePathname } from "next/navigation";

import { useMediaQuery } from "@/hooks";

import { Sidebar } from "./sidebar";

import { TopBar } from "./topbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const isTabletMid = useMediaQuery("(max-width: 1024px)");

  const [openNav, setOpenNav] = React.useState<boolean>(isTabletMid ? false : true);

  const pathname = usePathname();

  React.useEffect(() => {
    if (isTabletMid) setOpenNav(false);
    else setOpenNav(true);
  }, [isTabletMid, pathname]);

  return (
    <div className="relative flex bg-light">
      <div onClick={() => setOpenNav(false)} className={`lg:hidden fixed inset-0 h-screen z-100 bg-dark/50 ${openNav ? "block" : "hidden"}`} />
      <Sidebar openNav={openNav} isTabletMid={isTabletMid} />
      <div className="flex-1 w-full duration-300 lg:pl-64">
        <TopBar setOpenNav={setOpenNav} />
        <div className="w-full pt-20 duration-300 sm:pt-14 md:pt-0 text-primary">
          <div className="w-full min-h-screen p-4 bg-light-gray">
            <div className="p-4 rounded-lg shadow-lg bg-light">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
