"use client";

import { useEffect, useState } from "react";

import { Link } from "@/i18n/routing";

import { useToggleState } from "@/hooks";

import { Container, Img, LanguageSwitcher, Navbar } from "@/components";

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
      className={`fixed top-0 w-full py-4 z-1000 transition-all duration-500 bg-light-gray ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Img className="size-10 sm:size-12 md:size-14" src="/logo-company.png" alt="logo PT Trijaya Berkah Mandiri" />
          <h1 className="text-sm font-medium sm:text-base md:text-lg font-red-hat">PT Trijaya Berkah Mandiri</h1>
        </Link>

        <Navbar navbar={navbar} />

        <LanguageSwitcher />

        <div className="block lg:hidden">
          <button onClick={toggleNavbar}>
            {navbar ? <IoMdClose size={32} className="fill-primary" /> : <IoMdMenu size={32} className="fill-primary" />}
          </button>
        </div>
      </Container>
    </header>
  );
};
