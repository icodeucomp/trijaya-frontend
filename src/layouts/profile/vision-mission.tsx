import { Container, Img } from "@/components";
import { useTranslations } from "next-intl";
import React from "react";

export const VisionMission = () => {
  const t = useTranslations("profile.vision-mission");

  return (
    <Container className="space-y-16 text-primary pt-10 pb-20">
      <h3 className="text-4xl font-semibold text-center">{t("title")}</h3>
      <div className="flex items-center justify-between gap-8 text-justify">
        <div className="w-full overflow-hidden rounded-lg">
          <Img src="/images/profile/vision.png" alt="vision image" className="w-full h-72" cover />
        </div>
        <div className="space-y-4 max-w-screen-md">
          <h4 className="text-3xl font-semibold">{t("vision.title")}</h4>
          <p className="text-lg">{t("vision.description")}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-8 text-justify">
        <div className="space-y-4 max-w-screen-md">
          <h4 className="text-3xl font-semibold">{t("mission.title")}</h4>
          <ul className="list-decimal pl-4 text-lg">
            <li>
              <p>{t("mission.description-one")}</p>
            </li>
            <li>
              <p>{t("mission.description-two")}</p>
            </li>
          </ul>
        </div>
        <div className="w-full overflow-hidden rounded-lg">
          <Img src="/images/profile/mission.png" alt="vision image" className="w-full h-72" cover />
        </div>
      </div>
    </Container>
  );
};
