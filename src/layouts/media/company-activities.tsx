"use client";

import * as React from "react";

import { useGetSearchApi } from "@/hooks";

import { useTranslations } from "next-intl";

import { Container, Img, Pagination } from "@/components";

import { ResponseMediaTypes } from "@/types";

export const CompanyActivities = () => {
  const [page, setPage] = React.useState<string>("1");
  const [select, setSelect] = React.useState<string>("");
  const [splitData, setSplitData] = React.useState<number>(0);

  const t = useTranslations("media");

  const { response: medias, loading } = useGetSearchApi<ResponseMediaTypes>({
    path: "/media",
    limit: "6",
    page,
  });

  React.useEffect(() => {
    if (medias?.data && medias.data.length > 0) {
      setSelect(medias?.data[0].slug);
      setSplitData(Math.ceil(medias.total / 6));
    }
  }, [medias]);

  const selectedImg = medias?.data.find((item) => item.slug === select);

  return (
    <Container id="company-activity" className="py-10 space-y-8 md:space-y-16 sm:py-16 md:py-20">
      <div className="space-y-2 text-center">
        <h3 className="heading">{t("head.title")}</h3>
        <p className="subheading">{t("head.description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Img src={selectedImg?.url || "/temp-business.webp"} alt={select} className="w-full rounded-lg h-80 sm:h-96 md:h-80 lg:h-96" cover />
        <Pagination className="space-y-8" splitData={splitData} loading={loading} title={`${t("project-activities")}`} page={page} setPage={setPage}>
          <div className="grid grid-cols-2 gap-2 p-1 sm:grid-cols-3">
            {medias?.data.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer hover:shadow-custom-border rounded-lg overflow-hidden transition-shadow ${
                  select === item.slug ? "shadow-custom-border" : "shadow-none"
                }`}
                onClick={() => setSelect(item.slug)}
              >
                <Img src={item.url || "/temp-business.webp"} alt={item.name} className="w-full h-32 rounded-lg sm:h-24 lg:h-36" cover />
              </div>
            ))}
          </div>
        </Pagination>
      </div>
    </Container>
  );
};
