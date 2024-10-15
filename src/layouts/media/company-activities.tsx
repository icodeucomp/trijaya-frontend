"use client";

import * as React from "react";

import { useGetSearchApi } from "@/hooks";

import { useTranslations } from "next-intl";

import { Container, Img, Motion, SmallSlider } from "@/components";

import { ResponseMediaTypes } from "@/types";

export const CompanyActivities = () => {
  const [select, setSelect] = React.useState<string>("");
  const [splitData, setSplitData] = React.useState<number>(0);

  const t = useTranslations("media");

  const { response: medias, loading } = useGetSearchApi<ResponseMediaTypes>({
    path: "/media",
    limit: "100000",
  });

  React.useEffect(() => {
    if (medias?.data && medias.data.length > 0) {
      setSplitData(Math.ceil(medias.data.length / 6));
      setSelect(medias.data[0].slug);
    }
  }, [medias]);

  const selectedImg = medias?.data.find((item) => item.slug === select);

  return (
    <Container id="company-activity" className="py-10 space-y-8 md:space-y-16 sm:py-16 md:py-20">
      <Motion tag="div" initialY={-40} animateY={0} duration={0.2} className="space-y-2 text-center">
        <h3 className="heading">{t("head.title")}</h3>
        <p className="subheading">{t("head.description")}</p>
      </Motion>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Motion tag="div" initialX={-40} animateX={0} duration={0.4} delay={0.2}>
            <Img src={selectedImg?.url || "/temp-business.webp"} alt={select} className="w-full rounded-lg h-80 sm:h-96 md:h-80 lg:h-96" cover />
          </Motion>
          <Motion tag="div" initialX={40} animateX={0} duration={0.6} delay={0.4}>
            <SmallSlider slidesPerView={1} title={`${t("project-activities")}`} className="space-y-8">
              {Array.from({ length: splitData }, (_, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 p-1 sm:grid-cols-3">
                  {medias?.data.slice(i * 6, i * 6 + 6).map((item, j) => (
                    <div
                      key={j}
                      className={`cursor-pointer hover:shadow-custom-border rounded-lg overflow-hidden transition-shadow ${
                        select === item.slug ? "shadow-custom-border" : "shadow-none"
                      }`}
                      onClick={() => setSelect(item.slug)}
                    >
                      <Img src={item.url || "/temp-business.webp"} alt={item.name} className="w-full h-32 rounded-lg sm:h-24 lg:h-36" cover />
                    </div>
                  ))}
                </div>
              ))}
            </SmallSlider>
          </Motion>
        </div>
      )}
    </Container>
  );
};
