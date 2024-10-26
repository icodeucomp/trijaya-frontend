import { useTranslations } from "next-intl";

import { NavbarTypes } from "@/types";

export const NavbarList = () => {
  const t = useTranslations("header");

  return [
    { title: `${t("home")}`, pathUrl: "/" },
    {
      title: `${t("profile.title")}`,
      pathUrl: "/profile",
      content: [
        { title: `${t("profile.about-us.title")}`, pathUrl: "#about-us", description: `${t("profile.about-us.description")}` },
        { title: `${t("profile.vision-mission.title")}`, pathUrl: "#vision-mission", description: `${t("profile.vision-mission.description")}` },
        { title: `${t("profile.organizational.title")}`, pathUrl: "#organizational", description: `${t("profile.organizational.description")}` },
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
        {
          title: "Electrical",
          pathUrl: "/sector/electrical",
          description: "Enim fermentum quam id mattis cras potenti pretium massa. Litora nisl ex sed vestibulum nec eu aptent euismod dui est.",
        },
        {
          title: "Fabrication",
          pathUrl: "/sector/fabrication",
          description: "Enim fermentum quam id mattis cras potenti pretium massa. Litora nisl ex sed vestibulum nec eu aptent euismod dui est.",
        },
        {
          title: "General Supplier",
          pathUrl: "/sector/general-supplier",
          description: "Enim fermentum quam id mattis cras potenti pretium massa. Litora nisl ex sed vestibulum nec eu aptent euismod dui est.",
        },
        {
          title: "Machining",
          pathUrl: "/sector/machining",
          description: "Enim fermentum quam id mattis cras potenti pretium massa. Litora nisl ex sed vestibulum nec eu aptent euismod dui est.",
        },
        {
          title: "Mechanical",
          pathUrl: "/sector/mechanical",
          description: "Enim fermentum quam id mattis cras potenti pretium massa. Litora nisl ex sed vestibulum nec eu aptent euismod dui est.",
        },
        {
          title: "Civil & Construction",
          pathUrl: "/sector/civil-construction",
          description: "Enim fermentum quam id mattis cras potenti pretium massa. Litora nisl ex sed vestibulum nec eu aptent euismod dui est.",
        },
      ],
    },
    {
      title: `${t("media.title")}`,
      pathUrl: "/media",
      content: [
        {
          title: `${t("media.company-activities.title")}`,
          pathUrl: "#company-activity",
          description: `${t("media.company-activities.description")}`,
        },
        { title: `${t("media.articles.title")}`, pathUrl: "#article", description: `${t("media.articles.description")}` },
      ],
    },
    { title: `${t("contact-us")}`, pathUrl: "/contact-us" },
    {
      title: `${t("career.title")}`,
      pathUrl: "/career",
      content: [
        {
          title: `${t("career.staff-professional.title")}`,
          pathUrl: "#career",
          description: `${t("career.staff-professional.description")}`,
        },
        {
          title: `${t("career.internship-program.title")}`,
          pathUrl: "#career",
          description: `${t("career.internship-program.description")}`,
        },
      ],
    },
  ] as NavbarTypes[];
};

export const navbarList = [];
