"use client";

import { useEffect, useState } from "react";

import { Link } from "@/i18n/routing";

import { useToggleState } from "@/hooks";

import { Img, LanguageSwitcher, Navbar } from "@/components";

import { IoMdClose, IoMdMenu } from "react-icons/io";

export const Header = () => {
  const [ref, navbar, toggleNavbar] = useToggleState(false);

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50 && currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      });
    }
  }, [lastScrollY]);

  return (
    <header
      ref={ref}
      className={`fixed top-0 h-20 z-1000 shadow-lg transition-all w-full duration-500 bg-light-gray ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative flex items-center w-full h-full">
        <div className="flex items-center justify-between w-full h-full max-w-screen-xl px-4 mx-auto sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Img className="min-w-56 sm:min-w-64 h-14 sm:h-16" src="/logo-company-navbar.png" alt="logo PT Trijaya Berkah Mandiri" />
          </Link>

          <Navbar navbar={navbar} />

          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          <div className="block lg:hidden">
            <button onClick={toggleNavbar}>
              {navbar ? <IoMdClose size={32} className="fill-primary" /> : <IoMdMenu size={32} className="fill-primary" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
