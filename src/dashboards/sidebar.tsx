"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { motion, Variants } from "framer-motion";

import { Img } from "@/components";

import { SidebarProps } from "./types";

export const sideBarMenu = [
  { title: "Articles", pathUrl: "article" },
  { title: "Documents", pathUrl: "document" },
  { title: "Media", pathUrl: "media" },
  { title: "Business", pathUrl: "business" },
];

export const Sidebar = ({ openNav, isTabletMid }: SidebarProps) => {
  const pathname = usePathname();

  const animation: Variants = {
    open: { x: 0, width: "16rem", transition: { damping: 40 } },
    closed: { x: -256, width: 0, transition: { damping: 40, delay: 0.15 } },
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
          const isActive = splitPathname === item.pathUrl || splitPathname.startsWith(`${item.pathUrl}/`);
          return (
            <li className="w-full px-4" key={index}>
              <Link href={`/admin/dashboard/${item.pathUrl}`} className={`sidebar-menu group ${isActive ? "bg-primary" : "bg-light"}`}>
                <span className={`absolute top-0 left-0 w-1 h-full bg-secondary group-hover:block ${isActive ? "block" : "hidden"}`}></span>
                <p className={`text-lg font-medium group-hover:text-light ${isActive ? "text-light" : "text-primary"}`}>{item.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.aside>
  );
};
