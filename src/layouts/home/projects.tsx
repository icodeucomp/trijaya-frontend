"use client";

import * as React from "react";

import { Link } from "@/i18n/routing";

import { Background, Motion, Slider } from "@/components";

import { useGetApi, useMediaQuery } from "@/hooks";

import { BusinessSectorTypes, ResponseBusinessesSectorTypes } from "@/types";

export const Projects = () => {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(3);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [projects, setProjects] = React.useState<BusinessSectorTypes[]>();

  const { response: resProjects, loading } = useGetApi<ResponseBusinessesSectorTypes>({ path: "/projects", limit: "1000000", order: "desc" });

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  React.useEffect(() => {
    const startIndex = (page - 1) * limit;
    if (resProjects && resProjects.total > 0) {
      setTotalPage(Math.ceil(resProjects.total / limit));
      setProjects(resProjects.data.slice(startIndex, startIndex + limit));
    } else {
      setTotalPage(0);
    }
  }, [resProjects, limit, page]);

  React.useEffect(() => {
    if (isDesktop) {
      setLimit(3);
    } else if (isTablet) {
      setLimit(2);
    } else if (isMobile) {
      setLimit(1);
    }
  }, [isDesktop, isTablet, isMobile]);

  if (resProjects?.data && resProjects?.data.length < 1) {
    return null;
  }

  return (
    <Slider
      page={page}
      setPage={setPage}
      title="Our Newest Projects"
      totalPage={totalPage}
      loading={loading}
      parentClassName="py-14 space-y-8"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <>
        {projects?.map((item, index) => (
          <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1} key={index} className="space-y-4 min-h-400 text-dark-blue">
            <Background src={item.header?.url || "/temp-business.webp"} className="items-end min-h-300" parentClassName="rounded-lg filter-image">
              <div className="px-4 py-2 bg-primary">{item.business.title}</div>
            </Background>
            <Link href={`/business/sector/project/${item.slug}`} className="block">
              <h4 className="text-xl font-semibold sm:text-2xl">{item.title}</h4>
            </Link>
            <p className="text-sm sm:text-base">{item.description}</p>
          </Motion>
        ))}
      </>
    </Slider>
  );
};
