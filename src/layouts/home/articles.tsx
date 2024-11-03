"use client";

import * as React from "react";

import { useGetApi, useMediaQuery } from "@/hooks";

import { useTranslations } from "next-intl";

import { ArticleCard, Button, Container, Motion, Pagination } from "@/components";

import { ResponseArticlesTypes } from "@/types";
import { Link } from "@/i18n/routing";

export const Articles = () => {
  const t = useTranslations();

  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(3);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const { response: articles, loading } = useGetApi<ResponseArticlesTypes>({
    path: "/blogs",
    limit: limit.toString(),
    page: page.toString(),
  });

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 767px)");

  React.useEffect(() => {
    if (articles && articles.total > 0) {
      setTotalPage(Math.ceil(articles.total / limit));
    } else {
      setTotalPage(0);
    }
  }, [articles, limit]);

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
    <Container className="py-16 space-y-8">
      <div className="flex items-center justify-between">
        <Motion tag="h3" initialX={-50} animateX={0} duration={0.4} className="heading">
          {t("home.articles")}
        </Motion>
        <Motion tag="div" initialX={50} animateX={0} duration={0.8} delay={0.4} className="flex items-center gap-4">
          <Link href="/media/#article">
            <Button className="btn-outline">{t("view-all")}</Button>
          </Link>
          <Pagination page={page} totalPage={totalPage} setPage={setPage} />
        </Motion>
      </div>
      {loading ? (
        <div className="flex items-center justify-center w-full min-h-400">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles?.data && articles?.data.length < 1 ? (
            <h3 className="w-full col-span-1 my-8 text-lg font-semibold text-center sm:text-2xl md:col-span-2 lg:col-span-3 text-gray/50">Articles not found</h3>
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
    </Container>
  );
};
