import { NavbarTypes } from "@/types";
import { useTranslations } from "next-intl";

export const NavbarList = () => {
  const t = useTranslations("header");

  return [
    { title: `${t("home")}`, pathUrl: "/" },
    {
      title: `${t("profile.title")}`,
      pathUrl: "/profile",
      content: [
        { title: `${t("profile.about-us.title")}`, pathUrl: "/", description: `${t("profile.about-us.description")}` },
        { title: `${t("profile.vision-mission.title")}`, pathUrl: "/", description: `${t("profile.vision-mission.description")}` },
        {
          title: `${t("profile.legality.title")}`,
          pathUrl: "/certification",
          description: `${t("profile.legality.description")}`,
        },
      ],
    },
    {
      title: `${t("business.title")}`,
      pathUrl: "/business",
      content: [
        { title: `${t("business.services.title")}`, pathUrl: "/", description: `${t("business.services.description")}` },
        { title: `${t("business.products.title")}`, pathUrl: "/", description: `${t("business.products.description")}` },
        { title: `${t("business.experiences.title")}`, pathUrl: "/", description: `${t("business.experiences.description")}` },
        {
          title: `${t("business.business-sector.title")}`,
          pathUrl: "/sector",
          description: `${t("business.business-sector.description")}`,
        },
      ],
    },
    {
      title: `${t("media.title")}`,
      pathUrl: "/media",
      content: [
        {
          title: `${t("media.company-activities.title")}`,
          pathUrl: "/",
          description: `${t("media.company-activities.description")}`,
        },
        { title: `${t("media.articles.title")}`, pathUrl: "/", description: `${t("media.articles.description")}` },
      ],
    },
    { title: `${t("contact-us")}`, pathUrl: "/contact-us" },
    {
      title: `${t("career.title")}`,
      pathUrl: "/career",
      content: [
        {
          title: `${t("career.staff-professional.title")}`,
          pathUrl: "/",
          description: `${t("career.staff-professional.description")}`,
        },
        {
          title: `${t("career.internship-program.title")}`,
          pathUrl: "/",
          description: `${t("career.internship-program.description")}`,
        },
      ],
    },
  ] as NavbarTypes[];
};

export const navbarList = [];
