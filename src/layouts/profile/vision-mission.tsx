import { useTranslations } from "next-intl";

import { Container, Img, Motion } from "@/components";

export const VisionMission = () => {
  const t = useTranslations("profile.vision-mission");

  return (
    <Container id="vision-mission" className="pt-4 pb-20 space-y-10 md:pt-10 md:space-y-16 text-primary">
      <Motion tag="h3" initialY={-40} animateY={0} duration={0.3} className="text-center heading">
        {t("title")}
      </Motion>
      <div className="grid grid-cols-1 gap-4 text-justify md:grid-cols-5 place-items-center md:gap-8">
        <Motion tag="div" initialX={-40} animateX={0} duration={0.3} className="w-full md:col-span-2">
          <Img src="/images/profile-vision.webp" alt="vision image" className="w-full max-w-lg mx-auto rounded-lg h-72 md:h-60 lg:h-72" cover />
        </Motion>
        <Motion tag="div" initialX={40} animateX={0} duration={0.6} delay={0.3} className="space-y-2 md:col-span-3 sm:space-y-4">
          <h4 className="text-xl font-semibold text-center md:text-start sm:text-2xl md:text-3xl">{t("vision.title")}</h4>
          <p className="text-base leading-relaxed sm:text-lg">{t("vision.description")}</p>
        </Motion>
      </div>
      <div className="grid grid-cols-1 gap-4 text-justify md:grid-cols-5 place-items-center md:gap-8">
        <Motion tag="div" initialX={-40} animateX={0} duration={0.3} className="order-2 space-y-2 md:col-span-3 sm:space-y-4 md:order-1">
          <h4 className="text-xl font-semibold text-center md:text-start sm:text-2xl md:text-3xl">{t("mission.title")}</h4>
          <ul className="pl-4 space-y-1 text-base leading-relaxed list-decimal sm:text-lg">
            <li>
              <p>{t("mission.description-one")}</p>
            </li>
            <li>
              <p>{t("mission.description-two")}</p>
            </li>
          </ul>
        </Motion>
        <Motion tag="div" initialX={40} animateX={0} duration={0.6} delay={0.3} className="order-1 w-full md:col-span-2 md:order-2">
          <Img src="/images/profile-mission.webp" alt="vision image" className="w-full max-w-lg mx-auto rounded-lg h-72 md:h-60 lg:h-72" cover />
        </Motion>
      </div>
    </Container>
  );
};
