import { useTranslations } from "next-intl";

import { organizationalTypes } from "@/types";

export const OrganizationalLists = () => {
  const t = useTranslations("profile.organizational-structure.job");

  return [
    { pathImg: "/images/owner/dudi-hikmat.webp", name: "Dudi Hikmat", job: `${t("director")}` },
    { pathImg: "/images/owner/subhan-nurdin.webp", name: "Subhan Nurdin", job: `${t("general-manager")}` },
    { pathImg: "/images/owner/dedi-supardi.webp", name: "Dedi Supardi", job: `${t("electrical-manager")}` },
    { pathImg: "/images/owner/ikoh-munikoh.webp", name: "Ikoh Munikoh", job: `${t("accounting-manager")}` },
    { pathImg: "/images/owner/zuhri-arifin.webp", name: "Zuhri Arifin", job: `${t("fabrication-supervisor")}` },
    { pathImg: "/images/owner/supriyanto.webp", name: "Supriyanto", job: `${t("machining-supervisor")}` },
    { pathImg: "/images/owner/dyta-fitra-rosika.webp", name: "Dyta Fitra Rosika", job: `${t("leader-admin")}` },
    { pathImg: "/images/owner/rini-apriani.webp", name: "Rini Apriani", job: `${t("safety")}` },
  ] as organizationalTypes[];
};
