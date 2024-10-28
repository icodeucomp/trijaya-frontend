"use client";

import * as React from "react";

import { Link } from "@/i18n/routing";

import { Background, Container, Motion, Pagination } from "@/components";

import { useGetApi, useMediaQuery } from "@/hooks";

import { ResponseBusinessesSectorTypes } from "@/types";

export const Projects = () => {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(3);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const { response: projects, loading } = useGetApi<ResponseBusinessesSectorTypes>({
    path: "/projects",
    limit: limit.toString(),
    page: page.toString(),
  });

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  React.useEffect(() => {
    if (projects && projects.total > 0) {
      setTotalPage(Math.ceil(projects.total / limit));
    }
  }, [projects, limit]);

  React.useEffect(() => {
    if (isDesktop) {
      setLimit(3);
    } else if (isTablet) {
      setLimit(2);
    } else if (isMobile) {
      setLimit(1);
    }
  }, [isDesktop, isTablet, isMobile]);

  return (
    <Container className="py-16 space-y-8">
      <div className="flex items-center justify-between">
        <Motion tag="h3" initialX={-50} animateX={0} duration={0.4} className="heading">
          Our Newest Projects
        </Motion>
        <Motion tag="div" initialX={50} animateX={0} duration={0.8} delay={0.4}>
          <Pagination page={page} totalPage={totalPage} setPage={setPage} />
        </Motion>
      </div>
      {loading ? (
        <div className="flex justify-center w-full py-16 min-h-600">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects?.data.map((item, index) => (
            <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1} key={index} className="space-y-4 text-dark-blue">
              <Background src={item.header?.url || "/temp-business.webp"} className="items-end min-h-300" parentClassName="rounded-lg filter-image">
                <div className="px-4 py-2 bg-primary">{item.business.title}</div>
              </Background>
              <Link href={`/business/sector/project/${item.slug}`} className="block">
                <h4 className="text-xl font-semibold sm:text-2xl">{item.title}</h4>
              </Link>
              <p className="text-sm sm:text-base">{item.description}</p>
            </Motion>
          ))}
        </div>
      )}
    </Container>
  );
};
