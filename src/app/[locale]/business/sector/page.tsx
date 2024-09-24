import { useTranslations } from "next-intl";

import { Hero } from "@/layouts";
import { YourBusiness } from "@/layouts/business";

export default function BusinessSector() {
  const t = useTranslations("business.sector.hero");

  return (
    <>
      <Hero pathImg="/images/sector-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <YourBusiness />
    </>
  );
}
