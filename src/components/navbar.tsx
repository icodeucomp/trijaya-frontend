"use client";

import { useState } from "react";

import { Link, usePathname } from "@/i18n/routing";

import { useToggleState } from "@/hooks";

import { AnimatePresence, motion, Variants } from "framer-motion";

import { NavbarList } from "@/static";

import { FaAngleRight } from "react-icons/fa6";

import { NavbarTypes } from "../types";

const motionVariants: Variants = {
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

const DesktopLink = ({ pathUrl, title, content }: NavbarTypes) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const pathname = usePathname();

  const isActive = pathname === pathUrl || pathname.startsWith(`${pathUrl}/`);

  return (
    <li className="flex items-center h-full list-none group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {title === "Business" ? (
        <span className={`font-medium relative w-max cursor-default group-hover:font-semibold ${isActive ? "text-primary" : "text-dark"}`}>
          <span>{title}</span>
          <span className={`absolute h-1 transition-all -bottom-2 left-1/2 bg-secondary ${isActive ? "w-3/6" : "w-0"}`}></span>
          <span className={`absolute h-1 transition-all -bottom-2 right-1/2 bg-secondary ${isActive ? "w-3/6" : "w-0"}`}></span>
        </span>
      ) : (
        <Link
          href={pathUrl}
          className={`hover:text-primary font-medium relative w-max group-hover:font-semibold ${isActive ? "text-primary" : "text-dark"}`}
        >
          <span>{title}</span>
          <span className={`absolute h-1 transition-all -bottom-2 left-1/2 bg-secondary ${isActive ? "w-3/6" : "w-0"}`}></span>
          <span className={`absolute h-1 transition-all -bottom-2 right-1/2 bg-secondary ${isActive ? "w-3/6" : "w-0"}`}></span>
        </Link>
      )}

      <AnimatePresence>
        {isHovered && content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-0 w-full duration-300 shadow-lg bg-light-gray h-80 top-20 z-10000`}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-full max-w-screen-xl px-4 pt-10 mx-auto space-y-8 sm:px-8"
            >
              <h4 className="flex items-center gap-4 text-xl font-medium text-primary">
                {title} <FaAngleRight />
              </h4>
              <div className="grid grid-cols-3 gap-8">
                {content?.map((item, index) => {
                  return (
                    <div key={index} className="space-y-2">
                      <Link
                        href={pathUrl + item.pathUrl}
                        className="flex items-center gap-4 text-lg font-medium duration-300 text-dark-gray hover:text-dark-blue"
                      >
                        {item.title} <FaAngleRight />
                      </Link>
                      <p className="text-sm text-gray line-clamp-2">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const MobileLink = ({ pathUrl, title, content }: NavbarTypes) => {
  const [ref, dropdown, toggleDropdown] = useToggleState(false);

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex items-center gap-2 px-4 sm:px-8">
        {title === "Business" ? (
          <span className="text-base font-medium duration-300 cursor-default text-light sm:text-lg w-max">{title}</span>
        ) : (
          <Link href={pathUrl} className="text-base font-medium duration-300 hover:text-light-gray text-light sm:text-lg w-max">
            {title}
          </Link>
        )}
        {content && (
          <span onClick={toggleDropdown}>
            <FaAngleRight className={`duration-300 cursor-pointer ${dropdown && "rotate-90"}`} />
          </span>
        )}
      </div>
      <motion.div
        initial={false}
        animate={dropdown ? "open" : "closed"}
        variants={motionVariants}
        className="w-full px-4 mt-4 space-y-2 bg-light sm:px-8"
      >
        <div className="py-4 space-y-4 text-sm sm:text-base">
          {content?.map((item, index) => (
            <Link href={pathUrl + item.pathUrl} key={index} className="flex items-center gap-4 font-medium text-dark-gray hover:font-semibold w-max">
              {item.title} <FaAngleRight />
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const Navbar = ({ navbar }: { navbar: boolean }) => {
  const navbarList = NavbarList();
  return (
    <>
      <nav className="hidden h-full gap-4 lg:flex">
        {navbarList.map((item, index) => (
          <DesktopLink key={index} pathUrl={item.pathUrl} title={item.title} content={item.content} />
        ))}
      </nav>
      <motion.nav
        initial={false}
        animate={navbar ? "open" : "closed"}
        variants={motionVariants}
        className="absolute left-0 w-full py-4 space-y-4 overflow-hidden sm:py-8 lg:py-0 top-20 text-nowrap bg-primary text-light"
      >
        {navbarList.map((item, index) => (
          <MobileLink key={index} pathUrl={item.pathUrl} title={item.title} content={item.content} />
        ))}
      </motion.nav>
    </>
  );
};

export default Navbar;
