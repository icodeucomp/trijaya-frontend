"use client";

import { useEffect, useState } from "react";

import { useGetApi } from "@/hooks";

import { useTranslations } from "next-intl";

import { Container, Img, SmallSlider } from "@/components";

import { ResponseMediaTypes } from "@/types";

export const CompanyActivities = () => {
  const { response: medias, loading } = useGetApi<ResponseMediaTypes>("/media");

  const [selected, setSelected] = useState<string>("");
  const [splitData, setSplitData] = useState<number>(0);

  const t = useTranslations("media");

  useEffect(() => {
    if (medias?.data && medias.data.length > 0) {
      setSplitData(Math.ceil(medias?.data.length / 6));
    }
  }, [medias]);

  return (
    <Container className="py-10 space-y-8 md:space-y-16 sm:py-16 md:py-20">
      <div className="space-y-2 text-center">
        <h3 className="heading">{t("head.title")}</h3>
        <p className="subheading">{t("head.description")}</p>
      </div>
      {loading ? (
        <div className="w-full py-16 flex justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Img src={selected} alt={selected} className="w-full overflow-hidden rounded-lg h-80 sm:h-96 md:h-80 lg:h-96" cover />
          <SmallSlider title={`${t("project-activities")}`} slidesPerView={1} grid={{ rows: 2 }} className="space-y-8">
            {Array.from({ length: splitData }, (_, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 p-1 sm:grid-cols-3">
                {medias?.data.slice(i * 6, (i + 1) * 6).map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-lg overflow-hidden cursor-pointer hover:shadow-custom-border transition-shadow ${
                      selected === item.url ? "shadow-custom-border" : "shadow-none"
                    }`}
                    onClick={() => setSelected(item.url)}
                  >
                    <Img src={item.url} alt={item.title} className="w-full h-32 sm:h-24 lg:h-36" cover />
                  </div>
                ))}
              </div>
            ))}
          </SmallSlider>
        </div>
      )}
    </Container>
  );
};
