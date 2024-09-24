"use client";

import Link from "next/link";

import { Button, Img } from "@/components";
import { Filter } from "../filter";
import { DeleteArticle } from "./delete-article";

import { calendar, carbon_tag } from "@/icons";

import { BiShowAlt } from "react-icons/bi";

const Content = () => {
  return (
    <menu className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 place-items-center xl:grid-cols-3">
      {!Array.from({ length: 6 }).length ? (
        <h1 className="w-full m-8 text-3xl font-semibold text-center text-gray/50">The articles is not found</h1>
      ) : (
        Array.from({ length: 4 }).map((_, index) => (
          <article key={index} className="w-full max-w-xs p-4 space-y-2 duration-300 rounded-md card-shadow text-dark-blue bg-light">
            <Img
              src={`/images/home/profile-${index + 1}.png`}
              alt={`Profile ${index + 1}`}
              className="w-full overflow-hidden rounded-lg h-60"
              cover
            />
            <div className="flex gap-4 mt-2 text-sm text-dark-gray">
              <li className="flex gap-1">
                <Img src={calendar} alt="calendar icon" className="size-4" />
                22 January 2024
              </li>
              <li className="flex gap-1">
                <Img src={carbon_tag} alt="calendar icon" className="size-4" />
                Social
              </li>
            </div>
            <h4 className="text-xl font-semibold">ClearWater Engineering Breaks Ground on $500M Water Treatment Facility</h4>
            <div className="relative flex items-center justify-between">
              <Link href={`/admin/dashboard/article/show/test-1`}>
                <button className="p-2 duration-300 border rounded-full border-primary bg-light hover:bg-primary group">
                  <BiShowAlt size={20} className="text-primary group-hover:text-light" />
                </button>
              </Link>
              <Link href={`/admin/dashboard/article/edit/test-1`}>
                <Button className="w-full btn-primary">Edit</Button>
              </Link>
              <DeleteArticle />
            </div>
          </article>
        ))
      )}
    </menu>
  );
};

export const Article = () => {
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
      <Content />
    </>
  );
};
