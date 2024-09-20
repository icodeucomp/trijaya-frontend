"use client";

import { Link, usePathname } from "@/i18n/routing";

import { motion } from "framer-motion";

import { navbarList } from "@/static";

import { NavbarTypes } from "../types";

const Links = ({ pathUrl, title }: NavbarTypes) => {
  const pathname = usePathname();

  const isActive = pathname === pathUrl || pathname.startsWith(`${pathUrl}/`);

  return (
    <Link href={pathUrl} className={`duration-300 hover:text-primary font-medium group relative w-max ${isActive ? "text-primary" : "text-dark"}`}>
      <span>{title}</span>
      <span className={`absolute h-0.5 transition-all -bottom-1 left-1/2 bg-secondary group-hover:w-3/6 ${isActive ? "w-3/6" : "w-0"}`}></span>
      <span className={`absolute h-0.5 transition-all -bottom-1 right-1/2 bg-secondary group-hover:w-3/6 ${isActive ? "w-3/6" : "w-0"}`}></span>
    </Link>
  );
};

export const Navbar = ({ navbar }: { navbar: boolean }) => {
  const motionVariants = {
    open: { y: 0, opacity: 1, display: "flex", transition: { staggerChildren: 0.3, ease: "easeOut" } },
    closed: { y: -100, opacity: 0, display: "none", transition: { staggerChildren: 0.1, ease: "easeOut" } },
  };

  return (
    <>
      <nav className="hidden gap-4 lg:flex">
        {navbarList.map((item, index) => (
          <Links key={index} pathUrl={item.pathUrl} title={item.title} />
        ))}
      </nav>
      <motion.nav
        initial={false}
        animate={navbar ? "open" : "closed"}
        variants={motionVariants}
        className={`absolute left-0 flex-col items-center w-full gap-4 px-8 py-8 top-10 text-nowrap bg-light`}
      >
        {navbarList.map((item, index) => (
          <Links key={index} pathUrl={item.pathUrl} title={item.title} />
        ))}
      </motion.nav>
    </>
  );
};

export default Navbar;
