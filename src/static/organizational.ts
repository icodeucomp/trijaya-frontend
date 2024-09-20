import { useTranslations } from "next-intl";

import { organizationalTypes } from "@/types";

export const OrganizationalLists = () => {
  const t = useTranslations("profile.organizational-structure.job");
  return [
    { pathImg: "/images/profile/director.png", name: "Dudi Hikmat", job: `${t("director")}` },
    { pathImg: "/images/profile/director.png", name: "Thomas Oktavianto", job: `${t("general-manager")}` },
    { pathImg: "/images/profile/director.png", name: "Ghandhani Maulidan", job: `${t("assistant-manager")}` },
    { pathImg: "/images/profile/director.png", name: "Dedi Supardi", job: `${t("electrical-manager")}` },
    { pathImg: "/images/profile/director.png", name: "Ikoh Munikoh", job: `${t("accounting-manager")}` },
    { pathImg: "/images/profile/director.png", name: "Kasiman", job: `${t("project-manager")}` },
    { pathImg: "/images/profile/director.png", name: "Supriyanto", job: `${t("machining-supervisor")}` },
    { pathImg: "/images/profile/director.png", name: "Zuhri Arifin", job: `${t("fabrication-supervisor")}` },
  ] as organizationalTypes[];
};
