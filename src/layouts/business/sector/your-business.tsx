"use client";

import { Link } from "@/i18n/routing";

import { useGetApi } from "@/hooks";

import { useTranslations } from "next-intl";

import { Background, Container } from "@/components";

import { ResponseBusinessesTypes } from "@/types";

export const YourBusiness = () => {
  const { response: products, loading } = useGetApi<ResponseBusinessesTypes>("/business");

  const t = useTranslations("business.your-business");

  return (
    <Container className="py-10 space-y-8 sm:py-16 md:py-20">
      <div className="space-y-2 text-center">
        <h3 className="heading">{t("title")}</h3>
        <p className="subheading">{t("description")}</p>
      </div>
      {loading ? (
        <div className="w-full py-16 flex justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-3 lg:grid-cols-4">
          {products?.data.map((item, index) => (
            <Link href={`/business/sector/${item.slug}`} key={index}>
              <Background
                src={item.imageHeader.url || "/temp-business.webp"}
                className="items-center justify-center py-8 aspect-square filter-image"
                parentClassName="rounded-lg"
              >
                <h5 className="text-xl font-semibold">{item.title}</h5>
              </Background>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
};
