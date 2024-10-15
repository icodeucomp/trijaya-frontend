import { useTranslations } from "next-intl";

import { Container, Img, Motion } from "@/components";

export const Message = () => {
  const t = useTranslations("profile.message");

  return (
    <Container id="about-us" className="flex flex-col-reverse justify-between gap-8 py-10 sm:py-16 md:py-20 lg:flex-row">
      <div className="w-full space-y-4 font-semibold lg:max-w-screen-md">
        <Motion tag="h2" initialX={-40} animateX={0} duration={0.3} className="heading">
          PT Trijaya Berkah Mandiri
        </Motion>
        <Motion
          tag="h4"
          initialX={-40}
          animateX={0}
          duration={0.6}
          delay={0.3}
          className="text-base font-semibold text-justify sm:text-lg md:text-xl lg:text-2xl text-primary lg:text-start"
        >
          {t("subtitle")}
        </Motion>
        <Motion
          tag="p"
          initialX={-40}
          animateX={0}
          duration={0.9}
          delay={0.6}
          className="text-sm font-normal text-justify sm:text-base text-dark-blue"
        >
          {t("description-one")}
        </Motion>
        <Motion
          tag="p"
          initialX={-40}
          animateX={0}
          duration={0.9}
          delay={0.6}
          className="text-sm font-normal text-justify sm:text-base text-dark-blue"
        >
          {t("description-two")}
        </Motion>
      </div>
      <Motion tag="div" initialX={40} animateX={0} duration={0.6} delay={0.3} className="relative w-full max-w-md mx-auto">
        <Img
          src="/images/profile-message.webp"
          alt="PT Trijaya Berkah Mandiri company building picture "
          className="w-full rounded-lg h-72 sm:h-80 lg:h-96"
          cover
        />
      </Motion>
    </Container>
  );
};
