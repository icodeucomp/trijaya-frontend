"use client";

import { Link } from "@/i18n/routing";

import { useGetApi } from "@/hooks";

import { useTranslations } from "next-intl";

import { Background, Container, Motion } from "@/components";

import { ResponseBusinessesTypes } from "@/types";

export const YourBusiness = () => {
  const { response: products, loading } = useGetApi<ResponseBusinessesTypes>("/business");

  const t = useTranslations("business.your-business");

  return (
    <Container className="py-10 space-y-8 sm:py-16 md:py-20">
      <Motion tag="div" initialY={-40} animateY={0} duration={0.5} className="space-y-2 text-center">
        <h3 className="heading">{t("title")}</h3>
        <p className="subheading">{t("description")}</p>
      </Motion>
      {loading ? (
        <div className="flex justify-center w-full py-16">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-3 lg:grid-cols-4">
          {products?.data.map((item, index) => (
            <Link href={`/business/sector/${item.slug}`} key={index} className="cursor-pointer">
              <Motion tag="div" initialY={40} animateY={0} duration={1} delay={index * 0.1}>
                <Background
                  src={item.imageHeader.url || "/temp-business.webp"}
                  className="items-center justify-center py-8 aspect-square filter-image"
                  parentClassName="rounded-lg"
                  isHover
                >
                  <h5 className="text-xl font-semibold">{item.title}</h5>
                </Background>
              </Motion>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
};
