import { useTranslations } from "next-intl";

import { Hero } from "@/layouts";
import { CertificationLegalities } from "@/layouts/profile";

export default function Certification() {
  const t = useTranslations("certification.hero");

  return (
    <>
      <Hero pathImg="/images/certification-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <CertificationLegalities />
    </>
  );
}
