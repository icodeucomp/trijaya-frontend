"use client";

import { useGetSearchApi } from "@/hooks";

import { useTranslations } from "next-intl";

import { ArticleCard, BigSlider, Container } from "@/components";

import { ResponseArticlesTypes } from "@/types";

export const Articles = () => {
  const t = useTranslations();

  const { response: articles, loading } = useGetSearchApi<ResponseArticlesTypes>({
    path: "/blogs",
    limit: "100000",
  });

  return (
    <Container className="py-12 sm:py-16 md:py-20">
      <BigSlider
        className="space-y-8"
        title={`${t("home.articles")}`}
        loadData={loading as boolean}
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      >
        {articles?.data.map((item, index) => (
          <div key={index}>
            <ArticleCard date={item.updatedAt} title={item.title} pathUrl={item.slug} pathImg={item.imageHeader} />
          </div>
        ))}
      </BigSlider>
    </Container>
  );
};
