import { useTranslations } from "next-intl";

import { Hero, Contacts } from "@/layouts";

export default function ContactUs() {
  const t = useTranslations("contact-us.hero");

  return (
    <>
      <Hero pathImg="/images/certification-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <Contacts />
    </>
  );
}
