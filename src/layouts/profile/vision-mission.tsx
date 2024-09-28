import { useTranslations } from "next-intl";

import { Container, Img } from "@/components";

export const VisionMission = () => {
  const t = useTranslations("profile.vision-mission");

  return (
    <Container className="pt-4 pb-20 space-y-10 md:pt-10 md:space-y-16 text-primary">
      <h3 className="text-center heading">{t("title")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-4 text-justify md:gap-8">
        <div className="w-full overflow-hidden rounded-lg">
          <Img src="/images/profile-vision.webp" alt="vision image" className="w-full h-72 md:h-60 lg:h-72 max-w-sm mx-auto" cover />
        </div>
        <div className="md:col-span-2 space-y-2 sm:space-y-4">
          <h4 className="text-xl font-semibold text-center md:text-start sm:text-2xl md:text-3xl">{t("vision.title")}</h4>
          <p className="text-base leading-relaxed sm:text-lg">{t("vision.description")}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-4 text-justify md:gap-8">
        <div className="md:col-span-2 space-y-2 sm:space-y-4 order-2 md:order-1">
          <h4 className="text-xl font-semibold text-center md:text-start sm:text-2xl md:text-3xl">{t("mission.title")}</h4>
          <ul className="pl-4 space-y-1 text-base leading-relaxed list-decimal sm:text-lg">
            <li>
              <p>{t("mission.description-one")}</p>
            </li>
            <li>
              <p>{t("mission.description-two")}</p>
            </li>
          </ul>
        </div>
        <div className="w-full overflow-hidden rounded-lg order-1 md:order-2">
          <Img src="/images/profile-mission.webp" alt="vision image" className="w-full h-72 md:h-60 lg:h-72 max-w-sm mx-auto" cover />
        </div>
      </div>
    </Container>
  );
};
