"use client";

import * as React from "react";

import Link from "next/link";

import { useGetApi, useMediaQuery } from "@/hooks";

import { useDebounce } from "use-debounce";

import { Button, Img, Pagination } from "@/components";
import { Filter } from "../filter";
import { DeleteArticle } from "./delete-article";

import { calendar } from "@/icons";

import { BiShowAlt } from "react-icons/bi";

import { convertDate } from "@/utils";

import { ArticlesTypes, ResponseArticlesTypes } from "@/types";

const Content = ({ data }: { data: ArticlesTypes[] | undefined }) => {
  return (
    <menu className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 place-items-center xl:grid-cols-3">
      {!data?.length ? (
        <h3 className="w-full col-span-1 m-8 text-lg font-semibold text-center sm:text-2xl md:text-3xl sm:col-span-2 xl:col-span-3 text-gray/50">
          The articles is not found
        </h3>
      ) : (
        data?.map((item, index) => (
          <article key={index} className="w-full max-w-xs p-4 space-y-4 duration-300 rounded-md card-shadow text-dark-blue bg-light">
            <Img src={item.header || "/temp-article.webp"} alt={item.title} className="w-full rounded-lg h-60" cover />
            <div className="flex gap-4 mt-2 text-sm text-dark-gray">
              <li className="flex gap-1">
                <Img src={calendar} alt="calendar icon" className="size-4" />
                {convertDate(item.updatedAt)}
              </li>
            </div>
            <h4 className="text-xl font-semibold h-14 line-clamp-2">{item.title}</h4>
            <div className="relative flex items-center justify-between">
              <Link href={`/admin/dashboard/article/show/${item.slug}`}>
                <button className="p-2 duration-300 border rounded-full border-primary bg-light hover:bg-primary group">
                  <BiShowAlt size={20} className="text-primary group-hover:text-light" />
                </button>
              </Link>
              <Link href={`/admin/dashboard/article/edit/${item.slug}`}>
                <Button className="w-full btn-primary">Edit</Button>
              </Link>
              <DeleteArticle slug={item.slug} />
            </div>
          </article>
        ))
      )}
    </menu>
  );
};

export const Articles = () => {
  // get and set data to manipulate query in call api
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(9);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  // fetch api to show all data articles / blogs
  const { response: articles, loading } = useGetApi<ResponseArticlesTypes>({
    path: "/blogs",
    searchQuery: debouncedSearchTerm,
    page: page.toString(),
    limit: limit.toString(),
  });

  // define responsive media query
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  // to set data total page after first render
  React.useEffect(() => {
    if (articles?.total && articles?.total > 0) {
      setTotalPage(Math.ceil(articles.total / limit));
    } else {
      setTotalPage(0);
    }
  }, [articles, limit]);

  // to set data limit after first render
  React.useEffect(() => {
    if (isDesktop) {
      setLimit(9);
    } else if (isTablet) {
      setLimit(2);
    } else if (isMobile) {
      setLimit(1);
    }
  }, [isDesktop, isTablet, isMobile]);

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">Articles</h1>
        <span className="text-sm text-gray">Last Updated at: {articles?.newest}</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <Filter setSearchTerm={(e) => setSearchTerm(e.target.value)} />
        <Link href="/admin/dashboard/article/add">
          <Button className="btn-primary">Add New Blog</Button>
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center w-full py-16">
          <span className="loader"></span>
        </div>
      ) : (
        <Content data={articles?.data} />
      )}
      <div className="pt-8">
        <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumbering />
      </div>
    </>
  );
};
