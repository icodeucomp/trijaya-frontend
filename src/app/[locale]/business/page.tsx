import { useTranslations } from "next-intl";

import { Hero, OurServices } from "@/layouts";
import { Details, Experiences, Products, Services } from "@/layouts/business";

export default function Business() {
  const t = useTranslations("business.hero");

  return (
    <>
      <Hero pathImg="/images/business-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <OurServices />
      <Details />
      <Services />
      <Products />
      <Experiences />
    </>
  );
}
