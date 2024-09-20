import { useTranslations } from "next-intl";

import { Hero } from "@/layouts";
import { Message, OrganizationalStructure, VisionMission } from "@/layouts/profile";

export default function Profile() {
  const t = useTranslations("profile.hero");

  return (
    <>
      <Hero pathImg="/images/profile-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <Message />
      <VisionMission />
      <section className="bg-light-gray">
        <OrganizationalStructure />
      </section>
    </>
  );
}
