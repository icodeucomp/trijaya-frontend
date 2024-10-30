"use client";

import * as React from "react";

import { Link, useRouter } from "@/i18n/routing";

import { useGetApi, useMediaQuery, useToggleState } from "@/hooks";

import { AnimatePresence, motion } from "framer-motion";
import { Img, LanguageSwitcher, Navbar } from "@/components";

import { arrow_long_up_left } from "@/icons";

import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

import { formatKebabCase } from "@/utils";

import { ResponseSearchData, SearchData } from "@/types";
import { IoSearch } from "react-icons/io5";

export const Header = () => {
  const { push } = useRouter();

  const [ref, navbar, toggleNavbar] = useToggleState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const [lastScrollY, setLastScrollY] = React.useState<number>(0);

  const [data, setData] = React.useState<SearchData[]>([]);

  const { response: searchData } = useGetApi<ResponseSearchData>({ path: `/search` });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, linkHref: string) => {
    e.preventDefault();
    push(linkHref);
    setOpenModal(false);
  };

  React.useEffect(() => {
    if (searchData?.data && searchData.data.length > 0) {
      setData(
        searchData?.data.filter((item) => (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) || (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData, searchTerm]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 200 && currentScrollY > lastScrollY) {
          setIsVisible(false);
        }
        if (currentScrollY < 200 && currentScrollY < lastScrollY) {
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      });
    }
  }, [lastScrollY]);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };
    if (openModal) {
      window.addEventListener("keydown", handleEscape);
    }
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [openModal]);

  return (
    <header ref={ref} className="w-full z-1000">
      <div className="bg-primary hidden lg:block">
        <div className="flex justify-end max-w-screen-xl px-4 py-2 mx-auto sm:py-3 sm:px-8">
          <LanguageSwitcher />
        </div>
      </div>
      <div className={`bg-light-gray top-0 w-full transition-all duration-300 ease-in-out shadow ${isVisible ? "relative" : "fixed"}`}>
        <div className="flex items-center justify-between w-full h-20 max-w-screen-xl px-4 mx-auto sm:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold">
            {isMobile ? (
              <Img className="size-14" src="/logo-company.png" alt="logo PT Trijaya Berkah Mandiri" />
            ) : (
              <Img className="min-w-64 h-16" src="/logo-company-navbar.png" alt="logo PT Trijaya Berkah Mandiri" />
            )}
          </Link>

          <Navbar navbar={navbar} />

          <div className="relative hidden overflow-hidden rounded-lg lg:min-w-52 xl:min-w-64 lg:flex">
            <input
              type="text"
              className="block w-full p-2.5 text-sm duration-300 border outline-none rounded-s-lg text-dark-blue border-gray focus:border-primary"
              onClick={() => setOpenModal(true)}
              placeholder="Search"
              readOnly
            />
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="absolute top-0 end-0 duration-300 h-full p-2.5 text-sm font-medium text-white bg-primary border border-primary hover:bg-primary/80"
            >
              <CiSearch size={20} className="fill-white" />
              <span className="sr-only">Search</span>
            </button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setOpenModal(true)}>
              <IoSearch size={32} className="fill-primary" />
            </button>
            <button onClick={toggleNavbar} className={`relative flex flex-col justify-center overflow-hidden items-center p-2 ${navbar ? "space-y-1" : "space-y-1.5"}`}>
              <span className={`block h-1 w-10 rounded-full bg-primary transition-transform ease-in-out ${navbar ? "translate-y-2 rotate-45" : ""}`}></span>
              <span className={`block h-1 w-8 rounded-full bg-primary duration-200 ${navbar && "translate-x-16"}`}></span>
              <span className={`block h-1 w-10 rounded-full bg-primary transition-transform ease-in-out ${navbar ? "-translate-y-2 -rotate-45" : ""}`}></span>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {openModal && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full min-h-screen p-4 bg-opacity-50 bg-dark-blue z-1000">
            <motion.div
              className="relative w-full max-w-screen-md p-4 py-4 mx-auto overflow-hidden rounded-lg shadow-lg max-h-custom-modal bg-light min-h-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                className="btn-cross-border group"
                onClick={() => {
                  setOpenModal(false);
                  setSearchTerm("");
                }}
              >
                <RxCross1 size={20} className="text-primary group-hover:text-light" />
              </button>
              <h3 className="mt-1 text-xl font-semibold text-primary sm:text-2xl">Search</h3>
              <div className="relative w-full mt-6">
                <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                  <CiSearch size={20} />
                </div>
                <input
                  type="search"
                  className="block w-full py-2 pl-10 pr-4 text-sm duration-300 border rounded-lg outline-none text-dark-blue border-gray focus:border-primary"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  placeholder="Search"
                />
              </div>
              <div className="pr-2 mt-6 overflow-y-auto h-96 scrollbar">
                {searchTerm === "" ? (
                  <h3 className="flex justify-center w-full py-8 text-xl font-semibold text-gray/50">No recent searches</h3>
                ) : data && data.length === 0 ? (
                  <h3 className="flex justify-center w-full py-8 text-xl font-semibold sm:text-2xl text-gray/70">No results for &quot;{searchTerm}&quot;</h3>
                ) : (
                  data?.map((item: any, index: number) => {
                    const linkHref =
                      item.feature === "project"
                        ? `/business/sector/project/${item.slug}`
                        : item.feature === "product"
                        ? `/business/sector/product/${formatKebabCase(item.business)}?products_keywords=${item.title}`
                        : item.feature === "album"
                        ? `/media?album_keywords=${item.name}#lifeattbm`
                        : item.feature === "blog"
                        ? `/media/article/${item.slug}`
                        : item.feature === "document"
                        ? `/profile/certification?documents_keywords=${item.name}#certification-legalities`
                        : `/business/sector/${item.slug}`;

                    const category: string = item.business
                      ? `${item.header ? "Projects" : "Products"} | ${item.business}`
                      : item.feature === "album"
                      ? "Albums"
                      : item.feature === "blog"
                      ? "Articles"
                      : item.feature === "document"
                      ? "Documents"
                      : "Sector";

                    const img: string = item.media?.[0]?.url || item.header?.url || item?.header || "/temp-article.webp";
                    return (
                      <div key={index} className="flex items-center justify-between border-t border-gray/50">
                        <div className="flex items-center gap-2 pl-4 py-2.5">
                          <Img src={img} alt="thumbnail" className="w-20 sm:w-24 min-w-20 rounded-lg aspect-video" cover />
                          <div className="relative">
                            <h5 className="text-sm text-gray line-clamp-1">{category}</h5>
                            <h5 className="text-sm text-dark-blue line-clamp-1">{item.title || item.name}</h5>
                          </div>
                        </div>
                        <button onClick={(e) => handleClick(e, linkHref)} className="pr-4">
                          <Img src={arrow_long_up_left} alt="back arrow" className="size-5 sm:size-6" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
