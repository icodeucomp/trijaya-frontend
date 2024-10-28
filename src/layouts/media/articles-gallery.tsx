"use client";

import * as React from "react";

import { useGetApi, useMediaQuery } from "@/hooks";

import { useTranslations } from "next-intl";

import { useDebounce } from "use-debounce";

import { ArticleCard, Container, Motion, Pagination } from "@/components";

import { ResponseArticlesTypes } from "@/types";
import { CiSearch } from "react-icons/ci";

export const ArticlesGallery = () => {
  const t = useTranslations("media");

  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(6);
  const [totalPage, setTotalPage] = React.useState<number>(0);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const { response: articles, loading } = useGetApi<ResponseArticlesTypes>({
    path: "/blogs",
    searchQuery: debouncedSearchTerm,
    limit: limit.toString(),
    page: page.toString(),
  });

  const isLargeDesktop = useMediaQuery("(min-width: 1280px)");
  const isDesktop = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  React.useEffect(() => {
    if (articles && articles.total > 0) {
      setTotalPage(Math.ceil(articles.total / limit));
    }
  }, [articles, limit]);

  React.useEffect(() => {
    if (isLargeDesktop) {
      setLimit(6);
    } else if (isDesktop) {
      setLimit(3);
    } else if (isTablet) {
      setLimit(2);
    } else if (isMobile) {
      setLimit(1);
    }
  }, [isLargeDesktop, isDesktop, isTablet, isMobile]);

  return (
    <Container className="py-16 space-y-8" id="articles-gallery">
      <div className="flex items-center justify-between">
        <Motion tag="h3" initialX={-40} animateX={0} duration={0.3} className="w-full heading">
          {t("articles-gallery")}
        </Motion>
        <Motion tag="div" initialX={40} animateX={0} duration={0.5} delay={0.3} className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
            <CiSearch size={20} />
          </div>
          <input
            type="search"
            className="block w-full py-2 pl-10 pr-4 text-sm duration-300 border rounded-lg outline-none lg:py-4 text-dark-blue border-gray focus:border-primary"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search"
          />
        </Motion>
      </div>

      {loading ? (
        <div className="flex justify-center w-full py-16 min-h-400">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles?.data && articles?.data.length < 1 ? (
            <h3 className="w-full col-span-1 mt-8 text-lg font-semibold text-center min-h-400 sm:text-2xl md:text-3xl sm:col-span-2 xl:col-span-3 text-gray/50">
              The articles is not found
            </h3>
          ) : (
            <>
              {articles?.data.map((item, index) => (
                <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={index}>
                  <ArticleCard date={item.updatedAt} title={item.title} pathUrl={item.slug} pathImg={item.header} />
                </Motion>
              ))}
            </>
          )}
        </div>
      )}

      <Motion tag="div" initialX={50} animateX={0} duration={0.8} delay={0.4} className="relative flex justify-center pt-8">
        <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumbering />
      </Motion>
    </Container>
  );
};
