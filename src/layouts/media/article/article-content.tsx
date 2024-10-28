"use client";

import { MouseEvent } from "react";

import { Link } from "@/i18n/routing";

import { notFound } from "next/navigation";

import { useGetApi } from "@/hooks";

import { useTranslations } from "next-intl";

import { Breadcrumbs, Container, Img, Motion } from "@/components";

import { FaLink } from "react-icons/fa6";

import { calendar } from "@/icons";

import { convertDate } from "@/utils";

import { ArticleCardProps, ResponseArticlesTypes, ResponseArticleTypes } from "@/types";
import toast from "react-hot-toast";

const RelatedArticles = ({ date, title, pathUrl, pathImg }: ArticleCardProps) => {
  return (
    <div className="flex items-center gap-4">
      <Img src={pathImg || "/temp-article.webp"} alt="temporary" className="rounded-lg aspect-square min-w-20 sm:min-w-24" cover />
      <div className="space-y-2">
        <div className="flex gap-2 text-xs lg:gap-4 text-dark-gray">
          <li className="flex gap-1">
            <Img src={calendar} alt="calendar icon" className="size-4" />
            {convertDate(date)}
          </li>
        </div>
        <Link href={`/media/article/${pathUrl}`}>
          <h5 className="text-sm font-semibold lg:text-base text-dark-blue line-clamp-3">{title}</h5>
        </Link>
      </div>
    </div>
  );
};

export const ArticleContent = ({ slug }: { slug: string }) => {
  const { response: articles, loading: loadingArticles } = useGetApi<ResponseArticlesTypes>({ path: "/blogs", limit: "5" });
  const { response: article, loading: loadingArticle, error } = useGetApi<ResponseArticleTypes>({ path: `/blogs/${slug}` });

  const t = useTranslations("media");

  const handleShareButton = async (e: MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Text copied to clipboard!");
  };

  if (error) {
    notFound();
  }

  return (
    <Container className="p-10 sm:pt-16 grid grid-cols-1 lg:grid-cols-3 grid-rows-[auto,auto] gap-x-6 gap-y-4 xl:gap-16 text-dark-blue">
      {loadingArticle ? (
        <div className="flex justify-center w-full col-span-2 py-4">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <div className="w-full h-auto space-y-4 text-justify lg:col-span-2 sm:space-y-6 xl:space-y-8">
            <Motion tag="div" initialY={-40} animateY={0} duration={0.2} className="hidden md:block">
              <Breadcrumbs
                items={[
                  { name: "Media", path: "/media" },
                  { name: article?.data.title || "", path: slug },
                ]}
              />
            </Motion>
            <Motion tag="h1" initialX={-40} animateX={0} duration={0.4} delay={0.2} className="leading-snug heading">
              {article?.data.title}
            </Motion>
            <Motion tag="div" initialX={-40} animateX={0} duration={0.6} delay={0.4} className="flex gap-4 text-xs sm:text-sm text-dark-gray">
              <li className="flex gap-1">
                <Img src={calendar} alt="calendar icon" className="size-4" />
                {convertDate(article?.data.createdAt as string)}
              </li>
            </Motion>
          </div>
          <Motion tag="div" initialX={0} animateX={0} duration={0.8} delay={0.6} className="w-full h-auto text-justify lg:col-span-2">
            <div className="dangerous_html" dangerouslySetInnerHTML={{ __html: article?.data.content as TrustedHTML }} />
            <div className="flex items-center justify-end gap-2 pt-6">
              <span className="text-base md:text-xl text-primary">Share this article</span>
              <button onClick={handleShareButton} className="p-2.5 duration-300 border rounded-full border-primary group hover:bg-primary">
                <FaLink size={20} className="duration-300 fill-primary group-hover:fill-light" />
              </button>
            </div>
          </Motion>
        </>
      )}
      <div className={`w-full h-auto ${loadingArticle ? "lg:row-span-1" : "lg:row-span-2"}`}>
        {loadingArticles ? (
          <div className="flex justify-center w-full py-4">
            <span className="loader"></span>
          </div>
        ) : (
          <Motion tag="div" initialX={40} animateX={0} duration={0.4} delay={0.2} className={`sticky top-4 hidden space-y-12 lg:block`}>
            <div className="flex items-center gap-4 pt-1">
              <i className="h-12 border-l-4 border-primary" />
              <h5 className="text-2xl font-semibold text-primary">{t("other-articles")}</h5>
            </div>

            <div className="space-y-8">
              {articles?.data.map((item, index) => (
                <RelatedArticles key={index} date={item.updatedAt} pathUrl={item.slug} title={item.title} pathImg={item.header} />
              ))}
            </div>
          </Motion>
        )}
      </div>
    </Container>
  );
};
