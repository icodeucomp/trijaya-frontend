"use client";

import * as React from "react";

import { useGetSearchApi } from "@/hooks";

import { useTranslations } from "next-intl";

import { ArticleCard, Container, Pagination } from "@/components";

import { ResponseArticlesTypes } from "@/types";

export const Articles = () => {
  const [splitData, setSplitData] = React.useState<number>(0);
  const [page, setPage] = React.useState<string>("1");

  const t = useTranslations();

  const { response: articles, loading } = useGetSearchApi<ResponseArticlesTypes>({
    path: "/blogs",
    limit: "3",
    page,
  });

  React.useEffect(() => {
    if (articles?.data && articles.data.length > 0) {
      setSplitData(Math.ceil(articles.total / 3));
    }
  }, [articles]);

  return (
    <Container className="py-12 sm:py-16 md:py-20">
      <Pagination className="space-y-8" splitData={splitData} isBold loading={loading} title={`${t("home.articles")}`} page={page} setPage={setPage}>
        <div className="grid grid-cols-2 gap-2 p-1 sm:grid-cols-3">
          {articles?.data.map((item, index) => (
            <div key={index}>
              <ArticleCard date={item.updatedAt} title={item.title} pathUrl={item.slug} pathImg={item.imageHeader} />
            </div>
          ))}
        </div>
      </Pagination>
    </Container>
  );
};
