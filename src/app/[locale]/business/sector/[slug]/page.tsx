import { useTranslations } from "next-intl";

import { Hero } from "@/layouts";
import { AllSectorBusiness, SectorBusiness } from "@/layouts/business";

export default function Sector({ params }: { params: { slug: string } }) {
  const t = useTranslations("business.sector.hero");

  return (
    <>
      <Hero pathImg="/images/sector-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <SectorBusiness slug={params.slug} />
      <AllSectorBusiness />
    </>
  );
}
