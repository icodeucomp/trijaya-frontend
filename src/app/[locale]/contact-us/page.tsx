import { useTranslations } from "next-intl";

import { Hero, Contacts } from "@/layouts";

export default function ContactUs() {
  const t = useTranslations("contact-us.hero");

  return (
    <section className="overflow-x-hidden">
      <Hero pathImg="/images/contact-us-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <Contacts />
    </section>
  );
}
