import { useTranslations } from "next-intl";

import { CertificationLegalities, Hero } from "@/layouts";

export default function Certification() {
  const t = useTranslations("certification.hero");

  return (
    <>
      <Hero pathImg="/images/certification-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <CertificationLegalities />
    </>
  );
}
