"use client";

import { useGetSearchApi } from "@/hooks";

import { useTranslations } from "next-intl";

import { ArticleCard, BigSlider, Container, Motion } from "@/components";

import { ResponseArticlesTypes } from "@/types";

export const ArticlesGallery = () => {
  const { response: articles, loading } = useGetSearchApi<ResponseArticlesTypes>({
    path: "/blogs",
    limit: "100000",
  });

  const t = useTranslations("media");

  return (
    <Container id="article" className="pb-10 sm:pb-16">
      <BigSlider
        className="space-y-8"
        title={`${t("articles-gallery")}`}
        loadData={loading as boolean}
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      >
        {articles?.data.map((item, index) => (
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={index}>
            <ArticleCard date={item.updatedAt} title={item.title} pathUrl={item.slug} pathImg={item.imageHeader} />
          </Motion>
        ))}
      </BigSlider>
    </Container>
  );
};
