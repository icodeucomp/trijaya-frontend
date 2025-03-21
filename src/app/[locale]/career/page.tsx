import { useTranslations } from "next-intl";

import { Hero, Careers } from "@/layouts";

export default function Career() {
  const t = useTranslations("career.hero");

  return (
    <section className="overflow-x-hidden">
      <Hero pathImg="/images/career-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <Careers />
    </section>
  );
}
