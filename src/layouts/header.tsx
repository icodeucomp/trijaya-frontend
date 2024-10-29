"use client";

import * as React from "react";

import { Link, useRouter } from "@/i18n/routing";

import { useGetApi, useToggleState } from "@/hooks";

import { useDebounce } from "use-debounce";

import { AnimatePresence, motion } from "framer-motion";
import { Img, LanguageSwitcher, Navbar } from "@/components";

import { IoMdClose, IoMdMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { arrow_long_up_left } from "@/icons";
import { formatKebabCase } from "@/utils";

export const Header = () => {
  const { push } = useRouter();

  const [ref, navbar, toggleNavbar] = useToggleState(false);

  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const [lastScrollY, setLastScrollY] = React.useState<number>(0);

  const [debounceSearchTerm] = useDebounce(searchTerm, 300);

  const { response: data, loading } = useGetApi<any>({ path: `/search?name=${debounceSearchTerm}` });

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, linkHref: string) => {
    e.preventDefault();
    push(linkHref);
    setOpenModal(false);
  };

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
      <div className="bg-primary">
        <div className="flex justify-end max-w-screen-xl px-4 py-2 mx-auto sm:py-3 sm:px-8">
          <LanguageSwitcher />
        </div>
      </div>
      <div className={`bg-light-gray top-0 w-full transition-all duration-300 ease-in-out shadow ${isVisible ? "relative" : "fixed"}`}>
        <div className="flex items-center justify-between w-full h-20 max-w-screen-xl px-4 mx-auto sm:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Img className="min-w-56 sm:min-w-64 h-14 sm:h-16" src="/logo-company-navbar.png" alt="logo PT Trijaya Berkah Mandiri" />
          </Link>

          <Navbar navbar={navbar} />

          <div className="relative hidden overflow-hidden rounded-lg lg:min-w-52 xl:min-w-64 lg:flex">
            <input
              type="text"
              className="block w-full p-2.5 text-sm duration-300 border outline-none rounded-s-lg text-dark-blue border-gray focus:border-primary"
              onClick={() => setOpenModal(true)}
              placeholder="Search"
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

          <div className="block lg:hidden">
            <button onClick={toggleNavbar}>{navbar ? <IoMdClose size={32} className="fill-primary" /> : <IoMdMenu size={32} className="fill-primary" />}</button>
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
                ) : (
                  <>
                    {loading ? (
                      <div className="flex justify-center py-16">
                        <div className="loader"></div>
                      </div>
                    ) : (
                      <>
                        {data && data.length < 1 ? (
                          <h3 className="flex justify-center w-full py-8 text-xl font-semibold sm:text-2xl text-gray/70">No result for "{searchTerm}"</h3>
                        ) : (
                          data?.map((item: any, index: any) => {
                            const linkHref =
                              item.business && item.header
                                ? `/business/sector/project/${item.slug}`
                                : item.business
                                ? `/business/sector/product/${formatKebabCase(item.business)}?products_keywords=${item.title}`
                                : item.creator
                                ? `/media?album_keywords=${item.name}#lifeattbm`
                                : item.author
                                ? `/media/article/${item.slug}`
                                : item.uploader
                                ? `/profile/certification?documents_keywords=${item.name}#certification-legalities`
                                : `/business/sector/${item.slug}`;

                            return (
                              <div key={index} className="flex items-center justify-between border-t border-gray/50">
                                <div className="flex items-center gap-2 pl-4 py-2.5">
                                  <Img src={item.media?.[0].url || item.header?.url || item.header || "/temp-article.webp"} alt="temp" className="w-20 rounded-lg aspect-video" cover />
                                  <div className="relative">
                                    <h5 className="text-sm text-gray">
                                      {item.business
                                        ? `${item.header ? "Projects" : "Products"} | ${item.business}`
                                        : item.creator
                                        ? "Albums"
                                        : item.author
                                        ? "Articles"
                                        : item.uploader
                                        ? "Documents"
                                        : "Sector"}
                                    </h5>
                                    <h5 className="text-sm text-dark-blue">{item.title || item.name}</h5>
                                  </div>
                                </div>
                                <button onClick={(e) => handleClick(e, linkHref)} className="pr-4">
                                  <Img src={arrow_long_up_left} alt="arrow up left" className="size-5 sm:size-6" />
                                </button>
                              </div>
                            );
                          })
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
