import { useTranslations } from "next-intl";

import { NavbarTypes } from "@/types";

export const NavbarList = () => {
  const t = useTranslations("header");
  const tr = useTranslations("home.services");

  return [
    { title: `${t("home")}`, pathUrl: "/" },
    {
      title: `${t("profile.title")}`,
      pathUrl: "/profile",
      content: [
        { title: `${t("profile.about-us.title")}`, pathUrl: "#about-us", description: `${t("profile.about-us.description")}` },
        { title: `${t("profile.vision-mission.title")}`, pathUrl: "#vision-mission", description: `${t("profile.vision-mission.description")}` },
        { title: `${t("profile.organizational.title")}`, pathUrl: "#organizational", description: `${t("profile.organizational.description")}` },
        // {
        //   title: `${t("profile.legality.title")}`,
        //   pathUrl: "/certification",
        //   description: `${t("profile.legality.description")}`,
        // },
      ],
    },
    {
      title: `${t("business.title")}`,
      pathUrl: "/business",
      content: [
        {
          title: `${tr("one.title")}`,
          description: `${tr("one.description")}`,
          pathUrl: "/sector/mechanical",
        },
        {
          title: `${tr("two.title")}`,
          description: `${tr("two.description")}`,
          pathUrl: "/sector/civil-construction",
        },
        {
          title: `${tr("three.title")}`,
          description: `${tr("three.description")}`,
          pathUrl: "/sector/fabrication",
        },
        {
          title: `${tr("four.title")}`,
          description: `${tr("four.description")}`,
          pathUrl: "/sector/piping",
        },
        {
          title: `${tr("six.title")}`,
          description: `${tr("six.description")}`,
          pathUrl: "/sector/manpower-supply",
        },
        {
          title: `${tr("seven.title")}`,
          description: `${tr("seven.description")}`,
          pathUrl: "/sector/general-supplier",
        },
        {
          title: `${tr("eight.title")}`,
          description: `${tr("eight.description")}`,
          pathUrl: "/sector/electrical",
        },
      ],
    },
    {
      title: `${t("media.title")}`,
      pathUrl: "/media",
      content: [
        {
          title: `${t("media.projects-gallery.title")}`,
          pathUrl: "#projects-gallery",
          description: `${t("media.projects-gallery.description")}`,
        },
        { title: `${t("media.albums.title")}`, pathUrl: "#lifeattbm", description: `${t("media.albums.description")}` },
        { title: `${t("media.articles-gallery.title")}`, pathUrl: "#articles-gallery", description: `${t("media.articles-gallery.description")}` },
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
