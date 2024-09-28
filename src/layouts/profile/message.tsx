import { useTranslations } from "next-intl";

import { Container, Img } from "@/components";

export const Message = () => {
  const t = useTranslations("profile.message");

  return (
    <Container id="about-us" className="flex flex-col-reverse justify-between gap-8 py-10 sm:py-16 md:py-20 lg:flex-row">
      <div className="w-full space-y-4 font-semibold lg:max-w-screen-md">
        <h2 className="heading">PT Trijaya Berkah Mandiri</h2>
        <h4 className="text-base font-semibold text-justify sm:text-lg md:text-xl lg:text-2xl text-primary lg:text-start">{t("subtitle")}</h4>
        <p className="text-sm font-normal text-justify sm:text-base text-dark-blue">{t("description-one")}</p>
        <p className="text-sm font-normal text-justify sm:text-base text-dark-blue">{t("description-two")}</p>
      </div>
      <div className="relative w-full max-w-md mx-auto">
        <Img
          src="/images/profile-message.webp"
          alt="PT Trijaya Berkah Mandiri company building picture "
          className="w-full overflow-hidden rounded-lg h-72 sm:h-80 lg:h-96"
          cover
        />
      </div>
    </Container>
  );
};
