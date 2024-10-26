import { useTranslations } from "next-intl";

import { Hero } from "@/layouts";
import { CertificationLegalities } from "@/layouts/profile";
import Image from "next/image";

export default function Certification() {
  const t = useTranslations("certification.hero");

  return (
    <section className="overflow-x-hidden relative">
      <Image
        src="/images/pattern.png"
        alt="pattern background"
        fill
        className="mx-auto 2xl:max-w-screen-xl opacity-40"
        objectFit="cover"
        objectPosition="center"
      />
      <Hero pathImg="/images/certification-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <CertificationLegalities />
    </section>
  );
}
