"use client";

import * as React from "react";

import { notFound } from "next/navigation";
import { useRouter } from "@/i18n/routing";

import { useGetApi, useMediaQuery } from "@/hooks";

import { Container, Img, Motion, Pagination } from "@/components";

import { FaArrowLeft } from "react-icons/fa6";

import { ResponseBusinessSectorTypes } from "@/types";

export const Projects = ({ slug }: { slug: string }) => {
  const { back } = useRouter();

  const { response: project, loading, error } = useGetApi<ResponseBusinessSectorTypes>({ path: `/projects/${slug}` });

  const [imageProjects, setImageProjects] = React.useState<{ url: string; slug: string }[]>([]);

  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(2);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const isTablet = useMediaQuery("(min-width: 640px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  React.useEffect(() => {
    const startIndex = (page - 1) * limit;
    if (project && project.data.media.length > 0) {
      setTotalPage(Math.ceil(project.data.media.length / limit));
      setImageProjects(project.data.media.slice(startIndex, startIndex + limit));
    }
  }, [project, limit, page]);

  React.useEffect(() => {
    if (isTablet) {
      setLimit(2);
    } else if (isMobile) {
      setLimit(1);
    }
  }, [isTablet, isMobile]);

  if (loading) {
    return (
      <div className="flex justify-center w-full py-16">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    notFound();
  }

  return (
    <Container className="py-20">
      <div className="flex items-center gap-4 mb-8">
        <button
          className="flex items-center justify-center duration-300 border rounded-lg size-10 sm:size-12 bg-light border-primary hover:bg-primary group"
          type="button"
          onClick={() => back()}
        >
          <FaArrowLeft size={20} className="duration-300 fill-secondary group-hover:fill-light" />
        </button>
        <span className="text-xl font-medium sm:text-2xl text-primary">Back</span>
      </div>

      <div className="flex flex-col-reverse justify-between gap-4 md:gap-8 md:flex-row">
        <Motion tag="div" initialX={-40} animateX={0} duration={0.3} className="flex flex-col w-full gap-4">
          <h3 className="heading">{project?.data.title}</h3>
          <p className="h-full overflow-y-auto text-sm leading-normal text-justify text-primary sm:text-base md:h-44 scrollbar">
            {project?.data.description}
          </p>
          <div className="flex items-center w-full max-w-xl">
            <div className="w-1 h-2 bg-primary"></div>
            <div className="w-1/2 h-2 bg-primary"></div>
            <div className="w-1/2 h-2 bg-secondary"></div>
          </div>
          <span className="text-lg text-center text-dark-blue md:text-start md:text-xl">Powered by</span>
          <Img className="mx-auto size-16 md:size-20 md:mx-0" src="/logo-company.png" alt="logo PT Trijaya Berkah Mandiri" />
        </Motion>
        <Motion tag="div" initialX={40} animateX={0} duration={0.6} delay={0.3} className="max-w-md mx-auto md:max-w-full">
          <Img
            src={project?.data.header.url || "/temp-business.webp"}
            alt={project?.data.header.slug || slug}
            className="mx-auto rounded-lg aspect-square w-80 sm:w-72 md:w-80 xl:w-96"
            cover
          />
        </Motion>
      </div>

      <h3 className="block mt-16 mb-4 text-center heading lg:hidden">Projects Photo gallery</h3>

      <div className="flex flex-col-reverse items-center justify-between w-full gap-8 lg:mt-28 lg:flex-row">
        <Motion tag="div" initialX={-40} animateX={0} duration={0.3} className="w-full space-y-4 max-w-72 xl:max-w-sm">
          <div className="w-full lg:w-max">
            <Pagination setPage={setPage} page={page} totalPage={totalPage} />
          </div>
          <h3 className="hidden max-w-xs heading lg:block">Projects Photo gallery</h3>
        </Motion>

        {imageProjects.length < 1 ? (
          <h3 className="w-full text-lg font-semibold text-center sm:text-2xl md:text-3xl text-gray/50">The projects photo gallery is not found</h3>
        ) : (
          <>
            <Motion tag="div" initialX={40} animateX={0} duration={0.6} delay={0.3} className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
              {imageProjects.map((item, index) => (
                <Img key={index} src={item.url} alt={item.slug} className="mx-auto rounded-lg aspect-square w-80 sm:w-72 md:w-80 xl:w-96" cover />
              ))}
            </Motion>
          </>
        )}
      </div>
    </Container>
  );
};
