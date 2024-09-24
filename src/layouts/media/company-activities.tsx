"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { Container, Img, Slider } from "@/components";

import { companyActivities } from "@/static";

export const CompanyActivities = () => {
  const [selected, setSelected] = useState<string>("/images/media/project-1.png");

  const t = useTranslations("media");

  const splitDataToSix = Math.ceil(companyActivities.length / 6);

  return (
    <Container className="py-20 space-y-16">
      <div className="space-y-2 text-center">
        <h3 className="text-4xl font-semibold text-primary">{t("head.title")}</h3>
        <p className="text-xl text-dark-gray">{t("head.description")}</p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="overflow-hidden rounded-lg">
          <Img src={selected} alt="project activities picture" className="w-full h-96" cover />
        </div>
        <Slider title={`${t("project-activities")}`} isBold slidesPerView={1} grid={{ rows: 2 }} className="space-y-8">
          {Array.from({ length: splitDataToSix }, (_, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 p-1">
              {companyActivities.slice(i * 6, (i + 1) * 6).map((img, j) => (
                <div
                  key={j}
                  className={`rounded-lg overflow-hidden cursor-pointer hover:shadow-custom-border transition-shadow ${
                    selected === img ? "shadow-custom-border" : "shadow-none"
                  }`}
                  onClick={() => setSelected(img)}
                >
                  <Img src={img} alt={`Image ${j + 1}`} className="w-full h-36" cover />
                </div>
              ))}
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};
