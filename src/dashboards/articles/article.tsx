"use client";

import Link from "next/link";

import { useGet } from "@/hooks";

import { Button, Img } from "@/components";
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
        <h1 className="w-full m-8 text-3xl col-span-1 sm:col-span-2 xl:col-span-3 font-semibold text-center text-gray/50">
          The articles is not found
        </h1>
      ) : (
        data?.map((item, index) => (
          <article key={index} className="w-full max-w-xs p-4 space-y-2 duration-300 rounded-md card-shadow text-dark-blue bg-light">
            <Img src={item.imageHeader || `/temp-image-5.png`} alt={item.title} className="w-full overflow-hidden rounded-lg h-60" cover />
            <div className="flex gap-4 mt-2 text-sm text-dark-gray">
              <li className="flex gap-1">
                <Img src={calendar} alt="calendar icon" className="size-4" />
                {convertDate(item.updatedAt)}
              </li>
            </div>
            <h4 className="text-xl font-semibold">{item.title}</h4>
            <div className="relative flex items-center justify-between">
              <Link href={`/admin/dashboard/article/show/${item.slug}`}>
                <button className="p-2 duration-300 border rounded-full border-primary bg-light hover:bg-primary group">
                  <BiShowAlt size={20} className="text-primary group-hover:text-light" />
                </button>
              </Link>
              <Link href={`/admin/dashboard/article/edit/${item.title}`}>
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

export const Article = () => {
  const { response: articles, loading } = useGet<ResponseArticlesTypes>("/blogs");
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">Articles</h1>
        <span className="text-sm text-gray">Last Updated at: 04/03/2024 17:00</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <Filter />
        <Link href="/admin/dashboard/article/add">
          <Button className="btn-primary">Add New Blog</Button>
        </Link>
      </div>
      {loading ? (
        <div className="w-full py-16 flex justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <Content data={articles?.data} />
      )}
    </>
  );
};
