"use client";

import { useGetApi } from "@/hooks";

import { useTranslations } from "next-intl";

import { ArticleCard, BigSlider, Container } from "@/components";

import { ResponseArticlesTypes } from "@/types";

export const ArticlesGallery = () => {
  const { response: articles, loading } = useGetApi<ResponseArticlesTypes>("/blogs");

  const t = useTranslations("media");

  return (
    <Container className="pb-10 sm:pb-16">
      <BigSlider
        title={`${t("articles-gallery")}`}
        breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        slidesPerView={3}
        className="space-y-6 sm:space-y-10"
        loadData={loading as boolean}
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
