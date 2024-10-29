"use client";

import { useTranslations } from "next-intl";

import { Container, Img, Motion } from "@/components";

import { OrganizationalLists } from "@/static";
import { useMediaQuery } from "@/hooks";

export const OrganizationalStructure = () => {
  const t = useTranslations("profile.organizational-structure");

  const isDesktop = useMediaQuery("(min-width: 0px) and (max-width: 1280px)");

  const organizational = OrganizationalLists();
  return (
    <Container id="organizational" className="py-16 space-y-8">
      <Motion tag="div" initialY={-40} animateY={0} duration={0.3} className="space-y-4 text-center sm:space-y-2 sm:text-start">
        <h3 className="heading">{t("title")}</h3>
        <p className="subheading">{t("description")}</p>
      </Motion>
      <Motion tag="div" initialY={40} animateY={0} duration={0.6} delay={0.3} className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {organizational.map((item, index) => (
          <div key={index} className={`relative ${index === 0 ? "xl:row-span-2" : "row-span-1"}`}>
            <Img
              src={index === 0 && isDesktop ? "/images/owner/dudi-hikmat-short.webp" : item.pathImg}
              alt={item.name}
              className={`w-full rounded-lg ${index === 0 ? "h-full" : "h-60 sm:h-72"}`}
              cover
            />
            <div className="absolute inset-0 flex flex-col justify-end p-2 rounded-lg text-light filter-image">
              <h5 className="text-sm font-semibold sm:text-base md:text-lg w-max">{item.name}</h5>
              <p className="text-xs sm:text-sm w-max">{item.job}</p>
            </div>
          </div>
        ))}
      </Motion>
    </Container>
  );
};
