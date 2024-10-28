"use client";

import { useState } from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { motion, Variants } from "framer-motion";

import { Img } from "@/components";

import { PiCaretRightBold } from "react-icons/pi";

import { SidebarProps } from "./types";

export const sideBarMenu: { title: string; content?: string[] }[] = [
  { title: "Article" },
  { title: "Document" },
  { title: "LifeatTBM" },
  { title: "Business", content: ["Product", "Project"] },
];

export const Sidebar = ({ openNav, isTabletMid }: SidebarProps) => {
  const pathname = usePathname();

  const [dropdown, setDropdown] = useState(false);

  const animation: Variants = {
    open: { x: 0, width: "16rem", transition: { damping: 40 } },
    closed: { x: -256, width: 0, transition: { damping: 40, delay: 0.15 } },
  };

  const dropdownVariants: Variants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: { height: { duration: 0.2, ease: "easeOut" }, opacity: { duration: 0.3, ease: "easeOut" }, staggerChildren: 0.3 },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { height: { duration: 0.2, ease: "easeIn" }, opacity: { duration: 0.2, ease: "easeIn" }, staggerChildren: 0.1 },
    },
  };

  const splitPathname = pathname.split("/")[3];

  return (
    <motion.aside
      variants={isTabletMid ? animation : undefined}
      animate={openNav ? "open" : "closed"}
      className="fixed h-screen py-4 space-y-8 overflow-auto text-center min-w-64 bg-light z-1000 sidebar"
    >
      <div className="mx-2 space-y-2">
        <Img src="/logo-company.png" alt="logo PT Trijaya Berkah Mandiri" className="mx-auto size-10 sm:size-12 md:size-14" />
        <span className="text-sm font-semibold text-primary">PT Trijaya Berkah Mandiri</span>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-primary">Dashboard</h1>
      </div>
      <ul className="space-y-2">
        {sideBarMenu.map((item, index) => {
          const isActive = splitPathname === item.title.toLowerCase() || splitPathname.startsWith(`${item.title.toLowerCase()}/`);
          return (
            <div className="w-full px-4" key={index}>
              <span className={`sidebar-menu group ${isActive ? "bg-primary" : "bg-light"}`}>
                <Link href={`/admin/dashboard/${item.title === "LifeatTBM" ? "album" : item.title.toLowerCase()}`} className="block">
                  <span className={`absolute top-0 left-0 w-1 h-full bg-secondary group-hover:block ${isActive ? "block" : "hidden"}`}></span>
                  <p className={`text-lg font-medium group-hover:text-light ${isActive ? "text-light" : "text-primary"}`}>{item.title}</p>
                </Link>
                {item.title === "Business" && (
                  <span onClick={() => setDropdown((prevDropdown) => !prevDropdown)} className="absolute right-4 top-2.5 cursor-pointer">
                    <PiCaretRightBold
                      size={24}
                      className={`duration-300 group-hover:text-light ${dropdown ? "rotate-90" : "rotate-0"} ${
                        isActive ? "text-light" : "text-primary"
                      }`}
                    />
                  </span>
                )}
              </span>
              {item.content && item.content?.length > 0 && (
                <motion.div
                  initial={false}
                  animate={dropdown ? "open" : "closed"}
                  variants={dropdownVariants}
                  className="w-full mt-4 space-y-2 bg-light"
                >
                  <div className="space-y-2 text-sm sm:text-base">
                    {item.content?.map((content, index) => (
                      <Link href={`/admin/dashboard/business/${content.toLowerCase()}`} key={index} className="sidebar-menu group bg-light">
                        <span className={`absolute top-0 left-0 w-1 h-full bg-secondary group-hover:block hidden`}></span>
                        <p className={`font-medium group-hover:text-light text-primary`}>{content}</p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </ul>
    </motion.aside>
  );
};
