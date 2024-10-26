"use client";

import { useGetApi } from "@/hooks";

import { Link, usePathname, useRouter } from "@/i18n/routing";

import { Motion } from "./motion";

import { FaArrowLeft } from "react-icons/fa6";

import { ResponseBusinessesSectorTypes } from "@/types";

export const Sidebar = () => {
  const { response: business, loading } = useGetApi<ResponseBusinessesSectorTypes>({ path: "/business/metadata" });

  const { back } = useRouter();

  const pathname = usePathname();

  return (
    <Motion
      tag="div"
      animateX={0}
      initialX={-40}
      duration={0.3}
      className="hidden pr-8 overflow-y-auto border-r-2 border-gray/50 whitespace-nowrap lg:block min-h-custom-header min-w-72"
    >
      <div className="flex items-center gap-4 mt-16 mb-12">
        <button
          className="flex items-center justify-center duration-300 border rounded-lg size-10 sm:size-12 bg-light border-primary hover:bg-primary group"
          type="button"
          onClick={() => back()}
        >
          <FaArrowLeft size={20} className="duration-300 fill-secondary group-hover:fill-light" />
        </button>
        <span className="text-xl font-medium sm:text-2xl text-primary">Back</span>
      </div>
      <aside className={`mb-16 flex flex-col items-start text-dark min-w-60`}>
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {business?.data.map((item, index) => (
              <li
                key={index}
                className={`list-none text-xl duration-300 border-l-8 py-3 pl-8 w-full ${
                  pathname === `/business/sector/product/${item.slug}`
                    ? "text-primary font-semibold border-secondary"
                    : "text-dark font-medium border-primary"
                }`}
              >
                <Link href={`/business/sector/product/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </>
        )}
      </aside>
    </Motion>
  );
};
