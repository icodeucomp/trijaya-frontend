"use client";

import * as React from "react";

import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useGetApi, useMediaQuery } from "@/hooks";

import { useTranslations } from "next-intl";

import { useDebounce } from "use-debounce";

import { AnimatePresence } from "framer-motion";
import { Background, Container, Img, Modal, Motion, Pagination } from "@/components";

import { CiSearch } from "react-icons/ci";

import { BusinessSectorTypes, ResponseBusinessesSectorTypes } from "@/types";

export const ProjectGallery = () => {
  const t = useTranslations("media");

  const { push } = useRouter();
  const searchParams = useSearchParams();

  const [filteredProject, setFilteredProject] = React.useState<BusinessSectorTypes>();
  const [openModalIndex, setOpenModalIndex] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<string>("");

  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(4);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [debouncedSearchTerm] = useDebounce(searchParams.get("projects_keywords"), 500);

  const { response: projects, loading } = useGetApi<ResponseBusinessesSectorTypes>({
    path: "/projects",
    searchQuery: debouncedSearchTerm || "",
    limit: limit.toString(),
    page: page.toString(),
  });

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    push(`/media?projects_keywords=${e.target.value}#projects-gallery`);
  };

  const handleClose = () => {
    setSelected("");
    setOpenModalIndex(null);
  };

  React.useEffect(() => {
    if (projects && projects.total > 0) {
      setTotalPage(Math.ceil(projects.total / limit));
    } else {
      setTotalPage(0);
    }
  }, [projects, limit]);

  React.useEffect(() => {
    if (projects?.data && projects.data.length > 0) {
      setFilteredProject(projects?.data.find((item) => item.slug === openModalIndex));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalIndex]);

  React.useEffect(() => {
    if (isDesktop) {
      setLimit(4);
    } else if (isTablet) {
      setLimit(2);
    } else if (isMobile) {
      setLimit(1);
    }
  }, [isDesktop, isTablet, isMobile]);

  return (
    <Container className="pt-16" id="projects-gallery">
      <Motion tag="div" initialY={-40} animateY={0} duration={0.2} className="mb-16 space-y-2 text-center">
        <h3 className="heading">{t("head.title")}</h3>
        <p className="subheading">{t("head.description")}</p>
      </Motion>
      <div className="flex items-center justify-between mb-8">
        <Motion tag="h3" initialX={-50} animateX={0} duration={0.4} delay={0.2} className="w-full heading">
          Projects Gallery
        </Motion>
        <Motion tag="div" initialX={50} animateX={0} duration={0.8} delay={0.4} className="flex items-center gap-4">
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <CiSearch size={20} />
            </div>
            <input
              type="search"
              className="block w-full sm:min-w-60 py-2 pl-10 pr-4 text-sm duration-300 border rounded-lg outline-none lg:py-3.5 text-dark-blue border-gray focus:border-primary"
              onChange={handleSearch}
              value={searchParams.get("projects_keywords") || ""}
              placeholder="Search"
            />
          </div>
          <Pagination page={page} totalPage={totalPage} setPage={setPage} />
        </Motion>
      </div>

      {loading ? (
        <div className="flex justify-center w-full py-16 min-h-400">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {projects?.data && projects?.data.length < 1 ? (
            <h3 className="w-full col-span-1 py-16 text-lg font-semibold text-center min-h-400 sm:text-2xl md:text-3xl sm:col-span-2 lg:col-span-3 text-gray/50">The projects is not found</h3>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
              {projects?.data.map((item, index) => {
                const grid = index === 0 || index === 1 ? "row-span-2" : index === 3 ? "col-start-3" : "";
                return (
                  <div key={index} className={`cursor-pointer ${grid}`} onClick={() => setOpenModalIndex(item.slug)}>
                    <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1}>
                      <Background
                        src={item.header?.url || "/temp-business.webp"}
                        className={`items-end w-full p-4 sm:p-6 filter-image ${index === 0 || index === 1 ? "min-h-400" : "min-h-48"}`}
                        isHover
                      >
                        <div className="space-y-1 text-light">
                          <h5 className="text-sm sm:text-base lg:text-lg">{item.title}</h5>
                          <h6 className="text-base font-semibold lg:text-xl">{item.media.length} Products</h6>
                        </div>
                      </Background>
                    </Motion>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      <AnimatePresence>
        {openModalIndex !== null && (
          <Modal isVisible={openModalIndex !== null} onClose={handleClose}>
            <div className="space-y-4">
              <Img src={selected || filteredProject?.header.url || "/temp-business.webp"} alt={filteredProject?.title || ""} className="mx-auto rounded-lg w-96 aspect-video" cover />
              <h3 className="text-xl font-semibold text-center sm:text-2xl text-primary">{filteredProject?.title}</h3>
              <div className="p-2 overflow-x-hidden overflow-y-auto h-80 scrollbar">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {filteredProject?.media &&
                    filteredProject?.media.length > 0 &&
                    filteredProject?.media.map((media, index) => (
                      <div
                        key={index}
                        onClick={() => setSelected(media.url)}
                        className={`cursor-pointer hover:shadow-custom-border rounded-lg transition-shadow w-max ${selected === media.url ? "shadow-custom-border" : "shadow-none"}`}
                      >
                        <Img src={media.url} alt={media.slug} className="rounded-lg w-52 aspect-video" cover />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};
