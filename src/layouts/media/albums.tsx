"use client";

import * as React from "react";

import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

import { useGetApi, useMediaQuery } from "@/hooks";

import { useDebounce } from "use-debounce";

import { AnimatePresence } from "framer-motion";
import { Container, Img, Modal, Motion, Pagination } from "@/components";

import { CiSearch } from "react-icons/ci";
import { PiCaretRightBold } from "react-icons/pi";

import { AlbumTypes, ResponseAlbumsTypes } from "@/types";

export const Albums = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const [filteredAlbum, setFilteredAlbum] = React.useState<AlbumTypes>();
  const [openModalIndex, setOpenModalIndex] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<string>("");

  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(3);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [debouncedSearchTerm] = useDebounce(searchParams.get("album_keywords"), 500);

  const { response: albums, loading } = useGetApi<ResponseAlbumsTypes>({
    path: "/albums",
    searchQuery: debouncedSearchTerm || "",
    limit: limit.toString(),
    page: page.toString(),
  });

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    push(`/media?album_keywords=${e.target.value}#lifeattbm`);
  };

  const handleClose = () => {
    setSelected("");
    setOpenModalIndex(null);
  };

  React.useEffect(() => {
    if (albums && albums.total > 0) {
      setTotalPage(Math.ceil(albums.total / limit));
    } else {
      setTotalPage(0);
    }
  }, [albums, limit]);

  React.useEffect(() => {
    if (albums?.data && albums.data.length > 0) {
      setFilteredAlbum(albums?.data.find((item) => item.slug === openModalIndex));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalIndex]);

  React.useEffect(() => {
    if (isDesktop) {
      setLimit(3);
    } else if (isTablet) {
      setLimit(2);
    } else if (isMobile) {
      setLimit(1);
    }
  }, [isDesktop, isTablet, isMobile]);

  return (
    <Container className="pt-32" id="lifeattbm">
      <div className="flex items-center justify-between mb-8">
        <Motion tag="h3" initialX={-50} animateX={0} duration={0.4} className="w-full heading">
          #LifeatTBM
        </Motion>
        <Motion tag="div" initialX={50} animateX={0} duration={0.8} delay={0.4} className="flex items-center gap-4">
          <div className="relative w-full max-w-xs hidden sm:block">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <CiSearch size={20} />
            </div>
            <input
              type="search"
              className="block w-full sm:min-w-60 py-2 pl-10 pr-4 text-sm duration-300 border rounded-lg outline-none lg:py-3.5 text-dark-blue border-gray focus:border-primary"
              onChange={handleSearch}
              value={searchParams.get("album_keywords") || ""}
              placeholder="Search"
            />
          </div>
          <Pagination page={page} totalPage={totalPage} setPage={setPage} />
        </Motion>
      </div>

      {loading ? (
        <div className="flex justify-center w-full py-16 min-h-300">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {albums?.data && albums?.data.length < 1 ? (
            <h3 className="w-full col-span-1 py-16 text-lg font-semibold text-center min-h-300 sm:text-2xl md:text-3xl sm:col-span-2 lg:col-span-3 text-gray/50">The albums is not found</h3>
          ) : (
            <>
              {albums?.data.map((item, index) => (
                <Motion
                  tag="div"
                  initialY={50}
                  animateY={0}
                  duration={0.5}
                  delay={index * 0.1}
                  key={index}
                  className="relative grid grid-cols-2 gap-4 p-4 duration-300 rounded-lg shadow-lg min-h-300 bg-light hover:bg-primary group"
                >
                  <Img src={item?.header || "/temp-business.webp"} alt={item.name} className="w-full h-[268px] rounded-lg" cover />
                  <div className="flex items-center text-center text-primary group-hover:text-light line-clamp-2">
                    <h4 className="text-lg font-semibold sm:text-xl">{item.name}</h4>
                  </div>
                  <span onClick={() => setOpenModalIndex(item.slug)} className="absolute flex items-center gap-1 text-sm cursor-pointer bottom-4 right-4 text-primary group-hover:text-light">
                    See Pictures <PiCaretRightBold size={16} />
                  </span>
                </Motion>
              ))}
            </>
          )}
        </div>
      )}
      <AnimatePresence>
        {openModalIndex !== null && (
          <Modal isVisible={openModalIndex !== null} onClose={handleClose}>
            <div className="space-y-4">
              <Img src={selected || filteredAlbum?.header || "/temp-business.webp"} alt={filteredAlbum?.name || ""} className="mx-auto rounded-lg w-80 sm:w-96 aspect-video" cover />
              <h3 className="text-xl font-semibold text-center sm:text-2xl text-primary">{filteredAlbum?.name}</h3>
              <div className="p-1 sm:p-2 overflow-x-hidden overflow-y-auto h-80 scrollbar">
                <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4 justify-items-center">
                  {filteredAlbum?.medias && filteredAlbum.medias.length > 0 ? (
                    filteredAlbum?.medias.map((media, index) => (
                      <div
                        key={index}
                        onClick={() => setSelected(media.url)}
                        className={`cursor-pointer hover:shadow-custom-border rounded-lg transition-shadow w-max ${selected === media.url ? "shadow-custom-border" : "shadow-none"}`}
                      >
                        <Img src={media.url} alt={media.slug} className="rounded-lg w-40 sm:w-48 md:w-52 aspect-video" cover />
                      </div>
                    ))
                  ) : (
                    <h3 className="w-full col-span-2 mt-8 text-lg font-semibold text-center sm:text-2xl sm:col-span-3 lg:col-span-4 text-gray/50">Photos have not been added to the album</h3>
                  )}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};
