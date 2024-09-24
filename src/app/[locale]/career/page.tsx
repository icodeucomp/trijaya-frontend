import { useTranslations } from "next-intl";

import { Hero, Careers } from "@/layouts";

export default function Career() {
  const t = useTranslations("career.hero");

  return (
    <>
      <Hero pathImg="/images/certification-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <Careers />
    </>
  );
}
