import { useTranslations } from "next-intl";

import { Container, Img } from "@/components";

export const Message = () => {
  const t = useTranslations("profile.message");

  return (
    <Container className="py-20 flex justify-between gap-8">
      <div className="max max-w-screen-md font-semibold">
        <h2 className="text-primary text-4xl font-semibold mb-2">PT Trijaya Berkah Mandiri</h2>
        <h4 className="text-primary text-2xl font-semibold mb-2">{t("subtitle")}</h4>
        <p className="text-dark-blue font-normal text-justify mb-4">{t("description-one")}</p>
        <p className="text-dark-blue font-normal text-justify">{t("description-two")}</p>
      </div>
      <div className="relative w-full rounded-lg overflow-hidden">
        <Img src="/images/profile/company-building.png" alt="PT Trijaya Berkah Mandiri company building picture " className="w-full h-96" cover />
      </div>
    </Container>
  );
};
